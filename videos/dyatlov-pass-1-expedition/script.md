# Dyatlov Pass · Part 1/5 — "The Expedition"

Format: 1080×1920 @ 30fps, ~31s. Hybrid (`/make-video`): TSX map + AI atmosphere stills.
Voice: none yet — VO timings below are estimates (~2.7 words/sec); when generated, real
per-word timings retime the captions, nothing rebuilds. Series kicker: "DYATLOV PASS · 1/5".

## Facts (verified — see PROVIDERS.md-style sourcing below)

Jan 23, 1959: 10 hikers (Ural Polytechnic Institute) set out to ski across the northern
Urals, led by 23-year-old Igor Dyatlov. Yuri Yudin fell ill early and turned back — the
expedition's sole survivor. Feb 1, 1959: the remaining 9 pitched camp on the slope of
Kholat Syakhl, whose name in the local Mansi language translates to "Dead Mountain."
Sources: [Wikipedia](https://en.wikipedia.org/wiki/Dyatlov_Pass_incident).

**Editorial rule for this whole series (all 5 episodes):** no AI-generated faces or
likenesses depicting the actual named victims. Atmosphere only (mountain, snow, tent,
wind) — the human specifics carry through narration and a real computed map, not
fabricated "photos" of real dead people.

## Beat sheet

| Beat | Time (est.) | On screen | VO |
|------|------|-----------|-----|
| HOOK | 0.3–5.5s | Frame 0 fully composed: wide dusk shot, snow-covered mountain slope, a small tent barely visible in the far distance, no people. Slow Ken Burns push-in. Series kicker top: "DYATLOV PASS · 1/5". | "Nine people camped on a mountain with no name. None of them came home." |
| SETUP | 6.0–13.4s | TSX real map (reuse `lib/map.tsx` projection data): globe → Russia → the northern Ural Mountains, settling on a pin at Kholat Syakhl's real coordinates. | "January 1959. Ten students from the Ural Polytechnic Institute set out to ski across the northern Urals, led by Igor Dyatlov." |
| REVEAL | 14.0–20.7s | TSX stat card: "10 → 9" with one silhouette icon separating from the group, label "Yuri Yudin — turned back". | "One of them, Yuri Yudin, fell ill early and turned back. It's the only reason he's alive today." |
| TWIST / PAYOFF | 21.2–29.7s | AI still: the tent pitched on the open slope, blue-hour light, wide and small in frame — dwarfed by the mountain. Ken Burns slow zoom. | "On February 1st, the remaining nine pitched their tent on the slope of Kholat Syakhl — Dead Mountain, in the local Mansi language." |
| LOOP | 29.7–31s | Dissolve back onto the HOOK's exact still (the wide mountain shot) — last frame ≈ frame 0. | (silence — let the mountain sit) |

## Production notes

- Engine mix: `image` (Ken Burns) for atmosphere beats, `tsx` for the map + stat beats —
  see `videos/dyatlov-pass-1-expedition/beats.json`'s `beats[].engine`.
- Map beat reuses `remotion/src/lib/map.tsx`'s real Natural Earth projection — the location
  is COMPUTED from real coordinates, not an illustrated guess (same discipline as
  `short-11-map`).
- No engagement-CTA outro. The series kicker ("1/5") is a structural continuity marker,
  not a comment-bait ask — VO still ends on the payoff line, loop still closes visually.
- Next: `dyatlov-pass-2-the-tent` — same kicker family, opens on a close-up of the tent's
  slashed opening for a hard visual match-cut into episode 2.
