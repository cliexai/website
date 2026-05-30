import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

export const FAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: 'Won’t this sound like a cold, robotic answering machine that frustrates my customers?',
      answer: 'Absolutely not. The era of robotic, pre-recorded menu prompts is over. Our AI Voice Agents run on state-of-the-art Text-to-Speech (TTS) models with natural breath patterns, human-like pacing, and context-dependent inflection. They adjust to conversational flow, respond to verbal interruptions instantly (<800ms latency), and sound almost indistinguishable from a standard receptionist over a phone line. Most callers do not even realize they are speaking with an artificial agent.',
    },
    {
      question: 'What happens if a caller asks a complex question that the AI doesn\'t know how to answer?',
      answer: (
        <>
          We program our agents with strict operational guardrails and "fallback escalations." If a caller presents a highly complex, off-script, or emotional query, the AI is trained to remain polite, gracefully acknowledge the limit of its immediate information, capture the customer's detail requests, and immediately execute one of two workflows:
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Trigger a live hot-transfer to an available team member's phone.</li>
            <li>Log a high-priority ticket inside your CRM for immediate human call-back.</li>
          </ul>
        </>
      ),
    },
    {
      question: 'How do you prevent the AI from making up information (hallucinating) or quoting the wrong prices?',
      answer: 'Our systems do not use public, unfiltered AI models. We implement a security layer called Retrieval-Augmented Generation (RAG). This constructs a strict knowledge base using only your verified documents, price sheets, and operational handbooks. The agent is strictly forbidden from generating answers outside this repository. If a parameter is not explicitly written in the script, the AI will not state it.',
    },
    {
      question: 'Is my business data and my customers\' information secure?',
      answer: 'Security is our top priority. All voice recordings and system transcripts are processed through encrypted data channels. For medical, financial, or legal companies, we configure specialized HIPAA-compliant and SOC 2-compliant environments where transcriptions are automatically stripped of sensitive personal identifier data (PII) before storage.',
    },
    {
      question: 'Can the agent actually book appointments directly into my existing calendar system?',
      answer: 'Yes. Our AI Voice Agents do not just write down dates. They integrate directly with your live booking tools (including Calendly, Acuity, GoHighLevel, and Google Calendar) via secure API channels. During the conversation, the agent reads your live schedule, negotiates a convenient open slot with the caller, schedules the event, and triggers an immediate text-back confirmation.',
    },
    {
      question: 'What is the onboarding and deployment process like?',
      answer: (
        <>
          We do all the heavy lifting.
          <ul className="space-y-2 mt-2">
            <li><strong>Phase 1 (Discovery):</strong> We analyze your current inbound/outbound call logs to map out typical questions and conversation flows.</li>
            <li><strong>Phase 2 (Development):</strong> We design the scripts, engineer prompt safety parameters, build your custom knowledge base, and choose the perfect brand voice.</li>
            <li><strong>Phase 3 (Testing):</strong> We thoroughly test the agent across edge cases to ensure logical consistency and secure calendar/CRM sync stability.</li>
            <li><strong>Phase 4 (Live Launch):</strong> We connect the agent to your primary phone lines, enabling you to capture 100% of missed calls from day one.</li>
          </ul>
        </>
      ),
    },
  ];

  return (
    <section id="faq" className="max-w-4xl mx-auto px-6 py-10 md:py-16 relative z-10 border-t border-black/10 dark:border-white/10">
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
                className="w-full px-6 py-5 flex items-start justify-between text-left focus:outline-none transition-all group"
              >
                <span className="flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                  <span className="text-sm font-bold text-black dark:text-white group-hover:text-brand transition-colors">
                    {faq.question}
                  </span>
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-black/40 dark:text-white/40 transition-transform duration-300 mt-0.5 shrink-0 ml-4 ${
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
                      <div className="text-sm text-black/60 dark:text-white/60 leading-[1.6] font-medium">
                        {faq.answer}
                      </div>
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
