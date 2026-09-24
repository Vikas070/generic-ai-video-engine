import React from 'react';
import { AbsoluteFill } from 'remotion';
import { Captions, Kicker, ProgressBar } from '../../lib/shorts';
import { Scene, SceneTrack, loopSettleScene, tsxScene, videoScene } from '../../lib/hybrid';
import { ConditionsStatCards, DYATLOV_ACCENT, SearchFindingsList } from '../../lib/dyatlov';
import { VO } from './vo.gen';

// =============================================================================
// COMPOSITION CONFIG — Dyatlov Pass, Part 3/5: "The Search".
// Hybrid composition (videos/dyatlov-pass-3-the-search/beats.json): cinematic Google Flow
// motion clips (manually ingested — see media/projects/dyatlov-pass-3-the-search/*.json
// sidecars) for hook/reveal/twist + two TSX card beats (setup/payoff). Generic,
// unidentifiable search-party figures appear in reveal/twist (backs to camera, no visible
// faces) — never a depiction of the real named victims. The hook stays people-free (its
// VO point is that the tent is empty) and is also the loop target: loop-settle dissolves
// onto the hook clip's OWN extracted frame 0, never a separately-generated still.
// =============================================================================
const HOOK_CLIP = 'projects/dyatlov-pass-3-the-search/01-hook.mp4';
const HOOK_FRAME0 = 'projects/dyatlov-pass-3-the-search/01-hook-frame0.png';
const REVEAL_CLIP = 'projects/dyatlov-pass-3-the-search/02-reveal-footprints.mp4';
const TWIST_CLIP = 'projects/dyatlov-pass-3-the-search/03-twist-cedar.mp4';

export const compositionConfig = {
  id: 'DyatlovEp3Search',
  durationInSeconds: 35.5,
  fps: 30,
  width: 1080,
  height: 1920,
};

// Beat boundaries in GLOBAL frames @30fps, from beats.json's start_s/end_s * 30 — real
// values after gen_voice.py's second pass (the hook/setup lines overflowed their first
// estimated windows even at max atempo, so the whole timeline was retimed before this
// file was written; see beats.json's vo[] for the actual per-line timings).
const SCENES: Scene[] = [
  {
    key: 'hook',
    start: 0,
    end: 145,
    render: videoScene(HOOK_CLIP),
  },
  {
    key: 'setup',
    start: 145,
    end: 355,
    render: tsxScene(SearchFindingsList),
  },
  {
    key: 'reveal',
    start: 355,
    end: 528,
    render: videoScene(REVEAL_CLIP),
  },
  {
    key: 'twist',
    start: 528,
    end: 751,
    render: videoScene(TWIST_CLIP),
  },
  {
    key: 'payoff',
    start: 751,
    end: 1041,
    render: tsxScene((p) => (
      <ConditionsStatCards
        {...p}
        items={['2 found near the tree', '3 more between tree and tent', '4 still missing']}
        // Explicit per-item timing (not the generic even-stagger) so each card lands just
        // ahead of its real word time (vo[].words, gen_voice.py's actual alignment) instead
        // of drifting up to ~4s early on the last card once the narration's own gaps and
        // pauses are accounted for.
        atFrames={[46, 118, 245]}
      />
    )),
  },
  {
    key: 'loop-settle',
    start: 1041,
    end: 1065,
    fadeIn: 0,
    render: loopSettleScene(HOOK_FRAME0),
  },
];

const DyatlovEp3Search: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: '#000' }}>
      <SceneTrack scenes={SCENES} />
      <Kicker text="DYATLOV PASS · 3/5" color={DYATLOV_ACCENT} y={130} />
      <Captions lines={VO} y={1460} size={50} accent={DYATLOV_ACCENT} maxWords={4} plate />
      <ProgressBar color={DYATLOV_ACCENT} />
    </AbsoluteFill>
  );
};

export default DyatlovEp3Search;
