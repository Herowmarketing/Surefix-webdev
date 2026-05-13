import { useEffect, useRef, useState } from 'react';
import {
  SHOWROOM_HOME_IMAGE,
  SHOWROOM_HOME_VIDEO_MOBILE,
  SHOWROOM_HOME_VIDEO_WEB,
} from '@/lib/site-images';

const MOBILE_MQ = '(max-width: 1023px)';

/**
 * In-House Showroom block: loads a lighter MP4 on narrow viewports, full HD on desktop.
 */
export default function ShowroomHomeVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState(SHOWROOM_HOME_VIDEO_WEB);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_MQ);
    const apply = () => setSrc(mq.matches ? SHOWROOM_HOME_VIDEO_MOBILE : SHOWROOM_HOME_VIDEO_WEB);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.load();
    el.play().catch(() => {});
  }, [src]);

  return (
    <video
      ref={videoRef}
      key={src}
      className="absolute inset-0 w-full h-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      poster={SHOWROOM_HOME_IMAGE}
      preload="metadata"
      aria-label="Sure-Fix in-house material showroom video"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
