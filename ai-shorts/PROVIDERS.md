# AI-video providers — the contract

Three tools generate or ingest AI-video pixels for `ai-shorts/` (and any hybrid TSX+AI-video
project). They are provider-agnostic **by contract**, not by a shared framework — each is a
plain stdlib-ish script (this repo's convention; see `CLAUDE.md`), and what makes them
interchangeable is that they all write the SAME two things:

1. A clip at the path you gave `--out` (or `--out DIR` for the bake-off harness).
2. A sidecar `<name>.json` next to it, always carrying at least:
   ```jsonc
   {
     "provider": "fal" | "veo-gemini" | "google-flow-manual" | "<your new provider>",
     "model": "...",              // the exact model id / endpoint, or a description if there isn't one
     "payload": { ... },          // whatever request you sent — enough to reproduce the clip
     "created": "2026-09-10T..."
   }
   ```
   Plus whatever's provider-specific (`request_id`, `operation_name`, `derived_cost_usd`,
   `source_file`, `measured`, ...).

A shot in `beats.json` never needs to branch on provider — it just points at a clip file. The
sidecar is where provenance and cost live, for the audit trail and for `/make-ai-short`'s
"state the cost before spending it" gate.

## The roster

| Provider | Tool | Auth | Cost model | Character-consistency mechanism |
|---|---|---|---|---|
| **fal.ai** (Seedance, Kling, Wan, Veo-via-fal, ...) | `tools/gen_clip.py` (one model), `tools/bakeoff_clip.py` (N models side-by-side) | `FAL_KEY` | derived per-model from token/sec formulas — see `bakeoff_clip.py`'s `MODELS` registry and this file's cost table below | start-frame / end-frame conditioning (`image_url` / `end_image_url` / `tail_image_url`, varies per model) |
| **Veo, official** | `tools/gen_veo.py` | `GEMINI_API_KEY` (same key as `gen_image.py`) | flat $/s by model+resolution, from `ai.google.dev/gemini-api/docs/pricing` | start-frame (`--ref`), end-frame (`--last-frame`), **native multi-image reference set** (`--reference`, up to 3, Veo 3.1 only) |
| **Google Flow** (manual) | `tools/ingest_flow_asset.py` | none (no public API — you drive the Flow UI by hand) | credits/subscription, not per-call $; record with `--credits` if you track it | whatever Flow's own UI gives you (its own reference-image and "ingredients" features) — this tool only normalizes and records what you did, it can't automate the generation |

Why `gen_clip.py`/`gen_veo.py` stayed two files instead of one "universal" script: fal's queue
API and the Gemini API have different auth, different request/poll/download shapes, and Veo's
config (`reference_images`, `last_frame`) is typed SDK objects, not raw JSON `--set` passthrough.
Forcing them through one function would hide more than it would share. What's shared is the CLI
shape (`--prompt --ref --out --dry-run`, cost printed before spending) and the sidecar contract
above — copy the shape, not the internals, for provider #4.

## Cost, derived and re-verified per-session

**Never trust a cached number past the session that derived it — model pricing moves.**
Both `gen_veo.py` and `bakeoff_clip.py` print the derived cost before any API call; read it
every time, don't assume last session's number still holds.

fal roster (see `bakeoff_clip.py` docstring + `ai-shorts/IDEAS.md` for the full derivation and
the two traps already found — Wan's resolution tiers, Veo-Lite-vs-Fast confusion):

| model | $/s (1080p, audio off) |
|---|---|
| Seedance 1.5 Pro | $0.058 |
| Kling 2.5 Turbo Pro | $0.070 |
| Veo 3.1 Fast (via fal) | $0.100 |

Veo official (verified 2026-09-10 against `ai.google.dev/gemini-api/docs/pricing`,
audio-inclusive — the Gemini API has no per-call audio-off cost break the way fal's Seedance
does):

| model | 720p | 1080p | 4k |
|---|---|---|---|
| veo-3.1-lite-generate-preview | $0.05/s | $0.08/s | — |
| veo-3.1-fast-generate-preview | $0.10/s | $0.12/s | $0.30/s |
| veo-3.1-generate-preview (standard) | $0.40/s | $0.40/s | $0.60/s |

**fal's Veo-3.1-Fast re-seller ($0.10/s, audio off) is cheaper than the official API's
Fast tier at 1080p ($0.12/s, audio bundled)** — fal's markup is more than offset by not paying
for audio you're discarding anyway. Pick official Veo when you need `reference_images` (native
multi-image character lock) or `last_frame` interpolation and don't want to depend on a
per-model fal wrapper exposing the same knob; pick fal when Seedance/Kling/Wan's price or
start-frame mechanics fit better, or you want the bake-off harness's side-by-side comparison.

## Choosing a provider for a shot

1. **Need a locked recurring character across many shots?** Any provider with start-frame
   conditioning works (all three do, in some form). Veo's `--reference` (up to 3 images) is the
   only one that natively takes MULTIPLE reference images in one call instead of relying purely
   on a single start frame — reach for it when one still isn't holding enough detail (outfit +
   prop + face, say).
2. **Need the frame-0==last-frame loop trick?** `gen_clip.py` (model-dependent: Seedance
   `end_image_url`, Kling `tail_image_url`) or `gen_veo.py --last-frame` both do real end-frame
   interpolation. `ingest_flow_asset.py --extract-lastframe` only EXTRACTS a frame for you to
   feed back into a NEXT Flow generation by hand — Flow's UI has no API to accept it
   automatically.
3. **Already generated something in Flow's UI (e.g. using a feature the API doesn't expose
   yet)?** `ingest_flow_asset.py` — normalize it into the repo's contract and move on; don't
   fight the tool into replicating what Flow already did.
4. **Cost-sensitive test pass?** fal's Seedance 720p ($0.026/s) or Veo Lite 720p ($0.05/s) are
   the cheapest usable tiers — use them for the QA loop, switch to the picked model for the
   final pass. Same "test cheap, ship the winner" discipline as `bakeoff_clip.py`.

## Adding provider #4

1. Copy `tools/gen_veo.py`'s shape (closer to a "real API" provider) or
   `tools/ingest_flow_asset.py`'s shape (closer to a "no API, manual export" provider) —
   whichever your new provider is.
2. Keep the CLI surface consistent: `--prompt`/`--src`, `--ref`/`--last-frame` for start/end
   frame conditioning if the provider supports it, `--out`, `--dry-run` that prints the derived
   cost (or states plainly that none exists) without spending anything.
3. Sidecar MUST carry `provider`, `model`, `payload`, `created` at minimum — add whatever else
   is provider-specific (see the roster table).
4. Add a row to the roster table and the cost table above. If the provider is fal-hosted, prefer
   adding it to `bakeoff_clip.py`'s `MODELS` registry instead of a new top-level tool — that's
   what the registry is for.
5. Update this file's "choosing a provider" section if the new provider changes the answer to
   any of those four questions.
