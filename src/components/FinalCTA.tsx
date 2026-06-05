import React from 'react';
import { motion } from 'motion/react';
import { useIsMobile } from '../hooks/useIsMobile';

export const FinalCTA: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <section className="px-margin-desktop py-stack-xl">
      <motion.div
        initial={{ opacity: 0, y: isMobile ? 30 : 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-container-max mx-auto bg-primary rounded-[2rem] p-stack-xl text-center text-on-primary relative overflow-hidden shadow-2xl shadow-primary/30"
      >
        {/* Decorative wave */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path
              d="M0,192L48,176C96,160,192,128,288,138.7C384,149,480,203,576,213.3C672,224,768,192,864,170.7C960,149,1056,139,1152,154.7C1248,171,1344,213,1392,234.7L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              fill="#ffffff"
              fillOpacity="1"
            />
          </svg>
        </div>

        <div className="relative z-10">
          <h2 className="font-headline text-headline-xl mb-6">
            Ready to automate your customer service?
          </h2>
          <p className="font-body text-body-lg mb-stack-lg max-w-2xl mx-auto opacity-90">
            Join 500+ enterprises scaling their support operations with ClieX AI Solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.location.href = '/signup'}
              className="px-10 py-4 bg-tertiary-fixed text-on-tertiary font-bold rounded-xl shadow-xl hover:scale-105 transition-all"
            >
              Get Started Now
            </button>
            <button
              onClick={() => window.location.href = '/get-started'}
              className="px-10 py-4 border-2 border-on-primary text-on-primary font-bold rounded-xl hover:bg-white/10 transition-all"
            >
              Talk to an Expert
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
