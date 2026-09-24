# CLAUDE.md — claude-faceless-shorts-creator

A **video production factory** driven by Claude Code, for ANY genre — educational, storytelling,
documentary, comedy, explainer, product, motivational, cinematic, character-driven, or anything
else. Four production tracks, one repo — the right skill is picked automatically from the
request:

| The user asks for… | Skill | Pixels come from | Projects live in |
|---|---|---|---|
| "make a short about X" (default, single-engine TSX) | `/make-short` | 100% TSX (Remotion animation) | `shorts/short-N-<niche>/` |
| "make an AI video short", "blue-man video" (single-engine AI-video) | `/make-ai-short` | a video model — fal, official Veo (Gemini API), or a manually-ingested Google Flow export | `ai-shorts/<series>/` |
| "vox style / documentary / explainer short" (single-engine collage) | `/make-vox` | layered paper-collage (AI images + cutouts) | `vox-shorts/vox-N-<topic>/` |
| anything genre-first, or that MIXES engines in one video | `/make-video` | whichever engine(s) each beat needs, composited via `lib/hybrid.tsx` | `videos/<name>/` |

All four share the same backbone: a `beats.json` contract, ElevenLabs voice with word-exact
captions (`gen_voice.py`), frame-by-frame QA at phone scale, library-first SFX (`/suggest-sfx`),
optional music bed, seamless frame-0==last-frame loops, no CTA outros. TSX crash rules live in
`/vidtsx-2d-generator`. AI-video provider mechanics (fal / official Veo / Flow) and how to add a
new one live in `ai-shorts/PROVIDERS.md`.

## Layout

```
tools/            Python tools: gen_voice, gen_sfx, gen_music, mix_sfx, mix_music, gen_chords,
                  gen_image, gen_clip (fal), gen_veo (official Veo/Gemini API),
                  ingest_flow_asset (manual Google Flow), bakeoff_clip, cutout, capture_web
remotion/         the Remotion project — src/lib/ (shared + niche kits incl. collage.tsx,
                  hybrid.tsx for multi-engine compositions), src/shots/{short-N, ai-N, vox-N,
                  video-N, hybrid-demo}/
media/            Remotion's public root: library/ (reusable: sfx, music, logos)
                  + projects/<proj>/ (media for ONE video — incl. committed AI clips & layers)
shorts/           TSX shorts: script.md, beats.json, sfx-plan.json each
ai-shorts/        generative shorts: + character.json (LOCKED reference — any subject, not just
                  a character), shot sidecars, PROVIDERS.md (provider contract), IDEAS.md
vox-shorts/       collage shorts: + DESIGN.md (the visual language — read before any vox work)
videos/           hybrid/genre-first productions that mix engines — see /make-video
brand.md          the style contract every skill reads (palette, motion, safe areas, SFX taste)
IDEAS.md          the TSX-shorts idea bank + niche ranking
.claude/skills/   make-short, make-ai-short, make-vox, make-video, vidtsx-2d-generator, suggest-sfx
```

## Conventions (hard rules)

- **Run everything from the repo root.** Tools resolve engine paths (media/library, catalogs)
  against their own location, but project paths (`shorts/...`) against the CWD.
- **Python:** any Python 3.10+ — the core pipeline is stdlib-only. Only vox layer production
  needs extras: `pip install pillow rembg` (cutout.py) and `pip install playwright &&
  playwright install chromium` (capture_web.py). `ffmpeg`/`ffprobe` and `node`/`npx` on PATH.
- **API keys** live in `.env` at the repo root (copy `.env.example`). Never commit `.env`.
  ELEVENLABS_API_KEY = voice/SFX/music · FAL_KEY = fal AI clips + images · GEMINI_API_KEY =
  images (`gen_image.py`) AND official Veo clips (`gen_veo.py`, same key). Manually-ingested
  Google Flow assets (`ingest_flow_asset.py`) need no key — see `ai-shorts/PROVIDERS.md`.
- **Registry is generated:** after adding/renaming a shot, `cd remotion && npm run gen`
  (frames.mjs/render-all.mjs do NOT run it themselves).
- **Media rules:** `media/library/` is for CROSS-VIDEO reusable assets only (each with a
  catalog). Anything generated FOR ONE video (story frames, AI clips, collage layers) goes in
  `media/projects/<proj>/`, referenced as `staticFile('projects/<proj>/x')`. Reuse before you
  generate — check the catalogs first.
- **Committed vs gitignored media:** AI-generated clips and collage layers in
  `media/projects/` ARE committed (paid, non-reproducible pixels). `*/voice/` and `*/output/`
  are gitignored everywhere (regenerable); `ai-shorts/*/shots/*.mp4` working copies too — the
  canonical clip lives in `media/projects/<name>/`.
- **Costs (any AI-video beat, any provider):** state the derived generation cost BEFORE spending
  it, and never regenerate a locked subject from text (see /make-ai-short's iron rules, which
  apply unchanged to every provider in `ai-shorts/PROVIDERS.md`).
- **QA is not optional:** render frames at phone scale and READ them before any full render —
  for a hybrid composition (`/make-video`), QA every engine boundary, not just one.
- **Session hygiene:** one Claude Code session per episode/video, ending at that track's own
  "Done" checklist — don't carry the next episode into the same conversation. Before ending,
  write/update that project's memory (locked voice ID, series conventions, known bugs+fixes)
  so a new session never has to replay old conversation to recover them.
- **QA at scale:** checking more than ~3 frames? Tile them into one ffmpeg contact sheet
  and read that single image instead of each frame separately — `ffmpeg -i f1.png -i f2.png
  ... -filter_complex "xstack=inputs=N:grid=WxH" contact-sheet.png` (use `xstack`, not
  `tile` — `tile` wants one multi-frame input stream, not N discrete `-i` files; `xstack`
  takes them directly). Delegate mechanical verify-and-report passes (frame QA,
  RMS/audibility checks, retiming convergence) to a subagent that returns a short summary;
  keep creative decisions and spend approval inline with the user.
