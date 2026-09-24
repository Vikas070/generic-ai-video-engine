// Roopkund Lake series kit — the TSX beats shared across the standalone 5-part Roopkund Lake
// series (videos/roopkund-lake-N-*, same shape as the Dyatlov Pass series). Same ethos as lib/dyatlov.tsx: the map beat draws a REAL
// projected coordinate (lib/map.tsx), never an illustrated guess. Editorial rule (see each
// part's beats.json): no AI-generated likeness claimed as a real named person (H.K. Madhwal,
// the 1942 discoverer, is shown generically/anonymized in image beats only) — these TSX
// components draw facts and a title card, never a depiction of a real person.
import React from 'react';
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { CountryShape, MapLabel, WorldLayer, makeMapScale } from './map';
import { WORLD } from './geo/world';
import { EASE_OUT, EASE_INOUT, prog } from './shorts';
import { FONT_BODY, FONT_DISPLAY } from '../fonts';

export const ROOPKUND_ACCENT = '#8ecae6'; // frost blue — distinct series identity from Dyatlov's indigo

// Real coordinates, Roopkund Lake, Chamoli district, Uttarakhand, India.
const ROOPKUND: [number, number] = [79.7317, 30.2622]; // [lon, lat]
const INDIA = WORLD.find((c) => c.name === 'India')!;

// =============================================================================
// RoopkundMapZoom — a REAL Mercator projection (lib/map.tsx) animating from a wide South Asia
// view down onto Roopkund's real coordinates. Same discipline as dyatlov.tsx's UralMapZoom:
// the zoom is a lon/lat bounds interpolation, re-projected every frame — not a CSS scale.
// =============================================================================
export const RoopkundMapZoom: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const zoomEnd = Math.max(1, dur * 0.75);
  const p = EASE_INOUT(prog(frame, 0, zoomEnd));

  // Latitude is capped at 33N throughout -- deliberately never wide enough to render the
  // Jammu & Kashmir / Ladakh region. Natural Earth's India polygon (lib/geo/world.ts) draws
  // that boundary along the Line of Control, not India's officially mandated claim line (which
  // must show all of J&K, including Pakistan-administered Kashmir and Gilgit-Baltistan, as
  // Indian territory) -- a real, well-documented source of bans/backlash for incorrect India
  // maps. Rather than hand-correct disputed geopolitical data, this beat simply never frames
  // that region: Roopkund itself (30.26N) sits safely south of the cap.
  const lon0 = interpolate(p, [0, 1], [65, 76]);
  const lon1 = interpolate(p, [0, 1], [100, 82]);
  const lat0 = interpolate(p, [0, 1], [8, 28]);
  const lat1 = interpolate(p, [0, 1], [33, 33]);
  const scale = makeMapScale([lon0, lon1], [lat0, lat1], { x: 20, y: 560, w: 1040 });
  const [px, py] = scale.px(...ROOPKUND);

  // Pin appears early (~0.3-0.8s in) and stays locked on for the WHOLE zoom, tracking
  // Roopkund's real projected position as the camera moves -- so the viewer is oriented on
  // the destination from the start instead of staring at an unlabeled map until the zoom
  // finally settles. A slow, low-amplitude pulse (not a bounce -- brand.md's calm/premium
  // motion language) keeps the eye on it throughout.
  const pinP = EASE_OUT(prog(frame, 8, 24));
  const pulse = 1 + 0.12 * Math.sin(frame / 14);

  return (
    <AbsoluteFill style={{ background: '#0d1117' }}>
      <svg width={1080} height={1920} style={{ position: 'absolute' }}>
        <WorldLayer scale={scale} except={['India']} fill="#1a222c" stroke="#28323f" />
        <CountryShape scale={scale} country={INDIA} fill="#233042" stroke="#4a5f7a" strokeWidth={2.5} />
        {pinP > 0.02 ? (
          <>
            <circle cx={px} cy={py} r={22 * pinP * pulse} fill={ROOPKUND_ACCENT} opacity={0.18 * pinP} />
            <circle cx={px} cy={py} r={9} fill={ROOPKUND_ACCENT} opacity={pinP} stroke="#fff" strokeWidth={2} />
          </>
        ) : null}
      </svg>
      {pinP > 0.02 ? (
        <MapLabel
          x={px}
          y={py - 70}
          title="Roopkund"
          stat="Uttarakhand Himalayas"
          color={ROOPKUND_ACCENT}
          opacity={pinP}
        />
      ) : null}
    </AbsoluteFill>
  );
};

