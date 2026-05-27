import React from 'react';
import { motion } from 'motion/react';

export const LogoCloud: React.FC = () => {
  const logos = ['Linear', 'Vercel', 'Figma', 'Stripe', 'Ramp', 'Notion', 'Loom', 'Arc'];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 35 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-16 md:py-20 relative z-10 border-t border-black/5 dark:border-white/5">
      <div className="text-center">
        <h3 className="text-[10px] uppercase tracking-widest text-black/45 dark:text-white/40 font-extrabold select-none">
          Trusted by the world's most thoughtful teams
        </h3>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, margin: '-100px' }}
          className="mt-10 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6 items-center"
        >
          {logos.map((logo) => (
            <motion.div
              key={logo}
              variants={itemVariants}
              className="flex items-center justify-center py-4 rounded-xl border border-transparent hover:border-black/5 dark:hover:border-white/5 hover:bg-black/[0.01] dark:hover:bg-white/[0.01] transition-all group"
            >
              <span className="text-sm font-semibold tracking-tight text-black/40 dark:text-white/45 group-hover:text-brand dark:group-hover:text-white transition-colors duration-200">
                {logo}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
