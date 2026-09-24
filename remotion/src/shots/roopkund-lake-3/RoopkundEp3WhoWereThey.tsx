import React from 'react';
import { AbsoluteFill } from 'remotion';
import { Captions, Kicker, ProgressBar } from '../../lib/shorts';
import { Scene, SceneTrack, imageScene, tsxScene } from '../../lib/hybrid';
import { ROOPKUND_ACCENT, RoopkundTwoGroupsChart, PartTitleCard } from '../../lib/roopkund';
import { VO } from './vo.gen';

// =============================================================================
// COMPOSITION CONFIG — Roopkund Lake, Part 3/5: "Who Were They?". Continues directly from
// Part 2's cliffhanger (videos/roopkund-lake-2-the-storm-that-killed-them/).
// Hybrid composition (videos/roopkund-lake-3-who-were-they/beats.json): AI atmosphere/forensic
// stills (tools/gen_image.py) + a new schematic diagram (lib/roopkund.tsx's
// RoopkundTwoGroupsChart) dramatizing the 2004 Walimbe report's "at least two distinct groups"
// finding. States the LEADING pre-DNA theory (pilgrims + local guides, one storm) without
// mentioning DNA/ancestry/timeline specifics — those are reserved for Part 4. No AI-generated
// likeness claimed as a real, documented person anywhere in this series. See script.md for
// full sourcing.
//
// Stills produced via Google Flow (manual export, tools/ingest_flow_asset.py) after Gemini's
// prepaid image credits came back 402 RESOURCE_EXHAUSTED — see media/projects/
// roopkund-lake-3-who-were-they/*.json sidecars for provenance. Voice generated with the
// locked narrator; retimed once after 'legend-recap'/'two-groups'/'wound' overflowed the 1.3x
// tempo cap (durationSec 60.5->61.5, every beat from 'forensic-return' onward pushed later) —
// see beats.json's notes for the exact numbers.
// =============================================================================
const HOOK_STILL = 'projects/roopkund-lake-3-who-were-they/01-hook.png';
const LEGEND_STILL = 'projects/roopkund-lake-2-the-storm-that-killed-them/02-legend.png'; // Part 2's still, reused, not regenerated
const WOUND_STILL = 'projects/roopkund-lake-1-lake-of-bones/08-wound.png'; // Part 1's recurring motif still, reused, not regenerated

export const compositionConfig = {
  id: 'RoopkundEp3WhoWereThey',
  durationInSeconds: 61.5,
  fps: 30,
  width: 1080,
  height: 1920,
};

// Beat boundaries in GLOBAL frames @30fps, from beats.json's retimed start_s/end_s * 30.
const SCENES: Scene[] = [
  { key: 'hook', start: 0, end: 177, render: imageScene(HOOK_STILL, 0) },
  { key: 'rival-theories', start: 177, end: 327, render: imageScene('projects/roopkund-lake-3-who-were-they/02-rival-theories.png', 1) },
  { key: 'legend-recap', start: 327, end: 528, render: imageScene(LEGEND_STILL, 2) },
  { key: 'forensic-return', start: 528, end: 681, render: imageScene('projects/roopkund-lake-3-who-were-they/04-forensic-return.png', 0) },
  { key: 'two-groups', start: 681, end: 873, render: tsxScene(RoopkundTwoGroupsChart) },
  { key: 'porters', start: 873, end: 1023, render: imageScene('projects/roopkund-lake-3-who-were-they/06-porters.png', 3) },
  { key: 'wound', start: 1023, end: 1200, render: imageScene(WOUND_STILL, 4) },
  { key: 'real-route', start: 1200, end: 1374, render: imageScene('projects/roopkund-lake-3-who-were-they/08-real-route.png', 1) },
  { key: 'leading-theory', start: 1374, end: 1509, render: imageScene('projects/roopkund-lake-3-who-were-they/09-leading-theory.png', 0) },
  {
    key: 'cliffhanger',
    start: 1509,
    end: 1845,
    render: tsxScene(({ dur }) => (
      <PartTitleCard dur={dur} bgSrc={HOOK_STILL} kicker="PART 3" title="BUT THAT WASN'T THE WHOLE STORY" />
    )),
  },
];

const RoopkundEp3WhoWereThey: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: '#000' }}>
      <SceneTrack scenes={SCENES} />
      <Kicker text="ROOPKUND LAKE · 3/5" color={ROOPKUND_ACCENT} y={130} />
      <Captions lines={VO} y={1460} size={50} accent={ROOPKUND_ACCENT} maxWords={4} plate />
      <ProgressBar color={ROOPKUND_ACCENT} />
    </AbsoluteFill>
  );
};

export default RoopkundEp3WhoWereThey;
