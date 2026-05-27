import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: 'How do ClieX AI Voice Agents sound?',
      answer: 'They sound incredibly natural and human-like. Running on our proprietary low-latency speech synthesis engine, they speak with natural inflections, understand emotional context, and respond in under 1.4 seconds.',
    },
    {
      question: 'Can it integrate with our existing CRM, calendar, or POS?',
      answer: 'Yes! ClieX AI integrates natively with major platforms like Google Calendar, Outlook, Salesforce, HubSpot, Shopify, Stripe, and custom POS systems. It can query live databases and write back transaction logs on the fly.',
    },
    {
      question: 'What happens if a customer asks a question the agent cannot answer?',
      answer: 'Our systems feature built-in "Human Escalation" triggers. If the AI detects confusion, high frustration, or a direct request to speak with a human agent, it will seamlessly route the call to your designated team phone number in real-time, accompanied by the live transcript summary.',
    },
    {
      question: 'How long does the setup take?',
      answer: 'A standard agent trained on your business information can be deployed in under 5 minutes. Custom ordering systems, custom API calls, or bespoke CRM integrations typically take between 24 to 48 hours to complete and audit.',
    },
    {
      question: 'Which languages and accents are supported?',
      answer: 'ClieX AI supports over 29 languages and multiple regional accents (including English, Spanish, French, German, Italian, Portuguese, Mandarin, Japanese, and more) to guarantee high clarity across global locations.',
    },
  ];

  return (
    <section id="faq" className="max-w-4xl mx-auto px-6 py-20 md:py-28 relative z-10 border-t border-black/10 dark:border-white/10">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-black dark:text-white">
          Frequently Asked Questions
        </h2>
        <p className="mt-4 text-black/50 dark:text-white/50 text-sm md:text-base">
          Everything you need to know about setting up and running ClieX AI Voice Agents.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="liquid-glass rounded-2xl border border-black/5 dark:border-white/10 overflow-hidden bg-white/5 dark:bg-white/[0.01]"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none transition-all group"
              >
                <span className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-brand shrink-0" />
                  <span className="text-sm font-bold text-black dark:text-white group-hover:text-brand transition-colors">
                    {faq.question}
                  </span>
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-black/40 dark:text-white/40 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 text-brand' : ''
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="px-6 pb-6 pt-1 border-t border-black/5 dark:border-white/5">
                      <p className="text-sm text-black/60 dark:text-white/60 leading-[1.6] font-medium">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
};
