# Dyatlov Pass — a 5-part series

Vertical, 1080×1920 @30fps, ~30s per episode. Hybrid (`/make-video`): a real computed map
+ code-drawn stat/document cards for facts, AI atmosphere stills (Ken Burns) for mood — no
AI-generated faces or likenesses of the real named victims, anywhere in the series. Voice:
ElevenLabs George (`JBFqnCBsd6RMkjVDRZzb`), `eleven_v3`, calm/documentary delivery tags,
consistent across all 5 parts. Series kicker top-of-frame: "DYATLOV PASS · N/5".

| # | Folder | Title | Beat | Engine mix |
|---|---|---|---|---|
| 1 | `dyatlov-pass-1-expedition/` | The Expedition | who they were, why, camp made on "Dead Mountain" | image + tsx (real map) |
| 2 | `dyatlov-pass-2-the-tent/` | The Tent | the night the tent was cut open, the flight into the storm | image + tsx |
| 3 | `dyatlov-pass-3-the-search/` | The Search | Feb 26 discovery, footprints, the cedar tree, first 5 bodies | ai-video (Flow, cinematic) + tsx |
| 4 | `dyatlov-pass-4-the-ravine/` | The Ravine | the last 4 bodies, the unexplained trauma, case closed | almost entirely tsx |
| 5 | `dyatlov-pass-5-the-science/` | The Science | debunked folklore, the 2021 slab-avalanche study, resolution | entirely tsx |

Each episode is a standalone Short (its own hook/payoff/loop) but reads as one arc:
episode transitions are written as visual match-cuts (part 1 ends on the tent, part 2
opens on the tent's fabric close-up), and part 5's hook/loop deliberately bookends part
1's hook composition — the mountain, calm instead of ominous.

**Facts verified against**: [Wikipedia](https://en.wikipedia.org/wiki/Dyatlov_Pass_incident) ·
[Nature/Communications Earth & Environment, 2021](https://www.nature.com/articles/s43247-020-00081-8) ·
[Nature/CEE, 2022 follow-up](https://www.nature.com/articles/s43247-022-00393-x) ·
[National Geographic](https://www.nationalgeographic.com/premium/article/has-science-solved-history-greatest-adventure-mystery-dyatlov) ·
[Futurity](https://www.futurity.org/dyatlov-pass-incident-avalanche-2510132-2/).

## Status

- [x] Script + beats.json written for all 5 parts — real VO timings (each part retimed at
      least once after gen_voice.py flagged overflow at max atempo).
- [x] TSX components built (`RealUralMap`, `SlopeDiagram`/`SlopeDiagramRelease`, `DebunkList`,
      `ConditionsStatCards`, `SearchFindingsList`, `NoExternalWoundsCard`, `ClassifiedStampCard`,
      etc.) — except part 2's twist beat, still a `PlaceholderAtmosphere` pending a regenerated
      Flow still (the original showed an inaccurate crowd of torch-lit figures, rejected).
- [x] Atmosphere stills/clips generated per `beats[].prompt` — parts 1-2 via Google Flow
      manual (stills, Ken-Burns); parts 3-5 upgraded to cinematic Google Flow motion clips.
- [x] Voice generated per episode (`gen_voice.py`), captions retimed from real word times —
      all 5 parts.
- [x] Frame-by-frame QA per episode, every scene boundary.
- [x] SFX pass (`/suggest-sfx`) — done for parts 3 (14 cues), 4 (12 cues), 5 (11 cues);
      parts 1-2 not yet scored.
- [ ] Rendered + muxed, all 5 parts — parts 3-5 fully done (render + voice + SFX mixed).
      Parts 1-2 are rendered + voiced but not yet SFX-mixed, and part 2 still has its one
      outstanding placeholder beat.
