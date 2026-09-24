# Dyatlov Pass · Part 3/5 — "The Search"

Format: 1080×1920 @ 30fps, ~32s. Hybrid (`/make-video`): TSX list/stat cards + cinematic AI
atmosphere clips (Google Flow, manual). Voice: none yet — estimates below. Series kicker:
"DYATLOV PASS · 3/5".

## Facts (verified)

Feb 26, 1959: a search party found the abandoned tent, boots/coats/food left inside.
Footprints led downhill toward a lone cedar tree. There, searchers found two bodies in
only their underwear; three more (including Dyatlov) were found between the tree and the
tent — all had died of hypothermia. That left four hikers still missing.
Sources: [Wikipedia](https://en.wikipedia.org/wiki/Dyatlov_Pass_incident) ·
[Futurity](https://www.futurity.org/dyatlov-pass-incident-avalanche-2510132-2/).

Editorial rule, refined for the cinematic pass: generic, unidentifiable human figures
(distant, backs turned, no visible faces) are OK for realism in the reveal/twist clips —
but never a specific likeness of the real named victims. The hook stays people-free; its
VO point is that the tent is empty.

## Beat sheet

| Beat | Time (est.) | On screen | VO |
|------|------|-----------|-----|
| HOOK | 0.3–2.8s | Frame 0 fully composed: the tent at dawn, snow-drifted, clearly abandoned, no people. Kicker: "DYATLOV PASS · 3/5". | "Three weeks later, searchers found the tent. Empty." |
| SETUP | 3.3–8.9s | TSX list card: "Feb 26" / "boots — left" / "coats — left" / "food — left" items popping in. | "February 26th. Inside: their boots. Their coats. Their food. Everything they needed to survive — left behind." |
| REVEAL | 9.4–15.0s | AI clip: camera glides low over footprints in snow leading toward a lone cedar tree on the horizon; 2-3 distant, unidentifiable search-party figures walk ahead. | "Footprints in the snow led away from camp, down the slope, toward a lone cedar tree." |
| TWIST | 15.5–22.9s | AI clip: slow tilt up the cedar tree's trunk to the broken branches; one distant, unidentifiable searcher stands at its base looking up. Archival/documentary treatment. | "Near the tree, branches were broken high above the ground — as if someone had climbed to look back toward the tent." |
| PAYOFF | 23.4–29.6s | TSX stat card: "2 found near the tree" → "3 more between tree and tent" → "4 still missing" (numbers count in). | "There, searchers found two bodies in just their underwear. Three more were found between the tree and the tent. Four hikers were still out there." |
| LOOP | 29.6–32s | Dissolve back onto the HOOK's exact still (the abandoned tent at dawn). | (silence) |

## Production notes

- Engine mix: `tsx` for the two list/stat-card beats, `ai-video` (Google Flow, manual —
  see `ai-shorts/PROVIDERS.md`) for the tent/footprints/cedar atmosphere beats — upgraded
  from Ken-Burns stills to short motion clips for a more cinematic feel. The hook clip is
  also the loop target: loop-settle dissolves onto that clip's own extracted frame 0, not
  a separately generated still.
- The cedar tree's broken branches are a real, widely documented forensic detail — stated
  plainly, not sensationalized.
- No engagement-CTA. Next: `dyatlov-pass-4-the-ravine` — the last four bodies, and the
  injuries that made this famous.
