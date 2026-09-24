// Dyatlov Pass series kit — the TSX beats shared across the 5-part documentary
// (videos/dyatlov-pass-N-*). Editorial rule (see each episode's beats.json): these
// components draw FACTS (a real map location, verified stats) — never a depiction of the
// real named victims. Same ethos as lib/map.tsx: the location is a REAL projected
// coordinate, not an illustrated guess.
import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { CountryShape, MapLabel, WorldLayer, makeMapScale } from './map';
import { WORLD } from './geo/world';
import { EASE_OUT, EASE_INOUT, prog, Stamp } from './shorts';
import { FONT_BODY, FONT_DISPLAY } from '../fonts';

export const DYATLOV_ACCENT = '#6366F1'; // brand indigo — used as the series accent throughout

// =============================================================================
// PlaceholderAtmosphere — stand-in for an `image` beat whose AI still hasn't been
// generated yet (e.g. GEMINI_API_KEY billing not enabled). Clearly marked as a
// placeholder so it's never mistaken for a finished frame in a QA render. Swap the
// scene for `imageScene(realPath)` once the real still exists — nothing else changes.
// =============================================================================
export const PlaceholderAtmosphere: React.FC<{ label: string }> = ({ label }) => (
  <AbsoluteFill
    style={{
      background: 'linear-gradient(160deg, #11151c 0%, #1b222c 55%, #10131a 100%)',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 90,
    }}
  >
    <div
      style={{
        border: '2px dashed rgba(255,255,255,0.22)',
        borderRadius: 20,
        padding: '40px 46px',
        textAlign: 'center',
        maxWidth: 820,
      }}
    >
      <div
        style={{
          fontFamily: FONT_BODY,
          fontWeight: 700,
          fontSize: 24,
          letterSpacing: 3,
          textTransform: 'uppercase',
          color: DYATLOV_ACCENT,
          marginBottom: 16,
        }}
      >
        AI STILL PENDING
      </div>
      <div style={{ fontFamily: FONT_BODY, fontWeight: 400, fontSize: 26, color: 'rgba(255,255,255,0.55)', lineHeight: 1.4 }}>
        {label}
      </div>
    </div>
  </AbsoluteFill>
);

// Real coordinates, Kholat Syakhl ("Dead Mountain"), northern Ural Mountains.
const KHOLAT_SYAKHL: [number, number] = [59.45, 61.75]; // [lon, lat]
const RUSSIA = WORLD.find((c) => c.name === 'Russia')!;

// =============================================================================
// UralMapZoom — a REAL Mercator projection (lib/map.tsx) animating from a regional view
// down onto Kholat Syakhl's real coordinates. The zoom is a lon/lat bounds interpolation,
// re-projected every frame — not a CSS scale on a static image.
// =============================================================================
export const UralMapZoom: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const zoomEnd = Math.max(1, dur * 0.75);
  const p = EASE_INOUT(prog(frame, 0, zoomEnd));

  const lon0 = interpolate(p, [0, 1], [15, 48]);
  const lon1 = interpolate(p, [0, 1], [115, 78]);
  const lat0 = interpolate(p, [0, 1], [28, 52]);
  const lat1 = interpolate(p, [0, 1], [82, 70]);
  const scale = makeMapScale([lon0, lon1], [lat0, lat1], { x: 20, y: 560, w: 1040 });
  const [px, py] = scale.px(...KHOLAT_SYAKHL);

  const pinP = EASE_OUT(prog(frame, zoomEnd - 6, zoomEnd + 10));

  return (
    <AbsoluteFill style={{ background: '#0d1117' }}>
      <svg width={1080} height={1920} style={{ position: 'absolute' }}>
        <WorldLayer scale={scale} except={['Russia']} fill="#1a222c" stroke="#28323f" />
        <CountryShape scale={scale} country={RUSSIA} fill="#233042" stroke="#4a5f7a" strokeWidth={2.5} />
        {pinP > 0.02 ? (
          <>
            <circle cx={px} cy={py} r={22 * pinP} fill={DYATLOV_ACCENT} opacity={0.18 * pinP} />
            <circle cx={px} cy={py} r={9} fill={DYATLOV_ACCENT} opacity={pinP} stroke="#fff" strokeWidth={2} />
          </>
        ) : null}
      </svg>
      {pinP > 0.02 ? (
        <MapLabel
          x={px}
          y={py - 70}
          title="Kholat Syakhl"
          stat="Northern Urals"
          color={DYATLOV_ACCENT}
          opacity={pinP}
        />
      ) : null}
    </AbsoluteFill>
  );
};

