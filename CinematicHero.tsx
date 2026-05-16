/*
 * CINEMATIC HERO — Sure-Fix Remodeling
 *
 * Editorial scroll-scrubbed walkthrough. One sticky viewport,
 * 400vh of scroll travel, four editorial beats driven from a
 * single scroll handler. ALL overlay opacity/transform writes
 * happen through direct DOM refs + CSS variables; React state
 * is never touched in the scroll hot path, so the RAF seek
 * loop is never interrupted by a re-render.
 *
 * Beat ranges (progress 0→1):
 *   I    0.00 – 0.28   centre   "Step inside."        (hold from first frame)
 *   II   0.34 – 0.54   right    "Designed. Built. Finished."
 *   III  0.54 – 0.71   left     materials showroom beat
 *   IV   ≥ FINALE_PROGRESS   centre finale + CTAs — threshold + symmetric CSS fades
 *        (smooth opacity/transform; same easing duration on scroll up vs down)
 */

import { useRef, useEffect, useLayoutEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';
import { useLeadStepper } from '@/contexts/LeadStepperContext';
import { BUSINESS } from '@/lib/constants';

// ── Config ─────────────────────────────────────────────────────────
const VIDEO_SRC          = '/Sure%20Fix%20Hero%20Video/hero_scroll_final.mp4';
const VIDEO_SRC_MOBILE   = '/Sure%20Fix%20Hero%20Video/hero_scroll_final.mp4';
const VIDEO_MOBILE_MEDIA = '(max-width: 1023px)';
const SCROLL_MULTIPLIER = 4;
/** Finale on when progress ≥ this; dips below → hide immediately (no sticky overlap with prior beats) */
const FINALE_PROGRESS = 0.72;
/** Encoded hero scrub MP4 is 24fps (see scripts/encode-scroll-video.mjs) — snap seeks to frame boundaries */
const HERO_VIDEO_FPS = 24;
/** Ignore seeks smaller than half a frame — avoids decoder thrash from micro-updates */
const SEEK_MIN_DELTA_SEC = 1 / (HERO_VIDEO_FPS * 2);
// Typography — restrained, editorial
const SERIF = '"Cormorant Garamond", Georgia, serif';
const SANS = '"Figtree", system-ui, sans-serif';

/** Brand accent for primary CTAs (matches site navy in progress bar) */
const CTA_BLUE = '#394696';
// ───────────────────────────────────────────────────────────────────

/** Hermite smoothstep for silky band edges */
function ss(e0: number, e1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - e0) / Math.max(1e-9, e1 - e0)));
  return t * t * (3 - 2 * t);
}

/** Trapezoid band: rise r0→r1, hold, fall f0→f1 */
function band(p: number, r0: number, r1: number, f0: number, f1: number): number {
  if (p < r0 || p > f1) return 0;
  if (p < r1) return ss(r0, r1, p);
  if (p <= f0) return 1;
  return 1 - ss(f0, f1, p);
}

/** Map scroll progress → quantized video time; skip assign if change is sub-threshold */
function scrubVideoToProgress(video: HTMLVideoElement, progress: number) {
  const dur = video.duration;
  if (!Number.isFinite(dur) || dur <= 0) return;
  const raw = progress * dur;
  const snapped = Math.min(dur, Math.max(0, Math.round(raw * HERO_VIDEO_FPS) / HERO_VIDEO_FPS));
  if (Math.abs(video.currentTime - snapped) < SEEK_MIN_DELTA_SEC) return;
  video.currentTime = snapped;
}

