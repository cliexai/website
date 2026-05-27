import React from 'react';
import { motion } from 'motion/react';
import { AppleButton } from './SharedPrimitives';
import { scrollToId } from '../utils/smoothScroll';

export const Hero: React.FC = () => {
  const gradientStyle: React.CSSProperties = {
    backgroundImage: 'linear-gradient(to right, #4c1d95 0%, #7c3aed 12.5%, #d8b4fe 32.5%, #8b5cf6 50%, #7c3aed 67.5%, #4c1d95 87.5%, #4c1d95 100%)',
    backgroundSize: '200% auto',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
    WebkitTextFillColor: 'transparent',
    filter: 'url(#c3-noise)',
  };

  return (
    <section className="relative z-10 pt-8 md:pt-16 pb-20 text-center flex flex-col items-center max-w-7xl mx-auto px-6">
      {/* Motion H1 */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="text-5xl md:text-8xl font-black tracking-tight leading-[0.95] flex flex-col items-center"
      >
        <span className="text-black dark:text-white">Your Business.</span>
        <span
          style={gradientStyle}
          className="animate-shiny select-none py-2 pb-4 block"
        >
          Never Misses a Call.
        </span>
      </motion.h1>

      {/* Motion Paragraph */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
        className="mt-8 text-black/60 dark:text-white/60 max-w-xl text-base md:text-lg leading-[1.6]"
      >
        24/7 AI Voice Agents that answer calls, book appointments, take orders, and handle customer inquiries on autopilot.
      </motion.p>

      {/* Motion Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7, ease: 'easeOut' }}
        className="mt-10 flex flex-col sm:flex-row items-center gap-4 justify-center"
      >
        <AppleButton
          label="Try Live Demo"
          onClick={() => scrollToId('lead-form')}
        />
        <a
          href="#pricing"
          className="rounded-full border border-black/15 dark:border-white/15 text-black dark:text-white text-sm font-medium px-6 py-3 hover:bg-black/5 dark:hover:bg-white/5 active:scale-[0.98] transition-all backdrop-blur-md"
        >
          View Pricing
        </a>
      </motion.div>

      {/* Motion Small Footer Text */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1, delay: 0.9 }}
        className="text-xs text-black/50 dark:text-white/50 mt-5 block font-medium"
      >
        Start calling in 5 minutes · No credit card required
      </motion.span>
    </section>
  );
};
