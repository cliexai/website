import React from 'react';
import { motion } from 'motion/react';
import { SectionEyebrow } from './SharedPrimitives';
import { PhoneCall, Calendar, Network, ShieldCheck, Server, BrainCircuit, ArrowRight } from 'lucide-react';
import { useIsMobile } from '../hooks/useIsMobile';

export const Features: React.FC = () => {
  const isMobile = useIsMobile();
  const benefits = [
    {
      icon: <PhoneCall className="w-5 h-5 text-brand" />,
      title: 'Core Voice Automation',
      description: '24/7 Virtual Receptionist & Outbound SDR handling calls with sub-second latency.',
    },
    {
      icon: <Calendar className="w-5 h-5 text-purple-400" />,
      title: 'Direct Calendar Negotiators',
      description: 'Dynamic API sync checks open slots and books directly during live conversation.',
    },
    {
      icon: <Network className="w-5 h-5 text-emerald-400" />,
      title: 'Real-time CRM Syncing',
      description: 'Instant multi-way sync with your CRM to update lead cards after every hang-up.',
    },
    {
      icon: <BrainCircuit className="w-5 h-5 text-sky-400" />,
      title: 'Native Objection Handling',
      description: 'Detects consumer hesitation and delivers targeted rebuttals instead of giving up.',
    },
    {
      icon: <Server className="w-5 h-5 text-amber-400" />,
      title: 'RAG & Custom Guardrails',
      description: 'Restricts the AI to authorized data only, completely preventing hallucinations.',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-pink-400" />,
      title: 'HIPAA & SOC 2 Compliant',
      description: 'Medical and financial-grade security, auto-scrubbing PII from call transcripts.',
    },
  ];

  const chips = [
    'Sub-second Latency',
    'CRM & Calendar Sync',
    'Objection Handling',
    'Custom Voice Cloning',
    'HIPAA / SOC 2 Ready',
    'RAG Knowledge Base',
  ];

  const triageCategories = [
    {
      title: 'Voice Automation',
      count: 18,
      dotColor: '#ffffff',
      items: ['Outbound Lead Qualified', 'No-Show Reminder Sent'],
    },
    {
      title: 'Calendar Sync',
      count: 7,
      dotColor: '#e5e5e5',
      items: ['Dentist Appointment — Booked', 'Consultation — Rescheduled'],
    },
    {
      title: 'Objections Handled',
      count: 12,
      dotColor: '#a3a3a3',
      items: ["Price Pushback — Rebuttal applied", 'Timing Doubt — Follow-up set'],
    },
    {
      title: 'Smart Routing',
      count: 5,
      dotColor: '#525252',
      items: ['Billing escalation to Finance', 'VIP caller routed to human'],
    },
  ];

  return (
    <section id="services" className="max-w-7xl mx-auto px-6 py-10 md:py-16 relative z-10">
      <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
        {/* Left Column */}
        <motion.div
          initial={{ opacity: 0, y: isMobile ? 30 : 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: isMobile, margin: isMobile ? '-40px' : '-80px' }}
          transition={{ duration: isMobile ? 0.4 : 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-start"
        >
          <SectionEyebrow label="Autopilot" tag="AI-native" />
          
          <h2 className="mt-5 text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.02] text-black dark:text-white">
            Clear the lines <br />
            <span className="text-brand">in a single pass.</span>
          </h2>
          
          <p className="mt-6 text-black/60 dark:text-white/60 text-base md:text-lg leading-[1.6] max-w-md">
            ClieX AI operates 24/7 to listen, understand intent, and route calls perfectly. Focus on what moves your day forward — the rest handles itself on autopilot.
          </p>

          {/* Grid of micro cards for features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 w-full">
            {benefits.map((benefit, i) => (
              <div
                key={i}
                className="liquid-glass rounded-xl p-4 flex flex-col gap-2 hover:border-brand/35 transition-colors border border-black/5 dark:border-white/5 bg-white/5 dark:bg-white/[0.01]"
              >
                <div className="flex items-center gap-2">
                  {benefit.icon}
                  <h4 className="text-xs font-bold text-black dark:text-white">{benefit.title}</h4>
                </div>
                <p className="text-[10px] text-black/50 dark:text-white/50 leading-relaxed font-medium">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>

          {/* Chips Row */}
          <div className="mt-8 flex flex-wrap gap-2 w-full max-w-md">
            {chips.map((chip, idx) => (
              <span
                key={idx}
                className="text-[10px] font-semibold text-black/75 dark:text-white/70 px-3 py-1.5 rounded-full border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.03]"
              >
                {chip}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Right Column (Triage Liquid Glass Card) */}
        <motion.div
          initial={{ opacity: 0, y: isMobile ? 28 : 55 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: isMobile, margin: isMobile ? '-40px' : '-80px' }}
          transition={{ duration: isMobile ? 0.4 : 0.9, delay: isMobile ? 0.1 : 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="w-full"
        >
          <div className="liquid-glass rounded-2xl p-5 border border-black/5 dark:border-white/10">
            {/* Header */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-black/5 dark:border-white/5">
              <span className="text-xs font-bold text-black/75 dark:text-white/70 uppercase tracking-wider">
                Today · 42 calls triaged
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-brand animate-ping" />
            </div>

            {/* Sub-cards */}
            <div className="flex flex-col gap-3">
              {triageCategories.map((cat, idx) => (
                <div
                  key={idx}
                  className="liquid-glass rounded-lg p-3 border border-black/5 dark:border-white/5 hover:border-brand/20 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span
                         className="w-2 h-2 rounded-full"
                         style={{ backgroundColor: cat.dotColor }}
                      />
                      <span className="text-xs font-bold text-black dark:text-white">
                        {cat.title}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-black/50 dark:text-white/50 bg-black/5 dark:bg-white/5 px-2 py-0.5 rounded-full">
                      {cat.count}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1">
                    {cat.items.map((item, i) => (
                      <div
                        key={i}
                        className="text-[10px] text-black/60 dark:text-white/50 flex items-center justify-between font-medium"
                      >
                        <span>{item}</span>
                        <ArrowRight className="w-3 h-3 text-brand/50" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Simulated Live Feed Indicator */}
            <div className="mt-4 pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-[9px] text-black/40 dark:text-white/40 font-mono">
              <span>Resolution: 98%</span>
              <span>Uptime: 99.99%</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
