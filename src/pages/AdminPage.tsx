import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  LogOut, RefreshCw, Search, Trash2, Users,
  Mail, Phone, Briefcase, Calendar, TrendingUp,
  ShieldCheck, Eye, EyeOff, Loader2, AlertCircle,
  KeyRound,
} from 'lucide-react';
import { supabase, type Lead } from '../lib/supabaseClient';

// ─── Admin access control ──────────────────────────────────────
const ADMIN_EMAILS = ['cliexai@gmail.com', 'amiador017@gmail.com'];
const isAdmin = (email?: string | null) => !!email && ADMIN_EMAILS.includes(email.toLowerCase());

// ─── View state machine ────────────────────────────────────────
type AdminView = 'loading' | 'login' | 'verify-code' | 'dashboard';

// ─── Plan badge colours ────────────────────────────────────────
const PLAN_COLORS: Record<string, string> = {
  Starter: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Growth:  'bg-brand/10 text-brand border-brand/20',
  Premium: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
};

// ─── Shared card shell ─────────────────────────────────────────
const AuthShell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen bg-[#0c0c0c] flex items-center justify-center p-6">
    <div className="fixed inset-0 pointer-events-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand/10 rounded-full blur-[120px]" />
    </div>
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 w-full max-w-sm"
    >
      {children}
    </motion.div>
  </div>
);

// ─── Error banner ──────────────────────────────────────────────
const ErrorBanner: React.FC<{ msg: string | null }> = ({ msg }) => (
  <AnimatePresence>
    {msg && (
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2.5 text-xs text-red-400"
      >
        <AlertCircle className="w-4 h-4 shrink-0" />
        {msg}
      </motion.div>
    )}
  </AnimatePresence>
);

// ════════════════════════════════════════════════════════════════
// STEP 1 — Email + Password login
// After password is verified, we sign out and send an OTP code
// to the user's email. This is the "2FA" step.
// ════════════════════════════════════════════════════════════════
interface LoginFormProps {
  onCodeSent: (email: string) => void;
}
const LoginForm: React.FC<LoginFormProps> = ({ onCodeSent }) => {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw]     = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // ── 1. Verify the password ──────────────────────────────
    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setLoading(false);
      setError(authError.message);
      return;
    }

    // ── 2. Admin-only guard ─────────────────────────────────
    if (!isAdmin(data.user?.email)) {
      await supabase.auth.signOut();
      setLoading(false);
      setError('Access denied. This portal is restricted to administrators only.');
      return;
    }

    // ── 3. Password OK → sign out, then send email OTP ──────
    // We sign out so the user can't access the dashboard until
    // they also verify the email code (true 2FA).
    await supabase.auth.signOut();

    const { error: otpError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: false,
      },
    });

    setLoading(false);

    if (otpError) {
      setError('Failed to send verification code: ' + otpError.message);
      return;
    }

    // Move to the code-entry screen
    onCodeSent(email);
  };

  return (
    <AuthShell>
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand/10 border border-brand/20 mb-4">
          <ShieldCheck className="w-7 h-7 text-brand" />
        </div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">Admin Portal</h1>
        <p className="text-xs text-white/40 mt-1 font-medium">ClieX AI · Internal Access Only</p>
      </div>

      <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-white/50 uppercase tracking-wider">Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-white/30 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email" required value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@cliexai.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white outline-none focus:border-brand/40 transition-colors placeholder-white/20"
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-white/50 uppercase tracking-wider">Password</label>
            <div className="relative">
              <ShieldCheck className="w-4 h-4 text-white/30 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type={showPw ? 'text' : 'password'} required value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-10 text-sm text-white outline-none focus:border-brand/40 transition-colors placeholder-white/20"
              />
              <button type="button" onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <ErrorBanner msg={error} />

          <button type="submit" disabled={loading}
            className="w-full bg-brand text-white font-semibold text-sm py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-brand/90 active:scale-[0.98] transition-all shadow-lg shadow-brand/20 mt-1 disabled:opacity-50">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
            {loading ? 'Verifying...' : 'Continue'}
          </button>
        </form>
      </div>

      <p className="text-center text-[11px] text-white/25 mt-4 flex items-center justify-center gap-1.5">
        <ShieldCheck className="w-3 h-3" /> 2-Factor Authentication via Email
      </p>
    </AuthShell>
  );
};

