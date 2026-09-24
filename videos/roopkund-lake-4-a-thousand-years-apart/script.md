# Roopkund Lake · Part 4/5 — "A Thousand Years Apart"

Continues directly from Part 3 (`videos/roopkund-lake-3-who-were-they/`), which ended on the
cliffhanger "that tidy answer was about to be tested by something no one saw coming." This part
delivers the DNA reveal both Parts 1–3 have been deliberately withholding. Same series shape:
1080×1920 @30fps, hybrid (`/make-video`): AI atmosphere/lab stills (Ken Burns) + one new TSX
diagram beat + one reused TSX diagram beat. Channel: @TheMidnightThrillers. Voice: ElevenLabs
"George" (`JBFqnCBsd6RMkjVDRZzb`, `eleven_v3`, calm/documentary tags — locked, reused verbatim
from Parts 1–3). Series kicker top-of-frame: "ROOPKUND LAKE · 4/5".

## Facts (verified before scripting, source: Harney et al. 2019, Nature Communications, full
text via PMC)

- **Ancient DNA study**: in 2019, a team led by Éadaoin Harney sequenced ancient DNA from 38 of
  the Roopkund skeletons. [Harney et al. 2019, full text —
  PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC6702210/)
- **Three genetically distinct groups**, not two body types as the 2004 report (Part 3)
  suggested:
  - **Roopkund_A — 23 individuals**: "ancestry that falls within the range of variation of
    present-day South Asians," though genetically heterogeneous, not one single endogamous
    population.
  - **Roopkund_B — 14 individuals**: "ancestry typical of the eastern Mediterranean," forming
    "a genetic clade only with individuals from present-day Crete."
  - **Roopkund_C — 1 individual**: Southeast Asian ancestry, modeled as "~82% Malay-related and
    ~18% Vietnamese-related."
- **Radiocarbon dating shows two separate death events roughly 1,000 years apart**:
  Roopkund_A individuals date to "the 7th–10th centuries CE"; Roopkund_B and the single
  Roopkund_C individual date to "the 17th–20th centuries CE." (Even within Roopkund_A, some
  individuals have non-overlapping date ranges, meaning they didn't all die in one single event
  either — a nuance this part doesn't need to spell out, since Part 2 already covers the ~850 CE
  storm as the leading account for that earlier group.)
- **The paper states the Mediterranean group's presence is an open, unexplained mystery**:
  "Whether they were participating in a pilgrimage, or were drawn to Roopkund Lake for other
  reasons, is a mystery." The paper's own suggested next step — archival research into reports
  of "large foreign traveling parties dying in the region" — has not, to this script's
  knowledge, been resolved. This unresolved question is this part's cliffhanger into Part 5, not
  an invented mystery.
- **What this part does NOT do**: it does not name or speculate about WHO the Roopkund_B
  travelers specifically were (no invented identity, nationality, or purpose beyond what the
  paper itself says is unknown) — the honest "nobody knows" is the point, paid off truthfully
  rather than resolved with a fabricated theory.

