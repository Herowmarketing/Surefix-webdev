#!/usr/bin/env node
/**
 * ENCODE SCROLL VIDEO — Sure Fix Remodeling
 *
 * Re-encodes an existing MP4 into a scroll-scrub-optimised version:
 *   - Every frame is a keyframe (GOP = 1 / -g 1 -keyint_min 1)
 *     so CinematicHero can seek to any point without decode lag.
 *   - Scaled to 1920px wide (height auto, divisible by 2)
 *   - H.264 yuv420p, CRF 22, +faststart, no audio
 *
 * Run:  node scripts/encode-scroll-video.mjs
 */

import { spawn }         from 'node:child_process';
import { existsSync }    from 'node:fs';
import path              from 'node:path';
import { fileURLToPath } from 'node:url';
import ffmpegPath        from 'ffmpeg-static';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// Source lives in the repo root (untracked, not under public/)
const INPUT  = path.join(ROOT, 'FINAL SURE FIX HERO VIDEO.mp4');
// Output goes into public/ so Vite serves it as a static asset
const OUTPUT = path.join(ROOT, 'public', 'Sure Fix Hero Video', 'Hero_Scroll_Perfect.mp4');

if (!existsSync(INPUT)) {
  console.error(`✗ Input not found: ${INPUT}`);
  process.exit(1);
}

const args = [
  '-hide_banner', '-y',
  '-i', INPUT,
  '-vf', 'scale=1920:-2',          // 1920 wide, height auto (must be ÷2 for yuv420p)
  '-c:v', 'libx264',
  '-pix_fmt', 'yuv420p',
  '-preset', 'medium',
  '-crf', '22',
  '-g', '1',                       // keyframe every frame — instant seek, no decode lag
  '-keyint_min', '1',
  '-sc_threshold', '0',
  '-movflags', '+faststart',       // progressive download / immediate playback
  '-an',                           // strip audio — hero is always muted
  OUTPUT,
];

console.log(`▶ ffmpeg-static  →  ${ffmpegPath}`);
console.log(`  Input : ${INPUT}`);
console.log(`  Output: ${OUTPUT}`);
console.log(`  Settings: 1920px wide · GOP=1 · CRF 22 · no audio\n`);

await run(ffmpegPath, args);

console.log(`\n✓  Done → ${OUTPUT}`);

function run(bin, argv) {
  return new Promise((resolve, reject) => {
    const p = spawn(bin, argv, { stdio: ['ignore', 'inherit', 'inherit'] });
    p.on('exit', code =>
      code === 0 ? resolve() : reject(new Error(`ffmpeg exited with code ${code}`))
    );
  });
}
