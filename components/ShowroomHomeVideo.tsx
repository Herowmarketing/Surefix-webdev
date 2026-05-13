import { useEffect, useRef } from 'react';
import { SHOWROOM_HOME_IMAGE, SHOWROOM_HOME_VIDEO_SRC } from '@/lib/site-images';

/**
 * In-House Showroom block: full-bleed loop from `public/Sure Fix Hero Video/`.
 */
export default function ShowroomHomeVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 w-full h-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      poster={SHOWROOM_HOME_IMAGE}
      preload="metadata"
      aria-label="Sure-Fix in-house material showroom video"
    >
      <source src={SHOWROOM_HOME_VIDEO_SRC} type="video/mp4" />
    </video>
  );
}
