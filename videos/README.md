# videos/ — hybrid / genre-first productions

Projects here mix engines within one video (AI-video + TSX + collage + stills) or simply don't
fit neatly into `shorts/`, `ai-shorts/`, or `vox-shorts/`'s single-engine tracks. Built by the
`/make-video` skill (`.claude/skills/make-video/SKILL.md`) — read that first for the artifact
contract, the `beats.json` engine/provider schema, and how `remotion/src/lib/hybrid.tsx`
composites the result.

If every beat in your video wants the SAME engine, it belongs in one of the other three tracks
instead — go there directly, it has more specific craft for that one engine.

```
videos/<name>/
  script.md · beats.json      — beats[] name their engine (tsx|ai-video|collage|image) and,
                                 for ai-video, their provider (fal|veo-gemini|google-flow-manual)
  character.json               — optional: a locked recurring subject, if any beat needs one
  shots/ · voice/ · sfx-plan.json · output/
```
