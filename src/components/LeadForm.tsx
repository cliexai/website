import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Briefcase, User, Phone, CheckCircle2, Sparkles, Send, Loader2 } from 'lucide-react';

export const LeadForm: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    email: '',
    whatsappNumber: '',
    selectedPackage: 'Growth',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.businessName || !formData.email || !formData.whatsappNumber) {
      alert('Please fill out all fields.');
      return;
    }

    setLoading(true);

    // Simulate sending data to cliexai@gmail.com
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      console.log('SIMULATED LEAD DISPATCH:', {
        recipient: 'cliexai@gmail.com',
        data: formData,
        timestamp: new Date().toISOString(),
      });
    }, 1800);
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      businessName: '',
      email: '',
      whatsappNumber: '',
      selectedPackage: 'Growth',
    });
    setSuccess(false);
  };

  return (
    <section id="lead-form" className="max-w-2xl mx-auto px-6 py-20 md:py-28 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 55 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: '-60px' }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="liquid-glass rounded-3xl p-8 border border-black/10 dark:border-white/10 bg-white/5 dark:bg-white/[0.01]"
      >
        <div className="text-center mb-8">
          <span className="p-2 bg-brand/10 text-brand rounded-full inline-flex mb-4">
            <Sparkles className="w-5 h-5 text-brand" />
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-black dark:text-white">
            Secure Your AI Agent
          </h2>
          <p className="mt-2 text-xs md:text-sm text-black/50 dark:text-white/50 leading-relaxed font-medium">
            Fill out the form below to configure your voice agent. We will contact you on WhatsApp to activate your demo.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!success ? (
            <motion.form
              key="lead-form"
              onSubmit={handleSubmit}
              className="flex flex-col gap-4"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Full Name */}
              <div className="flex flex-col">
                <label className="text-[10px] font-bold text-black/60 dark:text-white/50 uppercase mb-1.5 tracking-wider">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-black/40 dark:text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Marcus Vance"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl py-3 pl-10 pr-4 text-xs text-black dark:text-white outline-none focus:border-brand/40 dark:focus:border-brand/40 transition-colors placeholder-black/45 dark:placeholder-white/45"
                  />
                </div>
              </div>

              {/* Business Name */}
              <div className="flex flex-col">
                <label className="text-[10px] font-bold text-black/60 dark:text-white/50 uppercase mb-1.5 tracking-wider">
                  Business Name
                </label>
                <div className="relative">
                  <Briefcase className="w-4 h-4 text-black/40 dark:text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Mario's Pizza"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl py-3 pl-10 pr-4 text-xs text-black dark:text-white outline-none focus:border-brand/40 dark:focus:border-brand/40 transition-colors placeholder-black/45 dark:placeholder-white/45"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <label className="text-[10px] font-bold text-black/60 dark:text-white/50 uppercase mb-1.5 tracking-wider">
                  Work Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-black/40 dark:text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="marcus@marios.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl py-3 pl-10 pr-4 text-xs text-black dark:text-white outline-none focus:border-brand/40 dark:focus:border-brand/40 transition-colors placeholder-black/45 dark:placeholder-white/45"
                  />
                </div>
              </div>

              {/* WhatsApp Number */}
              <div className="flex flex-col">
                <label className="text-[10px] font-bold text-black/60 dark:text-white/50 uppercase mb-1.5 tracking-wider">
                  WhatsApp Number (with country code)
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-black/40 dark:text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="+1 (555) 019-2834"
                    value={formData.whatsappNumber}
                    onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                    className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl py-3 pl-10 pr-4 text-xs text-black dark:text-white outline-none focus:border-brand/40 dark:focus:border-brand/40 transition-colors placeholder-black/45 dark:placeholder-white/45"
                  />
                </div>
              </div>

              {/* Package Select */}
              <div className="flex flex-col">
                <label className="text-[10px] font-bold text-black/60 dark:text-white/50 uppercase mb-1.5 tracking-wider">
                  Selected Plan
                </label>
                <select
                  id="selected-package"
                  value={formData.selectedPackage}
                  onChange={(e) => setFormData({ ...formData, selectedPackage: e.target.value })}
                  className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl py-3 px-3.5 text-xs text-black dark:text-white outline-none focus:border-brand/40 dark:focus:border-brand/40 transition-colors"
                >
                  <option className="bg-white dark:bg-[#0c0c0c] text-black dark:text-white" value="Starter">Starter Plan ($100/mo + $50 setup)</option>
                  <option className="bg-white dark:bg-[#0c0c0c] text-black dark:text-white" value="Growth">Growth Plan ($150/mo + $100 setup)</option>
                  <option className="bg-white dark:bg-[#0c0c0c] text-black dark:text-white" value="Premium">Premium Plan ($300/mo + $200 setup)</option>
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand text-white text-xs font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-brand/90 active:scale-[0.98] transition-all shadow-lg shadow-brand/20 mt-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing Agent Request...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Deploy AI Voice Agent</span>
                  </>
                )}
              </button>
            </motion.form>
          ) : (
            <motion.div
              key="form-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="text-center py-10 flex flex-col items-center"
            >
              <CheckCircle2 className="w-16 h-16 text-emerald-500 animate-bounce mb-6" />
              <h3 className="text-xl font-bold text-black dark:text-white mb-2">
                Deployment Initiated!
              </h3>
              <p className="text-xs text-black/60 dark:text-white/60 leading-relaxed max-w-sm font-medium mb-6">
                Excellent! We have simulated sending your request for the{' '}
                <strong className="text-brand font-black">{formData.selectedPackage}</strong> plan to{' '}
                <strong className="text-black dark:text-white">cliexai@gmail.com</strong>. A ClieX AI representative will contact you on WhatsApp at{' '}
                <strong className="text-black dark:text-white">{formData.whatsappNumber}</strong> to initialize your live voice trial.
              </p>
              <button
                onClick={resetForm}
                className="rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-black dark:text-white text-[10px] font-bold px-4 py-2 hover:bg-black/10 dark:hover:bg-white/10 transition-all active:scale-95"
              >
                Submit Another Request
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};
