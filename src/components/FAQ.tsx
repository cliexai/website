import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useIsMobile } from '../hooks/useIsMobile';

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

export const FAQ: React.FC = () => {
  const isMobile = useIsMobile();
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: 'How natural does the voice sound?',
      answer: 'Our voices are powered by advanced neural synthesis, featuring human-like breathing, pausing, and emotional inflection. Most customers can\'t tell they are speaking to an AI.',
    },
    {
      question: 'Can it handle complex technical issues?',
      answer: 'Yes. By uploading your technical documentation to our knowledge base, the agent can troubleshoot complex software and hardware issues based on your specific protocols.',
    },
    {
      question: 'What happens if the AI gets stuck?',
      answer: 'If the agent detects confusion or if the customer requests a human, the call is instantly transferred to your live support team with a full transcript of the conversation so far.',
    },
    {
      question: 'Is my data secure and GDPR compliant?',
      answer: 'Absolutely. We are SOC2 Type II compliant and offer end-to-end encryption for all call data. We provide full GDPR tools for data deletion and privacy management.',
    },
    {
      question: 'How many languages are supported?',
      answer: 'We currently support 95+ languages and dialects, including regional accents to ensure your global customers feel right at home.',
    },
    {
      question: 'Do I need a special phone system?',
      answer: 'No. ClieX AI works with any VoIP system, SIP trunk, or even traditional analog lines via simple call forwarding.',
    },
    {
      question: 'How do you prevent the AI from making up information (hallucinating)?',
      answer: 'Our systems implement a security layer called Retrieval-Augmented Generation (RAG). This constructs a strict knowledge base using only your verified documents, price sheets, and operational handbooks. The agent is strictly forbidden from generating answers outside this repository.',
    },
    {
      question: 'Can the agent actually book appointments into my calendar?',
      answer: (
        <>
          Yes. Our AI Voice Agents integrate directly with your live booking tools (including Calendly, Acuity, GoHighLevel, and Google Calendar) via secure API channels. During the conversation, the agent reads your live schedule, negotiates a convenient open slot, schedules the event, and triggers an immediate text-back confirmation.
        </>
      ),
    },
  ];

  return (
    <section id="faq" className="py-stack-xl px-margin-desktop max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: isMobile ? 20 : 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-16"
      >
        <h2 className="font-headline text-headline-lg mb-4 text-on-surface">Common Questions</h2>
        <p className="text-on-surface-variant">Everything you need to know about our AI agents.</p>
      </motion.div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: isMobile ? 15 : 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="bg-surface-container rounded-2xl border border-outline-variant overflow-hidden"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="flex items-center justify-between w-full p-6 cursor-pointer text-left font-bold text-body-lg text-on-surface group"
              >
                <span>{faq.question}</span>
                <span className={`material-symbols-outlined transition-transform duration-300 ml-4 shrink-0 ${isOpen ? 'rotate-180' : ''}`}>
                  expand_more
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="px-6 pb-6 text-on-surface-variant leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
