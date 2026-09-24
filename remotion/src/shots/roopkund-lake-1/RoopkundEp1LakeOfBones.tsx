import React from 'react';
import { AbsoluteFill } from 'remotion';
import { Captions, Kicker, ProgressBar } from '../../lib/shorts';
import { Scene, SceneTrack, imageScene, tsxScene } from '../../lib/hybrid';
import { ROOPKUND_ACCENT, RoopkundMapZoom, PartTitleCard } from '../../lib/roopkund';
import { VO } from './vo.gen';

// =============================================================================
// COMPOSITION CONFIG — Roopkund Lake, a standalone 5-part series (like Dyatlov Pass), Part
// 1/5: "The Lake of Bones".
// Hybrid composition (videos/roopkund-lake-1-lake-of-bones/beats.json): AI atmosphere stills
// (Google Flow, Nano Banana, manually ingested via tools/ingest_flow_asset.py — see
// media/projects/roopkund-lake-1-lake-of-bones/*.json sidecars for provenance) for mood + a
// real computed map (lib/map.tsx, reused via lib/roopkund.tsx) for the location beat. No
// AI-generated likeness claimed as a real named person anywhere in this series.
// =============================================================================
const HOOK_STILL = 'projects/roopkund-lake-1-lake-of-bones/01-hook.png';
const WOUND_STILL = 'projects/roopkund-lake-1-lake-of-bones/08-wound.png';

export const compositionConfig = {
  id: 'RoopkundEp1LakeOfBones',
  durationInSeconds: 61.5,
  fps: 30,
  width: 1080,
  height: 1920,
};

// Beat boundaries in GLOBAL frames @30fps, from beats.json's start_s/end_s * 30 — retimed once
// after gen_voice.py flagged the "preserved" line as OVERFLOW (real speech needed 7.45s, not
// the 6.95s estimate); every beat from "scale" onward was pushed +0.5s later, per the repo's
// VO retiming procedure (push the gap, don't --force re-bill).
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

const RoopkundEp1LakeOfBones: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: '#000' }}>
      <SceneTrack scenes={SCENES} />
      <Kicker text="ROOPKUND LAKE · 1/5" color={ROOPKUND_ACCENT} y={130} />
      <Captions lines={VO} y={1460} size={50} accent={ROOPKUND_ACCENT} maxWords={4} plate />
      <ProgressBar color={ROOPKUND_ACCENT} />
    </AbsoluteFill>
  );
};

export default RoopkundEp1LakeOfBones;