// =============================================================================
// TenToNineCard — "10 -> 9" stat beat: one hiker turned back before the group's final camp.
// =============================================================================
export const TenToNineCard: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const bigP = EASE_OUT(prog(frame, 0, 12));
  const swapAt = dur * 0.42;
  const isNine = frame >= swapAt;
  const swapP = EASE_OUT(prog(frame, swapAt, swapAt + 10));
  const labelP = EASE_OUT(prog(frame, swapAt + 6, swapAt + 22));

  return (
    <AbsoluteFill style={{ background: '#0d1117', alignItems: 'center', justifyContent: 'center' }}>
      <div
        style={{
          fontFamily: FONT_DISPLAY,
          fontWeight: 700,
          fontSize: 260,
          lineHeight: 1,
          color: isNine ? DYATLOV_ACCENT : '#ffffff',
          opacity: bigP,
          transform: `scale(${0.9 + 0.1 * bigP - (isNine ? (1 - swapP) * 0.06 : 0)})`,
          textShadow: '0 8px 50px rgba(0,0,0,0.6)',
        }}
      >
        {isNine ? '9' : '10'}
      </div>
      <div
        style={{
          marginTop: 28,
          fontFamily: FONT_BODY,
          fontWeight: 500,
          fontSize: 34,
          color: 'rgba(255,255,255,0.75)',
          textAlign: 'center',
          maxWidth: 700,
          opacity: labelP,
          transform: `translateY(${(1 - labelP) * 14}px)`,
        }}
      >
        Yuri Yudin fell ill and turned back —
        <br />
        the expedition's only survivor.
      </div>
    </AbsoluteFill>
  );
};

