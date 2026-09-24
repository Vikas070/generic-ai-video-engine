import React from 'react';
import { AbsoluteFill } from 'remotion';
import { Captions, Kicker, ProgressBar } from '../../lib/shorts';
import { Scene, SceneTrack, imageScene, tsxScene, videoScene } from '../../lib/hybrid';
import { DebunkList, DYATLOV_ACCENT, SeriesEndCard, SlopeDiagram, SlopeDiagramRelease } from '../../lib/dyatlov';
import { VO } from './vo.gen';

// =============================================================================
// COMPOSITION CONFIG — Dyatlov Pass, Part 5/5: "The Science" (series finale).
// Hybrid composition (videos/dyatlov-pass-5-the-science/beats.json): TSX debunk-list +
// avalanche cross-section diagram, plus one cinematic Google Flow clip for the hook
// (manually ingested — see media/projects/dyatlov-pass-5-the-science/01-hook.json
// sidecar; chosen from two candidate prompts, a steady push-in vs. a camera-angle-change
// take that showed a figure's shadow and ski tracks and was rejected). The closing
// payoff-loop beat is a sustained still (that clip's own frame 0, imageScene not
// loopSettleScene — it needs to stay visible through the whole final VO line, not just a
// quick tail) bookending part 1's dusk mountain shot: same framing, calm instead of
// ominous. No depicted faces/likenesses of the real named victims.
// =============================================================================
const HOOK_CLIP = 'projects/dyatlov-pass-5-the-science/01-hook.mp4';
const HOOK_FRAME0 = 'projects/dyatlov-pass-5-the-science/01-hook-frame0.png';

export const compositionConfig = {
  id: 'DyatlovEp5Science',
  durationInSeconds: 34.6,
  fps: 30,
  width: 1080,
  height: 1920,
};

// Beat boundaries in GLOBAL frames @30fps, from beats.json's start_s/end_s * 30 — real
// values after gen_voice.py's retiming pass (setup and payoff both overflowed their first
// estimated windows; reveal's start was pushed back and the total duration extended).
const SCENES: Scene[] = [
  {
    key: 'hook',
    start: 0,
    end: 126,
    render: videoScene(HOOK_CLIP),
  },
  {
    key: 'setup',
    start: 126,
    end: 303,
    render: tsxScene(DebunkList),
  },
  {
    key: 'reveal',
    start: 303,
    end: 540,
    render: tsxScene(SlopeDiagram),
  },
  {
    key: 'twist',
    start: 540,
    end: 777,
    render: tsxScene(SlopeDiagramRelease),
  },
  {
    key: 'payoff-loop',
    start: 777,
    end: 1038,
    render: imageScene(HOOK_FRAME0),
  },
];

// The final VO line ends at 32.46s (frame ~974). SeriesEndCard fades in ~0.5s after that,
// in the silence the repo's "no CTA outro" rule leaves for every part's payoff to land in —
// this just marks the series as complete, no subscribe/watch-more language.
const END_CARD_AT = 990;

const DyatlovEp5Science: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: '#000' }}>
      <SceneTrack scenes={SCENES} />
      <Kicker text="DYATLOV PASS · FINAL" color={DYATLOV_ACCENT} y={130} />
      <Captions lines={VO} y={1460} size={50} accent={DYATLOV_ACCENT} maxWords={4} plate />
      <ProgressBar color={DYATLOV_ACCENT} />
      <SeriesEndCard atFrame={END_CARD_AT} />
    </AbsoluteFill>
  );
};

export default DyatlovEp5Science;
