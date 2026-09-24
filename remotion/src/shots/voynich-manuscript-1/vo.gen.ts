// PLACEHOLDER — estimated timings from beats.json, no real word alignment yet.
// Run: python tools/gen_voice.py --beats videos/voynich-manuscript-1-the-unbreakable-codex/beats.json --emit-ts remotion/src/shots/voynich-manuscript-1/vo.gen.ts
// That command OVERWRITES this file with real ElevenLabs word times — do not hand-edit after.
import type { VoLine } from '../../lib/shorts';

export const VO: VoLine[] = [
  { text: "In a vault at Yale University sits a book six hundred years old. No one has ever read a single word of it.", start: 0.3, end: 8.8 },
  { text: "Two hundred and forty pages. Nearly thirty-eight thousand words. Written in an alphabet that matches nothing else on Earth.", start: 9.1, end: 16.1 },
  { text: "This man broke Japan's Purple cipher. He cracked Nazi codes that helped win World War Two.", start: 16.4, end: 22.3 },
  { text: "For decades, he threw everything he had at this manuscript. He never solved a single sentence.", start: 22.6, end: 28.5 },
  { text: "Supercomputers have tried. Neural networks have tried. Every one of them has failed.", start: 28.8, end: 33.6 },
  { text: "Its pages are covered in plants that don't exist anywhere in nature.", start: 33.9, end: 38.3 },
  { text: "Women bathing in green liquid, laced with tubing. Stars in patterns no astronomer recognizes.", start: 38.6, end: 43.8 },
  { text: "In an age of satellites and artificial intelligence, this book remains completely, stubbornly unread.", start: 44.3, end: 49.5 },
  { text: "Lost science. A hidden code. Or history's most brilliant hoax. The truth starts in a secret library, in 1912. Part 2.", start: 50.0, end: 57.8 },
];