export default function CinematicHero() {
  const sectionRef     = useRef<HTMLElement>(null);
  const videoRef       = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Overlay refs — we write `style.opacity`, `--p` CSS var, and transform directly
  const introRef   = useRef<HTMLDivElement>(null);
  const rightRef   = useRef<HTMLDivElement>(null);
  const leftRef    = useRef<HTMLDivElement>(null);
  const finaleRef  = useRef<HTMLDivElement>(null);

  /** Cached geometry — avoids getBoundingClientRect() on every scroll tick */
  const sectionMetricsRef = useRef({ top: 0, scrollable: 1 });

  const scrollRafRef = useRef<number | null>(null);
  const finaleOnRef = useRef(false);

  const [reducedMotion, setReducedMotion] = useState(false);
  const [heroVideoSrc, setHeroVideoSrc] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia(VIDEO_MOBILE_MEDIA).matches
      ? VIDEO_SRC_MOBILE : VIDEO_SRC
  );
  /** Keeps the video invisible until the first scroll-seek has landed, preventing a flash of frame 0 on navigation */
  const videoReadyRef = useRef(false);

  const { openStepper } = useLeadStepper();

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const cb = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', cb);
    return () => mq.removeEventListener('change', cb);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia(VIDEO_MOBILE_MEDIA);
    const pick = () => setHeroVideoSrc(mq.matches ? VIDEO_SRC_MOBILE : VIDEO_SRC);
    pick();
    mq.addEventListener('change', pick);
    return () => mq.removeEventListener('change', pick);
  }, []);

  const refreshSectionMetrics = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;
    const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
    sectionMetricsRef.current = {
      top: section.getBoundingClientRect().top + scrollY,
      scrollable: Math.max(1, section.offsetHeight - window.innerHeight),
    };
  }, []);

  // ── Finale show/hide via DOM only (no setState) ─────────────────
  const showFinale = useCallback((on: boolean) => {
    const el = finaleRef.current;
    if (!el || finaleOnRef.current === on) return;
    finaleOnRef.current = on;
    if (on) {
      el.style.transition =
        'opacity 1.35s cubic-bezier(0.22, 0.94, 0.36, 1), transform 1.35s cubic-bezier(0.22, 0.94, 0.36, 1)';
    } else {
      el.style.transition =
        'opacity 0.3s cubic-bezier(0.4, 0, 0.9, 0.65), transform 0.32s cubic-bezier(0.4, 0, 0.9, 0.65)';
    }
    el.style.opacity        = on ? '1' : '0';
    el.style.transform      = on ? 'translateY(0)' : 'translateY(14px)';
    el.style.pointerEvents  = on ? 'auto' : 'none';
  }, []);

  // ── Scroll handler — direct DOM only, no setState ────────────────
  const handleScroll = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
    const { top: sectionTop, scrollable } = sectionMetricsRef.current;
    const progress = Math.max(0, Math.min(1, (scrollY - sectionTop) / scrollable));

    if (progressBarRef.current) {
      progressBarRef.current.style.transform = `scaleX(${progress})`;
    }

    // Beat I — opening
    const intro = introRef.current;
    if (intro) {
      const o = Math.max(0, 1 - progress / 0.28);
      intro.style.opacity   = String(o);
      intro.style.transform = `translateY(${progress * -24}px)`;
      intro.style.setProperty('--p', String(o));
    }

    // Beat II — right rail
    const right = rightRef.current;
    if (right) {
      const o = band(progress, 0.34, 0.42, 0.48, 0.55);
      right.style.opacity = String(o);
      right.style.setProperty('--p', String(o));
      const x = (1 - o) * 32;
      right.style.transform = `translateX(${x}px)`;
    }

    // Beat III — left rail (ends before finale zone)
    const left = leftRef.current;
    if (left) {
      const o = band(progress, 0.54, 0.61, 0.65, 0.71);
      left.style.opacity = String(o);
      left.style.setProperty('--p', String(o));
      const x = (1 - o) * -28;
      left.style.transform = `translateX(${x}px)`;
    }

    // Beat IV — finale (threshold + CSS transitions — stays smooth while scrolling)
    if (progress >= FINALE_PROGRESS) showFinale(true);
    else showFinale(false);

    scrubVideoToProgress(video, progress);

    // Reveal the video element only after the first seek has been applied,
    // so the browser's pre-loaded frame 0 never flashes on navigation.
    if (!videoReadyRef.current) {
      videoReadyRef.current = true;
      if (videoRef.current) videoRef.current.style.opacity = '1';
    }
  }, [showFinale]);

  useLayoutEffect(() => {
    if (reducedMotion) return;
    // Hard-reset finale: clear any in-flight transition then snap to hidden
    // (finaleOnRef must be false BEFORE calling showFinale so the guard doesn't short-circuit)
    finaleOnRef.current = false;
    const fin = finaleRef.current;
    if (fin) {
      fin.style.transition = 'none';
      fin.style.opacity = '0';
      fin.style.transform = 'translateY(14px)';
      fin.style.pointerEvents = 'none';
    }

    // Reset visibility guard each time the video src changes (e.g. resize crossing mobile breakpoint)
    videoReadyRef.current = false;
    if (videoRef.current) videoRef.current.style.opacity = '0';

    const onMeta = () => {
      refreshSectionMetrics();
      handleScroll();
    };
    const onScroll = () => {
      if (scrollRafRef.current != null) return;
      scrollRafRef.current = requestAnimationFrame(() => {
        scrollRafRef.current = null;
        handleScroll();
      });
    };
    const onResize = () => {
      refreshSectionMetrics();
      onScroll();
    };

    refreshSectionMetrics();

    const section = sectionRef.current;
    const ro =
      section && typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => {
            refreshSectionMetrics();
            onScroll();
          })
        : null;
    ro?.observe(section as HTMLElement);

    window.addEventListener('scroll', onScroll, { passive: true });
    // Trackpad momentum + touch: `scroll` alone can be sparse while delta is still changing
    window.addEventListener('wheel', onScroll, { passive: true });
    window.addEventListener('touchmove', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    const v = videoRef.current;
    v?.addEventListener('loadedmetadata', onMeta);
    v?.addEventListener('loadeddata', onMeta);
    v?.addEventListener('durationchange', onMeta);
    onScroll();

    return () => {
      ro?.disconnect();
      if (scrollRafRef.current != null) { cancelAnimationFrame(scrollRafRef.current); scrollRafRef.current = null; }
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('wheel', onScroll);
      window.removeEventListener('touchmove', onScroll);
      window.removeEventListener('resize', onResize);
      v?.removeEventListener('loadedmetadata', onMeta);
      v?.removeEventListener('loadeddata', onMeta);
      v?.removeEventListener('durationchange', onMeta);
    };
  }, [reducedMotion, handleScroll, heroVideoSrc, refreshSectionMetrics, showFinale]);

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  });

  return (
    <section
      ref={sectionRef}
      style={{ height: `${SCROLL_MULTIPLIER * 100}vh` }}
      aria-label="Sure Fix Remodeling — scroll-driven cinematic home walkthrough"
    >
      {/* Scroll-linked masks/rules: NO transitions — transitions fight RAF updates and read choppy */}
      <style>{`
        /* Room for descenders (g, j, y) — tight line-height + overflow:hidden was clipping */
        .sf-mask {
          display: block;
          overflow: hidden;
          line-height: 1.35;
          padding-bottom: 0.18em;
        }
        .sf-mask > span {
          display: block;
          transform: translateY(calc((1 - var(--p, 0)) * 110%));
        }
      `}</style>

      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#0d1117] isolate">

        {/* ── Video ────────────────────────────────────────────────── */}
        {!reducedMotion ? (
          <video
            key={heroVideoSrc}
            ref={videoRef}
            src={heroVideoSrc}
            muted
            playsInline
            preload="auto"
            className="absolute inset-0"
            style={{ width: '100vw', height: '100vh', objectFit: 'cover', objectPosition: 'center', opacity: 0, transition: 'opacity 0.4s ease' }}
          />
        ) : (
          <div
            className="absolute inset-0 bg-[#0d1117]"
            role="img"
            aria-label="Hero background"
          />
        )}

        {/* Light veils — minimal, don’t fight the picture */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'linear-gradient(to bottom, rgba(13,17,23,0.35) 0%, transparent 28%, transparent 62%, rgba(13,17,23,0.45) 100%)',
        }} />
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 72% 96% at 50% 48%, transparent 62%, rgba(0,0,0,0.28) 100%)',
        }} />

        {/* ── Story overlays ─────────────────────────────────────────── */}
        <div className="absolute inset-0 z-10 pointer-events-none">

          {/* ═══ BEAT I — Step inside ════════════════════════════════ */}
          <div
            ref={introRef}
            className="absolute inset-0"
            style={{ willChange: 'opacity, transform', ['--p' as string]: '1' }}
          >
            <motion.p
              {...fadeUp(0.3)}
              className="absolute top-28 left-8 sm:left-14 text-white/38"
              style={{ fontFamily: SANS, fontSize: 11, letterSpacing: '0.12em', fontWeight: 400 }}
            >
              Sure Fix
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.7 }}
              className="absolute top-28 right-8 sm:right-14 flex items-center gap-2 text-white/28"
              style={{ fontFamily: SANS, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 400 }}
            >
              Scroll
              <motion.span
                className="inline-block w-px h-5 bg-white/28"
                style={{ transformOrigin: 'top' }}
                animate={{ scaleY: [0.35, 1, 0.35] }}
                transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
              />
            </motion.div>

            <div className="absolute inset-x-0 bottom-[13%] sm:bottom-[15%] flex flex-col items-center px-8">
              <motion.h1
                {...fadeUp(0.5)}
                className="text-center text-white tracking-tight"
                style={{
                  fontFamily: SERIF,
                  fontWeight: 300,
                  fontSize: 'clamp(1.85rem, 4.9vw, 3.25rem)',
                  lineHeight: 1.06,
                  letterSpacing: '-0.02em',
                }}
              >
                <span className="block font-light not-italic">Step</span>
                <span className="block font-normal mt-1.5 italic">inside.</span>
              </motion.h1>
              <motion.p
                {...fadeUp(0.72)}
                className="mt-6 text-center max-w-[20rem] text-white/38 leading-relaxed font-light"
                style={{ fontFamily: SANS, fontSize: 'clamp(0.78rem, 1vw, 0.8125rem)', letterSpacing: '0.06em', lineHeight: 1.65 }}
              >
                The life you imagine isn&apos;t hypothetical—it&apos;s one step away.
              </motion.p>
            </div>

            <motion.div {...fadeUp(0.95)} className="absolute bottom-14 left-1/2 -translate-x-1/2 pointer-events-auto">
              <button
                type="button"
                onClick={() => openStepper()}
                className="rounded-full px-9 py-3.5 text-white text-[11px] font-medium tracking-[0.18em] uppercase shadow-lg shadow-black/25 hover:brightness-[1.06] transition-[filter] duration-300"
                style={{ fontFamily: SANS, background: CTA_BLUE, border: 'none' }}
              >
                Begin your remodel
              </button>
            </motion.div>
          </div>

          {/* ═══ BEAT II ═════════════════════════════════════════════ */}
          <div
            ref={rightRef}
            className="absolute inset-y-0 right-0 flex items-center px-8 sm:px-14 md:pr-20 lg:pr-28"
            style={{ opacity: 0, willChange: 'opacity, transform', ['--p' as string]: '0' }}
          >
            <div className="max-w-[min(280px,38vw)] text-right">
              <div className="text-white/92" style={{ fontFamily: SERIF, fontWeight: 300, fontSize: 'clamp(1.45rem, 3vw, 2.35rem)', letterSpacing: '-0.03em', lineHeight: 1.08 }}>
                <span className="sf-mask"><span className="italic">Designed.</span></span>
                <span className="sf-mask" style={{ marginTop: 4 }}><span className="italic">Built.</span></span>
                <span className="sf-mask" style={{ marginTop: 4 }}><span className="font-light">Finished.</span></span>
              </div>
              <p className="mt-8 text-white/36 text-right leading-relaxed" style={{ fontFamily: SANS, fontSize: 12, fontWeight: 400, letterSpacing: '0.04em', lineHeight: 1.6 }}>
                One team. One timeline.
              </p>
            </div>
          </div>

          {/* ═══ BEAT III ═══════════════════════════════════════════ */}
          <div
            ref={leftRef}
            className="absolute inset-y-0 left-0 flex items-center px-8 sm:px-14 md:pl-20 lg:pl-28"
            style={{ opacity: 0, willChange: 'opacity, transform', ['--p' as string]: '0' }}
          >
            <div className="max-w-[min(300px,40vw)]">
              <div className="text-white/90" style={{ fontFamily: SERIF, fontWeight: 300, fontSize: 'clamp(1.5rem, 3.1vw, 2.5rem)', letterSpacing: '-0.028em', lineHeight: 1.1 }}>
                <span className="sf-mask"><span className="font-light">Materials</span></span>
                <span className="sf-mask" style={{ marginTop: 6 }}><span className="italic">Chosen—not guessed.</span></span>
              </div>
              <p className="mt-8 text-white/36 leading-relaxed" style={{ fontFamily: SANS, fontSize: 12, fontWeight: 400, letterSpacing: '0.04em', lineHeight: 1.6 }}>
                Easton showroom
              </p>
            </div>
          </div>

          {/* ═══ Finale — threshold-driven + symmetric fades (handled in showFinale) ═══ */}
          <div
            ref={finaleRef}
            className="absolute inset-0 z-[11] flex flex-col items-center justify-center px-8"
            style={{
              opacity: 0,
              transform: 'translateY(14px)',
              pointerEvents: 'none',
              transition: 'opacity 1.35s cubic-bezier(0.22, 0.94, 0.36, 1), transform 1.35s cubic-bezier(0.22, 0.94, 0.36, 1)',
              willChange: 'opacity, transform',
            }}
          >
            <div
              className="pointer-events-none absolute inset-0"
              style={{ background: 'linear-gradient(to top, rgba(13,17,23,0.55) 0%, rgba(13,17,23,0.14) 40%, transparent 72%)' }}
            />
            <div className="relative z-[1] flex flex-col items-center text-center max-w-md pt-[min(18vh,8rem)] px-6">
              <h2 className="text-white font-light mb-5" style={{ fontFamily: SERIF, fontSize: 'clamp(1.65rem, 3.8vw, 2.35rem)', letterSpacing: '-0.035em', lineHeight: 1.15 }}>
                <span className="italic opacity-95">One team</span>
                {' '}
                <span className="font-normal opacity-90 text-white/90">— end to end.</span>
              </h2>
              <p className="text-white/35 mb-9 text-[11px]" style={{ fontFamily: SANS, fontWeight: 400, letterSpacing: '0.22em', lineHeight: 1.5, textTransform: 'uppercase' as const }}>
                Estimate · showroom · build
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-6 pointer-events-auto">
                <button
                  type="button"
                  onClick={() => openStepper()}
                  className="rounded-full px-10 py-3.5 text-white text-[11px] font-medium tracking-[0.2em] uppercase shadow-lg shadow-black/25 hover:brightness-[1.06] transition-[filter] duration-300"
                  style={{ fontFamily: SANS, background: CTA_BLUE, border: 'none' }}
                >
                  Free estimate
                </button>
                <a
                  href={BUSINESS.phoneHref}
                  className="text-white/38 hover:text-white/55 transition-colors text-[11px] tracking-[0.14em] uppercase"
                  style={{ fontFamily: SANS, fontWeight: 500 }}
                >
                  <span className="inline-flex items-center gap-2">
                    <Phone size={13} strokeWidth={1.5} />
                    {BUSINESS.phone}
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── Reduced-motion static fallback ────────────────────────── */}
        {reducedMotion && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-end pb-[16%] sm:pb-[18%] px-8 pointer-events-auto">
            <div className="text-center max-w-2xl mb-8">
              <h1
                className="text-white mb-5"
                style={{
                  fontFamily: SERIF, fontWeight: 300,
                  fontSize: 'clamp(1.85rem, 4.9vw, 3.25rem)', lineHeight: 1.06, letterSpacing: '-0.02em',
                }}
              >
                <span className="block not-italic">Step</span>
                <span className="block italic">inside.</span>
              </h1>
              <p className="text-white/60 text-base" style={{ fontFamily: SERIF, fontStyle: 'italic' }}>
                Designed, built, and finished under one roof — with an in-house materials showroom in Easton.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm justify-center">
              <button
                type="button"
                onClick={() => openStepper()}
                className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white"
                style={{ fontFamily: SANS, background: CTA_BLUE, border: 'none' }}
              >
                Free estimate <ArrowRight size={16} />
              </button>
              <a
                href={BUSINESS.phoneHref}
                className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-4 text-sm font-black uppercase tracking-wider text-white border border-white/22"
                style={{ fontFamily: SANS }}
              >
                <Phone size={16} /> {BUSINESS.phone}
              </a>
            </div>
          </div>
        )}

        {/* ── Scroll progress hairline ─────────────────────────────── */}
        <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none" style={{ height: '2px', background: 'rgba(255,255,255,0.07)' }}>
          <div
            ref={progressBarRef}
            className="h-full origin-left"
            style={{
              background: 'linear-gradient(90deg, #394696 0%, #983631 60%, #983631 100%)',
              transform: 'scaleX(0)',
            }}
          />
        </div>

      </div>
    </section>
  );
}
