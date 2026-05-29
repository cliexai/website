import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowLeft, ShieldCheck } from 'lucide-react';
import { LogoMark } from '../components/SharedPrimitives';
import { ThemeBackground } from '../components/ThemeBackground';
import { LeadForm } from '../components/LeadForm';

export const GetStartedPage: React.FC = () => {
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

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-8 md:py-16 flex flex-col items-center">
        
        {/* Navigation & Logo */}
        <div className="w-full flex justify-between items-center mb-12 md:mb-16">
          <a href="/" className="inline-flex items-center gap-2 text-black/60 dark:text-white/60 hover:text-brand transition-colors font-semibold text-sm">
            <ArrowLeft className="w-4 h-4" />
            Back
          </a>
          <LogoMark />
          <div className="w-16" /> {/* Spacer for flex centering */}
        </div>

        {/* Top Header */}
        <div className="text-center mb-12 md:mb-20 max-w-2xl mx-auto">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 bg-brand/10 text-brand rounded-full inline-flex mb-6"
          >
            <Sparkles className="w-6 h-6" />
          </motion.span>
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
            <LeadForm />
          </motion.div>

          {/* Right Column - Visuals & Copy */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="w-full flex flex-col justify-center pt-4 lg:pt-16"
          >
            <h2 className="text-3xl lg:text-4xl font-extrabold text-black dark:text-white tracking-tight leading-[1.15] mb-6">
              Scale your Operations instantly.
            </h2>
            <p className="text-lg text-black/70 dark:text-white/70 font-medium mb-10 leading-relaxed">
              Join the forward-thinking teams using ClieX AI to eliminate missed calls, automate scheduling, and dominate customer service 24/7.
            </p>

            <div className="flex items-start gap-4 p-6 rounded-2xl bg-white/10 dark:bg-black/20 border border-black/10 dark:border-white/10 backdrop-blur-md">
               <div className="p-3 bg-brand/10 text-brand rounded-full shrink-0">
                 <ShieldCheck className="w-5 h-5" />
               </div>
               <div className="flex-1">
                 <p className="font-bold text-black dark:text-white text-base">Enterprise-grade Infrastructure</p>
                 <p className="text-sm text-black/60 dark:text-white/60 mt-1 font-medium">1.4s average latency over a globally distributed edge network. SOC2 Compliant.</p>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
