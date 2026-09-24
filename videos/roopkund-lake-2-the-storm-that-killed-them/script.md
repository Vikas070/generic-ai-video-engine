# Roopkund Lake · Part 2/5 — "The Storm That Killed Them"

Continues directly from Part 1 (`videos/roopkund-lake-1-lake-of-bones/`), which ended on the
cliffhanger "what killed them?" This part answers it. Same series shape: 1080×1920 @30fps,
~58s. Hybrid (`/make-video`): AI atmosphere stills (Ken Burns) + TSX for the diagram/title
beats. Channel: @TheMidnightThrillers. Voice: ElevenLabs "George" (`JBFqnCBsd6RMkjVDRZzb`,
`eleven_v3`, calm/documentary tags — locked, reused verbatim from Part 1). Series kicker
top-of-frame: "ROOPKUND LAKE · 2/5".

## Facts (verified before scripting)

- **2004 National Geographic expedition & documentary**: "Riddles of the Dead: Skeleton Lake"
  (Riddles of the Dead series). A forensic team including Subhash Walimbe, a physical
  anthropologist from Deccan College, Pune, examined the skulls. [Wikipedia](https://en.wikipedia.org/wiki/Roopkund)
- **The wound pattern**: many skulls show short, deep, round fractures consistent with a
  blunt object roughly the size of a cricket ball, striking from directly above — and,
  critically, injuries are confined to the head and shoulders, with no wounds lower on the
  body. That pattern is what ruled out battle/weapons and pointed to something falling from
  the sky. (Matches Part 1 beats 8–9 exactly; no invented hailstone diameter — sources vary
  and Wikipedia doesn't confirm one, so the script stays with "cricket-ball sized," already
  established in Part 1, rather than quoting an unverified number.)
- **Oxford radiocarbon dating**: performed by the University of Oxford's Radiocarbon
  Accelerator Unit, placing the remains at approximately **850 CE** (±~30 years) — carried
  over from Part 1's script.md, now paid off here.
- **The local legend**: a folk tradition/song, collected by anthropologists studying the
  Nanda Devi Raj Jat pilgrimage, tells of Raja Jasdhaval, King of Kanauj, who traveled to the
  Nanda Devi shrine with his pregnant wife Rani Balampa and a large retinue including a dance
  troupe — behavior locals say offended the goddess Nanda Devi, who answered with a hailstorm
  "hard as iron." [Nanda Devi Raj Jat — Wikipedia](https://en.wikipedia.org/wiki/Nanda_Devi_Raj_Jat)
- **The Nanda Devi Raj Jat pilgrimage tradition** itself is dated to roughly the 9th century
  AD — the same era as the Oxford radiocarbon date. This alignment (legend's era ≈ dated
  bones) is the beat 9 payoff, not a coincidence invented for the script.
- **Geography**: Roopkund sits in a bowl-like depression at the base of the Trishul massif,
  flanked by the Junargali ridge to the north and Chandania Kot peak to the east — a
  natural amphitheater above the treeline with essentially no shelter. [Wikipedia](https://en.wikipedia.org/wiki/Roopkund)
- **Important caveat carried forward to Part 4** (do not resolve here): the 2019 Harney et
  al. ancient-DNA study later showed the skeletons belong to at least three genetically
  distinct groups who died in **at least two separate events roughly 1,000 years apart** —
  meaning the tidy "one storm killed everyone" story this part tells is the *leading
  historical theory*, not the full modern picture. This part states the storm theory as
  established science (which it is, for the ~850 CE group) and does NOT claim it explains
  every skeleton at the site — the cliffhanger deliberately pivots to "who were they"
  rather than overclaiming completeness.

Sources: [Wikipedia — Roopkund](https://en.wikipedia.org/wiki/Roopkund) ·
[Wikipedia — Nanda Devi Raj Jat](https://en.wikipedia.org/wiki/Nanda_Devi_Raj_Jat) ·
[Harney et al. 2019, Nature Communications](https://www.nature.com/articles/s41467-019-11357-9)

**Editorial rule (all 5 parts, same as Part 1 and Dyatlov Pass):** no AI-generated likeness
claimed as a real, documented person. This extends here to Raja Jasdhaval, Rani Balampa, and
the pilgrimage retinue in beats 2–4 — they are LEGEND, not a documented historical record with
any surviving portrait, so they are shown only as generic, distant, or back-turned figures,
never a claimed likeness. Subhash Walimbe (beat 5) is named in the VO but never depicted —
the forensic beat shows hands/instruments/specimen only, no face.

## Beat sheet

| # | Beat | Engine | On screen | VO |
|---|------|--------|-----------|-----|
| 1 | hook | image | Frame 0 fully composed: dark storm clouds boiling over the bowl-shaped Himalayan valley above the lake. Series kicker "PART 2/5" top. | "Every skull at Roopkund carries the same wound. Scientists finally found out why." |
| 2 | legend | image | Wide shot, a high Himalayan mountain pass, a distant pilgrim procession with banners (generic silhouettes, backs turned, no visible faces). | "Locals already had an answer — an old song about a king who broke a sacred rule." |
| 3 | offense | image | Closer on the procession: color, torches, a dance troupe implied by distant generic figures. | "Legend says Raja Jasdhaval brought music and dancing girls onto Nanda Devi's holy mountain." |
| 4 | wrath | image | Dramatic hailstorm breaking over the bowl-shaped valley, sky gone dark, indistinct fleeing figures far below (no faces). | "The song says the goddess answered with hail 'hard as iron.'" |
| 5 | forensic-match | image | Forensic close-up: gloved hands examining a skull fragment beside a cricket ball for scale, clinical lab lighting, no face shown. | "In 2004, forensic scientists matched the legend to the bones — blunt wounds, cricket-ball size." |
| 6 | trap | tsx | Schematic cross-section diagram: peaks ringing a bowl-shaped valley, hail falling straight down, no escape route highlighted. | "No trees, no shelter — just bare rock in a bowl with nowhere to run." |
| 7 | wound | image (reuse Part 1's beat-8 still, tighter push-in) | Extreme push-in on the same fracture still from Part 1 — the series' recurring visual-thread motif. | "Short. Deep. Round. The same wound, skull after skull after skull." |
| 8 | ruled-out | image | Wide shot, skeletal remains scattered across the rocky lakebed, calm aftermath. | "No sword marks. No arrow wounds. Nothing below the shoulders — only the sky reached them." |
| 9 | dating-match | image | Close-up, a bone fragment being handled for radiocarbon sampling, lab setting. | "Radiocarbon dating placed the bones at exactly the era the old song describes: 850 A.D." |
| 10 | cliffhanger | tsx | Bold title card "PART 2 — BUT WHO WERE THEY?" over this episode's own hook still (storm clouds); text fades out before the beat ends so the tail matches frame 0 for the loop. | "The storm explains how they died. It doesn't explain who these hundreds of strangers were. Find out in Part 3." |

## Production notes

- Engine mix: `image` (Ken Burns, `tools/gen_image.py`, `fast` preset / Nano Banana 2 — ~$0.04
  each, 7 new stills ≈ $0.28 total) for atmosphere/legend/forensic beats, `tsx` for the trap
  diagram + title-card beats — see `beats.json`'s `beats[].engine`.
- Beat 7 reuses Part 1's `08-wound.png` still (no second generation) — the series' visual-thread
  motif, carried forward per Part 1's own production notes ("to be reused at each future part's
  midpoint").
- Beat 10's title card reuses THIS episode's own beat-1 hook still (not Part 1's) — each part's
  loop settles on its own frame 0, same pattern as Part 1.
- New TSX component `RoopkundTrapDiagram` (beat 6) added to `lib/roopkund.tsx` — a schematic
  bowl/funnel diagram, not a map, so it doesn't need the India-boundary latitude cap (no map
  beat in this part).
- No engagement-CTA outro. "Find out in Part 3" is the series' own cliffhanger structure — VO
  ends on the payoff line, and the title card's fade-out re-settles on the hook's still so
  frame 0 ≈ last frame for the loop.
- Cliffhanger deliberately does NOT claim the storm explains every skeleton at the site (see
  the DNA caveat above) — it pivots to identity ("who were they") as the next mystery, setting
  up Part 3 without overclaiming or contradicting Part 4's later DNA reveal.
- Next: Part 3 (not built this session — one episode per session, per repo convention).
