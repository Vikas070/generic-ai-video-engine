# Dyatlov Pass · Part 5/5 — "The Science"

Format: 1080×1920 @ 30fps, ~30s. Hybrid (`/make-video`): TSX debunk-list + a code-drawn
slope/avalanche diagram + one cinematic AI atmosphere clip (Google Flow, manual) for the
hook/loop. Voice: none yet — estimates below. Series kicker: "DYATLOV PASS · 5/5". Closes
the series — bookends visually with part 1's mountain shot.

## Facts (verified)

Decades of speculation (military tests, infrasound, and less credible claims) were never
substantiated. In 2021, Alexander Puzrin (ETH Zurich) and Johan Gaume (EPFL) published a
peer-reviewed mechanism in *Communications Earth & Environment*: cutting the tent into the
slope, combined with wind-loaded snow accumulating above it, could trigger a small, delayed
slab avalanche — enough force to cause the chest/skull trauma without leaving external
wounds, and without the large, obvious avalanche debris rescuers would have expected.
Follow-up expeditions (2019–2022) confirmed the slope is avalanche-prone and observed two
fresh slab avalanches nearby under similar conditions in January 2022.
Sources: [Nature/CEE 2021 study](https://www.nature.com/articles/s43247-020-00081-8) ·
[Nature/CEE 2022 follow-up](https://www.nature.com/articles/s43247-022-00393-x) ·
[National Geographic](https://www.nationalgeographic.com/premium/article/has-science-solved-history-greatest-adventure-mystery-dyatlov).

## Beat sheet

| Beat | Time (est.) | On screen | VO |
|------|------|-----------|-----|
| HOOK | 0.3–3.7s | Frame 0 fully composed: the mountain at dawn, calm, empty — same location as part 1's hook, different light. Kicker: "DYATLOV PASS · 5/5". | "For sixty years, people blamed the military. Or something stranger." |
| SETUP | 4.2–8.8s | TSX debunk list: "secret weapons test" / "infrasound" / "something not human" each crossed out in sequence. | "Secret weapons tests. Infrasound. Even something not human. None of it held up." |
| REVEAL | 9.3–17.5s | TSX code-drawn diagram: cross-section of the slope, the tent cut into it, a thin wind-loaded snow slab above — labeled, precise, no drama. | "In 2021, engineers at ETH Zurich modeled the slope — and found something investigators never considered: a delayed slab avalanche." |
| TWIST | 18.0–25.4s | Same diagram, animated: the slab releases, a small silent slide reaches the tent line — force arrows, not gore. | "Cutting the tent into the slope, plus wind-packed snow above it, could trigger a small, silent slide — enough force to break bone without leaving a mark." |
| PAYOFF / LOOP | 25.9–30s | Dissolve to the calm mountain still — same framing as part 1's hook, now at peace, dawn light. Series closes here. | "No conspiracy. Just a mountain, doing what mountains do — on the night nine people happened to be sleeping beneath it." |

## Production notes

- Engine mix: `tsx` for the debunk list and avalanche diagram — both precise, code-drawn,
  "computed not asserted" beats (same ethos as `short-11-map`'s Mercator distortion and
  `short-12-orbit`'s integrated trajectory). The hook/loop is the one exception: a
  cinematic Google Flow clip (consistent with parts 3-4's upgrade), also the loop target
  via its own extracted frame 0.
- The diagram is a NEW small niche component (not a reuse) — simple layered rectangles +
  an arrow, well within `vidtsx-2d-generator`'s 2D scope. No physics simulation needed;
  a clearly-labeled schematic is honest and sufficient here.
- Series bookend: this episode's hook and loop frame intentionally match part 1's hook
  composition (same camera framing, calm instead of ominous) — watching all 5 back to back
  closes the visual loop across the whole series, not just within one episode.
- No engagement-CTA outro anywhere in the series. Every part ends on its payoff line.
- Series-close signal, part 5 only: kicker reads "DYATLOV PASS · FINAL" instead of "5/5",
  and a small closing card ("Dyatlov Pass · 1959 – 2021") fades in ~0.5s after the payoff
  line finishes, over the calm mountain, holding until the loop. Marks the story as
  complete without any subscribe/watch-more language — duration extended 32.8s -> 34.6s
  to give the card room to land in silence.
