import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  LayoutDashboard, Bot, PhoneCall, Settings, LogOut,
  Loader2, TrendingUp, Clock, CheckCircle2, Zap,
  User, Mail, Calendar, ChevronRight, Bell, PhoneIncoming,
  Mic, BookOpen, Timer, Shield,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase, type Lead } from '../lib/supabaseClient';
import { LogoMark } from '../components/SharedPrimitives';

// ─── Types ─────────────────────────────────────────────────────
type Tab = 'dashboard' | 'agent' | 'calls' | 'settings';

const TABS: { id: Tab; label: string; icon: React.FC<{ className?: string }> }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'agent',     label: 'My Agent',  icon: Bot },
  { id: 'calls',     label: 'Call Logs', icon: PhoneCall },
  { id: 'settings',  label: 'Settings',  icon: Settings },
];

const PLAN_COLORS: Record<string, string> = {
  Starter: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Growth:  'bg-brand/10 text-brand border-brand/20',
  Premium: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  free:    'bg-white/5 text-white/30 border-white/10',
};

// ─── Sub-components ────────────────────────────────────────────
const StatCard: React.FC<{
  label: string; value: string; sub: string;
  icon: React.ReactNode; color: string;
}> = ({ label, value, sub, icon, color }) => (
  <div className="bg-white/[0.04] border border-white/[0.07] rounded-2xl p-5 flex flex-col gap-3">
    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-2xl font-extrabold text-white tracking-tight">{value}</p>
      <p className="text-xs font-semibold text-white/50 mt-0.5">{label}</p>
      <p className="text-[10px] text-white/25 mt-1">{sub}</p>
    </div>
  </div>
);

