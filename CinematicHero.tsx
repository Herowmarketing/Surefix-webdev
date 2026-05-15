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
 * Smooth scrubbing: one seek per scroll tick (RAF-coalesced), plus
 * `fastSeek()` where supported. The hero MP4 is encoded with a keyframe
 * every 3 frames (g=3) so seeks snap quickly without decode backlog.
 *
 * ── HOW TO CUSTOMISE ──────────────────────────────────────────────────
 *
 * VIDEO:
 *   Replace VIDEO_SRC / VIDEO_SRC_MOBILE with your walkthrough MP4s (or one tier).
 *   Encode for scroll scrubbing (smooth + crisp). Two tiers:
 *     • 4K (default hero on tablet/desktop): Lanczos upscale + CRF ~26
 *     • 1080p (narrow viewports only): lighter file for phones, CRF ~22
 *     • Keyframes:  Every 3 frames: -g 3 -keyint_min 3 -sc_threshold 0
 *     • Mux:        -movflags +faststart   (progressive download)
 *     • Strip:      -an -sn (no audio/subtitles for hero)
 *     • ffmpeg 1080:
 *         ffmpeg -i input.mp4 -c:v libx264 -pix_fmt yuv420p -crf 22 \\
 *                -g 3 -keyint_min 3 -sc_threshold 0 -preset medium \\
 *                -movflags +faststart -an -sn sf-hero-scrub.mp4
 *     • ffmpeg 4K (upscale from 1080 source):
 *         ffmpeg -i input.mp4 -vf "scale=3840:2160:flags=lanczos+accurate_rnd" \\
 *                -c:v libx264 -pix_fmt yuv420p -crf 26 -g 3 -keyint_min 3 \\
 *                -sc_threshold 0 -preset medium -movflags +faststart -an -sn \\
 *                sf-hero-scrub-4k.mp4
 *   Add a WebM source (<source type="video/webm">) if you need smaller files.
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
 * ──────────────────────────────────────────────────────────────────────
 */

import { useRef, useEffect, useLayoutEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useLeadStepper } from '@/contexts/LeadStepperContext';
import { HERO_STILLS } from '@/lib/site-images';

// ── Config ────────────────────────────────────────────────────────────
// GOP=1 (every frame is a keyframe) — guaranteed instant seek at any
// scroll position. Encoded via scripts/encode-scroll-video.mjs using
// ffmpeg-static: 1920×1080, H.264 CRF 22, yuv420p, +faststart, no audio.
const VIDEO_SRC        = '/Sure%20Fix%20Hero%20Video/hero_scroll_final.mp4';
const VIDEO_SRC_MOBILE = '/Sure%20Fix%20Hero%20Video/hero_scroll_final.mp4';
const VIDEO_MOBILE_MEDIA = '(max-width: 1023px)';
const POSTER_SRC = HERO_STILLS.main;
// Section height: 400vh total, 300vh of scroll travel while pinned.
const SCROLL_MULTIPLIER = 4;
// ─────────────────────────────────────────────────────────────────────

