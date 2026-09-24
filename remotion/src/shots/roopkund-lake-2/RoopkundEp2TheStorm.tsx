import React from 'react';
import { AbsoluteFill } from 'remotion';
import { Captions, Kicker, ProgressBar } from '../../lib/shorts';
import { Scene, SceneTrack, imageScene, tsxScene } from '../../lib/hybrid';
import { ROOPKUND_ACCENT, RoopkundTrapDiagram, PartTitleCard } from '../../lib/roopkund';
import { VO } from './vo.gen';

// =============================================================================
// COMPOSITION CONFIG — Roopkund Lake, Part 2/5: "The Storm That Killed Them". Continues
// directly from Part 1's cliffhanger (videos/roopkund-lake-1-lake-of-bones/).
// Hybrid composition (videos/roopkund-lake-2-the-storm-that-killed-them/beats.json): AI
// atmosphere/legend/forensic stills (tools/gen_image.py) for mood + a new schematic diagram
// (lib/roopkund.tsx's RoopkundTrapDiagram) explaining the bowl-valley terrain. No AI-generated
// likeness claimed as a real, documented person anywhere in this series — legend figures
// (Raja Jasdhaval, Rani Balampa) and the named forensic scientist (Subhash Walimbe) are all
// shown generically/anonymized or not depicted at all. See script.md for full sourcing.
// =============================================================================
const HOOK_STILL = 'projects/roopkund-lake-2-the-storm-that-killed-them/01-hook.png';
const WOUND_STILL = 'projects/roopkund-lake-1-lake-of-bones/08-wound.png'; // Part 1's recurring motif still, reused, not regenerated

export const compositionConfig = {
  id: 'RoopkundEp2TheStorm',
  durationInSeconds: 63.0,
  fps: 30,
  width: 1080,
  height: 1920,
};

// Beat boundaries in GLOBAL frames @30fps, from beats.json's start_s/end_s * 30 — retimed once
// after gen_voice.py flagged 'forensic-match' and 'wound' as OVERFLOW (real speech needed more
// room than the ~2.5wps estimate even at the 1.3x tempo cap); every beat from 'trap' onward
// pushed later per the repo's VO retiming procedure (push the gap, don't --force re-bill).
const SCENES: Scene[] = [
  { key: 'hook', start: 0, end: 165, render: imageScene(HOOK_STILL, 0) },
  { key: 'legend', start: 165, end: 345, render: imageScene('projects/roopkund-lake-2-the-storm-that-killed-them/02-legend.png', 1) },
  { key: 'offense', start: 345, end: 510, render: imageScene('projects/roopkund-lake-2-the-storm-that-killed-them/03-offense.png', 2) },
  { key: 'wrath', start: 510, end: 645, render: imageScene('projects/roopkund-lake-2-the-storm-that-killed-them/04-wrath.png', 3) },
  { key: 'forensic-match', start: 645, end: 849, render: imageScene('projects/roopkund-lake-2-the-storm-that-killed-them/05-forensic-match.png', 1) },
  { key: 'trap', start: 849, end: 1044, render: tsxScene(RoopkundTrapDiagram) },
  { key: 'wound', start: 1044, end: 1215, render: imageScene(WOUND_STILL, 4) },
  { key: 'ruled-out', start: 1215, end: 1395, render: imageScene('projects/roopkund-lake-2-the-storm-that-killed-them/08-ruled-out.png', 0) },
  { key: 'dating-match', start: 1395, end: 1575, render: imageScene('projects/roopkund-lake-2-the-storm-that-killed-them/09-dating-match.png', 1) },
  {
    key: 'cliffhanger',
    start: 1575,
    end: 1890,
    render: tsxScene(({ dur }) => (
      <PartTitleCard dur={dur} bgSrc={HOOK_STILL} kicker="PART 2" title="BUT WHO WERE THEY?" />
    )),
  },
];

const RoopkundEp2TheStorm: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: '#000' }}>
      <SceneTrack scenes={SCENES} />
      <Kicker text="ROOPKUND LAKE · 2/5" color={ROOPKUND_ACCENT} y={130} />
      <Captions lines={VO} y={1460} size={50} accent={ROOPKUND_ACCENT} maxWords={4} plate />
      <ProgressBar color={ROOPKUND_ACCENT} />
    </AbsoluteFill>
  );
};

export default RoopkundEp2TheStorm;