// ── Dashboard Tab ──────────────────────────────────────────────
const DashboardTab: React.FC<{ user: NonNullable<ReturnType<typeof useAuth>['user']>; lead: Lead | null }> = ({ user, lead }) => {
  const plan = lead?.plan ?? 'free';
  const name = (user.user_metadata?.full_name as string | undefined) ?? user.email?.split('@')[0] ?? 'User';
  const avatar = user.user_metadata?.avatar_url as string | undefined;

  const steps = [
    { done: !!lead,  text: 'Submit setup request' },
    { done: false,   text: 'WhatsApp onboarding call with our team' },
    { done: false,   text: 'AI Agent goes live on your number' },
    { done: false,   text: 'Track calls & bookings in real-time' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Welcome banner */}
      <div className="bg-gradient-to-br from-brand/15 via-brand/8 to-transparent border border-brand/20 rounded-2xl p-6 mb-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand/5 to-transparent" />
        <div className="relative flex items-center gap-4">
          {avatar ? (
            <img src={avatar} alt={name} className="w-14 h-14 rounded-full border-2 border-brand/30 object-cover shrink-0" />
          ) : (
            <div className="w-14 h-14 rounded-full bg-brand/20 border-2 border-brand/30 flex items-center justify-center shrink-0">
              <User className="w-7 h-7 text-brand" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-xs text-brand/70 font-semibold mb-1">Welcome back 👋</p>
            <h2 className="text-xl font-extrabold text-white leading-tight truncate">{name}</h2>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${PLAN_COLORS[plan]}`}>
                {plan === 'free' ? 'Free Account' : `${plan} Plan`}
              </span>
              {lead && (
                <span className="text-[10px] text-white/25">
                  Requested {new Date(lead.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="AI Agents" value="—" sub="Activates after setup" icon={<Bot className="w-4 h-4" />} color="bg-brand/10 text-brand" />
        <StatCard label="Calls Handled" value="—" sub="Live tracking soon" icon={<PhoneIncoming className="w-4 h-4" />} color="bg-emerald-500/10 text-emerald-400" />
        <StatCard label="Avg Response" value="—" sub="Under 2s when live" icon={<Clock className="w-4 h-4" />} color="bg-sky-500/10 text-sky-400" />
        <StatCard label="Bookings Made" value="—" sub="Auto-tracked when live" icon={<TrendingUp className="w-4 h-4" />} color="bg-amber-500/10 text-amber-400" />
      </div>

      {/* Status + next steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Agent Status card */}
        <div className="bg-white/[0.04] border border-white/[0.07] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-bold text-white">Agent Status</span>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-[10px] text-amber-400 font-semibold">Pending Setup</span>
            </div>
          </div>
          <p className="text-xs text-white/40 leading-relaxed mb-4">
            Your AI Voice Agent is pending configuration. A ClieX AI representative will reach out via WhatsApp to begin your onboarding call.
          </p>
          {lead ? (
            <div className="flex items-center gap-2 text-xs text-white/40 bg-emerald-500/5 border border-emerald-500/10 rounded-xl px-3 py-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              Setup request for{' '}
              <strong className="text-brand">{plan}</strong> plan received ✓
            </div>
          ) : (
            <a
              href="/#lead-form"
              className="flex items-center gap-2 text-xs text-brand font-semibold bg-brand/10 border border-brand/20 rounded-xl px-3 py-2 hover:bg-brand/15 transition-all"
            >
              <Zap className="w-3.5 h-3.5" />
              Submit your setup request →
            </a>
          )}
        </div>

        {/* Next steps checklist */}
        <div className="bg-white/[0.04] border border-white/[0.07] rounded-2xl p-5">
          <span className="text-sm font-bold text-white block mb-4">Getting Started</span>
          <div className="flex flex-col gap-3">
            {steps.map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                  step.done ? 'bg-emerald-500/15 border-emerald-500/30' : 'border-white/10'
                }`}>
                  {step.done && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                </div>
                <span className={`text-xs font-medium leading-relaxed ${step.done ? 'text-white/35 line-through' : 'text-white/50'}`}>
                  {step.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ── Agent Tab ──────────────────────────────────────────────────
const AgentTab: React.FC = () => {
  const features = [
    { icon: <Mic className="w-3.5 h-3.5" />, text: 'Custom Voice & Personality' },
    { icon: <Clock className="w-3.5 h-3.5" />, text: 'Business Hours & Routing' },
    { icon: <BookOpen className="w-3.5 h-3.5" />, text: 'Knowledge Base Upload' },
    { icon: <PhoneIncoming className="w-3.5 h-3.5" />, text: 'Live Transfer Rules' },
    { icon: <Calendar className="w-3.5 h-3.5" />, text: 'Booking & Appointment Integration' },
    { icon: <Timer className="w-3.5 h-3.5" />, text: 'After-Hours Auto Response' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center justify-center py-12 text-center max-w-md mx-auto"
    >
      <div className="w-20 h-20 rounded-2xl bg-brand/10 border border-brand/20 flex items-center justify-center mb-6">
        <Bot className="w-10 h-10 text-brand" />
      </div>
      <h2 className="text-xl font-extrabold text-white mb-2">Agent Configuration</h2>
      <p className="text-sm text-white/40 leading-relaxed mb-8">
        Once your AI Agent is live, you'll configure everything right here — no code required.
      </p>
      <div className="flex flex-col gap-2 w-full">
        {features.map((f) => (
          <div key={f.text} className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-left">
            <span className="text-brand/60 shrink-0">{f.icon}</span>
            <span className="text-xs text-white/40 font-medium flex-1">{f.text}</span>
            <span className="text-[10px] text-white/20 font-bold uppercase tracking-wider shrink-0">Soon</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

// ── Call Logs Tab ──────────────────────────────────────────────
const CallLogsTab: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    className="flex flex-col items-center justify-center py-12 text-center"
  >
    <div className="w-20 h-20 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6">
      <PhoneCall className="w-10 h-10 text-emerald-400" />
    </div>
    <h2 className="text-xl font-extrabold text-white mb-2">Call Logs & Transcripts</h2>
    <p className="text-sm text-white/40 max-w-sm leading-relaxed mb-8">
      Every call your AI Agent handles will appear here with full transcripts, duration, sentiment analysis, and booking outcomes.
    </p>
    <div className="w-full max-w-lg bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden">
      <div className="px-5 py-3 border-b border-white/[0.05] flex items-center justify-between">
        <span className="text-[10px] font-bold text-white/25 uppercase tracking-wider">Recent Calls</span>
        <span className="text-[10px] text-white/20">Live when agent is active</span>
      </div>
      <div className="flex flex-col items-center justify-center py-12 gap-3">
        <Bell className="w-8 h-8 text-white/[0.08]" />
        <span className="text-xs text-white/20">No calls yet. Logs will appear here once your agent is live.</span>
      </div>
    </div>
  </motion.div>
);

// ── Settings Tab ───────────────────────────────────────────────
const SettingsTab: React.FC<{ user: NonNullable<ReturnType<typeof useAuth>['user']>; onSignOut: () => void }> = ({ user, onSignOut }) => {
  const name = (user.user_metadata?.full_name as string | undefined) ?? 'ClieX User';
  const avatar = user.user_metadata?.avatar_url as string | undefined;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-lg"
    >
      <h2 className="text-xl font-extrabold text-white mb-6">Account Settings</h2>

      {/* Profile */}
      <div className="bg-white/[0.04] border border-white/[0.07] rounded-2xl p-5 mb-4">
        <span className="text-[10px] font-bold text-white/25 uppercase tracking-wider block mb-4">Profile</span>
        <div className="flex items-center gap-4 mb-5 pb-5 border-b border-white/[0.06]">
          {avatar ? (
            <img src={avatar} alt={name} className="w-16 h-16 rounded-full border border-white/10 object-cover" />
          ) : (
            <div className="w-16 h-16 rounded-full bg-brand/20 border border-brand/30 flex items-center justify-center">
              <User className="w-8 h-8 text-brand" />
            </div>
          )}
          <div>
            <p className="text-sm font-bold text-white">{name}</p>
            <p className="text-xs text-white/35 mt-0.5">ClieX Account · via Google</p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div>
            <label className="text-[10px] font-bold text-white/25 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
              <Mail className="w-3 h-3" /> Email Address
            </label>
            <div className="flex items-center justify-between bg-white/5 border border-white/[0.07] rounded-xl px-3 py-2.5">
              <span className="text-sm text-white/60">{user.email}</span>
              <span className="text-[10px] text-white/20 font-medium shrink-0 ml-2">Managed by Google</span>
            </div>
          </div>
          <div>
            <label className="text-[10px] font-bold text-white/25 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
              <Calendar className="w-3 h-3" /> Member Since
            </label>
            <div className="bg-white/5 border border-white/[0.07] rounded-xl px-3 py-2.5 text-sm text-white/60">
              {new Date(user.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="bg-white/[0.04] border border-white/[0.07] rounded-2xl p-5 mb-4">
        <span className="text-[10px] font-bold text-white/25 uppercase tracking-wider block mb-4">Security</span>
        <div className="flex items-start gap-3 bg-emerald-500/5 border border-emerald-500/15 rounded-xl px-4 py-3.5">
          <Shield className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-white/70">Protected by Google OAuth 2.0</p>
            <p className="text-[10px] text-white/30 mt-0.5 leading-relaxed">
              Your ClieX Account uses enterprise-grade authentication. No passwords are ever stored on our servers.
            </p>
          </div>
        </div>
      </div>

      {/* Sign out */}
      <div className="bg-white/[0.04] border border-white/[0.07] rounded-2xl p-5">
        <span className="text-[10px] font-bold text-white/25 uppercase tracking-wider block mb-4">Session</span>
        <button
          onClick={onSignOut}
          className="flex items-center gap-2 text-sm font-semibold text-red-400 hover:text-red-300 border border-red-500/15 hover:border-red-500/30 bg-red-500/5 hover:bg-red-500/10 rounded-xl px-4 py-2.5 transition-all active:scale-95"
        >
          <LogOut className="w-4 h-4" />
          Sign Out of ClieX Account
        </button>
      </div>
    </motion.div>
  );
};

// ─── Main Portal Page ──────────────────────────────────────────
export const PortalPage: React.FC = () => {
  const { user, loading, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [lead, setLead] = useState<Lead | null>(null);

  // Guard: redirect unauthenticated users to /login
  useEffect(() => {
    if (!loading && !user) {
      window.location.href = '/login';
    }
  }, [user, loading]);

  // Fetch this user's most recent lead by email
  useEffect(() => {
    if (!user?.email) return;
    supabase
      .from('leads')
      .select('*')
      .eq('email', user.email)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()
      .then(({ data }) => setLead(data));
  }, [user]);

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-[#0c0c0c] flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-brand animate-spin" />
      </div>
    );
  }

  const name = (user.user_metadata?.full_name as string | undefined) ?? user.email?.split('@')[0] ?? 'User';
  const avatar = user.user_metadata?.avatar_url as string | undefined;

  return (
    <div className="min-h-screen bg-[#0c0c0c] text-white flex">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 left-0 w-[600px] h-[400px] bg-brand/6 rounded-full blur-[130px]" />
      </div>

      {/* ── Desktop Sidebar ───────────────────────────── */}
      <aside className="hidden md:flex flex-col fixed left-0 top-0 bottom-0 w-56 border-r border-white/[0.07] bg-[#0c0c0c]/95 backdrop-blur-xl z-20 p-5">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 mb-8 group">
          <LogoMark className="w-7 h-7 text-brand" />
          <span className="font-bold text-sm tracking-tight text-white group-hover:text-brand transition-colors">ClieX AI</span>
        </a>

        {/* Nav */}
        <nav className="flex flex-col gap-1 flex-1">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${
                activeTab === id
                  ? 'bg-brand/10 text-brand border border-brand/15'
                  : 'text-white/40 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
              {activeTab === id && <ChevronRight className="w-3 h-3 ml-auto opacity-60" />}
            </button>
          ))}
        </nav>

        {/* User + sign out */}
        <div className="border-t border-white/[0.07] pt-4 mt-4">
          <div className="flex items-center gap-2.5 mb-3">
            {avatar ? (
              <img src={avatar} alt={name} className="w-8 h-8 rounded-full border border-white/10 object-cover shrink-0" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-brand/20 flex items-center justify-center shrink-0">
                <User className="w-4 h-4 text-brand" />
              </div>
            )}
            <div className="flex-1 overflow-hidden">
              <p className="text-xs font-semibold text-white truncate">{name}</p>
              <p className="text-[10px] text-white/25 truncate">{user.email}</p>
            </div>
          </div>
          <button
            onClick={signOut}
            className="w-full flex items-center gap-2 text-xs text-white/30 hover:text-red-400 transition-colors py-1"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* ── Main Content ───────────────────────────────── */}
      <main className="flex-1 md:ml-56 flex flex-col min-h-screen pb-20 md:pb-0">
        {/* Top bar */}
        <div className="sticky top-0 z-10 border-b border-white/[0.07] bg-[#0c0c0c]/85 backdrop-blur-xl px-5 h-14 flex items-center justify-between shrink-0">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 md:hidden">
            <LogoMark className="w-6 h-6 text-brand" />
            <span className="font-bold text-sm text-white">ClieX AI</span>
          </div>
          {/* Desktop breadcrumb */}
          <span className="hidden md:block text-sm font-semibold text-white">
            {TABS.find(t => t.id === activeTab)?.label}
          </span>
          <a href="/" className="text-xs text-white/25 hover:text-white/50 transition-colors">
            ← Back to site
          </a>
        </div>

        {/* Page content */}
        <div className="flex-1 p-5 md:p-7 relative z-10">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && <DashboardTab key="dash" user={user} lead={lead} />}
            {activeTab === 'agent'     && <AgentTab key="agent" />}
            {activeTab === 'calls'     && <CallLogsTab key="calls" />}
            {activeTab === 'settings'  && <SettingsTab key="settings" user={user} onSignOut={signOut} />}
          </AnimatePresence>
        </div>
      </main>

      {/* ── Mobile Bottom Tab Bar ──────────────────────── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-20 border-t border-white/[0.07] bg-[#0c0c0c]/95 backdrop-blur-xl flex">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex-1 flex flex-col items-center gap-1 py-3 text-[10px] font-semibold transition-colors ${
              activeTab === id ? 'text-brand' : 'text-white/25'
            }`}
          >
            <Icon className="w-5 h-5" />
            {label}
          </button>
        ))}
      </nav>
    </div>
  );
};
