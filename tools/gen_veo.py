#!/usr/bin/env python3
"""
gen_veo.py — Google Veo video clips via the OFFICIAL Gemini API (google-genai SDK).

Sibling of gen_clip.py (which drives fal.ai). Same output contract on purpose: an mp4 at
--out plus a sidecar .json (provider, model, payload, cost, created) so a shot in
beats.json never needs to know whether a clip came from fal, Veo, or a manually-ingested
Flow export (see ingest_flow_asset.py) — only the sidecar's "provider" field differs.

Why this exists next to gen_clip.py rather than folding into it: fal's queue API and the
Gemini API have different auth, different request/poll/download shapes, and different
config surfaces (Veo's reference_images / last_frame are typed SDK objects, not raw JSON).
Forcing them through one function would hide more than it would share. What IS shared is
the CLI shape and the sidecar contract — copy this file's structure for provider #4.

Usage:
  python tools/gen_veo.py --prompt "..." --out shots/01-desert-door.mp4
  python tools/gen_veo.py --prompt "..." --ref character.png --out shots/02-walk.mp4
  python tools/gen_veo.py --prompt "..." --ref start.png --last-frame end.png \\
      --out shots/06-loop-return.mp4                       # loop-by-constraint, like seedance end_image_url
  python tools/gen_veo.py --prompt "..." --reference character.png --reference prop.png \\
      --out shots/03-scene.mp4                              # native multi-image character consistency (<=3, Veo 3.1 only)
  python tools/gen_veo.py --prompt "..." --out x.mp4 --dry-run

  --model       standard|fast|lite (default: fast) or a raw model id
                  standard -> veo-3.1-generate-preview       $0.40/s (720p/1080p), $0.60/s (4k)
                  fast     -> veo-3.1-fast-generate-preview  $0.10/s (720p), $0.12/s (1080p), $0.30/s (4k)
                  lite     -> veo-3.1-lite-generate-preview  $0.05/s (720p), $0.08/s (1080p), 4k unsupported
                (verified against ai.google.dev/gemini-api/docs/pricing 2026-09-10 — audio-inclusive
                 rates; re-verify before trusting on a later date, same rule ai-shorts/IDEAS.md lives by)
  --ref PATH        single conditioning image = the clip's start frame (character-sheet method:
                    hand it a still that already contains the locked character/subject)
  --last-frame PATH end-frame pin for a seamless loop (first&last-frame interpolation)
  --reference PATH  repeatable (max 3), Veo 3.1 native multi-image ASSET reference — the closest
                    equivalent to Seedance's start-frame conditioning but model-native; combine
                    with --ref for start-frame + reference set, or use alone
  --aspect      9:16 (default, vertical shorts) | 16:9
  --resolution  1080p (default) | 720p | 4k
  --duration    8 (default) | 4 | 6   (Veo 3.1 allowed values)
  --audio       generate model audio too (default OFF — voice is ElevenLabs, SFX is our own
                pipeline; this repo's convention across every provider, see ai-shorts/IDEAS.md)
  --seed N      --negative "text"
  --set k=v     any extra GenerateVideosConfig field, repeatable (numbers/bools/JSON auto-parsed)
  --timeout     seconds to wait (default 900)
  --dry-run     print the derived cost + config, no API call

Needs GEMINI_API_KEY in .env (already required for tools/gen_image.py — same SDK, same key).
STATE THE COST BEFORE SPENDING IT — same iron rule as make-ai-short for fal models.
"""
import json
import os
import sys
import time

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

MODEL_PRESETS = {
    "standard": "veo-3.1-generate-preview",
    "fast": "veo-3.1-fast-generate-preview",
    "lite": "veo-3.1-lite-generate-preview",
}
DEFAULT_PRESET = "fast"

# $/s by (preset, resolution) — audio-inclusive, per ai.google.dev/gemini-api/docs/pricing.
# Only used for presets; a raw --model id skips cost derivation (state price manually).
COST_PER_SEC = {
    "standard": {"720p": 0.40, "1080p": 0.40, "4k": 0.60},
    "fast": {"720p": 0.10, "1080p": 0.12, "4k": 0.30},
    "lite": {"720p": 0.05, "1080p": 0.08},  # no 4k
}


def load_env():
    env = {}
    p = os.path.join(ROOT, ".env")
    if os.path.exists(p):
        for line in open(p, encoding="utf-8"):
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            k, v = line.split("=", 1)
            env[k.strip()] = v.strip().strip('"').strip("'")
    return {**env, **os.environ}


def get_arg(args, name, default=None):
    return args[args.index(name) + 1] if name in args else default


def get_args_multi(args, name):
    return [args[i + 1] for i, a in enumerate(args) if a == name]


def parse_val(v):
    try:
        return json.loads(v)
    except (ValueError, json.JSONDecodeError):
        return v


def rel(p):
    try:
        return os.path.relpath(p, ROOT)
    except ValueError:
        return p


def mime_for(path):
    ext = os.path.splitext(path)[1].lower()
    return {"png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg"}.get(ext, "image/png") \
        if not ext.startswith(".") else {"png": "image/png"}.get(ext[1:], "image/jpeg")


