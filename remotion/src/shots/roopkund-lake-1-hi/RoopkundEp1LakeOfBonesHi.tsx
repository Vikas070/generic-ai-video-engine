import React from 'react';
import { AbsoluteFill } from 'remotion';
import { Captions, Kicker, ProgressBar } from '../../lib/shorts';
import { Scene, SceneTrack, imageScene, tsxScene } from '../../lib/hybrid';
import { ROOPKUND_ACCENT, RoopkundMapZoom, PartTitleCard } from '../../lib/roopkund';
import { FONT_HI } from '../../fonts';
import { VO } from './vo.gen';

// =============================================================================
// COMPOSITION CONFIG — Hindi dub pilot of RoopkundEp1LakeOfBones (videos/roopkund-lake-1-lake-
// of-bones-hi/beats.json). Same visuals/beats as the English composition, same locked George
// voice re-generated in Hindi via eleven_multilingual_v2 (no OVERFLOW on any line, so beat
// boundaries are unchanged from the English cut). Captions use FONT_HI (NotoSansDevanagari) —
// the brand's Latin-only display font has no Devanagari glyphs.
// =============================================================================
const HOOK_STILL = 'projects/roopkund-lake-1-lake-of-bones/01-hook.png';
const WOUND_STILL = 'projects/roopkund-lake-1-lake-of-bones/08-wound.png';

export const compositionConfig = {
  id: 'RoopkundEp1LakeOfBonesHi',
  durationInSeconds: 61.5,
  fps: 30,
  width: 1080,
  height: 1920,
};

// Beat boundaries in GLOBAL frames @30fps — identical to the English cut (start_s/end_s * 30
// from beats.json), reused verbatim since the Hindi VO fit every window with no retiming.
const SCENES: Scene[] = [
  { key: 'hook', start: 0, end: 198, render: imageScene(HOOK_STILL, 0) },
  { key: 'no-names', start: 198, end: 330, render: imageScene('projects/roopkund-lake-1-lake-of-bones/02-no-names.png', 1) },
  { key: 'discovery', start: 330, end: 471, render: imageScene('projects/roopkund-lake-1-lake-of-bones/03-discovery.png', 2) },
  { key: 'false-lead', start: 471, end: 642, render: imageScene('projects/roopkund-lake-1-lake-of-bones/04-false-lead.png', 3) },
  { key: 'preserved', start: 642, end: 867, render: imageScene('projects/roopkund-lake-1-lake-of-bones/05-preserved.png', 1) },
  { key: 'scale', start: 867, end: 1062, render: imageScene('projects/roopkund-lake-1-lake-of-bones/06-scale.png', 0) },
  { key: 'map', start: 1062, end: 1308, render: tsxScene(RoopkundMapZoom) },
  { key: 'wound', start: 1308, end: 1425, render: imageScene(WOUND_STILL, 1) },
  { key: 'struck', start: 1425, end: 1563, render: imageScene(WOUND_STILL, 4) },
  {
    key: 'cliffhanger',
    start: 1563,
    end: 1845,
    render: tsxScene(({ dur }) => (
      <PartTitleCard dur={dur} bgSrc={HOOK_STILL} kicker="PART 1" title="WHAT KILLED THEM?" />
    )),
  },
];

const RoopkundEp1LakeOfBonesHi: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: '#000' }}>
      <SceneTrack scenes={SCENES} />
      <Kicker text="ROOPKUND LAKE · 1/5" color={ROOPKUND_ACCENT} y={130} />
      <Captions lines={VO} y={1460} size={50} accent={ROOPKUND_ACCENT} maxWords={4} plate fontFamily={FONT_HI} />
      <ProgressBar color={ROOPKUND_ACCENT} />
    </AbsoluteFill>
  );
};

export default RoopkundEp1LakeOfBonesHi;