// ════════════════════════════════════════════════════════════════
// STEP 2 — Enter the 6-digit code that was emailed
// ════════════════════════════════════════════════════════════════
interface VerifyCodeProps {
  email: string;
  onVerified: () => void;
  onBack: () => void;
}
const VerifyCodeForm: React.FC<VerifyCodeProps> = ({ email, onVerified, onBack }) => {
  const [code, setCode]       = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setTimeout(() => inputRef.current?.focus(), 200); }, []);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length !== 6) return;
    setLoading(true);
    setError(null);

    const { data, error: verifyError } = await supabase.auth.verifyOtp({
      email,
      token: code,
      type: 'email',
    });

    setLoading(false);

    if (verifyError) {
      setError('Invalid or expired code. Check your email and try again.');
      setCode('');
      return;
    }

    // Final admin guard — make sure this session is actually the admin
    if (!isAdmin(data.user?.email)) {
      await supabase.auth.signOut();
      setError('Access denied.');
      return;
    }

    onVerified();
  };

  return (
    <AuthShell>
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand/10 border border-brand/20 mb-4">
          <KeyRound className="w-7 h-7 text-brand" />
        </div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">Verify Your Identity</h1>
        <p className="text-xs text-white/40 mt-1.5 leading-relaxed">
          We sent a <span className="text-white/60 font-semibold">6-digit verification code</span> to
        </p>
        <p className="text-xs text-brand font-semibold mt-0.5">{email}</p>
      </div>

      <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
        <form onSubmit={handleVerify} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-white/50 uppercase tracking-wider">
              Verification Code
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-white/30 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                ref={inputRef}
                type="text" inputMode="numeric" pattern="\d{6}" maxLength={6}
                required value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                placeholder="000000"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white font-mono tracking-[0.4em] outline-none focus:border-brand/40 transition-colors placeholder-white/20 text-center text-lg"
              />
            </div>
          </div>

          <ErrorBanner msg={error} />

          <button type="submit" disabled={loading || code.length !== 6}
            className="w-full bg-brand text-white font-semibold text-sm py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-brand/90 active:scale-[0.98] transition-all shadow-lg shadow-brand/20 disabled:opacity-50">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
            {loading ? 'Verifying...' : 'Verify & Access Dashboard'}
          </button>

          <button type="button" onClick={onBack}
            className="text-xs text-white/30 hover:text-white/60 transition-colors text-center">
            ← Back to login
          </button>
        </form>
      </div>

      <p className="text-center text-[10px] text-white/20 mt-4">
        Didn't get the code? Check your spam folder.
      </p>
    </AuthShell>
  );
};

// ─── Stats card ────────────────────────────────────────────────
const StatCard: React.FC<{
  label: string; value: string | number; icon: React.ReactNode; color: string;
}> = ({ label, value, icon, color }) => (
  <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-5 flex items-center gap-4">
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-2xl font-extrabold text-white">{value}</p>
      <p className="text-xs text-white/40 font-medium">{label}</p>
    </div>
  </div>
);

