import React from 'react';
import { motion } from 'motion/react';
import { useIsMobile } from '../hooks/useIsMobile';

export const Testimonials: React.FC = () => {
  const isMobile = useIsMobile();
  const reviews = [
    {
      quote: "ClieX AI gave our operations team fifteen hours of their week back. It answers calls and processes orders like a support representative from the future.",
      name: 'Parker Wilf',
      role: 'Group Operations Manager',
      company: 'MERCURY',
    },
    {
      quote: "The natural voice latency alone has changed how we handle incoming pizza orders. We literally never miss a booking or lead now. Zero dropped revenues.",
      name: 'Andrew von Rosenbach',
      role: 'Senior Program Director',
      company: 'COHERE',
    },
    {
      quote: "Appointment scheduling that actually understands complex accents and context. Our clinic patients stopped dreading hold times entirely.",
      name: 'Mathies Christensen',
      role: 'Clinic Franchise Director',
      company: 'LUNAR',
    },
  ];

  return (
    <section id="about" className="max-w-7xl mx-auto px-6 py-20 md:py-28 border-t border-black/10 dark:border-white/10 relative z-10">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-black dark:text-white">
          Loved by builders & operators.
        </h2>
        <p className="mt-4 text-black/50 dark:text-white/50 text-sm md:text-base max-w-md mx-auto">
          Hear how ClieX AI voice agents are transforming communications for high-growth enterprises.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {reviews.map((rev, idx) => (
          <motion.figure
            key={idx}
            initial={{ opacity: 0, y: isMobile ? 28 : 55 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: isMobile, margin: isMobile ? '-30px' : '-60px' }}
            transition={{ duration: isMobile ? 0.4 : 0.9, delay: idx * (isMobile ? 0.06 : 0.12), ease: [0.22, 1, 0.36, 1] }}
            className="liquid-glass rounded-2xl p-6 border border-black/5 dark:border-white/10 bg-white/5 dark:bg-white/[0.01] hover:border-brand/40 transition-colors flex flex-col justify-between"
          >
            <blockquote className="text-sm text-black/85 dark:text-white/80 leading-[1.7] italic font-medium">
              "{rev.quote}"
            </blockquote>
            
            <figcaption className="mt-6 pt-5 border-t border-black/10 dark:border-white/10 flex flex-col">
              <span className="text-sm font-bold text-black dark:text-white">
                {rev.name}
              </span>
              <span className="text-xs text-black/50 dark:text-white/50 font-medium">
                {rev.role}
              </span>
              <span className="text-[10px] text-brand font-black tracking-wider uppercase mt-1">
                {rev.company}
              </span>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
};