// =============================================================================
// RoopkundTrapDiagram — schematic cross-section (NOT a map, no India-boundary concern): peaks
// ringing a bowl-shaped valley, hail falling straight down into it. An abstract diagram, same
// dark/frost-blue visual language as RoopkundMapZoom, built to explain the terrain that turned
// a storm lethal — not an illustrated scene, so it carries no editorial-rule risk (no figures).
// =============================================================================
export const RoopkundTrapDiagram: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const peaksP = EASE_OUT(prog(frame, 0, 20));
  const labelP = EASE_OUT(prog(frame, 24, 44));
  const hailStart = 14;
  const hailFadeP = EASE_OUT(prog(frame, hailStart, hailStart + 10));

  // Two mirrored jagged ridgelines meeting near center with a narrow gap — the bowl's low
  // point, where the lake sits. Abstract cross-section, not a real surveyed profile. Ridge
  // (stroked) and mass (filled, no stroke) are drawn as SEPARATE shapes -- a single stroked
  // polygon would also stroke the straight closing edges down to the frame's bottom corners,
  // leaving a stray vertical seam line right through the label text below.
  const leftRidge = '0,900 130,420 230,620 340,260 460,560 560,760';
  const rightRidge = '1080,900 950,420 850,620 740,260 620,560 520,760';
  const leftMountain = `${leftRidge} 560,1920 0,1920`;
  const rightMountain = `${rightRidge} 520,1920 1080,1920`;
  const hailCols = [180, 300, 420, 540, 660, 780, 900];

  return (
    <AbsoluteFill style={{ background: '#0d1117' }}>
      <svg width={1080} height={1920} style={{ position: 'absolute' }}>
        <rect x={0} y={0} width={1080} height={920} fill="#151c26" />
        <polygon points={leftMountain} fill="#1a222c" opacity={peaksP} />
        <polygon points={rightMountain} fill="#1a222c" opacity={peaksP} />
        <polyline points={leftRidge} fill="none" stroke="#4a5f7a" strokeWidth={5} opacity={peaksP} />
        <polyline points={rightRidge} fill="none" stroke="#4a5f7a" strokeWidth={5} opacity={peaksP} />
        <ellipse cx={540} cy={840} rx={90} ry={26} fill={ROOPKUND_ACCENT} opacity={0.55 * peaksP} />
        {frame > hailStart
          ? hailCols.map((x, i) => {
              const period = 26;
              const offset = (i * 7) % period;
              const local = (frame - hailStart + offset) % period;
              const y = interpolate(local, [0, period], [40, 820]);
              return (
                <line
                  key={x}
                  x1={x}
                  y1={y}
                  x2={x}
                  y2={y + 34}
                  stroke="#cfe8f5"
                  strokeWidth={3}
                  opacity={0.75 * hailFadeP}
                />
              );
            })
          : null}
      </svg>
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 760, // clear of the caption band (Captions y=1460 in the composition) --
          // this y sits over the solid mountain-fill mass (below the ridge polylines, above
          // the hail's travel range), never over the sky/ridge art or the caption pill
          textAlign: 'center',
          opacity: labelP,
          transform: `translateY(${(1 - labelP) * 14}px)`,
          padding: '0 90px',
        }}
      >
        <div
          style={{
            fontFamily: FONT_BODY,
            fontWeight: 700,
            fontSize: 30,
            letterSpacing: 4,
            textTransform: 'uppercase',
            color: ROOPKUND_ACCENT,
            marginBottom: 10,
          }}
        >
          A Natural Bowl
        </div>
        <div
          style={{
            fontFamily: FONT_BODY,
            fontWeight: 600,
            fontSize: 40,
            lineHeight: 1.25,
            color: '#ffffff',
            textShadow: '0 6px 30px rgba(0,0,0,0.6)',
          }}
        >
          Above the treeline. No shelter. Nowhere to run.
        </div>
      </div>
    </AbsoluteFill>
  );
};

