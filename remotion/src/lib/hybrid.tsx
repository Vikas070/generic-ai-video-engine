// Hybrid scene track — the composition-side half of the "Scene Planner" in the target
// architecture. Every existing multi-shot composition (Ai1Door's SHOTS+Shot, Short7Kids's
// BEATS+KenBurnsImage, vox's CollageBoard Sequences) hand-rolls the SAME bookkeeping —
// map an array of {start, end} to <Sequence>s, pull `from` back by a crossfade tail, fade
// the inner content in — around a DIFFERENT inner renderer per track. SceneTrack factors
// that bookkeeping out ONCE; a Scene's `render` can be ANY engine, so ONE composition can
// mix an AI-video clip, a Ken-Burns AI still, and a plain TSX component (a chart, a board,
// a pause card from a niche lib) on the same global timeline — without re-deriving the
// crossfade math per project. Existing single-engine shot files don't need to adopt this;
// it's additive, for compositions that actually need to mix engines within one video.
import React from 'react';
import {
  AbsoluteFill,
  Img,
  OffthreadVideo,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
} from 'remotion';
import { KenBurnsImage } from './story';

export type SceneRender = React.FC<{ dur: number; fadeIn: number }>;

export type Scene = {
  key: string;
  start: number; // global frame this scene's content is FULLY settled by
  end: number; //   global frame the next scene takes over
  fadeIn?: number; // frames of crossfade pulled back from `start` (default 8; first scene 0)
  render: SceneRender;
};

const TAIL_DEFAULT = 8;

// One scene = one <Sequence>, `from` pulled back by its crossfade so the fade-in happens
// under the tail of the previous scene instead of after a hard cut.
export const SceneTrack: React.FC<{ scenes: Scene[] }> = ({ scenes }) => (
  <>
    {scenes.map((s, i) => {
      const fadeIn = i === 0 ? 0 : s.fadeIn ?? TAIL_DEFAULT;
      const from = Math.max(0, s.start - fadeIn);
      const dur = s.end - from;
      const Render = s.render;
      return (
        <Sequence key={s.key} from={from} durationInFrames={dur}>
          <Render dur={dur} fadeIn={fadeIn} />
        </Sequence>
      );
    })}
  </>
);

// ---------------------------------------------------------------------------------------
// Ready-made scene renderers, one per engine. Mix and match in one `scenes` array.
// ---------------------------------------------------------------------------------------

// AI-video clip — provider-agnostic: fal (gen_clip.py), official Veo (gen_veo.py), or a
// manually-ingested Flow export (ingest_flow_asset.py) all land here the same way, because
// all three write a plain mp4 under media/projects/. The scene doesn't know or care which.
export const videoScene = (src: string, opts?: { muted?: boolean }): SceneRender => {
  const Comp: SceneRender = ({ fadeIn }) => {
    const frame = useCurrentFrame();
    const opacity = fadeIn > 0
      ? interpolate(frame, [0, fadeIn], [0, 1], { extrapolateRight: 'clamp' })
      : 1;
    return (
      <AbsoluteFill style={{ opacity }}>
        <OffthreadVideo
          src={staticFile(src)}
          muted={opts?.muted ?? true}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </AbsoluteFill>
    );
  };
  return Comp;
};

// AI-generated still, ken-burned — thin wire-up of lib/story.tsx's KenBurnsImage to
// SceneTrack's dur/fadeIn so it can sit next to video/TSX scenes in the same array.
export const imageScene = (src: string, variant = 0): SceneRender => {
  const Comp: SceneRender = ({ dur, fadeIn }) => (
    <KenBurnsImage src={src} dur={dur} variant={variant} fadeIn={fadeIn} />
  );
  return Comp;
};

// A plain TSX component — a chart, a board, a pause card, any niche-lib visual. This is
// the actual "hybrid" half: code-drawn beats sit in the same track as video/image beats.
// The component manages its own internal motion off useCurrentFrame() as normal; this
// wrapper only handles the crossfade-in so it can enter under the previous scene's tail.
export const tsxScene = (Component: React.FC): SceneRender => {
  const Comp: SceneRender = ({ fadeIn }) => {
    const frame = useCurrentFrame();
    const opacity = fadeIn > 0
      ? interpolate(frame, [0, fadeIn], [0, 1], { extrapolateRight: 'clamp' })
      : 1;
    return (
      <AbsoluteFill style={{ opacity }}>
        <Component />
      </AbsoluteFill>
    );
  };
  return Comp;
};

// Dissolve onto a fixed still for the scene's whole duration — generalizes Ai1Door's
// LoopSettle so any hybrid track can pin its loop-closing frame precisely, whether the
// scene before it was video, a still, or TSX. Give this scene `fadeIn: 0` (no crossfade
// pull-back) so the dissolve owns the full duration itself; see PROVIDERS.md's "loop by
// constraint, not luck" rule — it applies exactly the same when the last beat is TSX.
export const loopSettleScene = (stillSrc: string): SceneRender => {
  const Comp: SceneRender = ({ dur }) => {
    const frame = useCurrentFrame();
    const opacity = interpolate(frame, [0, Math.max(1, dur)], [0, 1], {
      extrapolateRight: 'clamp',
    });
    return (
      <AbsoluteFill style={{ opacity }}>
        <Img src={staticFile(stillSrc)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </AbsoluteFill>
    );
  };
  return Comp;
};
