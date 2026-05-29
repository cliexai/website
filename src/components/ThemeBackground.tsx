import React, { useEffect, useRef, useState } from 'react';
import { useIsMobile } from '../hooks/useIsMobile';

const VIDEO_SRC = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_064122_c4750c0e-7476-4b44-94a2-a85a65c63bf2.mp4';

export const ThemeBackground: React.FC = () => {
  const isMobile = useIsMobile();
  const [activeVid, setActiveVid] = useState(1);
  const vid1Ref = useRef<HTMLVideoElement>(null);
  const vid2Ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const vid1 = vid1Ref.current;
    const vid2 = vid2Ref.current;
    if (!vid1 || !vid2) return;

    const MARGIN = 0.6;

    const onTime = () => {
      if (activeVid === 1 && vid1.duration && vid1.currentTime >= vid1.duration - MARGIN) {
        vid2.currentTime = 0;
        vid2.play();
        setActiveVid(2);
      } else if (activeVid === 2 && vid2.duration && vid2.currentTime >= vid2.duration - MARGIN) {
        vid1.currentTime = 0;
        vid1.play();
        setActiveVid(1);
      }
    };

    vid1.addEventListener('timeupdate', onTime);
    vid2.addEventListener('timeupdate', onTime);
    return () => {
      vid1.removeEventListener('timeupdate', onTime);
      vid2.removeEventListener('timeupdate', onTime);
    };
  }, [activeVid]);

  return (
    <>
      {/* Global SVG noise filter at root level */}
      <svg className="absolute w-0 h-0 pointer-events-none" style={{ visibility: 'hidden' }}>
        <defs>
          <filter id="c3-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
            <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.35 0" />
            <feComposite in2="SourceGraphic" operator="in" result="noise" />
            <feBlend in="SourceGraphic" in2="noise" mode="multiply" />
          </filter>
        </defs>
      </svg>

      {isMobile ? (
        <div className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-b from-brand/5 via-brand/10 to-brand/5 dark:from-brand/[0.03] dark:via-brand/[0.06] dark:to-brand/[0.03]" />
      ) : (
        <>
          <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            <video
              ref={vid1Ref}
              autoPlay
              muted
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-[1s] ease-in-out"
              style={{
                opacity: activeVid === 1 ? 0.55 : 0,
                maskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
              }}
              src={VIDEO_SRC}
            />
            <video
              ref={vid2Ref}
              muted
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-[1s] ease-in-out"
              style={{
                opacity: activeVid === 2 ? 0.55 : 0,
                maskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
              }}
              src={VIDEO_SRC}
            />
          </div>
          <div className="fixed inset-0 z-0 pointer-events-none mix-blend-color bg-brand/60" />
        </>
      )}

      {/* Cinematic Frosted Glass Gradient Overlay - Ensures high readability in both modes */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-b from-white/50 via-white/65 to-white/75 dark:from-[#0c0c0c]/60 dark:via-[#0c0c0c]/72 dark:to-[#0c0c0c]/82 transition-colors duration-300" />
    </>
  );
};
