import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import Hls from 'hls.js';
import { Sparkles, ArrowRight } from 'lucide-react';

const MUX_URL = 'https://stream.mux.com/s8pMcOvMQXc4GD6AX4e1o01xFogFxipmuKltNfSYza0200.m3u8';

const BlurIn: React.FC<{ delay?: number; duration?: number; className?: string; children: React.ReactNode }> = ({
  delay = 0, duration = 0.6, className, children,
}) => (
  <motion.div
    initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
    animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
    transition={{ duration, delay, ease: 'easeOut' }}
    className={className}
  >
    {children}
  </motion.div>
);

interface WordConfig {
  text: string;
  newline?: boolean;
  italic?: boolean;
}

const headingWords: WordConfig[] = [
  { text: 'Unlock' },
  { text: 'the' },
  { text: 'Power' },
  { text: 'of' },
  { text: 'AI', newline: true },
  { text: 'for' },
  { text: 'Your', newline: true },
  { text: 'Business.', italic: true },
];

export const HeroNew: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(MUX_URL);
      hls.attachMedia(video);
      return () => { hls.destroy(); };
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = MUX_URL;
    }
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#0a0015]">
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="h-full object-cover"
          style={{ marginLeft: '200px', transform: 'scale(1.2)', transformOrigin: 'left' }}
        />
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0a0015] to-transparent z-10" />

      <div className="relative z-20 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-6 max-w-2xl">
              <BlurIn>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 backdrop-blur-sm px-4 py-1.5">
                  <Sparkles className="w-3 h-3 text-white/80" />
                  <span className="text-sm font-medium text-white/80">New AI Automation Ally</span>
                </div>
              </BlurIn>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight lg:leading-[1.2] text-white">
                {headingWords.map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.08, ease: 'easeOut' }}
                    className={`${word.newline ? 'block' : 'inline'} ${word.italic ? 'font-serif italic' : ''}`}
                    style={{ whiteSpace: word.newline ? undefined : 'pre' }}
                  >
                    {word.text}{!word.newline ? ' ' : ''}
                  </motion.span>
                ))}
              </h1>

              <BlurIn delay={0.4}>
                <p className="text-white/80 text-lg font-normal leading-relaxed max-w-xl">
                  Our cutting-edge AI platform automates, analyzes, and accelerates your workflows so you can focus on what really matters.
                </p>
              </BlurIn>
            </div>

            <BlurIn delay={0.6}>
              <div className="flex gap-4 flex-wrap">
                <a
                  href="/book-call"
                  className="inline-flex items-center gap-2 rounded-full bg-white text-black px-5 py-3 font-medium hover:opacity-90 transition-all"
                >
                  Book A Free Call
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-sm text-white px-8 py-3 font-medium hover:bg-white/30 transition-all"
                >
                  Learn now
                </a>
              </div>
            </BlurIn>
          </div>
        </div>
      </div>
    </section>
  );
};
