import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Briefcase, User, CheckCircle2, Send, Loader2, AlertCircle, ShieldCheck } from 'lucide-react';
import { useIsMobile } from '../hooks/useIsMobile';
import { supabase } from '../lib/supabaseClient';
import { CountrySelect } from './CountrySelect';
import countriesData from '../lib/countries.json';

// ── Global grecaptcha type declarations ────────────────────────
declare global {
  interface Window {
    grecaptcha: {
      render: (container: HTMLElement | string, params: { sitekey: string; theme?: 'light' | 'dark'; callback?: (token: string) => void; 'expired-callback'?: () => void }) => number;
      getResponse: (widgetId?: number) => string;
      reset: (widgetId?: number) => void;
    };
    onRecaptchaLoad: () => void;
  }
}

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY as string | undefined;

export const LeadForm: React.FC = () => {
  const isMobile = useIsMobile();
  const recaptchaContainerRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<number | null>(null);

  const [formData, setFormData] = useState(() => {
    let defaultPlan = 'Growth';
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const plan = params.get('plan');
      if (plan) defaultPlan = plan;
    }
    return {
      fullName: '',
      businessName: '',
      email: '',
      whatsappNumber: '',
      selectedPackage: defaultPlan,
    };
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [countryCode, setCountryCode] = useState('US');

  // ── Load and render reCAPTCHA widget ──────────────────────────
  const renderWidget = useCallback(() => {
    if (!recaptchaContainerRef.current || widgetId.current !== null || !RECAPTCHA_SITE_KEY) return;
    widgetId.current = window.grecaptcha.render(recaptchaContainerRef.current, {
      sitekey: RECAPTCHA_SITE_KEY,
      theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
    });
  }, []);

  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY) return; // reCAPTCHA disabled in dev if no key

    // If grecaptcha is already loaded (e.g., HMR), render immediately
    if (typeof window.grecaptcha !== 'undefined') {
      renderWidget();
      return;
    }

    // Set up the callback and inject the script
    window.onRecaptchaLoad = renderWidget;

    const existing = document.getElementById('recaptcha-script');
    if (!existing) {
      const script = document.createElement('script');
      script.id = 'recaptcha-script';
      script.src = 'https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  }, [renderWidget]);

  // ── Form submit ────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.fullName || !formData.businessName || !formData.email || !formData.whatsappNumber) {
      setError('Please fill out all fields.');
      return;
    }

    // reCAPTCHA check (only if key is configured)
    if (RECAPTCHA_SITE_KEY) {
      const token = widgetId.current !== null
        ? window.grecaptcha?.getResponse(widgetId.current)
        : '';
      if (!token) {
        setError('Please complete the "I\'m not a robot" verification.');
        return;
      }
    }

    setLoading(true);

    const selectedCountry = countriesData.find(c => c.code === countryCode) || { dial_code: '+1' };
    const fullPhoneNumber = `${selectedCountry.dial_code} ${formData.whatsappNumber.trim()}`;

    const { error: supabaseError } = await supabase.from('leads').insert([
      {
        full_name: formData.fullName,
        business:  formData.businessName,
        email:     formData.email,
        whatsapp:  fullPhoneNumber,
        plan:      formData.selectedPackage,
      },
    ]);

    setLoading(false);

    if (supabaseError) {
      console.error('[ClieX AI] Lead insert error:', supabaseError);
      setError('Something went wrong. Please try again or contact us directly.');
      // Reset reCAPTCHA so user can retry
      if (widgetId.current !== null) window.grecaptcha?.reset(widgetId.current);
      return;
    }

    setSuccess(true);
  };

  const resetForm = () => {
    setFormData({ fullName: '', businessName: '', email: '', whatsappNumber: '', selectedPackage: 'Growth' });
    setSuccess(false);
    setError(null);
    widgetId.current = null;
    // Re-render reCAPTCHA widget after form reset
    if (RECAPTCHA_SITE_KEY && recaptchaContainerRef.current) {
      recaptchaContainerRef.current.innerHTML = '';
      setTimeout(() => {
        widgetId.current = null;
        renderWidget();
      }, 100);
    }
  };

  return (
    <section id="lead-form" className="w-full">
      <motion.div
        initial={{ opacity: 0, y: isMobile ? 28 : 55 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: isMobile, margin: isMobile ? '-30px' : '-60px' }}
        transition={{ duration: isMobile ? 0.4 : 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="w-full"
      >

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
                <label className="text-[10px] font-bold text-black/60 dark:text-white/50 uppercase mb-1.5 tracking-wider">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-black/40 dark:text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text" required placeholder="Marcus Vance"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl py-3 pl-10 pr-4 text-base sm:text-xs text-black dark:text-white outline-none focus:border-brand/40 dark:focus:border-brand/40 transition-colors placeholder-black/45 dark:placeholder-white/45"
                  />
                </div>
              </div>

              {/* Business Name */}
              <div className="flex flex-col">
                <label className="text-[10px] font-bold text-black/60 dark:text-white/50 uppercase mb-1.5 tracking-wider">Business Name</label>
                <div className="relative">
                  <Briefcase className="w-4 h-4 text-black/40 dark:text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text" required placeholder="Mario's Pizza"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl py-3 pl-10 pr-4 text-base sm:text-xs text-black dark:text-white outline-none focus:border-brand/40 dark:focus:border-brand/40 transition-colors placeholder-black/45 dark:placeholder-white/45"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <label className="text-[10px] font-bold text-black/60 dark:text-white/50 uppercase mb-1.5 tracking-wider">Work Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-black/40 dark:text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email" required placeholder="marcus@marios.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl py-3 pl-10 pr-4 text-base sm:text-xs text-black dark:text-white outline-none focus:border-brand/40 dark:focus:border-brand/40 transition-colors placeholder-black/45 dark:placeholder-white/45"
                  />
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex flex-col">
                <label className="text-[10px] font-bold text-black/60 dark:text-white/50 uppercase mb-1.5 tracking-wider">WhatsApp Number</label>
                <div className="flex bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl focus-within:ring-2 focus-within:ring-brand/50 focus-within:border-brand/50 transition-all relative">
                  <CountrySelect value={countryCode} onChange={setCountryCode} />
                  <input
                    type="tel" required placeholder="(555) 019-2834"
                    value={formData.whatsappNumber}
                    onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                    className="w-full bg-transparent pl-3.5 pr-4 py-3 text-base sm:text-xs text-black dark:text-white outline-none placeholder-black/45 dark:placeholder-white/45"
                  />
                </div>
              </div>

              {/* Package Select */}
              <div className="flex flex-col">
                <label className="text-[10px] font-bold text-black/60 dark:text-white/50 uppercase mb-1.5 tracking-wider">Selected Plan</label>
                <select
                  id="selected-package"
                  value={formData.selectedPackage}
                  onChange={(e) => setFormData({ ...formData, selectedPackage: e.target.value })}
                  className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl py-3 px-3.5 text-base sm:text-xs text-black dark:text-white outline-none focus:border-brand/40 dark:focus:border-brand/40 transition-colors"
                >
                  <option className="bg-white dark:bg-[#0c0c0c] text-black dark:text-white" value="Starter">Starter Plan ($100/mo + $50 setup)</option>
                  <option className="bg-white dark:bg-[#0c0c0c] text-black dark:text-white" value="Growth">Growth Plan ($150/mo + $100 setup)</option>
                  <option className="bg-white dark:bg-[#0c0c0c] text-black dark:text-white" value="Premium">Premium Plan ($300/mo + $200 setup)</option>
                </select>
              </div>

              {/* reCAPTCHA widget */}
              {RECAPTCHA_SITE_KEY && (
                <div className="flex justify-center">
                  <div ref={recaptchaContainerRef} id="recaptcha-widget" />
                </div>
              )}

              {/* Spam protection note (shown when no key yet) */}
              {!RECAPTCHA_SITE_KEY && (
                <div className="flex items-center gap-2 text-[10px] text-black/40 dark:text-white/30 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand/50 shrink-0" />
                  Protected by Google reCAPTCHA (activate in .env.local)
                </div>
              )}

              {/* Error */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-xs text-red-500 font-medium"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand text-white text-xs font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-brand/90 active:scale-[0.98] transition-all shadow-lg shadow-brand/20 mt-2 disabled:opacity-50"
              >
                {loading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /><span>Processing Agent Request...</span></>
                ) : (
                  <><Send className="w-4 h-4" /><span>Deploy AI Voice Agent</span></>
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
              <h3 className="text-xl font-bold text-black dark:text-white mb-2">Deployment Initiated!</h3>
              <p className="text-xs text-black/60 dark:text-white/60 leading-relaxed max-w-sm font-medium mb-6">
                Your request for the{' '}
                <strong className="text-brand font-black">{formData.selectedPackage}</strong> plan has been received. A ClieX AI representative will contact you on WhatsApp at{' '}
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
