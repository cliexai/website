import React from 'react';
import { motion } from 'motion/react';
import { AppleButton } from './SharedPrimitives';
import { ChevronRight } from 'lucide-react';
import { scrollToId } from '../utils/smoothScroll';

export const FinalCTA: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 md:py-32 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 65 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: '-80px' }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="liquid-glass relative overflow-hidden rounded-3xl px-8 py-16 md:py-24 text-center border border-black/10 dark:border-white/10 bg-white/5 dark:bg-white/[0.01]"
      >
        {/* Radial Glow Overlay exactly as requested */}
        <div
          className="absolute inset-0 z-0 pointer-events-none opacity-30 select-none"
          style={{
            backgroundImage: 'radial-gradient(600px circle at 50% 0%, rgba(139, 92, 246, 0.25), transparent 70%)',
          }}
        />

        <div className="relative z-10 flex flex-col items-center">
          {/* h2 exact lines, adjusted for rebranding */}
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.02] text-black dark:text-white flex flex-col items-center">
            <span>Close the gaps.</span>
            <span className="text-brand">Open your business.</span>
          </h2>

          {/* Paragraph exact copy, adapted */}
          <p className="mt-6 text-black/60 dark:text-white/60 max-w-md mx-auto text-sm md:text-base leading-[1.6] font-medium">
            Join thousands of builders, founders, and operators who treat customer calls like an asset — not a bottleneck.
          </p>

          {/* Action buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <AppleButton label="Try Live Demo" onClick={() => scrollToId('lead-form')} />
            <button
              onClick={() => scrollToId('lead-form')}
              className="group rounded-full border border-black/15 dark:border-white/15 text-black dark:text-white text-sm font-semibold px-6 py-3.5 hover:bg-black/5 dark:hover:bg-white/5 active:scale-95 transition-all backdrop-blur-md flex items-center gap-1.5"
            >
              <span>Talk to sales</span>
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