// =============================================================================
// RoopkundTwoGroupsChart — an abstract height-comparison diagram (NOT a depiction of people,
// no faces/figures at all): two groups of simple silhouette bars, one taller/broader, one
// shorter/slighter, dramatizing Walimbe's 2004 physical-anthropology finding of "at least two
// distinct groups" among the skeletons (Harney et al. 2019's own background section). Same
// dark/frost-blue visual language as RoopkundTrapDiagram, so it carries no editorial-rule risk.
// =============================================================================
export const RoopkundTwoGroupsChart: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const groupAP = EASE_OUT(prog(frame, 0, 22));
  const groupBP = EASE_OUT(prog(frame, 10, 32));
  const labelP = EASE_OUT(prog(frame, 30, 50));

  // Simple rounded-top silhouette bars standing in for "a body," not an illustrated person --
  // no head, limbs, or face, just a height/build comparison read at a glance.
  const GROUP_A_X = [230, 340, 450]; // taller, broader group -- three bars
  const GROUP_B_X = [660, 750, 840]; // shorter, slighter group -- three bars
  // baseY kept well clear of the caption band (Captions y=1460) with room below for two
  // stacked text blocks (group labels right under the axis, the main heading lower still,
  // at the same bottom:760 position RoopkundTrapDiagram already proved safe there).
  const baseY = 860;
  const groupATop = 280;
  const groupBTop = 480;

  const bar = (x: number, top: number, width: number, p: number, key: string) => {
    const h = (baseY - top) * p;
    return (
      <rect
        key={key}
        x={x - width / 2}
        y={baseY - h}
        width={width}
        height={h}
        rx={width / 2}
        fill={ROOPKUND_ACCENT}
        opacity={0.85}
      />
    );
  };

  return (
    <AbsoluteFill style={{ background: '#0d1117' }}>
      <svg width={1080} height={1920} style={{ position: 'absolute' }}>
        <line x1={60} y1={baseY} x2={1020} y2={baseY} stroke="#28323f" strokeWidth={3} />
        {GROUP_A_X.map((x, i) => bar(x, groupATop, 74, groupAP, `a${i}`))}
        {GROUP_B_X.map((x, i) => bar(x, groupBTop, 74, groupBP, `b${i}`))}
      </svg>
      <div
        style={{
          position: 'absolute',
          left: 0,
          width: 540,
          bottom: 1920 - baseY - 30,
          textAlign: 'center',
          opacity: groupAP,
        }}
      >
        <div style={{ fontFamily: FONT_BODY, fontWeight: 700, fontSize: 30, letterSpacing: 3, textTransform: 'uppercase', color: '#ffffff' }}>
          Robust &amp; Tall
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 540,
          width: 540,
          bottom: 1920 - baseY - 30,
          textAlign: 'center',
          opacity: groupBP,
        }}
      >
        <div style={{ fontFamily: FONT_BODY, fontWeight: 700, fontSize: 30, letterSpacing: 3, textTransform: 'uppercase', color: '#ffffff' }}>
          Slighter &amp; Smaller
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 760,
          textAlign: 'center',
          opacity: labelP,
          transform: `translateY(${(1 - labelP) * 14}px)`,
          padding: '0 90px',
        }}
      >
        <div
          style={{
            fontFamily: FONT_BODY,
            fontWeight: 700,
            fontSize: 30,
            letterSpacing: 4,
            textTransform: 'uppercase',
            color: ROOPKUND_ACCENT,
            marginBottom: 10,
          }}
        >
          At Least Two Groups
        </div>
        <div
          style={{
            fontFamily: FONT_BODY,
            fontWeight: 600,
            fontSize: 38,
            lineHeight: 1.25,
            color: '#ffffff',
            textShadow: '0 6px 30px rgba(0,0,0,0.6)',
          }}
        >
          The 2004 report couldn't explain why.
        </div>
      </div>
    </AbsoluteFill>
  );
};

