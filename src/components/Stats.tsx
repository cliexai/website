import React from 'react';
import { motion } from 'motion/react';
import { PhoneMissed, TrendingDown, Clock, AlertTriangle } from 'lucide-react';
import { useIsMobile } from '../hooks/useIsMobile';

export const Stats: React.FC = () => {
  const isMobile = useIsMobile();
  const gradientStyle: React.CSSProperties = {
    backgroundImage: 'linear-gradient(to right, #d8b4fe 0%, #8b5cf6 50%, #7c3aed 100%)',
    backgroundSize: '200% auto',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
    WebkitTextFillColor: 'transparent',
  };
  const statsList = [
    {
      icon: <PhoneMissed className="w-5 h-5 text-brand" />,
      number: '62%',
      label: 'Of Calls Go Unanswered',
      description: 'The majority of incoming calls to businesses go straight to voicemail or are abandoned entirely.',
    },
    {
      icon: <TrendingDown className="w-5 h-5 text-indigo-400" />,
      number: '85%',
      label: 'Lost Customers',
      description: "85% of callers whose calls aren't answered will never call back. They just move on to a competitor.",
    },
    {
      icon: <Clock className="w-5 h-5 text-purple-400" />,
      number: '5 Mins',
      label: 'Lead Decay Window',
      description: 'Responding to a lead within 5 minutes boosts conversions by 900%. Every minute kills your ROI.',
    },
    {
      icon: <AlertTriangle className="w-5 h-5 text-pink-400" />,
      number: '$40B+',
      label: 'Revenue Lost Annually',
      description: 'The combined cost of missed calls and poor customer service. Stop bleeding revenue today.',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-8 md:py-16 relative z-10 border-t border-black/5 dark:border-white/5">
      
      <motion.div 
        initial={{ opacity: 0, y: isMobile ? 20 : 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-5xl font-extrabold text-black dark:text-white tracking-tight mb-4">
          What are you <span style={gradientStyle} className="select-none">missing out</span> on?
        </h2>
        <p className="text-black/60 dark:text-white/60 text-base md:text-lg max-w-2xl mx-auto font-medium">
          Every missed call is a missed opportunity. Here's the brutal reality of relying on humans to answer the phone.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsList.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: isMobile ? 25 : 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: isMobile, margin: isMobile ? '-30px' : '-60px' }}
            transition={{ duration: isMobile ? 0.35 : 0.8, delay: i * (isMobile ? 0.06 : 0.12), ease: [0.22, 1, 0.36, 1] }}
            className="liquid-glass rounded-2xl p-6 border border-black/5 dark:border-white/5 bg-white/5 dark:bg-white/[0.01] flex flex-col justify-between hover:border-brand/40 transition-colors group"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="p-2.5 rounded-xl border border-black/5 dark:border-white/5 bg-black/[0.03] dark:bg-white/5 group-hover:scale-110 transition-transform duration-500">
                {stat.icon}
              </span>
              <span className="text-[9px] font-bold text-brand uppercase tracking-widest bg-brand/10 px-2 py-0.5 rounded-full">
                Alert
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
