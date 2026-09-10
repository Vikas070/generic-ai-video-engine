---
name: make-ai-short
description: Build a GENERATIVE-pixels vertical short (1080×1920, ~35-40s) end-to-end for ANY genre or subject — a recurring locked character, product, or visual style animated by a video model (fal's model roster, or official Veo via the Gemini API, or a manually-ingested Google Flow export), composited in Remotion with word-synced captions, SFX audition, seamless frame-0==last-frame loop. Use when the user wants to "make an AI video short", "make an ai short", "make a blue-man video", or any short where the pixels come from a VIDEO MODEL — not TSX animation (that is make-short), not layered collage (that is make-vox), and not a MIX of engines in one video (that is make-video). Defers provider/model choice to ai-shorts/PROVIDERS.md (+ IDEAS.md for the blue-man build log), TSX crash rules to vidtsx-2d-generator, SFX taste to suggest-sfx + brand §7.
---

# make-ai-short — generative shorts, end to end

The pixels come from a video model; Remotion only composites clips + captions. Proven on
blue-man #1 "The Door" (philosophical VO — one example subject, not a constraint: this track
works identically for a comedy sketch, a product demo, a motivational reel, or any other genre
the request calls for). Sibling of `/make-short` (100% TSX) — same discipline, plus three gates
TSX never needed: **cost stated before generating**, **subject locked from character.json**,
**loop pinned via end-frame conditioning**.

Run everything from the repo root. Needs `ELEVENLABS_API_KEY` (voice) always, plus whichever
provider key the chosen model needs — `FAL_KEY` for fal models, `GEMINI_API_KEY` for official
Veo (`tools/gen_veo.py`) and for images (`tools/gen_image.py`). A manually-ingested Google Flow
export (`tools/ingest_flow_asset.py`) needs no key at all. See `ai-shorts/PROVIDERS.md` for the
full provider comparison and how to pick one.

## The three iron rules (provider-agnostic — apply to fal, official Veo, and Flow alike)

1. **NEVER generate a locked subject from text twice.** `ai-shorts/<name>/character.json` +
   its reference image is the locked reference (the schema generalizes past "character" — a
   product, mascot, or location works identically). Every still that needs it is
   `gen_image.py --ref <reference.png>`; every clip is image-to-video from a frame that already
   contains it, via whichever provider's start-frame/reference mechanism (`--ref` on
   `gen_clip.py`/`gen_veo.py`, or a Flow "ingredient" you drove by hand before exporting). If a
   reference sheet doesn't exist yet, making ONE (and getting the user's eye on it) is its own
   step before anything else.
2. **STATE THE COST BEFORE SPENDING IT.** Derived, not quoted, and re-verified this session —
   pricing moves. `tools/gen_clip.py`/`bakeoff_clip.py` (fal) and `tools/gen_veo.py` (official
   Veo) both print the derived cost before any API call. Full tables + the traps already found
   (Wan's resolution tiers, Veo-Lite-vs-Fast, fal-vs-official-Veo pricing) live in
   `ai-shorts/PROVIDERS.md`. On any provider with the knob, `generate_audio:false` — voice is
   ElevenLabs, sound is our SFX pipeline. (Flow has no per-call $ cost — it's credits/subscription;
   record spend with `ingest_flow_asset.py --credits N` if you track it.)
3. **Loop by CONSTRAINT, not luck.** The first shot's true frame 0 (extracted from the clip, not
   the prompt image) is the loop target. The final shot passes it as the provider's end-frame
   input — `end_image_url` (fal Seedance), `tail_image_url` (fal Kling), `--last-frame` (official
   Veo), or a frame you feed back into Flow's UI by hand — and the composition settles onto that
   exact still over the last ~10 frames (`LoopSettle` pattern in
   `remotion/src/shots/ai-1/Ai1Door.tsx`; the same pattern generalizes to any engine via
   `loopSettleScene()` in `remotion/src/lib/hybrid.tsx` for hybrid productions).

## Artifact contract