def main():
    args = sys.argv[1:]
    prompt = get_arg(args, "--prompt")
    out = get_arg(args, "--out")
    if not prompt or not out:
        sys.exit("need --prompt and --out (see file header)")

    preset = get_arg(args, "--model", DEFAULT_PRESET)
    model_id = MODEL_PRESETS.get(preset, preset)
    ref = get_arg(args, "--ref")
    last_frame = get_arg(args, "--last-frame")
    references = get_args_multi(args, "--reference")
    if len(references) > 3:
        sys.exit(f"Veo 3.1 supports at most 3 --reference images, got {len(references)}")

    aspect = get_arg(args, "--aspect", "9:16")
    resolution = get_arg(args, "--resolution", "1080p")
    duration = int(get_arg(args, "--duration", "8"))
    audio = "--audio" in args
    seed = get_arg(args, "--seed")
    seed = int(seed) if seed is not None else None
    negative = get_arg(args, "--negative")
    timeout = float(get_arg(args, "--timeout", "900"))
    dry = "--dry-run" in args

    overrides = {}
    for i, a in enumerate(args):
        if a == "--set":
            k, _, v = args[i + 1].partition("=")
            overrides[k] = parse_val(v)

    cost = None
    if preset in COST_PER_SEC:
        table = COST_PER_SEC[preset]
        if resolution not in table:
            sys.exit(f"{preset} does not support {resolution}; choices: {list(table)}")
        cost = table[resolution] * duration

    print(f"model = {model_id}")
    print(f"aspect={aspect} resolution={resolution} duration={duration}s audio={audio}")
    print(f"ref={ref or '(none)'}  last_frame={last_frame or '(none)'}  "
          f"reference_images={len(references)}")
    if cost is not None:
        print(f"DERIVED COST: ${cost:.2f}  (audio-inclusive rate; state this before spending it)")
    else:
        print("cost: unknown (raw --model id) — check ai.google.dev/gemini-api/docs/pricing yourself")
    if dry:
        print("[dry-run] no API call.")
        return

    api_key = load_env().get("GEMINI_API_KEY", "").strip()
    if not api_key:
        sys.exit("GEMINI_API_KEY not set in .env")

    from google import genai
    from google.genai import types

    def load_image(path):
        with open(path, "rb") as f:
            return types.Image(image_bytes=f.read(), mime_type=mime_for(path))

    config_kwargs = dict(
        aspect_ratio=aspect,
        resolution=resolution,
        duration_seconds=duration,
        generate_audio=audio,
    )
    if seed is not None:
        config_kwargs["seed"] = seed
    if negative:
        config_kwargs["negative_prompt"] = negative
    if last_frame:
        config_kwargs["last_frame"] = load_image(last_frame)
    if references:
        config_kwargs["reference_images"] = [
            types.VideoGenerationReferenceImage(
                image=load_image(r), reference_type=types.VideoGenerationReferenceType.ASSET
            )
            for r in references
        ]
    config_kwargs.update(overrides)

    client = genai.Client(api_key=api_key)
    start_image = load_image(ref) if ref else None

    try:
        operation = client.models.generate_videos(
            model=model_id,
            prompt=prompt,
            image=start_image,
            config=types.GenerateVideosConfig(**config_kwargs),
        )
    except Exception as e:
        sys.exit(f"Gemini API error: {type(e).__name__}: {e}")

    print(f"queued: {operation.name}")
    t0 = time.time()
    while not operation.done:
        if time.time() - t0 > timeout:
            sys.exit(f"timeout after {int(timeout)}s (operation {operation.name} may still "
                      f"finish; re-poll it with client.operations.get)")
        print(f"  ...generating  (+{int(time.time() - t0)}s)")
        time.sleep(10)
        operation = client.operations.get(operation)

    if operation.error:
        sys.exit(f"generation FAILED: {operation.error}")
    if not operation.response or not operation.response.generated_videos:
        sys.exit(f"no video in response: {operation}")

    generated = operation.response.generated_videos[0]
    os.makedirs(os.path.dirname(os.path.abspath(out)), exist_ok=True)
    client.files.download(file=generated.video, destination=out)
    print(f"video -> {rel(out)}  ({os.path.getsize(out)//1024}KB)")

    sidecar = os.path.splitext(out)[0] + ".json"
    payload = {
        "prompt": prompt, "aspect_ratio": aspect, "resolution": resolution,
        "duration_seconds": duration, "generate_audio": audio, "seed": seed,
        "negative_prompt": negative, "ref": rel(ref) if ref else None,
        "last_frame": rel(last_frame) if last_frame else None,
        "reference_images": [rel(r) for r in references],
        **{k: v for k, v in overrides.items()},
    }
    with open(sidecar, "w", encoding="utf-8") as f:
        json.dump({
            "provider": "veo-gemini",
            "model": model_id,
            "payload": payload,
            "operation_name": operation.name,
            "derived_cost_usd": round(cost, 4) if cost is not None else None,
            "created": time.strftime("%Y-%m-%dT%H:%M:%S"),
        }, f, indent=2, ensure_ascii=False)
        f.write("\n")
    print(f"meta  -> {rel(sidecar)}")


if __name__ == "__main__":
    main()
