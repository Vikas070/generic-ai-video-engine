import React from 'react';
import { AbsoluteFill } from 'remotion';
import { Captions, Kicker, ProgressBar } from '../../lib/shorts';
import { Scene, SceneTrack, imageScene, loopSettleScene, tsxScene } from '../../lib/hybrid';
import { ConditionsStatCards, DYATLOV_ACCENT, PlaceholderAtmosphere } from '../../lib/dyatlov';
import { VO } from './vo.gen';

// =============================================================================
// COMPOSITION CONFIG — Dyatlov Pass, Part 2/5: "The Tent".
// Hybrid composition (videos/dyatlov-pass-2-the-tent/beats.json): AI atmosphere stills
// (Google Flow, manually ingested — see media/projects/dyatlov-pass-2-the-tent/*.json
// sidecars) + one TSX stat-card beat (ConditionsStatCards). The "twist" beat is still a
// PLACEHOLDER — the Flow still generated for it showed a long, orderly line of 14+
// torch-lit figures, which misrepresents the real event (9 people fleeing in darkness,
// in a panic, no lights) — awaiting a re-generated still before wiring it in. No depicted
// faces/likenesses of the real named victims anywhere in this series.
// =============================================================================
const HOOK_STILL = 'projects/dyatlov-pass-2-the-tent/hook-tent-slash.png';
const SETUP_STILL = 'projects/dyatlov-pass-2-the-tent/setup-storm.png';
const PAYOFF_STILL = 'projects/dyatlov-pass-2-the-tent/payoff-snow-texture.png';
export const compositionConfig = {
  id: 'DyatlovEp2Tent',
  durationInSeconds: 33.5,
  fps: 30,
  width: 1080,
  height: 1920,
};

// Beat boundaries in GLOBAL frames @30fps, from beats.json's start_s/end_s * 30 (real
// values, written back by gen_voice.py — three lines overflowed their estimated windows
// even at max atempo on the first pass; retimed before this file was written).
const SCENES: Scene[] = [
  {
    key: 'hook',
    start: 0,
    end: 141,
    render: imageScene(HOOK_STILL, 1),
  },
  {
    key: 'setup',
    start: 141,
    end: 381,
    render: imageScene(SETUP_STILL, 2),
  },
  {
    key: 'reveal',
    start: 381,
    end: 624,
    render: tsxScene(ConditionsStatCards),
  },
  {
    key: 'twist',
    start: 624,
    end: 810,
    render: tsxScene(() => (
      <PlaceholderAtmosphere label="Vast dark snowy landscape, tiny distant silhouettes fleeing downhill." />
    )),
  },
  {
    key: 'payoff',
    start: 810,
    end: 984,
    render: imageScene(PAYOFF_STILL, 0),
  },
  {
    key: 'loop-settle',
    start: 984,
    end: 1005,
    fadeIn: 0,
    render: loopSettleScene(HOOK_STILL),
  },
];

const DyatlovEp2Tent: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: '#000' }}>
      <SceneTrack scenes={SCENES} />
      <Kicker text="DYATLOV PASS · 2/5" color={DYATLOV_ACCENT} y={130} />
      <Captions lines={VO} y={1460} size={50} accent={DYATLOV_ACCENT} maxWords={4} plate />
      <ProgressBar color={DYATLOV_ACCENT} />
    </AbsoluteFill>
  );
};

export default DyatlovEp2Tent;
