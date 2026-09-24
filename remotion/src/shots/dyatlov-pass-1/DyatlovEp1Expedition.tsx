import React from 'react';
import { AbsoluteFill } from 'remotion';
import { Captions, Kicker, ProgressBar } from '../../lib/shorts';
import { Scene, SceneTrack, imageScene, loopSettleScene, tsxScene } from '../../lib/hybrid';
import { DYATLOV_ACCENT, TenToNineCard, UralMapZoom } from '../../lib/dyatlov';
import { VO } from './vo.gen';

// =============================================================================
// COMPOSITION CONFIG — Dyatlov Pass, Part 1/5: "The Expedition".
// Hybrid composition (videos/dyatlov-pass-1-expedition/beats.json): a real computed map
// (lib/map.tsx's projection, reused via lib/dyatlov.tsx) + a TSX stat card for facts, AI
// atmosphere stills (Google Flow, manually ingested via tools/ingest_flow_asset.py — see
// media/projects/dyatlov-pass-1-expedition/*.json sidecars for provenance) for mood. No
// depicted faces/likenesses of the real named victims anywhere in this series.
// =============================================================================
const HOOK_STILL = 'projects/dyatlov-pass-1-expedition/hook-mountain.png';
const PAYOFF_STILL = 'projects/dyatlov-pass-1-expedition/tent-pitched.png';
export const compositionConfig = {
  id: 'DyatlovEp1Expedition',
  durationInSeconds: 32.5,
  fps: 30,
  width: 1080,
  height: 1920,
};

// Beat boundaries in GLOBAL frames @30fps, from beats.json's start_s/end_s * 30
// (real values, written back by gen_voice.py — retimed after the "setup" line's estimated
// window overflowed even at max atempo; see videos/dyatlov-pass-1-expedition/beats.json).
const SCENES: Scene[] = [
  {
    key: 'hook',
    start: 0,
    end: 180,
    render: imageScene(HOOK_STILL, 0),
  },
  {
    key: 'setup',
    start: 180,
    end: 450,
    render: tsxScene(UralMapZoom),
  },
  {
    key: 'reveal',
    start: 450,
    end: 666,
    render: tsxScene(TenToNineCard),
  },
  {
    key: 'payoff',
    start: 666,
    end: 950,
    render: imageScene(PAYOFF_STILL, 3),
  },
  {
    key: 'loop-settle',
    start: 950,
    end: 975,
    fadeIn: 0,
    render: loopSettleScene(HOOK_STILL),
  },
];

const DyatlovEp1Expedition: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: '#000' }}>
      <SceneTrack scenes={SCENES} />
      <Kicker text="DYATLOV PASS · 1/5" color={DYATLOV_ACCENT} y={130} />
      <Captions lines={VO} y={1460} size={50} accent={DYATLOV_ACCENT} maxWords={4} plate />
      <ProgressBar color={DYATLOV_ACCENT} />
    </AbsoluteFill>
  );
};

export default DyatlovEp1Expedition;
