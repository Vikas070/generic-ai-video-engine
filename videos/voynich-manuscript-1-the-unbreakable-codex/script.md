# Voynich Manuscript · Part 1/5 — "The Unbreakable Codex"

A standalone 5-part series — same shape as Dyatlov Pass and Roopkund Lake, not an episode of
any umbrella show.

Format: 1080×1920 @30fps, ~61.5s. Hybrid (`/make-video`): AI atmosphere/archival-style stills
(Ken Burns) + one TSX stat-reveal beat + one TSX title-card beat. Channel: @TheMidnightThrillers.
Voice: ElevenLabs "George" (`JBFqnCBsd6RMkjVDRZzb`, `eleven_v3`, calm/documentary tags — same
locked voice as Dyatlov Pass and Roopkund Lake, reused here for host-identity continuity across
series). Accent color `#c9a876` (aged-parchment gold), distinct from Dyatlov's indigo and
Roopkund's frost blue. Series kicker top-of-frame: "VOYNICH MANUSCRIPT · 1/5".

## Facts (verified before scripting)

- **The manuscript**: Beinecke Rare Book & Manuscript Library, Yale University, shelfmark
  **MS 408**. ~240 surviving vellum pages (some foldouts), an estimated ~35,000–40,000 "words"
  in an unidentified script never matched to any known language or cipher family. The outline's
  "~38,000 words" sits inside this range and is kept as a round mid-estimate — flagging here so
  later parts don't accidentally state it as an exact, settled count.
- **Radiocarbon dating**: University of Arizona AMS testing (2009, published by Yale) places the
  vellum at **1404–1438 AD** — this rules out 19th/20th-century forgery by Wilfrid Voynich
  himself, a real theory that circulated after his 1912 acquisition. Reserved for Part 2, where
  the dating actually belongs chronologically — not referenced yet in Part 1.
- **William F. Friedman**: US Army chief cryptologist, led the team that broke Japan's PURPLE
  diplomatic cipher before WWII and later ran the "First Study Group" (1944 onward, formalized
  1940s–50s) that made the most serious organized attempt to crack the Voynich manuscript. He
  never solved it. This is the verifiable, specific claim — the source outline's broader "Allied
  WWII codebreakers" is narrowed to Friedman by name, since he is the one documented figure with
  a clear paper trail; no claim is made about Bletchley Park or Turing having worked on it.
- **Illustration sections** (previewed here, detailed in Part 3): "herbal" pages showing
  composite/non-existent plants; a "balneological" section with small stylized figures in
  green-tinted pools linked by pipe-like vessels; "astronomical" fold-outs with non-standard
  zodiac-style diagrams. Described in Part 1 only in passing, as a tease.

Sources: [Yale Beinecke Library, MS 408](https://beinecke.library.yale.edu/collections/highlights/voynich-manuscript) ·
[Wikipedia](https://en.wikipedia.org/wiki/Voynich_manuscript) ·
[Yale News, 2009 radiocarbon dating](https://news.yale.edu/2009/07/text)

**Editorial rule (all 5 parts):** no AI-generated likeness claimed as a real, documented person —
William Friedman (beats 3–4 here), Wilfrid Voynich, and Emperor Rudolf II (both reserved for
Part 2) are always generic/back-turned/faceless or not depicted at all. The manuscript's
"balneological" illustration beat (7) is rendered in a stylized, non-photorealistic medieval
illuminated-manuscript art style — never realistic anatomy.

## Beat sheet

| # | Beat | Engine | On screen | VO |
|---|------|--------|-----------|-----|
| 1 | hook | image | Frame 0 fully composed: extreme macro push-in on the manuscript's alien handwritten script, warm archival lamp light, no people. Series kicker "PART 1/5" top. | "In a vault at Yale University sits a book six hundred years old. No one has ever read a single word of it." |
| 2 | stats | tsx | `VoynichStatsReveal`: three stat chips punch up in sequence — 240 vellum pages, ~38,000 words, 0 sentences solved. | "Two hundred and forty pages. Nearly thirty-eight thousand words. Written in an alphabet that matches nothing else on Earth." |
| 3 | friedman-intro | image | 1940s American cryptologist, back turned / face not visible, at a desk covered in coded papers under a desk lamp. | "This man broke Japan's Purple cipher. He cracked Nazi codes that helped win World War Two." |
| 4 | friedman-fails | image | Same generic figure, closer, frustrated posture, papers scattered across the desk. | "For decades, he threw everything he had at this manuscript. He never solved a single sentence." |
| 5 | modern-attempts | image | Close-up of a monitor glowing in a dark room, scrolling garbled cipher-like text, no clear people. | "Supercomputers have tried. Neural networks have tried. Every one of them has failed." |
| 6 | illustrations-flora | image | Extreme close-up, antique illuminated-manuscript illustration of an impossible composite plant. | "Its pages are covered in plants that don't exist anywhere in nature." |
| 7 | illustrations-strange | image | Stylized illuminated-manuscript illustration, small abstract figures in green-tinted pools linked by pipe-like vessels; non-standard star/zodiac diagram. | "Women bathing in green liquid, laced with tubing. Stars in patterns no astronomer recognizes." |
| 8 | still-unread | image | Wide shot: the closed manuscript resting in a dim, modern archive vault — old object, new security lighting. | "In an age of satellites and artificial intelligence, this book remains completely, stubbornly unread." |
| 9 | cliffhanger | tsx | `PartTitleCard`: bold title "WHAT IS IT HIDING?" over the hook's manuscript still; text fades out before the beat ends so the tail matches frame 0 for the loop. | "Lost science. A hidden code. Or history's most brilliant hoax. The truth starts in a secret library, in 1912. Part 2." |

## Production notes

- Engine mix: `image` (Ken Burns, `tools/gen_image.py`, Gemini `fast`/Nano Banana 2 preset) for
  atmosphere/archival beats, `tsx` for the stats-reveal and title-card beats — see `beats.json`'s
  `beats[].engine`.
- **Cost stated before spending**: 7 image beats × Gemini `gemini-3.1-flash-image` ("fast" preset,
  2K, 9:16) ≈ $0.02–0.04 each on current public Nano Banana 2 pricing ⇒ **≈$0.15–0.30 total** for
  this episode's stills. No `ai-video` beats in Part 1, so no fal/Veo spend.
- No AI-generated likeness of William Friedman, Wilfrid Voynich, or Rudolf II ever presented as a
  documented portrait — generic/back-turned figures only (Friedman here; Voynich/Rudolf II
  reserved for Part 2).
- Beat 7's illustration prompt is deliberately phrased in illuminated-manuscript art-historical
  terms (stylized, non-photorealistic, no explicit content) to depict the real "balneological"
  section's small pool-and-pipe figures without generating anything graphic.
- No engagement-CTA outro. "Part 2" is the series' own cliffhanger structure, not a
  subscribe/like ask — VO ends on the payoff line, and the title card's own fade-out re-settles
  on the hook's still so frame 0 ≈ last frame for the loop.
- Next: `voynich-manuscript-2-origins-and-provenance` (Part 2, "Origins & Provenance" — Wilfrid
  Voynich's 1912 acquisition, Rudolf II, the 1404–1438 radiocarbon dating) — not built this
  session (one episode per session, per repo convention).
