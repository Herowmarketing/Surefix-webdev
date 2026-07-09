import { useEffect, useRef, useState } from 'react';
import {
  SHOWROOM_HOME_IMAGE,
  SHOWROOM_HOME_VIDEO_SRC,
  SHOWROOM_HOME_VIDEO_SRC_MOBILE,
} from '@/lib/site-images';

/**
 * In-House Showroom block: full-bleed optimized loop from public/manus-storage.
 * Video only mounts once the section is near the viewport so it doesn't compete
 * with the hero video on first paint.
 */
export default function ShowroomHomeVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;
    videoRef.current?.play().catch(() => {});
  }, [shouldLoad]);

  const isMobile =
    typeof window !== 'undefined' && window.matchMedia('(max-width: 1023px)').matches;
  const src = isMobile ? SHOWROOM_HOME_VIDEO_SRC_MOBILE : SHOWROOM_HOME_VIDEO_SRC;

  return (
    <div ref={containerRef} className="absolute inset-0">
      <img
        src={SHOWROOM_HOME_IMAGE}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover object-center"
        loading="lazy"
        decoding="async"
      />
      {shouldLoad ? (
        <video
          ref={videoRef}
          className="absolute inset-0"
          autoPlay
          muted
          loop
          playsInline
          poster={SHOWROOM_HOME_IMAGE}
          preload="none"
          aria-label="Sure-Fix in-house material showroom video"
          style={{
            width: '100vw',
            height: '100vh',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : null}
    </div>
  );
}