```
ai-shorts/<name>/
  script.md · beats.json      — same contract as /make-short (vo[] with real word times)
  character.json              — THE LOCKED REFERENCE (+ video_model block = the picked model)
  shots/NN-slug.png           — per-shot START frame (gen_image.py --ref character.png [--ref scene])
  shots/NN-slug.json          — gen_clip sidecar (model, payload, request id)
  shots/upload-urls.json      — fal storage urls (uploads are reusable across re-rolls)
  voice/ · sfx-plan.json · output/                                          [voice/output gitignored]
remotion/src/shots/ai-N/      — composition + vo.gen.ts
media/projects/<name>/        — THE clip copies for staticFile() (committed — pixels are
                                not reproducible; shots/*.mp4 working copies are gitignored)
```

## Order of operations (voice before pixels)

1. **Script** — script.md + beats.json. Hook composed at frame 0; thesis should WANT the loop
   (blue-man #1: "arrival is a myth" → ending = walking toward the same door). ~80-100 words,
   2.5-2.7 wps windows. **No engagement-CTA outro, ever** — end on the payoff, loop is the ending.
2. **Voice FIRST** — `python tools/gen_voice.py --beats ... --emit-ts remotion/src/shots/ai-N/vo.gen.ts`
   (George JBFqnCBsd6RMkjVDRZzb + eleven_v3 tags for narrators). Real word times decide the
   shot windows; Seedance takes integer 4-12s durations, so round shot lengths UP from windows.
3. **Start frames** — one per shot, `python tools/gen_image.py --model pro --aspect 9:16 --ref character.png`
   (+ the shot-1 scene still as a 2nd ref when a location/prop must match across shots).
   **QA every PNG before any video call** — this is where drift is cheap to fix.
   - Watch hands, clothing details, proportions — name them explicitly in the prompt on re-rolls.
   - **Geometry must be walkable** (the shot-6 lesson, cost 2 re-rolls): with an end-frame pin,
     the start frame must let the motion REACH the end state by walking forward — if the end
     frame's character is CLOSER to camera than the start's, the model spawns a clone instead.
     Start him larger/nearer than the end state so forward motion shrinks him into it.
4. **Clips** — state the total derived cost, then `python tools/gen_clip.py` per shot in parallel
   (`--set image_url=<fal storage url> --set 'duration="N"' --set resolution=1080p
   --set generate_audio=false`, final shot `--set end_image_url=<frame0 url>`). Upload refs
   once via `bakeoff_clip.upload_ref`; keep urls in shots/upload-urls.json.
   Prompt every clip with: exact character phrase + "EXACTLY ONE character in the scene for
   the entire shot" (clones are the #1 failure) + camera move + "no morphing" + style line.
5. **Clip QA, frame by frame** — start/mid/end strip per clip + a side-by-side of the final
   clip's last frame vs the loop target. Re-roll failures (state the re-roll cost); a 5s
   1080p re-roll is ~$0.29 — cheap next to shipping a clone.
6. **Composition** — Sequences of `OffthreadVideo` over ONE timeline, ~8-frame crossfade
   underlaps (clips are ~1s longer than their windows — that's the slack), `Captions` +
   `ProgressBar` at root, `LoopSettle` dissolve at the tail. Copy final clips to
   `media/projects/<name>/`. `npm run gen`, frames.mjs at boundaries + heroes, READ every PNG,
   then render-all --scale=1 and mux voice.wav.
7. **SFX** — /suggest-sfx flow. **Gappy-VO calibration (blue-man #1):** cues in VO gaps get no
   masking and no duck — they need **~7-8 dB LESS** than the dense-narration table (gap
   whooshes -9..-13, not -3..-5). Verify with volumedetect RMS against a speech-mean
   reference; hero layer may kiss voice level once. Audition mix awaits **the user's ear**
   (hard gate).
8. **Save back** — catalog used_in, beats.json real timings (gen_voice writes them), sidecars
   committed, cost ledger in the final report.

## Done =

character consistent in every frame of every clip (frame-by-frame QA'd) · loop verified
(last frame vs frame 0 side-by-side) · captions on real word times · costs stated before each
spend and totalled after · SFX audition rendered, awaiting the user's ear · no CTA outro.
