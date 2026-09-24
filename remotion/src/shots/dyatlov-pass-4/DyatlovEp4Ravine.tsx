import React from 'react';
import { AbsoluteFill } from 'remotion';
import { Captions, Kicker, ProgressBar } from '../../lib/shorts';
import { Scene, SceneTrack, loopSettleScene, tsxScene, videoScene } from '../../lib/hybrid';
import {
  ClassifiedStampCard,
  ConditionsStatCards,
  DYATLOV_ACCENT,
  NoExternalWoundsCard,
} from '../../lib/dyatlov';
import { VO } from './vo.gen';

// =============================================================================
// COMPOSITION CONFIG — Dyatlov Pass, Part 4/5: "The Ravine".
// Hybrid composition (videos/dyatlov-pass-4-the-ravine/beats.json): almost entirely TSX
// (forensic facts, not scenery) — one cinematic Google Flow clip for the hook/loop
// (manually ingested — see media/projects/dyatlov-pass-4-the-ravine/01-hook.json sidecar).
// No depicted faces/likenesses of the real named victims.
// =============================================================================
const HOOK_CLIP = 'projects/dyatlov-pass-4-the-ravine/01-hook.mp4';
const HOOK_FRAME0 = 'projects/dyatlov-pass-4-the-ravine/01-hook-frame0.png';

export const compositionConfig = {
  id: 'DyatlovEp4Ravine',
  durationInSeconds: 36.5,
  fps: 30,
  width: 1080,
  height: 1920,
};

// Beat boundaries in GLOBAL frames @30fps, from beats.json's start_s/end_s * 30 — real
// values after gen_voice.py's retiming pass (the "setup" line overflowed its first
// estimated window even at max atempo, so reveal/twist/payoff were all pushed back).
const SCENES: Scene[] = [
  {
    key: 'hook',
    start: 0,
    end: 147,
    render: videoScene(HOOK_CLIP),
  },
  {
    key: 'setup',
    start: 147,
    end: 342,
    render: tsxScene((p) => (
      <ConditionsStatCards {...p} items={['May 1959', 'a ravine', 'buried under snow']} />
    )),
  },
  {
    key: 'reveal',
    start: 342,
    end: 576,
    render: tsxScene((p) => (
      <ConditionsStatCards
        {...p}
        items={['2 — severe chest fractures', '1 — fractured skull', 'comparable to a car crash']}
      />
    )),
  },
  {
    key: 'twist',
    start: 576,
    end: 777,
    render: tsxScene((p) => (
      <NoExternalWoundsCard {...p} items={['No bruising.', 'No broken skin.']} />
    )),
  },
  {
    key: 'payoff',
    start: 777,
    end: 1067,
    render: tsxScene(ClassifiedStampCard),
  },
  {
    key: 'loop-settle',
    start: 1067,
    end: 1095,
    fadeIn: 0,
    render: loopSettleScene(HOOK_FRAME0),
  },
];

const DyatlovEp4Ravine: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: '#000' }}>
      <SceneTrack scenes={SCENES} />
      <Kicker text="DYATLOV PASS · 4/5" color={DYATLOV_ACCENT} y={130} />
      <Captions lines={VO} y={1460} size={50} accent={DYATLOV_ACCENT} maxWords={4} plate />
      <ProgressBar color={DYATLOV_ACCENT} />
    </AbsoluteFill>
  );
};

export default DyatlovEp4Ravine;
