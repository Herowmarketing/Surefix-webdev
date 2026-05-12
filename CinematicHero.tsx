/*
 * CINEMATIC HERO — Sure-Fix Remodeling
 *
 * Experience: One continuous scroll-scrubbed video that pulls the viewer
 * straight through a remodeled home — front walkway → foyer → hallway →
 * kitchen → living area → back doors → backyard reveal.
 *
 * Architecture:
 *   ┌─ <section> ──────────────────────────── height: 400vh ─┐
 *   │  ┌─ <div> sticky top-0 ───────── height: 100vh ───┐   │
 *   │  │  <video>   scroll drives video.currentTime     │   │
 *   │  │  overlays  fade as user moves inward           │   │
 *   │  └────────────────────────────────────────────────┘   │
 *   └────────────────────────────────────────────────────────┘
 *   The sticky container stays locked to the viewport while the
 *   browser scrolls 300vh of "hidden" space behind it.
 *   Scroll progress (0→1) maps linearly to video.currentTime (0→duration).
 *
 * Smoothing: requestAnimationFrame loop with lerp so the video catches
 * up gracefully rather than jumping on every scroll tick.
 *
 * ── HOW TO CUSTOMISE ──────────────────────────────────────────────────
 *
 * VIDEO:
 *   Replace VIDEO_SRC with your shotgun-house walkthrough MP4.
 *   Encode settings for smooth scrubbing:
 *     • Codec:      H.264 (broadest support) or H.265 (smaller file)
 *     • Keyframes:  Every 1 second (crucial — browsers can only seek to keyframes)
 *     • Bitrate:    ~6–10 Mbps for 1080p, ~3–5 Mbps for 720p
 *     • Duration:   8–20 seconds works best (too short = jerky, too long = slow)
 *     • ffmpeg example:
 *         ffmpeg -i input.mp4 -vcodec libx264 -g 30 -keyint_min 30
 *                -b:v 8M -movflags +faststart output.mp4
 *   Add a WebM source (<source type="video/webm">) for Firefox performance.
 *
 * POSTER:
 *   Replace POSTER_SRC with a JPEG of the front exterior.
 *   Used while video loads and for the reduced-motion fallback.
 *
 * SCROLL DISTANCE:
 *   Change SCROLL_MULTIPLIER (default: 4) to control scrub speed.
 *   ↑ higher  = user scrolls more to progress through the same video
 *   ↓ lower   = faster / shorter scroll session (minimum: 2)
 *
 * LERP SPEED:
 *   Change SCRUB_LERP (0–1) to adjust interpolation smoothness.
 *   0.10 = very silky but lags behind scroll
 *   0.22 = balanced — recommended
 *   0.50 = snappy / nearly instant
 *   1.00 = no smoothing (direct seek on every scroll event)
 *
 * ──────────────────────────────────────────────────────────────────────
 */

import { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useLeadStepper } from '@/contexts/LeadStepperContext';

// ── Config ────────────────────────────────────────────────────────────
const VIDEO_SRC = '/manus-storage/surefix-hero-kitchen2_004a6484.mp4';
// Replace with a high-res poster (JPEG, ~200–400KB):
const POSTER_SRC = '';
// How many viewport-heights the section occupies (scroll travel distance):
const SCROLL_MULTIPLIER = 4;
// Lerp factor per RAF frame — controls smoothing of video.currentTime:
const SCRUB_LERP = 0.22;
// ─────────────────────────────────────────────────────────────────────

