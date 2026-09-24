import React from 'react';
import { AbsoluteFill } from 'remotion';
import { Captions, Kicker, ProgressBar } from '../../lib/shorts';
import { Scene, SceneTrack, imageScene, tsxScene } from '../../lib/hybrid';
import { ROOPKUND_ACCENT, RoopkundGeneticGroupsChart, RoopkundTrapDiagram, PartTitleCard } from '../../lib/roopkund';
import { VO } from './vo.gen';

// =============================================================================
// COMPOSITION CONFIG — Roopkund Lake, Part 4/5: "A Thousand Years Apart". Continues directly
// from Part 3's cliffhanger (videos/roopkund-lake-3-who-were-they/), which withheld the DNA
// reveal on purpose. Hybrid composition (videos/roopkund-lake-4-a-thousand-years-apart/
// beats.json): AI atmosphere/lab/landscape stills (tools/gen_image.py, generated manually via
// Google Flow -- Gemini's AI Studio prepaid credits were still exhausted, same gotcha as Part
// 3) + one new schematic diagram (lib/roopkund.tsx's RoopkundGeneticGroupsChart) dramatizing
// the 2019 Harney et al. ancient-DNA finding of three genetically distinct groups, + a reused
// beat on Part 2's RoopkundTrapDiagram (no new TSX, no new cost) to callback the same lethal
// terrain claiming a second group centuries later. No AI-generated likeness claimed as a real,
// documented person anywhere in this series; group-a/group-b/group-c beats show landscape/place
// imagery only, no human figures at all (a stricter reading of the editorial rule than Parts
// 1-3 needed). Cliffhanger states the paper's own open "is a mystery" finding truthfully,
// reserved answer for Part 5. See script.md for full sourcing.
//
// Voice generated with the locked narrator; retimed once after 'wound' overflowed the 1.3x
// tempo cap (durationSec 66.0->67.2, every beat from 'second-storm' onward pushed later) — see
// beats.json's vo[] for the exact numbers.
// =============================================================================
const HOOK_STILL = 'projects/roopkund-lake-4-a-thousand-years-apart/01-hook.png';
const LEADING_THEORY_STILL = 'projects/roopkund-lake-3-who-were-they/09-leading-theory.png'; // Part 3's still, reused, not regenerated
const GROUP_B_STILL = 'projects/roopkund-lake-4-a-thousand-years-apart/06-group-b.png';
const WOUND_STILL = 'projects/roopkund-lake-1-lake-of-bones/08-wound.png'; // Part 1's recurring motif still, reused, not regenerated

export const compositionConfig = {
  id: 'RoopkundEp4AThousandYearsApart',
  durationInSeconds: 67.2,
  fps: 30,
  width: 1080,
  height: 1920,
};

// Beat boundaries in GLOBAL frames @30fps, from beats.json's retimed start_s/end_s * 30.
const SCENES: Scene[] = [
  { key: 'hook', start: 0, end: 186, render: imageScene(HOOK_STILL, 0) },
  { key: 'recap-test', start: 186, end: 351, render: imageScene(LEADING_THEORY_STILL, 2) },
  { key: 'dna-lab', start: 351, end: 459, render: imageScene('projects/roopkund-lake-4-a-thousand-years-apart/03-dna-lab.png', 0) },
  { key: 'genetic-groups', start: 459, end: 624, render: tsxScene(RoopkundGeneticGroupsChart) },
  { key: 'group-a', start: 624, end: 777, render: imageScene('projects/roopkund-lake-4-a-thousand-years-apart/05-group-a.png', 1) },
  { key: 'group-b', start: 777, end: 975, render: imageScene(GROUP_B_STILL, 0) },
  { key: 'group-c', start: 975, end: 1083, render: imageScene(GROUP_B_STILL, 3) },
  { key: 'wound', start: 1083, end: 1239, render: imageScene(WOUND_STILL, 4) },
  { key: 'second-storm', start: 1239, end: 1470, render: tsxScene(RoopkundTrapDiagram) },
  { key: 'mystery-why', start: 1470, end: 1734, render: imageScene('projects/roopkund-lake-4-a-thousand-years-apart/09-mystery-why.png', 0) },
  {
    key: 'cliffhanger',
    start: 1734,
    end: 2016,
    render: tsxScene(({ dur }) => (
      <PartTitleCard dur={dur} bgSrc={HOOK_STILL} kicker="PART 4" title="A THOUSAND YEARS APART" />
    )),
  },
];

const RoopkundEp4AThousandYearsApart: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: '#000' }}>
      <SceneTrack scenes={SCENES} />
      <Kicker text="ROOPKUND LAKE · 4/5" color={ROOPKUND_ACCENT} y={130} />
      <Captions lines={VO} y={1460} size={50} accent={ROOPKUND_ACCENT} maxWords={4} plate />
      <ProgressBar color={ROOPKUND_ACCENT} />
    </AbsoluteFill>
  );
};

export default RoopkundEp4AThousandYearsApart;
