# Dyatlov Pass · Part 4/5 — "The Ravine"

Format: 1080×1920 @ 30fps, ~30s. Hybrid (`/make-video`): TSX stat/quote cards + one
cinematic AI atmosphere clip (Google Flow, manual). Voice: none yet — estimates below.
Series kicker: "DYATLOV PASS · 4/5".
This is the mystery's peak beat — the injuries that made the case famous.

## Facts (verified)

~Two months after the first discoveries, the final four hikers were found in a ravine
under deep snow. Two had severe chest fractures, one a fractured skull — injuries
investigators compared to a car crash, but with no external bruising or broken skin. The
Soviet investigation closed the case the same month (May 1959), citing only "a compelling
unknown force," and the files were sealed for decades.
Source: [Wikipedia](https://en.wikipedia.org/wiki/Dyatlov_Pass_incident).

**Tone check:** state the forensic facts plainly and once — do not dwell or embellish.
This episode ends on the mystery, not on shock; part 5 resolves it.

## Beat sheet

| Beat | Time (est.) | On screen | VO |
|------|------|-----------|-----|
| HOOK | 0.3–4.4s | Frame 0 fully composed: a snow-filled ravine, harsh flat light, no people. Kicker: "DYATLOV PASS · 4/5". | "Two months later, snow melted enough to reveal the last four." |
| SETUP | 4.9–9.5s | TSX stat card: "May 1959" / "a ravine" / "buried under snow". | "May 1959. In a ravine, searchers found the final four hikers — buried under thick snow." |
| REVEAL | 10.0–16.0s | TSX stat cards: "2 — severe chest fractures" / "1 — fractured skull" / "comparable to a car crash" (numbers land with weight, no gore). | "Two had severe chest fractures. One, a fractured skull. Injuries investigators compared to a car crash." |
| TWIST | 16.5–21.4s | TSX contrast card: "no bruising" crossed against "no broken skin" — a stark negative-space reveal. | "But there was no bruising. No broken skin. Nothing to explain the force that caused them." |
| PAYOFF | 21.9–28.9s | TSX "CLASSIFIED" stamp effect over a document-style card reading: "a compelling unknown force — case closed, May 1959". | "The Soviet investigation closed the case that same month, citing only... 'a compelling unknown force.' The files were sealed for decades." |
| LOOP | 28.9–30s | Dissolve back onto the HOOK's exact still (the ravine). | (silence) |

## Production notes

- Engine mix: almost entirely `tsx` this episode — the content is forensic/document facts,
  not scenery, so precise code-drawn cards carry it (reuses `Stamp` from `lib/shorts.tsx`
  for the "CLASSIFIED"-style beat). The hook is the one exception: a cinematic Google Flow
  clip (consistent with part 3's upgrade), also the loop target via its own extracted frame 0.
- No engagement-CTA. This episode deliberately ends UNRESOLVED — the mystery peak — with
  part 5 as the answer, not a cliffhanger gimmick.
- Next: `dyatlov-pass-5-the-science` — the 2021 peer-reviewed explanation.
