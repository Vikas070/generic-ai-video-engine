import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { EASE_OUT, ProgressBar, prog } from '../../lib/shorts';
import { Scene, SceneTrack, imageScene, loopSettleScene, tsxScene, videoScene } from '../../lib/hybrid';

// =============================================================================
// COMPOSITION CONFIG — HybridDemo: proves lib/hybrid.tsx composites THREE different
// pixel sources (an AI-video clip, a plain TSX title card, a ken-burned AI still) plus a
// loop-settle dissolve, on ONE SceneTrack timeline, reusing already-committed example
// media so this is a real render, not a mockup. Not a shipped short — a validation shot
// for the hybrid AI-video + Remotion production path.
// =============================================================================
export const compositionConfig = {
  id: 'HybridDemo',
  durationInSeconds: 8,
  fps: 30,
  width: 1080,
  height: 1920,
};

const ACCENT = '#6366F1';

// A plain TSX beat — a code-drawn title card, standing in for any niche-lib visual
// (chart, board, pause card...) that would sit between AI-video/image beats.
const TitleCard: React.FC = () => {
  const frame = useCurrentFrame();
  const p = EASE_OUT(prog(frame, 0, 12));
  return (
    <AbsoluteFill style={{ background: '#0f1216', alignItems: 'center', justifyContent: 'center' }}>
      <div
        style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 700,
          fontSize: 72,
          color: '#fff',
          opacity: p,
          transform: `translateY(${(1 - p) * 20}px)`,
        }}
      >
        TSX beat
      </div>
    </AbsoluteFill>
  );
};

const SCENES: Scene[] = [
  {
    key: 'video',
    start: 0,
    end: 90,
    render: videoScene('projects/blue-man/01-desert-door.mp4'),
  },
  {
    key: 'tsx',
    start: 90,
    end: 150,
    render: tsxScene(TitleCard),
  },
  {
    key: 'image',
    start: 150,
    end: 220,
    render: imageScene('projects/short-7-kids/b1-hook.jpg', 0),
  },
  {
    key: 'loop-settle',
    start: 220,
    end: 240,
    fadeIn: 0,
    render: loopSettleScene('projects/blue-man/01-desert-door-frame0.png'),
  },
];

const HybridDemo: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: '#000' }}>
      <SceneTrack scenes={SCENES} />
      <ProgressBar color={ACCENT} />
    </AbsoluteFill>
  );
};

export default HybridDemo;