// =============================================================================
// RoopkundGeneticGroupsChart — an abstract population bar chart (NOT a depiction of people, no
// faces/figures at all): three silhouette bars sized by group population, dramatizing the 2019
// Harney et al. ancient-DNA finding of three genetically distinct groups among the skeletons
// (23 South Asian ancestry, 14 eastern Mediterranean/Crete-related, 1 Southeast Asian). Same
// dark/frost-blue visual language as RoopkundTwoGroupsChart, so it carries no editorial-rule
// risk -- and sidesteps the stricter Part 4 rule (landscape imagery only for the ancestry
// groups) entirely, since it never depicts anything but bars and labels.
// =============================================================================
export const RoopkundGeneticGroupsChart: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const labelP = EASE_OUT(prog(frame, 44, 64));

  const baseY = 620;
  // Bar tops are chosen for a readable, strictly-ranked silhouette rather than an exact
  // linear 23:14:1 scale -- true linear scaling would make the 1-person group an invisible
  // sliver at this canvas size, so its bar keeps a small readable minimum height instead.
  const GROUPS = [
    { x: 250, top: 220, width: 150, count: '23', label: 'SOUTH ASIAN', from: 0, to: 22 },
    { x: 560, top: 340, width: 130, count: '14', label: 'E. MEDITERRANEAN', from: 8, to: 30 },
    { x: 850, top: 590, width: 80, count: '1', label: 'SOUTHEAST ASIAN', from: 16, to: 38 },
  ];

  return (
    <AbsoluteFill style={{ background: '#0d1117' }}>
      <svg width={1080} height={1920} style={{ position: 'absolute' }}>
        <line x1={60} y1={baseY} x2={1020} y2={baseY} stroke="#28323f" strokeWidth={3} />
        {GROUPS.map((g, i) => {
          const p = EASE_OUT(prog(frame, g.from, g.to));
          const h = (baseY - g.top) * p;
          return (
            <rect
              key={i}
              x={g.x - g.width / 2}
              y={baseY - h}
              width={g.width}
              height={h}
              rx={g.width / 2}
              fill={ROOPKUND_ACCENT}
              opacity={0.85}
            />
          );
        })}
      </svg>
      {GROUPS.map((g, i) => {
        const p = EASE_OUT(prog(frame, g.from, g.to));
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: g.x - 140,
              width: 280,
              top: baseY + 24,
              textAlign: 'center',
              opacity: p,
            }}
          >
            <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 52, color: '#ffffff' }}>
              {g.count}
            </div>
            <div
              style={{
                fontFamily: FONT_BODY,
                fontWeight: 700,
                fontSize: 22,
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: ROOPKUND_ACCENT,
                marginTop: 4,
              }}
            >
              {g.label}
            </div>
          </div>
        );
      })}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 760,
          textAlign: 'center',
          opacity: labelP,
          transform: `translateY(${(1 - labelP) * 14}px)`,
          padding: '0 90px',
        }}
      >
        <div
          style={{
            fontFamily: FONT_BODY,
            fontWeight: 700,
            fontSize: 30,
            letterSpacing: 4,
            textTransform: 'uppercase',
            color: ROOPKUND_ACCENT,
            marginBottom: 10,
          }}
        >
          Three Genetic Groups
        </div>
        <div
          style={{
            fontFamily: FONT_BODY,
            fontWeight: 600,
            fontSize: 40,
            lineHeight: 1.25,
            color: '#ffffff',
            textShadow: '0 6px 30px rgba(0,0,0,0.6)',
          }}
        >
          Not one story. Three.
        </div>
      </div>
    </AbsoluteFill>
  );
};

