# Roopkund Lake · Part 1/5 — "The Lake of Bones"

A standalone 5-part series — same shape as Dyatlov Pass, not an episode of any umbrella show.

Format: 1080×1920 @30fps, ~52s. Hybrid (`/make-video`): AI atmosphere stills (Ken Burns) +
TSX for the map/title beats. Channel: @TheMidnightThrillers. Voice: ElevenLabs "George"
(`JBFqnCBsd6RMkjVDRZzb`, `eleven_v3`, calm/documentary tags — same locked voice as the
Dyatlov Pass series, reused here for host-identity continuity between series). Series kicker
top-of-frame: "ROOPKUND LAKE · 1/5".

## Facts (verified before scripting)

- **Discovery, 1942**: Hari Kishan (H.K.) Madhwal, a forest range officer patrolling what is
  now Nanda Devi National Park, found the remains. He was an **Indian forest ranger working
  under British colonial administration** — not a British national. The source script's "a
  British forest ranger" is corrected to "a colonial-era forest ranger" in the VO below to
  avoid misattributing his nationality.
- **Skeleton count**: published estimates range ~200–600 individuals at the low-to-mid end,
  with some sources citing as many as 800. The script's "as many as 800 people" is phrased
  as an upper bound, which is accurate — but it's the high end of a real range, not a
  settled number. Kept as-is (the "as many as" framing already carries the caveat); flagging
  here so later parts don't accidentally state 800 as a flat fact.
- **The wound**: skulls show short, deep, round fractures on the crown, consistent with a
  blunt round object striking from directly above (cricket-ball-sized) — confirmed by
  forensic literature. Matches beats 8–9 exactly.
- **Oxford radiocarbon dating (~850 CE)** and the **2019 Harney et al. ancient-DNA study**
  (Nature Communications — 38 skeletons, three genetically distinct groups, two death events
  ~1,000 years apart) both carry into Parts 2 and 4 — verified now so the series stays
  consistent.
- **Coordinates**: 30.2622°N, 79.7317°E, Chamoli district, Uttarakhand, India, ~5,020–5,029m,
  between Trisul and Nanda Ghunti peaks — used for the real computed map pin in beat 7.

Sources: [Wikipedia](https://en.wikipedia.org/wiki/Roopkund) ·
[Harney et al. 2019, Nature Communications](https://www.nature.com/articles/s41467-019-11357-9) ·
[National Geographic](https://www.nationalgeographic.com/premium/article/dna-study-deepens-mystery-lake-skeletons-roopkund)

**Editorial rule (all 5 parts, same as Dyatlov Pass):** no AI-generated likeness/face claimed
as a real named person — H.K. Madhwal in beat 3 is shown generically (back turned / face not
visible), never presented as a documented portrait. Skeletal/forensic imagery stays clinical,
not gratuitous.

## Beat sheet

| # | Beat | Engine | On screen | VO |
|---|------|--------|-----------|-----|
| 1 | hook | image | Frame 0 fully composed: aerial drone shot over Himalayan peaks toward the turquoise lake, golden-hour mist. Series kicker "PART 1/5" top. | "5,029 meters up in the Himalayas... hundreds of human skeletons are frozen in time." |
| 2 | no-names | image | Extreme close-up, bleached skull half-submerged in icy water. | "No names. No graves. No record of who they were." |
| 3 | discovery | image | 1940s forest ranger, back turned / face obscured, discovering bones in melting snow. | "In 1942, a colonial-era forest ranger stumbled onto the horror first." |
| 4 | false-lead | image | Wide drone shot, skeletal remains scattered across the rocky lakebed. | "At first, he thought it was a Japanese army unit lost in the war." |
| 5 | preserved | image | Close-up of preserved flesh/hair still on bone in ice. | "But when the ice melted that summer, he found something stranger — flesh, hair, even skin, still preserved." |
| 6 | scale | image | Wide aerial revealing the lakebed's true scale. | "This wasn't ten bodies. It wasn't fifty. As many as 800 people lie here." |
| 7 | map | tsx | Real computed map: India → Uttarakhand Himalayas, pin settles on Roopkund's real coordinates. | "Roopkund sits on a route to nowhere — no village, no road, no reason for a crowd this size to be here." |
| 8 | wound | image | Forensic close-up: circular skull fracture (series-wide recurring motif). | "And every single skull bears the exact same wound." |
| 9 | struck | image (reuse beat 8 still, tighter Ken Burns push-in) | Extreme push-in on the same fracture. | "Short. Deep. Round. Struck from directly above." |
| 10 | cliffhanger | tsx | Bold title card "PART 1 — WHAT KILLED THEM?" over the hook's lake still; text fades out before the beat ends so the tail matches frame 0 for the loop. | "Something rained down on these people from the sky itself. What was it? Find out in Part 2." |

## Production notes

- Engine mix: `image` (Ken Burns, `tools/gen_image.py`) for atmosphere/forensic beats, `tsx`
  for the map + title-card beats — see `beats.json`'s `beats[].engine`.
- Beat 9 reuses beat 8's generated still (no second generation) — this is also the series'
  visual-thread motif per the source script's production notes, to be reused at each future
  part's midpoint.
- Map beat reuses `lib/map.tsx`'s real Mercator projection (same discipline as Dyatlov's
  `UralMapZoom`) — the pin is a COMPUTED real coordinate, not an illustrated guess.
- **India map boundary caveat (applies to every future part with a map beat):** the `India`
  polygon in `lib/geo/world.ts` (Natural Earth 110m) draws the Jammu & Kashmir border along
  the Line of Control, not India's officially mandated claim line (which must show all of
  J&K, including Pakistan-administered Kashmir and Gilgit-Baltistan, as Indian territory) —
  a real, documented source of bans/backlash for "incorrect" India maps. `RoopkundMapZoom`
  (`lib/roopkund.tsx`) fixes this by capping the visible latitude at 33°N throughout its
  entire zoom animation, so the disputed region is simply never rendered — not by editing the
  disputed boundary data itself. Any future beat that frames India more widely than this must
  keep the same cap (or crop the region out some other way).
- No engagement-CTA outro. "Find out in Part 2" is the series' own cliffhanger structure
  (stated in the source doc), not a subscribe/like ask — VO still ends on the payoff line,
  and the title card's own fade-out re-settles on the hook's still so frame 0 ≈ last frame
  for the loop.
- Next: `roopkund-lake-2-the-tent`-equivalent (Part 2, "The Storm That Killed Them") — not
  built this session (one episode per session, per repo convention).
