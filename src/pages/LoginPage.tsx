import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { LogoMark } from '../components/SharedPrimitives';
import { useAuth } from '../contexts/AuthContext';
import { Loader2, AlertCircle } from 'lucide-react';
import { ThemeBackground } from '../components/ThemeBackground';
import { supabase } from '../lib/supabaseClient';

// Google brand SVG
const GoogleIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

export const LoginPage: React.FC = () => {
  const { user, loading, signInWithGoogle } = useAuth();
  const [signingIn, setSigningIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  // If already logged in, bounce to portal
  useEffect(() => {
    if (!loading && user) {
      window.location.href = '/portal';
    }
  }, [user, loading]);

  const handleSignIn = async () => {
    setSigningIn(true);
    await signInWithGoogle();
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormLoading(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setFormLoading(false);

    if (signInError) {
      setFormError(signInError.message);
      return;
    }

    window.location.href = '/portal';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0c0c0c] flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-brand animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 pt-24 relative overflow-hidden bg-white dark:bg-[#0c0c0c]">
      <ThemeBackground />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-[360px]"
      >
        {/* Branding */}
        <div className="text-center mb-10">
          <motion.a
            href="/"
            className="inline-flex items-center gap-2.5 mb-8 group"
            whileHover={{ scale: 1.02 }}
          >
            <LogoMark className="w-9 h-9 text-brand" />
            <span className="text-white font-bold text-xl tracking-tight">ClieX AI</span>
          </motion.a>

          <h1 className="text-[28px] font-extrabold text-white tracking-tight leading-tight">
            Sign in to your<br />
            <span className="text-brand">ClieX Account</span>
          </h1>
          <p className="text-sm text-white/40 mt-3 font-medium leading-relaxed">
            Manage your AI Voice Agent, view call logs,
            <br className="hidden sm:block" /> and track your business performance.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6 backdrop-blur-xl shadow-2xl shadow-black/40">
          
          <form onSubmit={handleEmailSignIn} className="space-y-4 mb-5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-white/70">Email</label>
              <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@example.com" className="w-full bg-[#161616] border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand/50 transition-all text-white placeholder:text-white/30" />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-white/70">Password</label>
              <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full bg-[#161616] border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand/50 transition-all text-white placeholder:text-white/30" />
            </div>

            {formError && (
              <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2 text-xs text-red-400">
                <AlertCircle className="w-4 h-4 shrink-0" />{formError}
              </div>
            )}

            <button type="submit" disabled={formLoading} className="w-full mt-2 bg-brand hover:bg-brand-light text-white font-semibold py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)] active:scale-[0.98] disabled:opacity-60">
              {formLoading ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/[0.08]" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-[#141414] px-3 text-[10px] text-white/40 font-semibold uppercase tracking-widest rounded-full">
                or
              </span>
            </div>
          </div>

          {/* Google Sign-in Button */}
          <motion.button
            onClick={handleSignIn}
            disabled={signingIn}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-white/95 text-gray-800 font-semibold text-sm py-3.5 rounded-xl transition-all shadow-lg shadow-black/20 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {signingIn
              ? <Loader2 className="w-5 h-5 animate-spin text-gray-500" />
              : <GoogleIcon className="w-5 h-5" />
            }
            {signingIn ? 'Redirecting to Google...' : 'Continue with Google'}
          </motion.button>
        </div>

        {/* Footer note */}
        <p className="text-center text-[12px] text-white/40 mt-6 leading-relaxed">
          New to ClieX?{' '}
          <a href="/signup" className="text-brand font-semibold hover:underline">
            Create an account
          </a>
        </p>
      </motion.div>


    </div>
  );
};
