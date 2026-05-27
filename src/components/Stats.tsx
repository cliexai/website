import React from 'react';
import { motion } from 'motion/react';
import { Shield, Sparkles, Zap, Users } from 'lucide-react';
import { useIsMobile } from '../hooks/useIsMobile';

export const Stats: React.FC = () => {
  const isMobile = useIsMobile();
  const statsList = [
    {
      icon: <Users className="w-5 h-5 text-brand" />,
      number: '10,000+',
      label: 'Calls Handled',
      description: 'Fully automated voice sessions executed with zero human delay.',
    },
    {
      icon: <Sparkles className="w-5 h-5 text-indigo-400" />,
      number: '98.4%',
      label: 'Resolution Rate',
      description: 'Customer requests solved on first call without agent escalation.',
    },
    {
      icon: <Zap className="w-5 h-5 text-amber-400" />,
      number: '1.4s',
      label: 'Voice Latency',
      description: 'Ultra-low latency connection yielding natural, human-like flow.',
    },
    {
      icon: <Shield className="w-5 h-5 text-emerald-400" />,
      number: '24/7/365',
      label: 'Availability',
      description: 'Operating round the clock to capture every lead and book every order.',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-16 md:py-20 relative z-10 border-t border-black/5 dark:border-white/5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsList.map((stat, i) => (
          <motion.div
            key={i}
            initial={isMobile ? false : { opacity: 0, y: 50 }}
            whileInView={isMobile ? undefined : { opacity: 1, y: 0 }}
            viewport={isMobile ? undefined : { once: true, margin: '-60px' }}
            transition={isMobile ? undefined : { duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="liquid-glass rounded-2xl p-6 border border-black/5 dark:border-white/5 bg-white/5 dark:bg-white/[0.01] flex flex-col justify-between hover:border-brand/40 transition-colors group"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="p-2.5 rounded-xl border border-black/5 dark:border-white/5 bg-black/[0.03] dark:bg-white/5">
                {stat.icon}
              </span>
              <span className="text-[9px] font-bold text-brand uppercase tracking-widest bg-brand/10 px-2 py-0.5 rounded-full">
                Verified
              </span>
            </div>
            
            <div>
              <h4 className="text-3xl md:text-4xl font-extrabold tracking-tight text-black dark:text-white mb-1 group-hover:text-brand transition-colors">
                {stat.number}
              </h4>
              <p className="text-xs font-bold text-black/75 dark:text-white/70 mb-2">
                {stat.label}
              </p>
              <p className="text-[10px] text-black/50 dark:text-white/50 leading-relaxed font-medium">
                {stat.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
