#!/usr/bin/env node
/**
 * ENCODE SCROLL VIDEO — Sure Fix Remodeling
 *
 * Re-encodes an MP4 into a scroll-scrub-optimised asset:
 *   - GOP = 1 (-g 1 -keyint_min 1) for instant seek on any frame
 *   - 1920px wide, H.264 yuv420p, CRF 22, +faststart, no audio
 *
 * Output (served by Vite/Vercel): public/Sure Fix Hero Video/hero_scroll_final.mp4
 *
 * Run:  node scripts/encode-scroll-video.mjs
 */

import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ffmpegPath from 'ffmpeg-static';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const CANDIDATE_INPUTS = [
  path.join(ROOT, 'Sure Fix Hero Video Final.mp4'),
  path.join(ROOT, 'Sure Fix Hero Video', 'Untitled video.mp4'),
];

const INPUT = CANDIDATE_INPUTS.find((p) => existsSync(p));
const OUTPUT = path.join(ROOT, 'public', 'Sure Fix Hero Video', 'hero_scroll_final.mp4');

if (!INPUT) {
  console.error('✗ No source MP4 found. Place one of:');
  for (const p of CANDIDATE_INPUTS) console.error(`    ${p}`);
  process.exit(1);
}

const args = [
  '-hide_banner', '-y',
  '-i', INPUT,
  '-vf', 'scale=1920:-2',
  '-c:v', 'libx264',
  '-pix_fmt', 'yuv420p',
  '-preset', 'medium',
  '-crf', '22',
  '-g', '1',
  '-keyint_min', '1',
  '-sc_threshold', '0',
  '-movflags', '+faststart',
  '-an',
  OUTPUT,
];

console.log(`▶ ${ffmpegPath}`);
console.log(`  Input : ${INPUT}`);
console.log(`  Output: ${OUTPUT}\n`);

await run(ffmpegPath, args);

console.log(`\n✓ Done → ${OUTPUT}`);

function run(bin, argv) {
  return new Promise((resolve, reject) => {
    const p = spawn(bin, argv, { stdio: ['ignore', 'inherit', 'inherit'] });
    p.on('exit', code =>
      code === 0 ? resolve() : reject(new Error(`ffmpeg exited with code ${code}`)),
    );
  });
}
