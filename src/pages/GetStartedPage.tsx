import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { LogoMark } from '../components/SharedPrimitives';
import { ThemeBackground } from '../components/ThemeBackground';
import { LeadForm } from '../components/LeadForm';

export const GetStartedPage: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('plan') || 'Starter';
    }
    return 'Starter';
  });

  const planDetails: Record<string, { title: string, desc: string, features: string[] }> = {
    Starter: {
      title: "Starter",
      desc: "Self-Serve/Basic Automation for small businesses.",
      features: [
        "24/7 inbound call answering",
        "Basic appointment booking (Cal.com/Google Calendar sync)",
        "Simple FAQ handling (pre-programmed responses)",
        "Lead capture (name, email, phone)",
        "Single phone number support",
        "Standard voice options (ElevenLabs/Cartesia)",
        "Basic call logging & transcripts",
        "Email notifications for new leads",
        "Simple web dashboard for clients to view call logs"
      ]
    },
    Professional: {
      title: "Professional",
      desc: "Premium Done-For-You service with advanced workflows.",
      features: [
        "Multiple phone numbers/departments (sales/support)",
        "CRM integration (HubSpot, Salesforce, Zoho)",
        "Customizable call flows/scripts per client",
        "Advanced voice options (more natural, emotion-aware)",
        "Basic analytics dashboard (call volume, duration, outcomes)",
        "SMS/email notifications for clients",
        "Call recording & playback",
        "Basic spam/filter blocking",
        "Priority email support (24h response)",
        "Custom branding in client portal"
      ]
    },
    Enterprise: {
      title: "Enterprise",
      desc: "Bespoke solutions for high-volume enterprise operations.",
      features: [
        "Multi-agent system (specialized agents per function)",
        "Deep customization (tailored to specific workflows)",
        "Advanced analytics & reporting (CSV export, API access)",
        "Dedicated account manager & SLA guarantees",
        "On-premise/private cloud deployment option",
        "White-label client portal",
        "Custom integrations (ERP, legacy systems)",
        "High-volume handling (10k+ calls/day)",
        "Voice cloning & custom voice talent",
        "Advanced spam/fraud detection",
        "Phone number provisioning (local/toll-free)",
        "Compliance features (HIPAA, GDPR readiness)",
        "A/B testing for call scripts",
        "Developer API for custom extensions",
        "24/7 phone support with escalation paths"
      ]
    }
  };

  const currentPlanDetails = planDetails[selectedPlan] || planDetails.Starter;

  const gradientStyle: React.CSSProperties = {
    backgroundImage: 'linear-gradient(to right, #d8b4fe 0%, #8b5cf6 50%, #7c3aed 100%)',
    backgroundSize: '200% auto',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
    WebkitTextFillColor: 'transparent',
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0c0c0c] text-black dark:text-white font-sans selection:bg-brand/30 relative overflow-x-hidden">
      
      <ThemeBackground />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-20 pb-8 md:pt-24 md:pb-12 flex flex-col items-center">
        
        {/* Top Header */}
        <div className="text-center mb-8 md:mb-12 max-w-2xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-5"
          >
            Secure Your <span style={gradientStyle} className="select-none">AI Agent</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg text-black/60 dark:text-white/60 font-medium"
          >
            Fill out the form below to configure your voice agent. We will contact you on WhatsApp to activate your demo.
          </motion.p>
        </div>

        {/* Content Columns */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start pb-20">
          
          {/* Left Column - Form */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full liquid-glass rounded-3xl p-6 md:p-10 border border-black/10 dark:border-white/10 shadow-2xl bg-white/40 dark:bg-black/40 backdrop-blur-2xl"
          >
            <LeadForm onPlanChange={(plan) => {
              if (plan === 'Growth') setSelectedPlan('Professional');
              else if (plan === 'Premium') setSelectedPlan('Enterprise');
              else setSelectedPlan(plan);
            }} />
          </motion.div>

          {/* Right Column - Visuals & Copy */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="w-full flex flex-col justify-center pt-4 lg:pt-16"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedPlan}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-3xl lg:text-4xl font-extrabold text-black dark:text-white tracking-tight leading-[1.15] mb-2">
                  {currentPlanDetails.title}
                </h2>
                <p className="text-lg text-black/70 dark:text-white/70 font-medium mb-8 leading-relaxed">
                  {currentPlanDetails.desc}
                </p>

                <div className="bg-white/10 dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl p-6 backdrop-blur-md">
                  <ul className="flex flex-col gap-3">
                    {currentPlanDetails.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-black/80 dark:text-white/80 font-medium">
                        <CheckCircle2 className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