Sources: [Harney et al. 2019, full text —
PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC6702210/) · [Harney et al. 2019, Nature
Communications](https://www.nature.com/articles/s41467-019-11357-9)

**Editorial rule (all 5 parts, same as Parts 1–3 and Dyatlov Pass):** no AI-generated likeness
claimed as a real, documented person. This part goes further than Parts 1–3 needed to: rather
than depicting any generic figures standing in for the Roopkund_A/B/C groups (which would risk
implying a specific ethnic likeness for a real ancient population), every new image beat in this
part shows landscape/place/lab imagery only — no human figures at all. The recurring "wound"
close-up (reused, not new) remains the only beat with any human remains imagery, exactly as in
Parts 1–3.

## Beat sheet

| # | Beat | Engine | On screen | VO |
|---|------|--------|-----------|-----|
| 1 | hook | image | Frame 0 fully composed: a small bone fragment sealed in a clear lab sample vial on a dark tray, dramatic focused light, Himalayan peaks softly blurred through a window behind it. Series kicker "PART 4/5" top. | "For years, this was the accepted answer. Then in twenty nineteen, scientists tested it at last." |
| 2 | recap-test | image (reuse Part 3's beat-9 "leading-theory" still, different Ken Burns variant) | The same calm lakebed-at-dusk still from Part 3, pushed in differently. | "They went back to Roopkund with something no earlier report ever had — ancient D.N.A." |
| 3 | dna-lab | image | Clinical genetics lab close-up: gloved hands extracting material from a bone fragment into a sample tube, sterile lighting, no face. | "Genetic material, pulled from thirty eight of the skeletons themselves." |
| 4 | genetic-groups | tsx | New schematic diagram: three bars sized by group population (23 / 14 / 1), each labeled with its ancestry. | "The results split them into three separate genetic groups. Not one story — three." |
| 5 | group-a | image | Wide shot of a terraced Himalayan valley and village at dusk, warm lights, no visible people. | "Twenty three of them carried ancestry from across South Asia — exactly what everyone expected." |
| 6 | group-b | image | Wide shot of a whitewashed Aegean coastal village on a cliff at dusk, no visible people — visually distinct from every prior beat in the series. | "But fourteen more were something else entirely — ancestry closest to people living on Crete, in the Mediterranean." |
| 7 | group-c (reuse beat 6's still, different Ken Burns variant) | image | The same Aegean coastal still, pushed in differently. | "One more still, from Southeast Asia, traveling with them." |
| 8 | wound (reuse Part 1's beat-8 still) | image | The series' recurring fracture still, same motif reused again at this part's midpoint. | "Different continents. Different centuries, even. The exact same fatal wound." |
| 9 | second-storm | tsx (reuse Part 2's `RoopkundTrapDiagram`) | The same bowl-and-hail schematic from Part 2. | "Radiocarbon dating placed the two groups almost a thousand years apart — and the same lethal trap was waiting for both." |
| 10 | mystery-why | image | Calm, melancholy wide shot of the lakebed at blue dusk, mist low over the water, no people. | "Why a group from the Mediterranean died at this exact Himalayan lake, centuries later — the scientists who found this still can't say." |
| 11 | cliffhanger | tsx | Bold title card "PART 4 — A THOUSAND YEARS APART" over this episode's own hook still; text fades out before the beat ends so the tail matches frame 0 for the loop. | "Pilgrims. Travelers. Something else entirely. What were they doing there? Find out in Part 5." |

## Production notes

- Engine mix: `image` (Ken Burns, `tools/gen_image.py`, `fast` preset / Nano Banana 2 — ~$0.04
  each) for hook/lab/landscape/lakebed beats, `tsx` for the genetic-groups chart, the reused
  trap diagram, and the title-card beat — see `beats.json`'s `beats[].engine`.
- **5 new stills needed** (hook, dna-lab, group-a, group-b, mystery-why) ≈ **$0.20 total** at
  the `fast` preset — state this before generating, per repo convention. Beats 2 and 8 are
  reuses (Part 3's leading-theory still, Part 1's wound still); beat 7 reuses beat 6's own still
  with a different Ken Burns variant — no new generation cost for any of the three.
- New TSX component `RoopkundGeneticGroupsChart` (beat 4) added to `lib/roopkund.tsx` — three
  silhouette bars sized by population count (23/14/1) with ancestry labels, same dark/frost-blue
  visual language as `RoopkundTwoGroupsChart`, no figures with faces, so no editorial-rule risk.
  This is the ONE new component this part adds, per repo convention.
- Beat 9 reuses Part 2's existing `RoopkundTrapDiagram` component verbatim (no new TSX, no new
  generation cost) — a deliberate callback: the same lethal terrain explanation from Part 2
  applies again, centuries later, to a completely different group of people. The VO carries the
  "almost a thousand years apart" fact; the diagram itself is unchanged from Part 2.
- Beat 11's title card reuses THIS episode's own beat-1 hook still (not Parts 1–3's) — same
  pattern as every prior part's loop-closing beat.
- No engagement-CTA outro. The cliffhanger states the paper's own open question truthfully
  (see Facts above) rather than manufacturing a fake answer — VO ends on the payoff line, title
  card fades out before the loop point.
- Group-a/group-b beats deliberately show landscape/place imagery, not figures of any kind —
  a stricter reading of the series editorial rule than Parts 1–3 needed, since these beats
  dramatize whole ancestry groups rather than a single legendary/theorized figure, and any
  generic-figure depiction could read as implying a specific ethnic likeness for a real ancient
  population. Landscape imagery sidesteps that risk entirely while still visually contrasting
  "home" (Himalayan valley) against "half a world away" (Aegean coast).
- Next: Part 5 (the series finale, following up on the paper's own stated "mystery" of why the
  Mediterranean group was there) — not built this session (one episode per session, per repo
  convention).