export default function CinematicHero() {
  const sectionRef     = useRef<HTMLElement>(null);
  const videoRef       = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const overlayTextRef = useRef<HTMLDivElement>(null);

  // Mutable refs used inside RAF loop — no state updates needed
  const targetTimeRef  = useRef(0);
  const lerpedTimeRef  = useRef(0);
  const lastProgressRef = useRef(-1);
  const rafRef         = useRef<number>(0);

  const [videoReady, setVideoReady]   = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const { openStepper } = useLeadStepper();

  // ── Detect prefers-reduced-motion ───────────────────────────────────
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // ── RAF tick: smooth-lerp video.currentTime toward scroll target ─────
  //    Runs continuously but only mutates the DOM; no React re-renders.
  const tick = useCallback(() => {
    const video = videoRef.current;
    if (video && video.duration && videoReady) {
      const diff = targetTimeRef.current - lerpedTimeRef.current;
      // Only seek when the delta is meaningful (avoids redundant seeks)
      if (Math.abs(diff) > 0.004) {
        lerpedTimeRef.current += diff * SCRUB_LERP;
        video.currentTime = Math.max(0, Math.min(video.duration, lerpedTimeRef.current));
      }
    }
    rafRef.current = requestAnimationFrame(tick);
  }, [videoReady]);

  useEffect(() => {
    if (reducedMotion) return;
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [tick, reducedMotion]);

  // ── Scroll handler ───────────────────────────────────────────────────
  //    Runs on every scroll event. Computes 0–1 progress through the
  //    pinned section and maps it to video.currentTime + DOM effects.
  useEffect(() => {
    if (reducedMotion) return;

    const handleScroll = () => {
      const section = sectionRef.current;
      const video   = videoRef.current;
      if (!section || !video || !video.duration) return;

      // ── Progress calculation ──────────────────────────────────────
      // sectionTop: distance from page top to start of this section
      const sectionTop  = section.getBoundingClientRect().top + window.scrollY;
      // scrollable: how many px the user can scroll while section is pinned
      const scrollable  = section.offsetHeight - window.innerHeight;
      // raw: signed progress (negative before section, >1 after section)
      const raw         = (window.scrollY - sectionTop) / scrollable;
      const progress    = Math.max(0, Math.min(1, raw));

      if (Math.abs(progress - lastProgressRef.current) < 0.0005) return;
      lastProgressRef.current = progress;

      // ── Drive video time ──────────────────────────────────────────
      targetTimeRef.current = progress * video.duration;

      // ── Progress bar (direct DOM, 0 re-renders) ───────────────────
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${progress})`;
      }

      // ── Overlay text fade + subtle upward drift ───────────────────
      // Text is fully visible at 0% scroll and invisible by ~28%,
      // giving the feeling of being pulled into the house.
      if (overlayTextRef.current) {
        const opacity  = Math.max(0, 1 - progress / 0.28);
        const translateY = progress * -28;
        overlayTextRef.current.style.opacity   = String(opacity);
        overlayTextRef.current.style.transform = `translateY(${translateY}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Sync on mount in case page loaded mid-scroll
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [reducedMotion, videoReady]);

  // ── Entrance animation variants ──────────────────────────────────────
  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 32 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.95, delay, ease: 'easeOut' as const },
  });

  return (
    <section
      ref={sectionRef}
      style={{ height: `${SCROLL_MULTIPLIER * 100}vh` }}
      aria-label="Sure Fix Remodeling — scroll-driven cinematic home walkthrough"
    >
      {/* ── Sticky viewport: locked to top while user scrolls through section ── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#0d1117]">

        {/* ── Video ───────────────────────────────────────────────────────── */}
        {!reducedMotion ? (
          <video
            ref={videoRef}
            muted
            playsInline
            preload="auto"
            poster={POSTER_SRC || undefined}
            onLoadedMetadata={() => setVideoReady(true)}
            className="absolute inset-0 w-full h-full object-cover"
            // willChange hints the browser to keep this layer on the GPU
            style={{ willChange: 'contents' }}
          >
            <source src={VIDEO_SRC} type="video/mp4" />
            {/*
              Add a WebM source here for Firefox/Chromium parity:
              <source src="/path/to/hero-walkthrough.webm" type="video/webm" />
            */}
          </video>
        ) : (
          /* Reduced-motion: static image stand-in */
          <div
            className="absolute inset-0 bg-cover bg-center"
            role="img"
            aria-label="Beautifully remodeled home interior"
            style={{
              backgroundImage: POSTER_SRC ? `url(${POSTER_SRC})` : 'none',
              backgroundColor: '#0d1117',
            }}
          />
        )}

        {/* ── Cinematic overlay stack ─────────────────────────────────────── */}

        {/* Layer 1 — bottom + top dual fade for editorial framing */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, rgba(13,17,23,0.45) 0%, transparent 16%, transparent 60%, rgba(13,17,23,0.78) 100%)',
          }}
        />

        {/* Layer 2 — tunnel vignette: lightly darkens periphery, focus on centre axis */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 65% 90% at 50% 52%, transparent 55%, rgba(0,0,0,0.42) 100%)',
          }}
        />

        {/* ── Editorial overlay — minimal, artsy, single line ──────────────── */}
        <div
          ref={overlayTextRef}
          className="absolute inset-0 z-10 pointer-events-none"
          style={{ willChange: 'opacity, transform' }}
        >
          {/* Top-left corner mark — like a film title card */}
          <motion.div
            {...fadeUp(0.4)}
            className="absolute top-24 left-6 sm:left-10 md:left-14 flex items-center gap-3"
          >
            <div className="h-px w-6" style={{ background: 'rgba(255,255,255,0.35)' }} />
            <span
              className="text-[10px] uppercase tracking-[0.42em] text-white/55"
              style={{ fontFamily: 'Figtree, sans-serif', fontWeight: 500 }}
            >
              Sure Fix &nbsp;·&nbsp; Vol. 01
            </span>
          </motion.div>

          {/* Top-right scroll cue — single thin line, no chevron noise */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 1.2 }}
            className="absolute top-24 right-6 sm:right-10 md:right-14 flex items-center gap-3"
          >
            <span
              className="text-[10px] uppercase tracking-[0.42em] text-white/40"
              style={{ fontFamily: 'Figtree, sans-serif', fontWeight: 500 }}
            >
              Scroll
            </span>
            <motion.div
              className="h-6 w-px"
              style={{ background: 'rgba(255,255,255,0.45)', transformOrigin: 'top' }}
              animate={{ scaleY: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 2.6, ease: 'easeInOut' }}
            />
          </motion.div>

          {/* Centre headline — serif, minimal, two words on each line */}
          <div className="absolute inset-x-0 bottom-[18%] flex justify-center px-6">
            <motion.h1
              {...fadeUp(0.7)}
              className="text-center text-white"
              style={{
                fontFamily: 'Georgia, "Cormorant Garamond", serif',
                fontWeight: 300,
                fontSize: 'clamp(2.4rem, 6.2vw, 5.2rem)',
                lineHeight: 1.02,
                letterSpacing: '-0.015em',
              }}
            >
              <span className="block italic" style={{ fontWeight: 300 }}>
                Step
              </span>
              <span className="block" style={{ fontWeight: 400 }}>
                inside.
              </span>
            </motion.h1>
          </div>

          {/* Bottom-centre CTA hairline — one button, breathing room */}
          <motion.div
            {...fadeUp(1.05)}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-auto"
          >
            <button
              type="button"
              onClick={() => openStepper()}
              className="group inline-flex items-center gap-4 px-1 py-3 text-xs uppercase tracking-[0.32em] text-white/85 hover:text-white transition-colors duration-300"
              style={{ fontFamily: 'Figtree, sans-serif', fontWeight: 500, background: 'transparent', border: 'none' }}
            >
              <span
                className="h-px w-6 transition-all duration-500 group-hover:w-12"
                style={{ background: 'currentColor' }}
              />
              Begin Your Remodel
              <span
                className="h-px w-6 transition-all duration-500 group-hover:w-12"
                style={{ background: 'currentColor' }}
              />
            </button>
          </motion.div>
        </div>

        {/* ── Reduced motion: centred static layout (mirrors editorial look) ── */}
        {reducedMotion && (
          <div className="absolute inset-0 z-20 flex items-center justify-center px-8">
            <div className="text-center max-w-2xl">
              <h1
                className="text-white mb-10"
                style={{
                  fontFamily: 'Georgia, serif',
                  fontWeight: 300,
                  fontSize: 'clamp(2.4rem, 6vw, 4.8rem)',
                  lineHeight: 1.02,
                  letterSpacing: '-0.015em',
                }}
              >
                <span className="block italic">Step</span>
                <span className="block">inside.</span>
              </h1>
              <button
                type="button"
                onClick={() => openStepper()}
                className="inline-flex items-center gap-4 px-1 py-3 text-xs uppercase tracking-[0.32em] text-white/85"
                style={{ fontFamily: 'Figtree, sans-serif', fontWeight: 500, background: 'transparent', border: 'none' }}
              >
                <span className="h-px w-6" style={{ background: 'currentColor' }} />
                Begin Your Remodel
                <span className="h-px w-6" style={{ background: 'currentColor' }} />
              </button>
            </div>
          </div>
        )}

        {/* ── Scroll progress hairline (bottom edge) ──────────────────────── */}
        {/* Driven by direct DOM manipulation in the scroll handler above.    */}
        {/* Uses CSS transform: scaleX() — GPU-composited, no layout cost.   */}
        <div
          className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none"
          style={{ height: '2px', background: 'rgba(255,255,255,0.07)' }}
        >
          <div
            ref={progressBarRef}
            className="h-full origin-left"
            style={{
              background: 'linear-gradient(90deg, #394696 0%, #983631 60%, #983631 100%)',
              transform: 'scaleX(0)',
              // No CSS transition — updated by RAF loop directly
            }}
          />
        </div>

      </div>
      {/* End sticky viewport */}
    </section>
  );
}
