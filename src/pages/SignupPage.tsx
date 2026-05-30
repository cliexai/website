import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { LogoMark } from '../components/SharedPrimitives';
import { CountrySelect } from '../components/CountrySelect';
import { ThemeBackground } from '../components/ThemeBackground';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabaseClient';

export const SignupPage: React.FC = () => {
  const { signInWithGoogle } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [countryCode, setCountryCode] = useState('US');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const form = new FormData(e.currentTarget);
    const email = form.get('email') as string;
    const password = form.get('password') as string;
    const confirm = form.get('confirmPassword') as string;
    const fullName = form.get('fullName') as string;
    const phone = form.get('phone') as string;

    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setIsLoading(true);
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName, phone } },
    });
    setIsLoading(false);

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    window.location.href = '/portal';
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    await signInWithGoogle();
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0c0c0c] text-black dark:text-white flex flex-col md:flex-row font-sans selection:bg-brand/30 relative">
      
      <ThemeBackground />

      {/* LEFT COLUMN - FORM */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-12 z-10 relative border-r border-black/5 dark:border-white/5">
        <div className="max-w-md w-full mx-auto">
          {/* Header */}
          <div className="mb-10 flex flex-col items-start">
            <a href="/" className="flex items-center gap-2 mb-12 hover:opacity-80 transition-opacity">
              <LogoMark className="w-8 h-8 text-brand" />
              <span className="font-extrabold tracking-tight text-xl">ClieX AI</span>
            </a>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">Create Account</h1>
            <p className="text-black/60 dark:text-white/60">Get started with your free AI Voice Agent.</p>
          </div>

          {/* Social Auth */}
          <button type="button" onClick={handleGoogleSignIn} disabled={isLoading} className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#121212] hover:bg-black/5 dark:hover:bg-white/5 transition-all font-semibold text-sm mb-6 shadow-sm active:scale-[0.98] disabled:opacity-60">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Continue with Google'}
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="h-px bg-black/10 dark:bg-white/10 flex-1" />
            <span className="text-xs text-black/40 dark:text-white/40 font-medium uppercase tracking-widest">or</span>
            <div className="h-px bg-black/10 dark:bg-white/10 flex-1" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="space-y-1.5 flex-1">
                <label className="text-xs font-semibold text-black/70 dark:text-white/70">Full Name</label>
                <input required name="fullName" type="text" placeholder="John Doe" className="w-full bg-black/5 dark:bg-[#161616] border border-black/10 dark:border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand/50 transition-all placeholder:text-black/30 dark:placeholder:text-white/30" />
              </div>
              <div className="space-y-1.5 flex-1">
                <label className="text-xs font-semibold text-black/70 dark:text-white/70">Phone Number</label>
                <div className="flex bg-black/5 dark:bg-[#161616] border border-black/10 dark:border-white/5 rounded-xl focus-within:ring-2 focus-within:ring-brand/50 focus-within:border-brand/50 transition-all relative">
                  <CountrySelect value={countryCode} onChange={setCountryCode} />
                  <input required name="phone" type="tel" placeholder="(555) 000-0000" className="w-full bg-transparent px-3 py-3 text-sm focus:outline-none placeholder:text-black/30 dark:placeholder:text-white/30" />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-black/70 dark:text-white/70">Email</label>
              <input required name="email" type="email" placeholder="john@example.com" className="w-full bg-black/5 dark:bg-[#161616] border border-black/10 dark:border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand/50 transition-all placeholder:text-black/30 dark:placeholder:text-white/30" />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="space-y-1.5 flex-1 relative">
                <label className="text-xs font-semibold text-black/70 dark:text-white/70">Password</label>
                <div className="relative">
                  <input required name="password" type={showPassword ? 'text' : 'password'} placeholder="••••••••" className="w-full bg-black/5 dark:bg-[#161616] border border-black/10 dark:border-white/5 rounded-xl pl-4 pr-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand/50 transition-all placeholder:text-black/30 dark:placeholder:text-white/30" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div className="space-y-1.5 flex-1 relative">
                <label className="text-xs font-semibold text-black/70 dark:text-white/70">Confirm Password</label>
                <div className="relative">
                  <input required name="confirmPassword" type={showConfirm ? 'text' : 'password'} placeholder="••••••••" className="w-full bg-black/5 dark:bg-[#161616] border border-black/10 dark:border-white/5 rounded-xl pl-4 pr-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand/50 transition-all placeholder:text-black/30 dark:placeholder:text-white/30" />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors">
                    {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-xs font-medium bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2">{error}</p>
            )}

            <button type="submit" disabled={isLoading} className="w-full mt-4 bg-brand hover:bg-brand-light text-white font-semibold py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] active:scale-[0.98] flex items-center justify-center disabled:opacity-60">
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Send Verification Code'}
            </button>
          </form>

          <p className="text-center text-sm text-black/60 dark:text-white/60 mt-8">
            Already have an account? <a href="/login" className="text-brand font-semibold hover:underline">Login</a>
          </p>

          <div className="mt-12 text-center text-xs text-black/40 dark:text-white/40 flex justify-center gap-4">
            <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Terms</a>
            <span>|</span>
            <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Privacy Policy</a>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN - VISUALS */}
      <div className="hidden md:flex w-1/2 relative flex-col justify-center items-center p-12 lg:p-24 overflow-hidden z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-md w-full relative z-10"
        >
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-12 leading-[1.1] tracking-tight">
            Build your <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-light to-brand">Free Voice AI</span> Assistant
          </h2>

        </motion.div>
      </div>

    </div>
  );
};
