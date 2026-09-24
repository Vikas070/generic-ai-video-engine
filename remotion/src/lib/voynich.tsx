// Voynich Manuscript series kit — the TSX beats shared across the standalone 5-part Voynich
// Manuscript series (videos/voynich-manuscript-N-*, same shape as Dyatlov Pass and Roopkund
// Lake). Editorial rule (see each part's beats.json): no AI-generated likeness claimed as a
// real named person (William Friedman, Wilfrid Voynich, Emperor Rudolf II) — image beats keep
// any period figure generic/back-turned/faceless, and these TSX components draw stats and a
// title card, never a depiction of a real person.
import React from 'react';
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from 'remotion';
import { EASE_OUT, StatChip, prog } from './shorts';
import { FONT_BODY, FONT_DISPLAY } from '../fonts';

export const VOYNICH_ACCENT = '#c9a876'; // aged-parchment gold — distinct series identity from
// Dyatlov's indigo (#6366F1) and Roopkund's frost blue (#8ecae6)

// =============================================================================
// VoynichStatsReveal — three StatChips punching up the manuscript's baseline, impossible
// numbers (240 pages / ~38,000 words / 0 translated in 600 years). A "whiteboard" fact this
// clean is exactly what TSX should render, not an AI image.
// =============================================================================
export const VoynichStatsReveal: React.FC<{ dur: number }> = () => {
  const frame = useCurrentFrame();
  const glowP = EASE_OUT(prog(frame, 0, 20));
  return (
    <AbsoluteFill style={{ background: '#12100c' }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 38%, ${VOYNICH_ACCENT}22 0%, transparent 60%)`,
          opacity: glowP,
        }}
      />
      <StatChip label="VELLUM PAGES" value="240" color={VOYNICH_ACCENT} x={90} y={640} w={900} at={0} />
      <StatChip label="WORDS, UNTRANSLATED" value="~38,000" color={VOYNICH_ACCENT} x={90} y={800} w={900} at={14} />
      <StatChip label="SENTENCES SOLVED IN 600 YEARS" value="0" color={VOYNICH_ACCENT} x={90} y={960} w={900} at={28} />
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
}> = ({
  dur,
  bgSrc = 'projects/voynich-manuscript-1-the-unbreakable-codex/01-hook.png',
  kicker = 'PART 1',
  title = 'WHAT IS IT HIDING?',
}) => {
  const frame = useCurrentFrame();
  const inP = EASE_OUT(prog(frame, 6, 26));
  const outStart = Math.max(30, dur * 0.72);
  const outP = EASE_OUT(prog(frame, outStart, dur - 4));
  const textP = inP * (1 - outP);
  const scrimP = 0.6 * inP * (1 - outP);

  return (
    <AbsoluteFill>
      <Img src={staticFile(bgSrc)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      <AbsoluteFill style={{ background: `rgba(10,8,4,${scrimP})` }} />
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
              color: VOYNICH_ACCENT,
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
// treatment for a custom Shorts thumbnail. Real text (crisp, exact, on-brand) instead of
// asking an AI image model to draw text — which is unreliable.
// =============================================================================
export const ThumbnailCard: React.FC<{
  bgSrc: string;
  kicker?: string;
  headline: string;
  sub?: string;
}> = ({ bgSrc, kicker = 'TRUE UNSOLVED MYSTERY', headline, sub }) => (
  <AbsoluteFill>
    <Img src={staticFile(bgSrc)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    <AbsoluteFill style={{ background: 'linear-gradient(180deg, rgba(10,8,4,0.55) 0%, rgba(10,8,4,0) 22%, rgba(10,8,4,0) 58%, rgba(10,8,4,0.92) 100%)' }} />
    <div style={{ position: 'absolute', top: 70, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
      <div
        style={{
          background: VOYNICH_ACCENT,
          borderRadius: 999,
          padding: '10px 28px',
          fontFamily: FONT_BODY,
          fontWeight: 700,
          fontSize: 26,
          letterSpacing: 3,
          textTransform: 'uppercase',
          color: '#1a1408',
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
            color: VOYNICH_ACCENT,
            textShadow: '0 4px 20px rgba(0,0,0,0.8)',
          }}
        >
          {sub}
        </div>
      ) : null}
    </div>
  </AbsoluteFill>
);