// =============================================================================
// SearchFindingsList — a heading ("FEB 26") + itemized rows ("Boots — left", ...) sliding
// in one at a time. Used for part 3's "what the search party found inside the tent" beat.
// =============================================================================
export const SearchFindingsList: React.FC<{ dur: number; heading?: string; items?: string[] }> = ({
  dur,
  heading = 'FEB 26',
  items = ['Boots — left', 'Coats — left', 'Food — left'],
}) => {
  const frame = useCurrentFrame();
  const headingP = EASE_OUT(prog(frame, 0, 14));
  const listStart = 20;
  const stagger = Math.max(14, Math.floor((dur * 0.55) / items.length));

  return (
    <AbsoluteFill style={{ background: '#0d1117', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 30 }}>
        <div
          style={{
            fontFamily: FONT_BODY,
            fontWeight: 700,
            fontSize: 30,
            letterSpacing: 4,
            textTransform: 'uppercase',
            color: DYATLOV_ACCENT,
            opacity: headingP,
            transform: `translateY(${(1 - headingP) * 12}px)`,
          }}
        >
          {heading}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          {items.map((text, i) => {
            const at = listStart + i * stagger;
            const p = EASE_OUT(prog(frame, at, at + 14));
            if (p <= 0.01) return null;
            return (
              <div
                key={text}
                style={{
                  opacity: p,
                  transform: `translateX(${(1 - p) * -26}px)`,
                  background: 'rgba(255,255,255,0.04)',
                  border: `2px solid ${DYATLOV_ACCENT}55`,
                  borderLeft: `8px solid ${DYATLOV_ACCENT}`,
                  borderRadius: 16,
                  padding: '20px 42px',
                  minWidth: 480,
                }}
              >
                <div
                  style={{
                    fontFamily: FONT_DISPLAY,
                    fontWeight: 700,
                    fontSize: 40,
                    color: '#ffffff',
                    textShadow: '0 6px 30px rgba(0,0,0,0.5)',
                  }}
                >
                  {text}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// =============================================================================
// ConditionsStatCards — a generic sequential stat-card stack: N facts, each fading/rising
// in and staying, staggered evenly across the beat's duration. Used for part 2's
// "-30C / no coats / some barefoot" reveal, and reusable for similar fact-stacks later
// in the series (part 4's injury cards) — part 3's "2 found / 3 more / 4 missing" payoff
// reuses it directly (see DyatlovEp3Search.tsx) rather than duplicating the same shape.
// =============================================================================
export const ConditionsStatCards: React.FC<{ dur: number; items?: string[]; atFrames?: number[] }> = ({
  dur,
  items = ['−30°C', 'no coats', 'some barefoot'],
  atFrames,
}) => {
  const frame = useCurrentFrame();
  const stagger = Math.max(14, Math.floor((dur * 0.6) / items.length));

  return (
    <AbsoluteFill style={{ background: '#0d1117', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        {items.map((text, i) => {
          const at = atFrames?.[i] ?? i * stagger + 6;
          const p = EASE_OUT(prog(frame, at, at + 14));
          if (p <= 0.01) return null;
          return (
            <div
              key={text}
              style={{
                opacity: p,
                transform: `translateY(${(1 - p) * 22}px) scale(${0.94 + 0.06 * p})`,
                background: 'rgba(255,255,255,0.04)',
                border: `2px solid ${DYATLOV_ACCENT}55`,
                borderLeft: `8px solid ${DYATLOV_ACCENT}`,
                borderRadius: 16,
                padding: '22px 46px',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontFamily: FONT_DISPLAY,
                  fontWeight: 700,
                  fontSize: 58,
                  color: '#ffffff',
                  textShadow: '0 6px 30px rgba(0,0,0,0.5)',
                }}
              >
                {text}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// =============================================================================
// NoExternalWoundsCard — part 4's negative-space contrast reveal: what the injuries
// DIDN'T show. Each line draws an accent rule first, then the statement itself, so the
// absence reads as a deliberate mark rather than a plain list item. No on-screen closing
// line by design — the VO/captions already say "nothing to explain the force..." at this
// exact beat, and a duplicate text block collided with the caption strip below it.
// =============================================================================
export const NoExternalWoundsCard: React.FC<{ dur: number; items?: string[] }> = ({
  dur,
  items = ['No bruising.', 'No broken skin.'],
}) => {
  const frame = useCurrentFrame();
  const stagger = Math.max(20, Math.floor((dur * 0.5) / items.length));

  return (
    <AbsoluteFill style={{ background: '#0d1117', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 40, alignItems: 'center' }}>
        {items.map((text, i) => {
          const at = i * stagger + 8;
          const lineP = EASE_OUT(prog(frame, at, at + 14));
          const textP = EASE_OUT(prog(frame, at + 8, at + 24));
          if (lineP <= 0.01) return null;
          return (
            <div key={text} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 90 * lineP, height: 4, background: DYATLOV_ACCENT, borderRadius: 2 }} />
              <div
                style={{
                  fontFamily: FONT_DISPLAY,
                  fontWeight: 700,
                  fontSize: 56,
                  color: '#ffffff',
                  opacity: textP,
                  transform: `translateY(${(1 - textP) * 14}px)`,
                  textShadow: '0 6px 30px rgba(0,0,0,0.5)',
                }}
              >
                {text}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// =============================================================================
// ClassifiedStampCard — part 4's payoff: a document-style quote card with a CLASSIFIED
// stamp slamming down over it (reuses lib/shorts.tsx's Stamp — same mechanism as every
// other stamped verdict in this repo, not a one-off).
// =============================================================================
export const ClassifiedStampCard: React.FC<{ dur: number; quote?: string; byline?: string }> = ({
  quote = '"a compelling unknown force"',
  byline = '— case closed, May 1959',
}) => {
  const frame = useCurrentFrame();
  const quoteP = EASE_OUT(prog(frame, 6, 26));
  const bylineP = EASE_OUT(prog(frame, 20, 36));

  return (
    <AbsoluteFill style={{ background: '#0d1117', alignItems: 'center', justifyContent: 'center' }}>
      <div
        style={{
          width: 860,
          padding: '70px 60px',
          borderRadius: 20,
          background: 'rgba(255,255,255,0.03)',
          border: `2px solid ${DYATLOV_ACCENT}44`,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontFamily: FONT_DISPLAY,
            fontWeight: 600,
            fontSize: 46,
            fontStyle: 'italic',
            color: '#ffffff',
            opacity: quoteP,
            transform: `translateY(${(1 - quoteP) * 16}px)`,
            lineHeight: 1.3,
          }}
        >
          {quote}
        </div>
        <div
          style={{
            marginTop: 26,
            fontFamily: FONT_BODY,
            fontWeight: 500,
            fontSize: 26,
            letterSpacing: 1,
            color: 'rgba(255,255,255,0.55)',
            opacity: bylineP,
          }}
        >
          {byline}
        </div>
      </div>
      <Stamp text="CLASSIFIED" at={40} color={DYATLOV_ACCENT} x={540} y={1230} size={90} rotate={-10} />
    </AbsoluteFill>
  );
};

// =============================================================================
// DebunkList — part 5's "here's what people blamed, and none of it held up" beat. Each
// theory fades in as a card, then gets a strikethrough drawn across it in sequence.
// =============================================================================
export const DebunkList: React.FC<{ dur: number; items?: string[] }> = ({
  dur,
  items = ['Secret weapons test', 'Infrasound', 'Something not human'],
}) => {
  const frame = useCurrentFrame();
  const stagger = Math.max(18, Math.floor((dur * 0.75) / items.length));

  return (
    <AbsoluteFill style={{ background: '#0d1117', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
        {items.map((text, i) => {
          const at = i * stagger + 6;
          const inP = EASE_OUT(prog(frame, at, at + 14));
          const strikeP = EASE_OUT(prog(frame, at + 18, at + 32));
          if (inP <= 0.01) return null;
          return (
            <div
              key={text}
              style={{ position: 'relative', opacity: inP, transform: `translateY(${(1 - inP) * 16}px)` }}
            >
              <div
                style={{
                  fontFamily: FONT_DISPLAY,
                  fontWeight: 700,
                  fontSize: 44,
                  color: strikeP > 0.5 ? 'rgba(255,255,255,0.4)' : '#ffffff',
                  padding: '16px 42px',
                  background: 'rgba(255,255,255,0.03)',
                  border: `2px solid ${DYATLOV_ACCENT}44`,
                  borderRadius: 14,
                  minWidth: 420,
                  textAlign: 'center',
                }}
              >
                {text}
              </div>
              <div
                style={{
                  position: 'absolute',
                  left: 42,
                  right: 42,
                  top: '50%',
                  height: 4,
                  background: DYATLOV_ACCENT,
                  transform: `translateY(-50%) scaleX(${strikeP})`,
                  transformOrigin: 'left center',
                  borderRadius: 2,
                }}
              />
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// =============================================================================
// SlopeCrossSection — part 5's avalanche mechanism diagram: a labeled schematic, not a
// physics sim ("computed not asserted" only in the sense that the geometry is fixed and
// legible, per script.md's production note — a clear schematic is honest and sufficient).
// Shared by SlopeDiagram (reveal, static) and SlopeDiagramRelease (twist, the slab moves).
// `releaseP` (0-1) drives the slab's down-slope shift and the force arrow into the tent.
// =============================================================================
const SLOPE_PATH = 'M60,1520 L360,1240 L640,980 L1000,660';
const TENT_X = 640;
const TENT_Y = 980;
const SLAB_UNIT: [number, number] = [0.733, -0.681]; // normalized B->C slope direction

const SlopeCrossSection: React.FC<{ releaseP: number; labelsP: number; groundP: number }> = ({
  releaseP,
  labelsP,
  groundP,
}) => {
  const shift = 90 * releaseP;
  const dx = SLAB_UNIT[0] * shift;
  const dy = SLAB_UNIT[1] * shift;
  const slab = [
    [360, 1240],
    [640, 980],
    [610, 910],
    [330, 1170],
  ]
    .map(([x, y]) => [x + dx, y + dy])
    .map((p) => p.join(','))
    .join(' ');
  const arrowP = EASE_OUT(Math.max(0, (releaseP - 0.35) / 0.65));

  return (
    <AbsoluteFill style={{ background: '#0d1117', alignItems: 'center', justifyContent: 'center' }}>
      <svg width={1080} height={1920} style={{ position: 'absolute' }}>
        <path
          d={SLOPE_PATH}
          fill="none"
          stroke="#4a5f7a"
          strokeWidth={5}
          strokeLinejoin="round"
          strokeDasharray={2100}
          strokeDashoffset={2100 * (1 - groundP)}
        />
        <polygon points={slab} fill={`${DYATLOV_ACCENT}33`} stroke={DYATLOV_ACCENT} strokeWidth={2.5} opacity={groundP} />
        <polygon
          points={`${TENT_X - 20},${TENT_Y} ${TENT_X + 20},${TENT_Y} ${TENT_X},${TENT_Y - 32}`}
          fill="#e8879f"
          opacity={groundP}
        />
        {arrowP > 0.02 ? (
          <line
            x1={470 + dx * 0.4}
            y1={1075 + dy * 0.4}
            x2={470 + dx * 0.4 + (TENT_X - 470 - dx * 0.4) * arrowP}
            y2={1075 + dy * 0.4 + (TENT_Y - 1075 - dy * 0.4) * arrowP}
            stroke={DYATLOV_ACCENT}
            strokeWidth={4}
            opacity={arrowP}
            markerEnd="url(#arrowhead)"
          />
        ) : null}
        <defs>
          <marker id="arrowhead" markerWidth={10} markerHeight={10} refX={6} refY={3} orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill={DYATLOV_ACCENT} />
          </marker>
        </defs>
      </svg>
      <MapLabel x={470} y={860} title="Wind-loaded snow slab" color={DYATLOV_ACCENT} size={26} opacity={labelsP} />
      <MapLabel x={640} y={1080} title="Tent cut into slope" color="#e8879f" size={26} opacity={labelsP} />
    </AbsoluteFill>
  );
};

export const SlopeDiagram: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const groundP = EASE_OUT(prog(frame, 0, 24));
  const labelsP = EASE_OUT(prog(frame, 20, 36));
  return <SlopeCrossSection releaseP={0} groundP={groundP} labelsP={labelsP} />;
};

export const SlopeDiagramRelease: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const releaseP = EASE_INOUT(prog(frame, Math.max(20, dur * 0.25), Math.max(20, dur * 0.25) + 40));
  return <SlopeCrossSection releaseP={releaseP} groundP={1} labelsP={1} />;
};

// =============================================================================
// SeriesEndCard — part 5's closing signature, fading in over the calm mountain AFTER the
// final VO line finishes (silence only past that point — no CTA, per the repo-wide rule).
// A plain, mounted-at-the-top-level overlay (like Kicker/Captions), so `atFrame` is a
// GLOBAL frame, not scoped to any one Scene's Sequence.
// =============================================================================
export const SeriesEndCard: React.FC<{ atFrame: number }> = ({ atFrame }) => {
  const frame = useCurrentFrame();
  const p = EASE_OUT(prog(frame, atFrame, atFrame + 24));
  if (p <= 0.01) return null;
  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
      <div
        style={{
          opacity: p,
          transform: `translateY(${(1 - p) * 14}px)`,
          background: 'rgba(10,10,14,0.55)',
          border: `1px solid ${DYATLOV_ACCENT}55`,
          borderRadius: 18,
          padding: '34px 56px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontFamily: FONT_DISPLAY,
            fontWeight: 700,
            fontSize: 52,
            letterSpacing: 4,
            color: '#ffffff',
            textTransform: 'uppercase',
          }}
        >
          Dyatlov Pass
        </div>
        <div
          style={{
            marginTop: 12,
            fontFamily: FONT_BODY,
            fontWeight: 500,
            fontSize: 28,
            letterSpacing: 2,
            color: DYATLOV_ACCENT,
          }}
        >
          1959 – 2021
        </div>
      </div>
    </AbsoluteFill>
  );
};
