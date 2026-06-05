import React from 'react';
import { motion } from 'motion/react';
import { useIsMobile } from '../hooks/useIsMobile';

export const HowItWorks: React.FC = () => {
  const isMobile = useIsMobile();

  const steps = [
    {
      icon: 'settings_phone',
      title: 'Connect phone',
      description: 'Port your existing number or get a new one in 50+ countries. Immediate SIP integration supported.',
    },
    {
      icon: 'psychology',
      title: 'Configure agent',
      description: 'Define personality, knowledge base, and escalation rules using our intuitive drag-and-drop builder.',
    },
    {
      icon: 'rocket_launch',
      title: 'Go live',
      description: 'Deploy instantly. Monitor conversations in real-time through our centralized enterprise dashboard.',
    },
  ];

  return (
    <section className="py-stack-xl px-margin-desktop max-w-container-max mx-auto overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: isMobile ? 20 : 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-16"
      >
        <h2 className="font-headline text-headline-lg mb-4 text-on-surface">
          Implementation as smooth as speech
        </h2>
        <p className="text-on-surface-variant max-w-2xl mx-auto">
          Get your AI agent up and running in minutes, not months. Our platform integrates seamlessly with your existing stack.
        </p>
      </motion.div>

      <div className="relative">
        {/* Connector Line (Desktop) */}
        <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-outline-variant -translate-y-1/2" />

        <div className="grid lg:grid-cols-3 gap-gutter relative z-10">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: isMobile ? 25 : 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white/[0.015] backdrop-blur-3xl p-8 rounded-2xl border border-white/[0.08] hover:border-primary/40 hover:bg-white/[0.03] transition-all duration-500 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-primary text-on-primary flex items-center justify-center mx-auto mb-6 shadow-xl shadow-primary/20">
                <span className="material-symbols-outlined text-3xl">{step.icon}</span>
              </div>
              <h3 className="font-headline text-headline-md mb-4 text-on-surface">{step.title}</h3>
              <p className="text-on-surface-variant">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
