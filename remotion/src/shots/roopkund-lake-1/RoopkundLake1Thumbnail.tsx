import React from 'react';
import { AbsoluteFill } from 'remotion';
import { ThumbnailCard } from '../../lib/roopkund';

// =============================================================================
// Static custom Shorts thumbnail for Roopkund Lake Part 1 — not a video beat, just a
// single-frame render (see tools/frames.mjs). Reuses the "no-names" still (skull foreground,
// lake+peaks background) already generated for beat 2 -- no new image needed.
// =============================================================================
export const compositionConfig = {
  id: 'RoopkundLake1Thumbnail',
  durationInSeconds: 1,
  fps: 30,
  width: 1080,
  height: 1920,
};

const RoopkundLake1Thumbnail: React.FC = () => (
  <AbsoluteFill>
    <ThumbnailCard
      bgSrc="projects/roopkund-lake-1-lake-of-bones/02-no-names.png"
      kicker="TRUE UNSOLVED MYSTERY"
      headline="800 SKELETONS"
      sub="ONE MOUNTAIN LAKE"
    />
  </AbsoluteFill>
);

export default RoopkundLake1Thumbnail;
