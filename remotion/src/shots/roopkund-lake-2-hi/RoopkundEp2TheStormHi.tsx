import React from 'react';
import { AbsoluteFill } from 'remotion';
import { Captions, Kicker, ProgressBar } from '../../lib/shorts';
import { Scene, SceneTrack, imageScene, tsxScene } from '../../lib/hybrid';
import { ROOPKUND_ACCENT, RoopkundTrapDiagram, PartTitleCard } from '../../lib/roopkund';
import { FONT_HI } from '../../fonts';
import { VO } from './vo.gen';

// =============================================================================
// COMPOSITION CONFIG — Hindi dub of RoopkundEp2TheStorm (videos/roopkund-lake-2-the-storm-that-
// killed-them-hi/beats.json). Same visuals as the English composition, same locked George voice
// re-generated in Hindi via eleven_multilingual_v2. Two lines ("legend", "dating-match")
// OVERFLOWed their English-derived windows even at 1.3x tempo, so beats were retimed once (push
// the gap, don't --force re-bill) — every beat from "offense" onward is pushed later than the
// English cut; total durationSec (63.0) had enough slack in the cliffhanger tail that it didn't
// need to grow. Captions use FONT_HI (NotoSansDevanagari).
// =============================================================================
const HOOK_STILL = 'projects/roopkund-lake-2-the-storm-that-killed-them/01-hook.png';
const WOUND_STILL = 'projects/roopkund-lake-1-lake-of-bones/08-wound.png'; // Part 1's recurring motif still, reused, not regenerated

export const compositionConfig = {
  id: 'RoopkundEp2TheStormHi',
  durationInSeconds: 63.0,
  fps: 30,
  width: 1080,
  height: 1920,
};

const SCENES: Scene[] = [
  { key: 'hook', start: 0, end: 165, render: imageScene(HOOK_STILL, 0) },
  { key: 'legend', start: 165, end: 363, render: imageScene('projects/roopkund-lake-2-the-storm-that-killed-them/02-legend.png', 1) },
  { key: 'offense', start: 363, end: 528, render: imageScene('projects/roopkund-lake-2-the-storm-that-killed-them/03-offense.png', 2) },
  { key: 'wrath', start: 528, end: 663, render: imageScene('projects/roopkund-lake-2-the-storm-that-killed-them/04-wrath.png', 3) },
  { key: 'forensic-match', start: 663, end: 867, render: imageScene('projects/roopkund-lake-2-the-storm-that-killed-them/05-forensic-match.png', 1) },
  { key: 'trap', start: 867, end: 1062, render: tsxScene(RoopkundTrapDiagram) },
  { key: 'wound', start: 1062, end: 1233, render: imageScene(WOUND_STILL, 4) },
  { key: 'ruled-out', start: 1233, end: 1413, render: imageScene('projects/roopkund-lake-2-the-storm-that-killed-them/08-ruled-out.png', 0) },
  { key: 'dating-match', start: 1413, end: 1611, render: imageScene('projects/roopkund-lake-2-the-storm-that-killed-them/09-dating-match.png', 1) },
  {
    key: 'cliffhanger',
    start: 1611,
    end: 1890,
    render: tsxScene(({ dur }) => (
      <PartTitleCard dur={dur} bgSrc={HOOK_STILL} kicker="PART 2" title="BUT WHO WERE THEY?" />
    )),
  },
];

const RoopkundEp2TheStormHi: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: '#000' }}>
      <SceneTrack scenes={SCENES} />
      <Kicker text="ROOPKUND LAKE · 2/5" color={ROOPKUND_ACCENT} y={130} />
      <Captions lines={VO} y={1460} size={50} accent={ROOPKUND_ACCENT} maxWords={4} plate fontFamily={FONT_HI} />
      <ProgressBar color={ROOPKUND_ACCENT} />
    </AbsoluteFill>
  );
};

export default RoopkundEp2TheStormHi;