export default function CinematicHero() {
  const sectionRef     = useRef<HTMLElement>(null);
  const videoRef       = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const overlayTextRef = useRef<HTMLDivElement>(null);

  // Track whether a seek RAF is already queued to avoid stacking seeks.
  const pendingSeekRef  = useRef(false);
  const targetTimeRef   = useRef(0);
  const lastProgressRef = useRef(-1);
  /** Coalesce window scroll → one layout read + scrub per animation frame */
  const scrollRafRef = useRef<number | null>(null);

  const [reducedMotion, setReducedMotion] = useState(false);
  /** Pick ONE mp4 URL — `<source media>` is unreliable for `<video>` in Safari/Chrome. */
  const [heroVideoSrc, setHeroVideoSrc] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia(VIDEO_MOBILE_MEDIA).matches
      ? VIDEO_SRC_MOBILE
      : VIDEO_SRC
  );

  const { openStepper } = useLeadStepper();

  // ── Detect prefers-reduced-motion ───────────────────────────────────
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // ── Hero tier: mobile vs desktop (single `src`, no `<source media>`) ─
  useEffect(() => {
    const mq = window.matchMedia(VIDEO_MOBILE_MEDIA);
    const pick = () => setHeroVideoSrc(mq.matches ? VIDEO_SRC_MOBILE : VIDEO_SRC);
    pick();
    mq.addEventListener('change', pick);
    return () => mq.removeEventListener('change', pick);
  }, []);

  // ── Scroll handler ───────────────────────────────────────────────────
  //    One seek per scroll event via a dirty-flag + single RAF.
  //    fastSeek() is used where available — it hits the nearest keyframe
  //    immediately without waiting for an exact frame decode, eliminating
  //    the stutter that comes from seeking on every animation frame.
  const applySeek = useCallback(() => {
    const video = videoRef.current;
    if (video && Number.isFinite(video.duration) && video.duration > 0) {
      const t = Math.max(0, Math.min(video.duration, targetTimeRef.current));
      if (typeof (video as HTMLVideoElement & { fastSeek?: (t: number) => void }).fastSeek === 'function') {
        (video as HTMLVideoElement & { fastSeek: (t: number) => void }).fastSeek(t);
      } else {
        video.currentTime = t;
      }
    }
    pendingSeekRef.current = false;
  }, []);

  const handleScroll = useCallback(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
    const sectionTop = section.getBoundingClientRect().top + scrollY;
    const scrollable = Math.max(1, section.offsetHeight - window.innerHeight);
    const progress = Math.max(0, Math.min(1, (scrollY - sectionTop) / scrollable));

    if (progressBarRef.current) {
      progressBarRef.current.style.transform = `scaleX(${progress})`;
    }
    if (overlayTextRef.current) {
      overlayTextRef.current.style.opacity = String(Math.max(0, 1 - progress / 0.28));
      overlayTextRef.current.style.transform = `translateY(${progress * -28}px)`;
    }

    if (!Number.isFinite(video.duration) || video.duration <= 0) {
      return;
    }

    if (Math.abs(progress - lastProgressRef.current) < 0.0003) return;
    lastProgressRef.current = progress;

    targetTimeRef.current = progress * video.duration;

    if (!pendingSeekRef.current) {
      pendingSeekRef.current = true;
      requestAnimationFrame(applySeek);
    }
  }, [applySeek]);

  useLayoutEffect(() => {
    if (reducedMotion) return;

    const onMeta = () => {
      lastProgressRef.current = -1;
      handleScroll();
    };

    const onScroll = () => {
      if (scrollRafRef.current != null) return;
      scrollRafRef.current = requestAnimationFrame(() => {
        scrollRafRef.current = null;
        handleScroll();
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    const v = videoRef.current;
    v?.addEventListener('loadedmetadata', onMeta);
    v?.addEventListener('loadeddata', onMeta);
    v?.addEventListener('durationchange', onMeta);

    onScroll();

    return () => {
      pendingSeekRef.current = false;
      if (scrollRafRef.current != null) {
        cancelAnimationFrame(scrollRafRef.current);
        scrollRafRef.current = null;
      }
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      v?.removeEventListener('loadedmetadata', onMeta);
      v?.removeEventListener('loadeddata', onMeta);
      v?.removeEventListener('durationchange', onMeta);
    };
  }, [reducedMotion, handleScroll, heroVideoSrc]);

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
            key={heroVideoSrc}
            ref={videoRef}
            src={heroVideoSrc}
            muted
            playsInline
            preload="auto"
            poster={POSTER_SRC || undefined}
            className="absolute inset-0"
            style={{
              width: '100vw',
              height: '100vh',
              objectFit: 'cover',
              objectPosition: 'center',
              willChange: 'contents',
            }}
          />
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
