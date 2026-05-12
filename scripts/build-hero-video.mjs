#!/usr/bin/env node
/**
 * BUILD HERO VIDEO — Sure Fix Remodeling
 *
 * Stitches 8 AI-generated stills into one continuous cinematic
 * dolly-forward MP4 for the CinematicHero scroll-scrubbed component.
 *
 * Per frame:
 *   - Cropped to 1920×1080 (16:9)
 *   - Zoompan accumulator pushes from 1.00 → ~1.22 over the frame's
 *     duration, simulating a slow forward dolly within each beat
 *   - Crossfade (xfade) into the next frame, so the cut-line is hidden
 *     and the camera move feels continuous across the whole journey
 *
 * Output is encoded for scroll-scrubbing:
 *   - H.264, yuv420p, 30 fps
 *   - Keyframe every second  (-g 30 -keyint_min 30)
 *   - +faststart for progressive download
 *   - No audio
 *
 * Run:  node scripts/build-hero-video.mjs
 */

import { spawn } from 'node:child_process';
import { mkdirSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ffmpegPath from 'ffmpeg-static';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const FRAMES_DIR = '/Users/user/.cursor/projects/Users-user-Downloads-Sure-Fix-Website-Repository/assets';
const OUT_DIR   = path.join(ROOT, 'public', 'manus-storage');
const OUT_FILE  = path.join(OUT_DIR, 'sf-hero-walkthrough.mp4');
const POSTER    = path.join(OUT_DIR, 'sf-hero-walkthrough-poster.jpg');

const FRAMES = [
  'hero-frame-01-walkway.jpg',
  'hero-frame-02-closer.jpg',
  'hero-frame-03-door-opening.jpg',
  'hero-frame-04-foyer-staircase.jpg',
  'hero-frame-05-hallway-kitchen.jpg',
  'hero-frame-06-back-doors-closed.jpg',
  'hero-frame-07-back-doors-open.jpg',
  'hero-frame-08-backyard-pool.jpg',
].map(f => path.join(FRAMES_DIR, f));

// ── Timing knobs ───────────────────────────────────────────────────────
const PER_FRAME_SEC   = 2.6;   // how long each beat lingers
const CROSSFADE_SEC   = 0.55;  // overlap between beats — hides the cut
const FPS             = 30;
const W = 1920, H = 1080;

const ZOOM_MAX        = 1.22;  // max zoom per beat (forward dolly push)
const ZOOM_PER_FRAME  = (ZOOM_MAX - 1) / (PER_FRAME_SEC * FPS); // step size
// ───────────────────────────────────────────────────────────────────────

mkdirSync(OUT_DIR, { recursive: true });

// Each input frame, looped for its segment duration.
const inputs = FRAMES.flatMap(f => ['-loop', '1', '-t', String(PER_FRAME_SEC), '-i', f]);

// Per-input filter: crop to 16:9 → zoompan dolly push.
// d=1 keeps zoompan stateless across the loop'd image, so 'z' accumulates
// once per *output* frame instead of resetting every input frame.
const perInputFilters = FRAMES.map((_, i) => {
  return (
    `[${i}:v]` +
    `scale=${W * 2}:${H * 2}:force_original_aspect_ratio=increase,` +
    `crop=${W * 2}:${H * 2},` +                              // square-ish crop at 2× res for clean zoom
    `zoompan=z='min(zoom+${ZOOM_PER_FRAME.toFixed(5)},${ZOOM_MAX})':` +
    `d=1:s=${W}x${H}:fps=${FPS},` +
    `setsar=1,format=yuv420p` +
    `[v${i}]`
  );
}).join(';');

// xfade chain: v0 → v1 → v2 → ... → v7
const segmentLen = PER_FRAME_SEC;
let xfadeChain = '';
let prev = 'v0';
for (let i = 1; i < FRAMES.length; i++) {
  const out = i === FRAMES.length - 1 ? 'vfinal' : `vx${i}`;
  // offset: where to START the fade, relative to combined timeline so far.
  // After each xfade the combined length grows by (segmentLen - CROSSFADE_SEC).
  const offset = (segmentLen - CROSSFADE_SEC) * i - (segmentLen - CROSSFADE_SEC) + (segmentLen - CROSSFADE_SEC);
  // Simpler equivalent: offset = (segmentLen - CROSSFADE_SEC) * i
  const off = (segmentLen - CROSSFADE_SEC) * i;
  xfadeChain += `;[${prev}][v${i}]xfade=transition=fade:duration=${CROSSFADE_SEC}:offset=${off.toFixed(3)}[${out}]`;
  prev = out;
}

const filterComplex = perInputFilters + xfadeChain;

const args = [
  '-hide_banner', '-y',
  ...inputs,
  '-filter_complex', filterComplex,
  '-map', '[vfinal]',
  '-c:v', 'libx264',
  '-pix_fmt', 'yuv420p',
  '-preset', 'medium',
  '-crf', '20',
  '-r', String(FPS),
  '-g', String(FPS),                 // keyframe every 1 second
  '-keyint_min', String(FPS),
  '-sc_threshold', '0',
  '-movflags', '+faststart',
  '-an',
  OUT_FILE,
];

console.log(`▶ Building ${OUT_FILE}`);
console.log(`  ${FRAMES.length} frames × ${PER_FRAME_SEC}s, ${CROSSFADE_SEC}s crossfade, target ${W}×${H}@${FPS}fps`);

await run(ffmpegPath, args);

// ── Generate a poster frame (first frame of the video) for the hero ──
const posterArgs = [
  '-hide_banner', '-y',
  '-i', OUT_FILE,
  '-vframes', '1',
  '-q:v', '3',
  POSTER,
];
await run(ffmpegPath, posterArgs);

console.log(`✓ Done.`);
console.log(`  Video:  ${OUT_FILE}`);
console.log(`  Poster: ${POSTER}`);

function run(bin, args) {
  return new Promise((resolve, reject) => {
    const p = spawn(bin, args, { stdio: ['ignore', 'inherit', 'inherit'] });
    p.on('exit', code => code === 0 ? resolve() : reject(new Error(`${bin} exited ${code}`)));
  });
}
