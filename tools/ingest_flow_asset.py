#!/usr/bin/env python3
"""
ingest_flow_asset.py — bring a manually-exported Google Flow clip into the repo's contract.

Google Flow (labs.google/flow) has no public API — it is a UI on top of Veo (+ other Google
models) that you drive by hand and export from by hand. This tool is the bridge: point it at
a file you already downloaded from Flow's UI, and it normalizes that file into the SAME
mp4 + sidecar.json contract gen_clip.py (fal) and gen_veo.py (official Veo API) produce, so
a shot in beats.json never needs to know which of the three made it — only the sidecar's
"provider" field differs, and this one is "google-flow-manual".

What it does:
  1. Validates the source is a real, readable video (ffprobe).
  2. Optionally normalizes it to the project spec (scale+crop to WxH, pad/convert fps) —
     Flow's own export controls vary and don't always match 1080x1920@30.
  3. Copies (never moves) the result into --out, so your Flow download stays untouched.
  4. Optionally extracts frame 0 and/or the last frame as PNGs — for the loop-by-constraint
     pattern (ai-shorts/IDEAS.md: pin the loop off the clip's TRUE first/last frame, never
     the prompt image), the same discipline blue-man #1 used with Seedance's end_image_url.
  5. Writes a sidecar .json recording what you tell it (prompt/notes — Flow won't hand you
     these back programmatically) plus the measured video facts (dims, fps, duration).

Usage:
  python tools/ingest_flow_asset.py --src ~/Downloads/flow_export.mp4 \\
      --out media/projects/my-short/01-scene.mp4 \\
      --prompt "the prompt you typed into Flow" \\
      --notes "picked take 3 of 4; Flow model: Veo 3.1"

  python tools/ingest_flow_asset.py --src flow_export.mp4 --out shots/01-scene.mp4 \\
      --normalize --width 1080 --height 1920 --fps 30 --extract-frame0 --extract-lastframe

  --src PATH        the file you downloaded from Flow's UI (required)
  --out PATH        destination mp4 inside the repo (required)
  --prompt TEXT     the prompt you used in Flow (recorded for reproducibility/audit — Flow
                    gives you no API to read this back, so it only exists if you record it)
  --notes TEXT      anything else worth recording (take number, Flow model picked, edits made)
  --credits N       Flow spend is credits/subscription-based, not per-call $ like fal/Veo API;
                    record a credit count here if you're tracking it (optional, default null)
  --normalize       re-encode to --width/--height/--fps via ffmpeg (scale+crop to fill, no
                    letterbox) instead of just copying the source as-is
  --width/--height/--fps   normalize target (defaults 1080x1920@30 — this repo's shorts spec)
  --extract-frame0        write <out-without-ext>-frame0.png
  --extract-lastframe     write <out-without-ext>-lastframe.png
  --dry-run          print what would happen, touch nothing

Needs ffmpeg/ffprobe on PATH (already required repo-wide). No API key — this tool never
calls a network service.
"""
import json
import os
import shutil
import subprocess
import sys
import time

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def get_arg(args, name, default=None):
    return args[args.index(name) + 1] if name in args else default


def rel(p):
    try:
        return os.path.relpath(p, ROOT)
    except ValueError:
        return p


def run(cmd):
    r = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
    if r.returncode != 0:
        sys.exit(f"command failed: {' '.join(cmd)}\n{r.stdout[-3000:]}")
    return r.stdout


def ffprobe_facts(path):
    out = run([
        "ffprobe", "-v", "error", "-select_streams", "v:0",
        "-show_entries", "stream=width,height,r_frame_rate,codec_name",
        "-show_entries", "format=duration",
        "-of", "json", path,
    ])
    data = json.loads(out)
    stream = (data.get("streams") or [{}])[0]
    fmt = data.get("format", {})
    fr = stream.get("r_frame_rate", "0/1")
    num, _, den = fr.partition("/")
    fps = round(float(num) / float(den or 1), 3) if den else float(num)
    return {
        "width": stream.get("width"),
        "height": stream.get("height"),
        "fps": fps,
        "codec": stream.get("codec_name"),
        "duration_s": round(float(fmt.get("duration", 0)), 3),
    }


