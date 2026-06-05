import React from 'react';
import { motion } from 'motion/react';
import { useIsMobile } from '../hooks/useIsMobile';

export const Features: React.FC = () => {
  const isMobile = useIsMobile();

  const features = [
    {
      icon: 'timer',
      title: 'Fast Setup',
      description: 'Go from zero to live agent in under 30 minutes with our pre-trained vertical models.',
    },
    {
      icon: 'translate',
      title: 'Multilingual',
      description: 'Support customers in 95+ languages with native-level fluency and cultural nuance.',
    },
    {
      icon: 'move_up',
      title: 'Live Transfer',
      description: 'Smart escalation to human agents with full context and conversation transcript.',
    },
    {
      icon: 'hub',
      title: 'CRM Integration',
      description: 'Native connectors for Salesforce, HubSpot, and Zendesk to sync data automatically.',
    },
    {
      icon: 'schedule',
      title: '24/7 Availability',
      description: 'Never miss a call again. Our AI agents are always online, even on holidays and weekends.',
    },
    {
      icon: 'insights',
      title: 'Analytics',
      description: 'Deep insights into sentiment analysis, call resolution rates, and customer intent.',
    },
  ];

  return (
    <section id="services" className="bg-surface-container-low py-stack-xl">
      <div className="max-w-container-max mx-auto px-margin-desktop">
        <motion.div
          initial={{ opacity: 0, y: isMobile ? 20 : 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="font-headline text-headline-lg mb-4 text-on-surface">
            Advanced AI capabilities for Modern IT
          </h2>
          <p className="text-on-surface-variant">
            Built for scale, security, and superior customer satisfaction.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: isMobile ? 25 : 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white/[0.015] backdrop-blur-3xl p-8 rounded-3xl border border-white/[0.08] hover:border-primary/50 hover:bg-white/[0.03] transition-all duration-500 group"
            >
              <span className="material-symbols-outlined text-primary text-4xl mb-6 block">{feature.icon}</span>
              <h4 className="font-headline text-headline-md mb-3 text-on-surface">{feature.title}</h4>
              <p className="text-on-surface-variant">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
