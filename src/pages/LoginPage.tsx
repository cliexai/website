import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { LogoMark } from '../components/SharedPrimitives';
import { useAuth } from '../contexts/AuthContext';
import { Loader2, ShieldCheck, Lock } from 'lucide-react';

// Google brand SVG
const GoogleIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

const TRUST_BADGES = [
  { icon: <ShieldCheck className="w-3.5 h-3.5" />, text: 'Google OAuth 2.0' },
  { icon: <Lock className="w-3.5 h-3.5" />, text: 'No passwords stored' },
];

export const LoginPage: React.FC = () => {
  const { user, loading, signInWithGoogle } = useAuth();
  const [signingIn, setSigningIn] = useState(false);

  // If already logged in, bounce to portal
  useEffect(() => {
    if (!loading && user) {
      window.location.href = '/portal';
    }
  }, [user, loading]);

  const handleSignIn = async () => {
    setSigningIn(true);
    await signInWithGoogle();
    // signInWithGoogle performs a full redirect — no cleanup needed
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0c0c0c] flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-brand animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0c0c0c] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Ambient glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-brand/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[350px] h-[300px] bg-brand/5 rounded-full blur-[100px]" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

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

          {/* Divider */}
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/[0.08]" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-transparent px-3 text-[10px] text-white/25 font-semibold uppercase tracking-widest">
                Secured by
              </span>
            </div>
          </div>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-4">
            {TRUST_BADGES.map((b) => (
              <div
                key={b.text}
                className="flex items-center gap-1.5 text-[11px] text-white/30 font-medium"
              >
                <span className="text-brand/60">{b.icon}</span>
                {b.text}
              </div>
            ))}
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-[11px] text-white/20 mt-5 leading-relaxed">
          New to ClieX?{' '}
          <span className="text-brand/50">
            Google sign-in automatically creates your account.
          </span>
        </p>

        <div className="text-center mt-6">
          <a
            href="/"
            className="text-xs text-white/20 hover:text-white/50 transition-colors inline-flex items-center gap-1"
          >
            ← Back to cliexai.com
          </a>
        </div>
      </motion.div>
    </div>
  );
};