def extract_frame(src, out_png, at_s=None):
    cmd = ["ffmpeg", "-y", "-v", "error"]
    if at_s is not None:
        cmd += ["-ss", str(at_s)]
    else:
        cmd += ["-sseof", "-0.1"]
    cmd += ["-i", src, "-frames:v", "1", out_png]
    run(cmd)


def main():
    args = sys.argv[1:]
    src = get_arg(args, "--src")
    out = get_arg(args, "--out")
    if not src or not out:
        sys.exit("need --src and --out (see file header)")
    if not os.path.isfile(src):
        sys.exit(f"--src not found: {src}")

    prompt = get_arg(args, "--prompt")
    notes = get_arg(args, "--notes")
    credits_raw = get_arg(args, "--credits")
    credits = int(credits_raw) if credits_raw is not None else None
    normalize = "--normalize" in args
    width = int(get_arg(args, "--width", "1080"))
    height = int(get_arg(args, "--height", "1920"))
    fps = int(get_arg(args, "--fps", "30"))
    want_frame0 = "--extract-frame0" in args
    want_lastframe = "--extract-lastframe" in args
    dry = "--dry-run" in args

    facts = ffprobe_facts(src)
    print(f"source: {rel(src)}")
    print(f"  {facts['width']}x{facts['height']} @{facts['fps']}fps  "
          f"{facts['codec']}  {facts['duration_s']}s")
    mismatch = normalize or facts["width"] != width or facts["height"] != height or \
        abs(facts["fps"] - fps) > 0.1
    if mismatch and not normalize:
        print(f"  NOTE: source doesn't match {width}x{height}@{fps} -- pass --normalize to "
              f"re-encode, or leave as-is if the composition handles it")

    print(f"-> {rel(out)}" + ("  [normalize to "
          f"{width}x{height}@{fps}]" if normalize else "  [copy as-is]"))
    if want_frame0:
        print(f"-> {rel(os.path.splitext(out)[0] + '-frame0.png')}")
    if want_lastframe:
        print(f"-> {rel(os.path.splitext(out)[0] + '-lastframe.png')}")
    if dry:
        print("[dry-run] no files written.")
        return

    os.makedirs(os.path.dirname(os.path.abspath(out)), exist_ok=True)
    if normalize:
        run([
            "ffmpeg", "-y", "-v", "error", "-i", src,
            "-vf", f"scale={width}:{height}:force_original_aspect_ratio=increase,"
                   f"crop={width}:{height},fps={fps}",
            "-c:v", "libx264", "-crf", "18", "-pix_fmt", "yuv420p",
            "-movflags", "+faststart", out,
        ])
    else:
        shutil.copy2(src, out)
    print(f"video -> {rel(out)}  ({os.path.getsize(out)//1024}KB)")

    out_facts = ffprobe_facts(out)
    base = os.path.splitext(out)[0]
    frame0_path = None
    lastframe_path = None
    if want_frame0:
        frame0_path = base + "-frame0.png"
        extract_frame(out, frame0_path, at_s=0)
        print(f"frame0 -> {rel(frame0_path)}")
    if want_lastframe:
        lastframe_path = base + "-lastframe.png"
        extract_frame(out, lastframe_path)
        print(f"lastframe -> {rel(lastframe_path)}")

    sidecar = base + ".json"
    with open(sidecar, "w", encoding="utf-8") as f:
        json.dump({
            "provider": "google-flow-manual",
            "model": "google-flow (Veo, UI-driven, no public API)",
            "payload": {"prompt": prompt, "notes": notes},
            "source_file": rel(src),
            "normalized": normalize,
            "measured": out_facts,
            "frame0": rel(frame0_path) if frame0_path else None,
            "lastframe": rel(lastframe_path) if lastframe_path else None,
            "credits_spent": credits,
            "created": time.strftime("%Y-%m-%dT%H:%M:%S"),
        }, f, indent=2, ensure_ascii=False)
        f.write("\n")
    print(f"meta  -> {rel(sidecar)}")


if __name__ == "__main__":
    main()