// ─── Main dashboard ────────────────────────────────────────────
const Dashboard: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const [leads, setLeads]         = useState<Lead[]>([]);
  const [loading, setLoading]     = useState(true);
  const [search, setSearch]       = useState('');
  const [planFilter, setPlanFilter] = useState<string>('All');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError]         = useState<string | null>(null);

  const fetchLeads = useCallback(async () => {
    setLoading(true); setError(null);
    const { data, error: fetchError } = await supabase
      .from('leads').select('*').order('created_at', { ascending: false });
    if (fetchError) { setError(fetchError.message); } else { setLeads(data ?? []); }
    setLoading(false);
  }, []);

  useEffect(() => { fetchLeads(); }, []);

  const filtered = useMemo(() => {
    let result = leads;
    if (planFilter !== 'All') result = result.filter((l) => l.plan === planFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (l) => l.full_name.toLowerCase().includes(q) || l.business.toLowerCase().includes(q) ||
               l.email.toLowerCase().includes(q)     || l.whatsapp.includes(q),
      );
    }
    return result;
  }, [leads, search, planFilter]);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this lead? This cannot be undone.')) return;

    // Re-verify admin session before destructive op
    const { data: sessionData } = await supabase.auth.getSession();
    if (!isAdmin(sessionData.session?.user?.email)) {
      setError('Session invalid. Please log in again.');
      await supabase.auth.signOut();
      return;
    }

    setDeletingId(id);
    const { error: deleteError } = await supabase.from('leads').delete().eq('id', id);
    if (deleteError) { setError('Failed to delete lead: ' + deleteError.message); }
    else { setLeads((prev) => prev.filter((l) => l.id !== id)); }
    setDeletingId(null);
  };

  const handleLogout = async () => { await supabase.auth.signOut(); onLogout(); };

  const totalLeads   = leads.length;
  const starterCount = leads.filter((l) => l.plan === 'Starter').length;
  const growthCount  = leads.filter((l) => l.plan === 'Growth').length;
  const premiumCount = leads.filter((l) => l.plan === 'Premium').length;

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
    });

  return (
    <div className="min-h-screen bg-[#0c0c0c] text-white">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-brand/8 rounded-full blur-[100px]" />
      </div>

      {/* Top Nav */}
      <nav className="relative z-10 border-b border-white/10 bg-[#0c0c0c]/80 backdrop-blur-xl sticky top-0">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-brand/10 border border-brand/20 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-brand" />
            </div>
            <span className="font-bold text-sm text-white tracking-tight">ClieX AI Admin</span>
            <span className="hidden sm:flex items-center gap-1 text-[10px] text-green-400 bg-green-400/10 border border-green-400/20 rounded-full px-2 py-0.5">
              <ShieldCheck className="w-3 h-3" /> 2FA Active
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={fetchLeads}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-all" title="Refresh">
              <RefreshCw className="w-4 h-4" />
            </button>
            <button onClick={handleLogout}
              className="flex items-center gap-2 text-xs text-white/50 hover:text-white border border-white/10 hover:border-white/20 rounded-lg px-3 py-1.5 transition-all">
              <LogOut className="w-3.5 h-3.5" /> Sign Out
            </button>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-extrabold tracking-tight">Lead Dashboard</h1>
          <p className="text-sm text-white/40 mt-1">All form submissions from cliexai.com</p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total Leads" value={totalLeads} icon={<Users className="w-5 h-5" />} color="bg-brand/10 text-brand" />
          <StatCard label="Starter Plan" value={starterCount} icon={<TrendingUp className="w-5 h-5" />} color="bg-blue-500/10 text-blue-400" />
          <StatCard label="Growth Plan" value={growthCount} icon={<TrendingUp className="w-5 h-5" />} color="bg-brand/10 text-brand" />
          <StatCard label="Premium Plan" value={premiumCount} icon={<TrendingUp className="w-5 h-5" />} color="bg-amber-500/10 text-amber-400" />
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-white/30 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input type="text" placeholder="Search by name, business, email, phone..."
              value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white outline-none focus:border-brand/40 transition-colors placeholder-white/20" />
          </div>
          <div className="flex gap-2">
            {['All', 'Starter', 'Growth', 'Premium'].map((plan) => (
              <button key={plan} onClick={() => setPlanFilter(plan)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                  planFilter === plan
                    ? 'bg-brand text-white border-brand shadow-md shadow-brand/20'
                    : 'bg-white/5 text-white/50 border-white/10 hover:border-white/20 hover:text-white'
                }`}>
                {plan}
              </button>
            ))}
          </div>
        </div>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              className="mb-4 flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-sm text-red-400">
              <AlertCircle className="w-4 h-4 shrink-0" />{error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Table */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20 gap-3 text-white/40">
              <Loader2 className="w-5 h-5 animate-spin" /><span className="text-sm">Loading leads...</span>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3 text-white/30">
              <Users className="w-10 h-10" />
              <span className="text-sm">
                {leads.length === 0 ? 'No leads yet. Form submissions will appear here.' : 'No leads match your filters.'}
              </span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    {[
                      { icon: <Users className="w-3.5 h-3.5" />, label: 'Name' },
                      { icon: <Briefcase className="w-3.5 h-3.5" />, label: 'Business' },
                      { icon: <Mail className="w-3.5 h-3.5" />, label: 'Email' },
                      { icon: <Phone className="w-3.5 h-3.5" />, label: 'WhatsApp' },
                      { icon: <TrendingUp className="w-3.5 h-3.5" />, label: 'Plan' },
                      { icon: <Calendar className="w-3.5 h-3.5" />, label: 'Date' },
                      { icon: null, label: '' },
                    ].map((col) => (
                      <th key={col.label} className="text-left px-5 py-3.5 text-[10px] font-bold text-white/30 uppercase tracking-wider">
                        <span className="flex items-center gap-1.5">{col.icon}{col.label}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {filtered.map((lead, i) => (
                      <motion.tr key={lead.id}
                        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }} transition={{ delay: i * 0.03, duration: 0.3 }}
                        className="border-b border-white/[0.05] hover:bg-white/[0.03] transition-colors">
                        <td className="px-5 py-4 font-semibold text-white whitespace-nowrap">{lead.full_name}</td>
                        <td className="px-5 py-4 text-white/70 whitespace-nowrap">{lead.business}</td>
                        <td className="px-5 py-4 text-white/70 whitespace-nowrap">
                          <a href={`mailto:${lead.email}`} className="hover:text-brand transition-colors">{lead.email}</a>
                        </td>
                        <td className="px-5 py-4 text-white/70 whitespace-nowrap">
                          <a href={`https://wa.me/${lead.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="hover:text-brand transition-colors">
                            {lead.whatsapp}
                          </a>
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${PLAN_COLORS[lead.plan] ?? 'bg-white/10 text-white/50 border-white/10'}`}>
                            {lead.plan}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-white/40 text-xs whitespace-nowrap">{formatDate(lead.created_at)}</td>
                        <td className="px-5 py-4">
                          <button onClick={() => handleDelete(lead.id)} disabled={deletingId === lead.id}
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-white/20 hover:text-red-400 hover:bg-red-500/10 transition-all disabled:opacity-30"
                            title="Delete lead">
                            {deletingId === lead.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
              <div className="px-5 py-3 border-t border-white/[0.05] flex items-center justify-between">
                <span className="text-xs text-white/30">Showing {filtered.length} of {leads.length} leads</span>
                <span className="text-xs text-white/20">ClieX AI · Admin Portal</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Root admin page – state machine controller ────────────────
export const AdminPage: React.FC = () => {
  const [view, setView]         = useState<AdminView>('loading');
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const session = sessionData.session;

      if (!session || !isAdmin(session.user.email)) {
        if (session) await supabase.auth.signOut();
        setView('login');
        return;
      }

      // Already have a valid admin session
      setView('dashboard');
    })();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUserEmail(null);
    setView('login');
  };

  if (view === 'loading') {
    return (
      <div className="min-h-screen bg-[#0c0c0c] flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-brand animate-spin" />
      </div>
    );
  }

  if (view === 'login') {
    return (
      <LoginForm onCodeSent={(email) => { setUserEmail(email); setView('verify-code'); }} />
    );
  }

  if (view === 'verify-code' && userEmail) {
    return (
      <VerifyCodeForm
        email={userEmail}
        onVerified={() => setView('dashboard')}
        onBack={() => setView('login')}
      />
    );
  }

  return <Dashboard onLogout={handleSignOut} />;
};
