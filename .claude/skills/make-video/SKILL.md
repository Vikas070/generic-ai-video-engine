---
name: make-video
description: Generic, genre-agnostic video production router — build ANY short-form video (educational, storytelling, documentary, comedy, explainer, product, motivational, cinematic, social, character-driven, infographic/animated, or anything else) by picking the right visual engine(s) per beat and, when AI-video is involved, the right provider (fal, official Veo via Gemini API, or manually-ingested Google Flow assets). Use when the user describes a video WITHOUT it obviously being one of the three specific tracks — "make a video about X", "make a documentary short", "make a product demo video", "make a comedy sketch", "make a hybrid video that mixes real AI footage with animated charts", or when they explicitly want to mix engines/providers within one video. If the request is unambiguously one existing track (a TSX-diagram niche short -> make-short; a single recurring AI character in one visual style -> make-ai-short; a Vox-style paper collage -> make-vox), route straight there instead — this skill exists for everything else, and for hybrids none of the three cover alone. Defers TSX crash rules to vidtsx-2d-generator, AI-video provider mechanics to ai-shorts/PROVIDERS.md, hybrid compositing to remotion/src/lib/hybrid.tsx, and SFX taste to suggest-sfx + brand.md.
---

# make-video — genre-agnostic, provider-agnostic, hybrid-capable

The three existing skills (`make-short`, `make-ai-short`, `make-vox`) each encode real,
hard-won craft for ONE visual engine. None of that craft is genre-specific — `make-short`'s
"chess/math/dev-tips" framing is IDEAS.md's example niches, not a constraint the engine
enforces; `make-ai-short`'s "philosophical VO" framing is blue-man's example, not a rule. What
IS a real gap: **no single video can mix engines**, and **AI-video only had one provider**
(fal). This skill closes both gaps, and stays the default entry point for anything that isn't
obviously a single-engine request.

