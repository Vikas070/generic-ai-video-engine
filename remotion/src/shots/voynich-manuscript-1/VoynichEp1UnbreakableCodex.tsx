import React from 'react';
import { AbsoluteFill } from 'remotion';
import { Captions, Kicker, ProgressBar } from '../../lib/shorts';
import { Scene, SceneTrack, imageScene, tsxScene } from '../../lib/hybrid';
import { VOYNICH_ACCENT, VoynichStatsReveal, PartTitleCard } from '../../lib/voynich';
import { VO } from './vo.gen';

// =============================================================================
// COMPOSITION CONFIG — Voynich Manuscript, a standalone 5-part series (like Dyatlov Pass and
// Roopkund Lake), Part 1/5: "The Unbreakable Codex".
// Hybrid composition (videos/voynich-manuscript-1-the-unbreakable-codex/beats.json): AI
// archival-style stills (Gemini gen_image.py, Nano Banana 2) for mood/illustration beats + a
// TSX stat-reveal beat (VoynichStatsReveal) for the manuscript's baseline numbers. No
// AI-generated likeness claimed as a real named person anywhere in this series.
// =============================================================================
const HOOK_STILL = 'projects/voynich-manuscript-1-the-unbreakable-codex/01-hook.png';

export const compositionConfig = {
  id: 'VoynichEp1UnbreakableCodex',
  durationInSeconds: 61.5,
  fps: 30,
  width: 1080,
  height: 1920,
};

// Beat boundaries in GLOBAL frames @30fps, from beats.json's start_s/end_s * 30.
const SCENES: Scene[] = [
  { key: 'hook', start: 0, end: 273, render: imageScene(HOOK_STILL, 0) },
  { key: 'stats', start: 273, end: 492, render: tsxScene(VoynichStatsReveal) },
  { key: 'friedman-intro', start: 492, end: 678, render: imageScene('projects/voynich-manuscript-1-the-unbreakable-codex/03-friedman-intro.png', 1) },
  { key: 'friedman-fails', start: 678, end: 864, render: imageScene('projects/voynich-manuscript-1-the-unbreakable-codex/04-friedman-fails.png', 2) },
  { key: 'modern-attempts', start: 864, end: 1017, render: imageScene('projects/voynich-manuscript-1-the-unbreakable-codex/05-modern-attempts.png', 0) },
  { key: 'illustrations-flora', start: 1017, end: 1158, render: imageScene('projects/voynich-manuscript-1-the-unbreakable-codex/06-illustrations-flora.png', 1) },
  { key: 'illustrations-strange', start: 1158, end: 1329, render: imageScene('projects/voynich-manuscript-1-the-unbreakable-codex/07-illustrations-strange.png', 0) },
  { key: 'still-unread', start: 1329, end: 1500, render: imageScene('projects/voynich-manuscript-1-the-unbreakable-codex/08-still-unread.png', 3) },
  {
    key: 'cliffhanger',
    start: 1500,
    end: 1845,
    render: tsxScene(({ dur }) => (
      <PartTitleCard dur={dur} bgSrc={HOOK_STILL} kicker="PART 1" title="WHAT IS IT HIDING?" />
    )),
  },
];

const VoynichEp1UnbreakableCodex: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: '#000' }}>
      <SceneTrack scenes={SCENES} />
      <Kicker text="VOYNICH MANUSCRIPT · 1/5" color={VOYNICH_ACCENT} y={130} />
      <Captions lines={VO} y={1460} size={50} accent={VOYNICH_ACCENT} maxWords={4} plate />
      <ProgressBar color={VOYNICH_ACCENT} />
    </AbsoluteFill>
  );
};

export default VoynichEp1UnbreakableCodex;
