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
      className="absolute inset-0"
      autoPlay
      muted
      loop
      playsInline
      poster={SHOWROOM_HOME_IMAGE}
      preload="metadata"
      aria-label="Sure-Fix in-house material showroom video"
      style={{
        width: '100vw',
        height: '100vh',
        objectFit: 'cover',
        objectPosition: 'center',
      }}
    >
      <source src={SHOWROOM_HOME_VIDEO_SRC} type="video/mp4" />
    </video>
  );
}