// =============================================================================
// PartTitleCard — the cliffhanger beat: a bold title over a still (typically the episode's
// hook image), text fading OUT before the beat ends so the tail settles back onto the clean
// still — matching frame 0 for the loop, without a separate loopSettleScene.
// =============================================================================
export const PartTitleCard: React.FC<{
  dur: number;
  bgSrc?: string;
  kicker?: string;
  title?: string;
}> = ({ dur, bgSrc = 'projects/roopkund-lake-1-lake-of-bones/01-hook.png', kicker = 'PART 1', title = 'WHAT KILLED THEM?' }) => {
  const frame = useCurrentFrame();
  const inP = EASE_OUT(prog(frame, 6, 26));
  const outStart = Math.max(30, dur * 0.72);
  const outP = EASE_OUT(prog(frame, outStart, dur - 4));
  const textP = inP * (1 - outP);
  const scrimP = 0.6 * inP * (1 - outP);

  return (
    <AbsoluteFill>
      <Img src={staticFile(bgSrc)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      <AbsoluteFill style={{ background: `rgba(8,10,14,${scrimP})` }} />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
        <div
          style={{
            textAlign: 'center',
            opacity: textP,
            transform: `translateY(${(1 - textP) * 16}px)`,
            padding: '0 70px',
          }}
        >
          <div
            style={{
              fontFamily: FONT_BODY,
              fontWeight: 700,
              fontSize: 32,
              letterSpacing: 6,
              textTransform: 'uppercase',
              color: ROOPKUND_ACCENT,
              marginBottom: 18,
            }}
          >
            {kicker}
          </div>
          <div
            style={{
              fontFamily: FONT_DISPLAY,
              fontWeight: 700,
              fontSize: 84,
              lineHeight: 1.08,
              textTransform: 'uppercase',
              color: '#ffffff',
              textShadow: '0 8px 40px rgba(0,0,0,0.7)',
            }}
          >
            {title}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// =============================================================================
// ThumbnailCard — a static (no animation, always fully composed) high-contrast text
// treatment for a custom Shorts thumbnail. Distinct from PartTitleCard: bigger, bottom-anchored
// so the dramatic image reads clearly above it, and rendered with real text (crisp, exact,
// on-brand) instead of asking an AI image model to draw text -- which is unreliable.
// =============================================================================
export const ThumbnailCard: React.FC<{
  bgSrc: string;
  kicker?: string;
  headline: string;
  sub?: string;
}> = ({ bgSrc, kicker = 'TRUE UNSOLVED MYSTERY', headline, sub }) => (
  <AbsoluteFill>
    <Img src={staticFile(bgSrc)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    {/* top scrim for the kicker chip, bottom scrim (taller) for the headline block */}
    <AbsoluteFill style={{ background: 'linear-gradient(180deg, rgba(6,8,12,0.55) 0%, rgba(6,8,12,0) 22%, rgba(6,8,12,0) 58%, rgba(6,8,12,0.92) 100%)' }} />
    <div
      style={{
        position: 'absolute',
        top: 70,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          background: ROOPKUND_ACCENT,
          borderRadius: 999,
          padding: '10px 28px',
          fontFamily: FONT_BODY,
          fontWeight: 700,
          fontSize: 26,
          letterSpacing: 3,
          textTransform: 'uppercase',
          color: '#0d1117',
        }}
      >
        {kicker}
      </div>
    </div>
    <div style={{ position: 'absolute', left: 60, right: 60, bottom: 130 }}>
      <div
        style={{
          fontFamily: FONT_DISPLAY,
          fontWeight: 700,
          fontSize: 128,
          lineHeight: 1.0,
          textTransform: 'uppercase',
          color: '#ffffff',
          textShadow: '0 4px 4px rgba(0,0,0,0.9), 0 12px 60px rgba(0,0,0,0.8)',
        }}
      >
        {headline}
      </div>
      {sub ? (
        <div
          style={{
            marginTop: 20,
            fontFamily: FONT_BODY,
            fontWeight: 600,
            fontSize: 38,
            letterSpacing: 2,
            textTransform: 'uppercase',
            color: ROOPKUND_ACCENT,
            textShadow: '0 4px 20px rgba(0,0,0,0.8)',
          }}
        >
          {sub}
        </div>
      ) : null}
    </div>
  </AbsoluteFill>
);
