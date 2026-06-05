import React from 'react';
import { motion } from 'motion/react';
import { useIsMobile } from '../hooks/useIsMobile';

export const Hero: React.FC = () => {
  const isMobile = useIsMobile();
  const dur = isMobile ? 0.4 : 0.8;
  const yOff = isMobile ? 15 : 30;
  const stagger = isMobile ? 0.15 : 0.2;

  const waveDelays = ['0.1s', '0.3s', '0.2s', '0.5s', '0.1s', '0.4s', '0.2s', '0.6s'];

  return (
    <section className="pt-16 md:pt-24 pb-stack-xl px-margin-desktop max-w-container-max mx-auto grid lg:grid-cols-2 gap-gutter items-center">
      {/* Left: Text */}
      <motion.div
        initial={{ opacity: 0, y: yOff }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: dur, delay: stagger, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1
          className="font-serif text-3xl sm:text-4xl md:text-headline-xl mb-stack-md leading-tight text-on-surface font-black tracking-tighter"
          style={{ letterSpacing: '-0.04em' }}
        >
          Elevate your customer experience with{' '}
          <span className="text-white">Clie<span className="text-primary">X</span> AI</span>
        </h1>
        <p className="font-body text-body-lg text-on-surface-variant mb-stack-lg max-w-xl">
          Empower your IT infrastructure with 24/7 automated support. Resolve 80% of routine inquiries instantly, scale without hiring, and maintain human-like empathy in every call.
        </p>

        {/* Feature chips */}
        <div className="flex flex-wrap gap-4 mb-stack-lg">
          <div className="flex items-center gap-2 text-on-surface-variant">
            <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: '"FILL" 1' }}>bolt</span>
            <span className="text-label-md">Fast Setup</span>
          </div>
          <div className="flex items-center gap-2 text-on-surface-variant">
            <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: '"FILL" 1' }}>translate</span>
            <span className="text-label-md">Multilingual</span>
          </div>
          <div className="flex items-center gap-2 text-on-surface-variant">
            <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: '"FILL" 1' }}>support_agent</span>
            <span className="text-label-md">Live Transfer</span>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex gap-4 flex-wrap">
          <button
            onClick={() => window.location.href = '/get-started'}
            className="px-8 py-4 bg-primary text-on-primary rounded-xl font-label-md text-label-md shadow-lg shadow-primary/30 hover:opacity-90 transition-all active:scale-95"
          >
            Book a Demo
          </button>
          <button
            onClick={() => window.location.href = '/signup'}
            className="px-8 py-4 border border-outline text-on-surface rounded-xl font-label-md text-label-md hover:bg-surface-variant transition-all active:scale-95"
          >
            Start Free Trial
          </button>
        </div>
      </motion.div>

      {/* Right: Voice Agent Widget */}
      <motion.div
        initial={{ opacity: 0, y: yOff }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: dur, delay: stagger + dur * 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative hidden lg:block"
      >
        <div className="bg-surface-container-highest/10 backdrop-blur-sm rounded-3xl p-stack-md shadow-2xl border border-outline-variant relative z-10 overflow-hidden">
          {/* Widget Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-on-primary-container">keyboard_voice</span>
              </div>
              <div>
                <div className="font-label-md text-label-md text-on-surface">ClieX AI Agent Active</div>
                <div className="text-caption text-secondary flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" /> Handling Call...
                </div>
              </div>
            </div>
            <span className="material-symbols-outlined text-on-surface-variant">more_vert</span>
          </div>

          {/* Waveform */}
          <div className="h-32 flex items-center justify-center gap-1.5 mb-8">
            {waveDelays.map((delay, i) => (
              <div key={i} className="voice-wave-bar" style={{ animationDelay: delay }} />
            ))}
          </div>

          {/* Stats Badges */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-surface-container-high p-3 rounded-xl text-center border border-outline-variant">
              <div className="text-primary font-bold text-label-md">12.4k</div>
              <div className="text-caption text-on-surface-variant">Calls Handled</div>
            </div>
            <div className="bg-surface-container-high p-3 rounded-xl text-center border border-outline-variant">
              <div className="text-primary font-bold text-label-md">99.9%</div>
              <div className="text-caption text-on-surface-variant">Uptime</div>
            </div>
            <div className="bg-surface-container-high p-3 rounded-xl text-center border border-outline-variant">
              <div className="text-primary font-bold text-label-md">&lt;1s</div>
              <div className="text-caption text-on-surface-variant">Response</div>
            </div>
          </div>
        </div>

        {/* Decorative Element */}
        <div className="absolute -bottom-6 -right-6 w-full h-full bg-primary/10 rounded-3xl -z-10 rotate-3 border border-primary/20" />
      </motion.div>
    </section>
  );
};