Genre is a `script.md` framing decision, made once, in Stage 1. It never determines engine
choice — a documentary can be 100% TSX (charts + maps), a comedy sketch can be 100% AI-video,
a product video can be a TSX UI mockup + one AI-video hero shot. Pick engines by what each BEAT
needs to show, using the same test `IDEAS.md` already uses for TSX ("if I drew this on a
whiteboard, would the drawing alone carry it?") extended across all three engines:

| The beat needs to show... | Engine | Why |
|---|---|---|
| a diagram, chart, board, UI, or any drawable mechanism | **TSX** (`make-short`'s craft, `vidtsx-2d-generator`'s rules) | code renders a cleaner, more precise, infinitely-editable version than any other source |
| a recurring character, real-world texture, photographic motion, cinematic b-roll | **AI-video** (`make-ai-short`'s craft: character lock, cost-before-spend, loop-by-constraint) | that's what video models are for; TSX can't fake photographic/organic motion convincingly |
| documentary/archival/editorial texture — maps, old photos, paper collage | **Collage** (`make-vox`'s craft) | the layered-paper visual language IS the content for this register |
| a still with atmosphere, a storybook page, a product photo | **Image + Ken Burns** (`lib/story.tsx`) | cheapest engine that still reads as "produced," when full motion isn't needed |

A video can use ONE engine throughout (then just follow that track's skill directly) or MIX
them beat-by-beat (this skill's actual job).

## Stage 0 — decide the shape

Before writing anything, answer three questions (ask the user if genuinely unclear, otherwise
make the reasonable call from the request):

1. **Genre/register** — informs tone, pacing, VO style, brand density. Doesn't touch engine
   choice.
2. **Single-engine or hybrid?** If every beat wants the same engine, this IS one of the three
   existing tracks — go build it there (`shorts/`, `ai-shorts/`, `vox-shorts/`) and stop reading
   this skill. If beats genuinely need different engines, continue.
3. **For any AI-video beat: which provider?** Read `ai-shorts/PROVIDERS.md`'s "choosing a
   provider" section. State the derived cost before generating anything — this rule is
   non-negotiable and carries over from `make-ai-short` unchanged.

## Artifact contract (hybrid productions)

```
videos/<name>/
  script.md        — genre, hook, per-beat notes: WHAT the beat shows + WHICH engine
  beats.json        — machine contract (schema below): vo[] + beats[] where each beat
                      names its engine and (for ai-video) its provider
  character.json / reference.json  — if any beat needs a locked recurring subject,
                      same schema ai-shorts/ already uses (see below)
  shots/            — per-ai-video-beat sidecars + start/end frames (gen_veo.py /
                      gen_clip.py / ingest_flow_asset.py output lands here)
  voice/ · sfx-plan.json · output/                                    [voice/output gitignored]
remotion/src/shots/video-N/
  VideoN<Name>.tsx  — ONE composition: a SceneTrack (lib/hybrid.tsx) mapping beats[] to
                      videoScene / tsxScene / imageScene / loopSettleScene renderers
media/projects/<name>/  — committed AI-video clips + stills for this video (same rule as
                      every other track: paid/non-reproducible pixels are committed)
```

### beats.json — the engine field

Same shape as `make-short`'s `beats.json` (format, `vo[]` with real word times once voice
exists), plus each beat in `beats[]` names its engine and, for AI-video, its provider:

```jsonc
{
  "beats": [
    { "id": "hook", "engine": "ai-video", "provider": "veo-gemini",
      "start_s": 0, "end_s": 3.5,
      "clip": "shots/01-hook.mp4", "cost_usd": 0.42 },
    { "id": "explain", "engine": "tsx", "start_s": 3.5, "end_s": 14,
      "component": "ExplainChart" },
    { "id": "archival", "engine": "collage", "start_s": 14, "end_s": 20,
      "layers": ["media/projects/<name>/layers/photo-1.png"] },
    { "id": "payoff", "engine": "image", "start_s": 20, "end_s": 26,
      "still": "shots/09-payoff.png", "variant": 2 }
  ]
}
```

`engine` drives which scene renderer the composition uses (`videoScene` / `tsxScene` /
`imageScene`) and which sub-skill's craft applies to producing that beat's asset
(`make-ai-short`'s rules for `ai-video`, `vidtsx-2d-generator`'s rules for `tsx`, `make-vox`'s
rules for `collage`). `provider` on an `ai-video` beat is one of `fal:<model-key>` /
`veo-gemini` / `google-flow-manual` — see `ai-shorts/PROVIDERS.md`.

## Stage 1 — script + beat plan

Write `script.md`: hook, beat sheet, and for EACH beat name what it shows AND which engine
(the table above). Same universal grammar as every other track (`IDEAS.md`): HOOK (frame 0
fully composed) → SETUP → optional QUIZ/tension beat → REVEAL → TWIST → LOOP. No
engagement-CTA outros, ever — end on the payoff, let the loop close it (locked repo-wide rule).
Facts verified before scripting.

## Stage 2 — produce each beat's asset, per its own engine's rules

- **`tsx` beats** — write the `.tsx` under `remotion/src/shots/video-N/parts/` (or reuse an
  existing niche lib) following `vidtsx-2d-generator`'s hard rules (frame-based only, monotonic
  `interpolate` ranges, `Easing.bezier`). It does NOT need its own `compositionConfig` /
  registry entry — it's a plain component `tsxScene()` wraps, not a standalone shot.
- **`ai-video` beats** — follow `make-ai-short`'s three iron rules unchanged: never re-generate
  a locked character from text twice, state the cost before spending it, pin the loop by
  end-frame constraint rather than luck. Pick the tool per the chosen provider:
  `tools/gen_clip.py` (fal) · `tools/gen_veo.py` (official Veo) · `tools/ingest_flow_asset.py`
  (manual Flow export). All three write the same `mp4 + sidecar.json` contract — see
  `ai-shorts/PROVIDERS.md`.
- **`collage` beats** — follow `make-vox`'s layer-production + `CollageBoard` choreography;
  `vox-shorts/DESIGN.md` is the visual-language spec.
- **`image` beats** — `tools/gen_image.py` (or reuse a committed still), then `imageScene()`
  ken-burns it.
- **Locked recurring subject across beats** (a character, a product, a consistent visual
  style)? One `character.json`-shaped file (see `ai-shorts/blue-man/character.json` for the
  schema — it already generalizes past "character": name/role/locked image/generation
  prompt/palette/video-model block work identically for a product, mascot, or location). Every
  `ai-video` beat that needs it passes that image as its start-frame/reference — never
  re-derived from text.

## Stage 3 — hybrid composition

One `.tsx` under `remotion/src/shots/video-N/`, using `remotion/src/lib/hybrid.tsx`:

```tsx
import { SceneTrack, videoScene, tsxScene, imageScene, loopSettleScene } from '../../lib/hybrid';

const SCENES = [
  { key: 'hook', start: 0, end: 105, render: videoScene('projects/<name>/01-hook.mp4') },
  { key: 'explain', start: 105, end: 420, render: tsxScene(ExplainChart) },
  { key: 'payoff', start: 420, end: 600, fadeIn: 0, render: loopSettleScene('projects/<name>/loop-still.png') },
];

<SceneTrack scenes={SCENES} />
<Captions lines={VO} .../>
<ProgressBar />
```

`start`/`end` are GLOBAL frames (same clock as `beats.json`'s `start_s * fps`). `SceneTrack`
handles the crossfade-tail bookkeeping — see `HybridDemo.tsx` (`remotion/src/shots/hybrid-demo/`)
for a rendered, QA'd reference mixing all four scene types on one timeline. `npm run gen` picks
up the new file automatically.

## Stage 4 — QA, voice, SFX/music (unchanged backbone)

Identical to every other track — this is the point of keeping it shared:

```
cd remotion && npm run gen
node scripts/frames.mjs VideoNName <f0,beat-boundaries,last> --scale=0.5   # READ every PNG
node scripts/render-all.mjs VideoNName --scale=1
python tools/gen_voice.py --beats videos/<name>/beats.json --emit-ts remotion/src/shots/video-N/vo.gen.ts
```
Then the `/suggest-sfx` flow exactly as `make-short` Stage 5, and optional `mix_music.py`.

## Done =

script.md names each beat's engine · every ai-video beat's cost stated before spending and
totalled after · locked-subject beats never re-derived from text · loop pinned by constraint ·
composition QA'd frame-by-frame across EVERY engine boundary (not just within one) · voice +
captions + SFX audition rendered, awaiting the user's ear · no CTA outro.
