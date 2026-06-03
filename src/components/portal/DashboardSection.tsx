import React from 'react';
import { motion } from 'motion/react';
import {
  PhoneCall, Clock, CalendarCheck, TrendingUp,
  Sparkles, ArrowRight, Activity,
} from 'lucide-react';

interface DashboardSectionProps {
  userName: string;
  planName: string;
  onNavigate: (section: string) => void;
}

const STATS = [
  { label: 'Total Calls',       value: '1,247',  change: '+12%', icon: <PhoneCall className="w-5 h-5" />,      color: 'bg-brand/10 text-brand' },
  { label: 'Minutes Used',      value: '3,891',  change: '+8%',  icon: <Clock className="w-5 h-5" />,          color: 'bg-sky-500/10 text-sky-400' },
  { label: 'Appointments',      value: '89',     change: '+23%', icon: <CalendarCheck className="w-5 h-5" />,  color: 'bg-emerald-500/10 text-emerald-400' },
  { label: 'Resolution Rate',   value: '98.2%',  change: '+1.4%',icon: <TrendingUp className="w-5 h-5" />,     color: 'bg-amber-500/10 text-amber-400' },
];

const RECENT_CALLS = [
  { name: 'Marcus Vance',    scenario: 'Pizza Restaurant Order',     time: '9:41 AM',   status: 'active' as const,    duration: '2m 14s' },
  { name: 'Sophia Chen',     scenario: 'Dental Clinic Appointment',  time: '8:12 AM',   status: 'completed' as const, duration: '1m 45s' },
  { name: 'David Lim',       scenario: 'SaaS Billing Support',       time: 'Yesterday', status: 'completed' as const, duration: '3m 12s' },
  { name: 'Emily Rodriguez', scenario: 'Auto Repair Scheduling',     time: 'Yesterday', status: 'completed' as const, duration: '2m 03s' },
  { name: 'James Park',      scenario: 'Insurance Claim Inquiry',    time: 'May 28',    status: 'completed' as const, duration: '4m 18s' },
];

const QUICK_ACTIONS = [
  { label: 'Test Agent',       icon: <Sparkles className="w-4 h-4" />,   section: 'sandbox',   accent: 'bg-brand hover:bg-brand/90 text-white shadow-lg shadow-brand/20' },
  { label: 'Upload Knowledge', icon: <ArrowRight className="w-4 h-4" />, section: 'knowledge', accent: 'bg-white/5 hover:bg-white/10 text-white/80 border border-white/10' },
  { label: 'View Billing',     icon: <ArrowRight className="w-4 h-4" />, section: 'billing',   accent: 'bg-white/5 hover:bg-white/10 text-white/80 border border-white/10' },
];

export const DashboardSection: React.FC<DashboardSectionProps> = ({ userName, planName, onNavigate }) => {
  const minutesUsed = 3891;
  const minutesLimit = planName === 'Enterprise' ? 10000 : planName === 'Pro Growth' ? 2500 : 1000;
  const usagePct = Math.min((minutesUsed / minutesLimit) * 100, 100);

  return (
    <div className="flex flex-col gap-6 max-w-[1200px]">
      {/* Welcome banner */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand/20 via-brand/5 to-transparent border border-brand/15 p-6 md:p-8"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="relative z-10">
          <h1 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
            Welcome back, {userName.split(' ')[0]} 👋
          </h1>
          <p className="text-sm text-white/50 mt-1.5 font-medium">
            Here's what's happening with your AI voice agent today.
          </p>
        </div>
      </motion.div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.06 }}
            className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 md:p-5 hover:border-white/10 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${stat.color}`}>
                {stat.icon}
              </div>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded">
                {stat.change}
              </span>
            </div>
            <p className="text-xl md:text-2xl font-extrabold text-white">{stat.value}</p>
            <p className="text-[11px] text-white/40 font-medium mt-0.5">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Middle row: Usage + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Usage meter */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="lg:col-span-2 bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 md:p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-white">Minutes Usage</h3>
              <p className="text-[11px] text-white/40 mt-0.5">Current billing period</p>
            </div>
            <span className="text-xs font-mono font-bold text-white/60">
              {minutesUsed.toLocaleString()} / {minutesLimit.toLocaleString()}
            </span>
          </div>
          <div className="w-full h-3 rounded-full bg-white/5 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${usagePct}%` }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
              className={`h-full rounded-full ${usagePct > 90 ? 'bg-red-500' : usagePct > 70 ? 'bg-amber-500' : 'bg-brand'}`}
            />
          </div>
          <p className="text-[10px] text-white/30 mt-2 font-medium">
            {usagePct >= 100 ? '⚠️ You have exceeded your plan limit. Overage charges may apply.' : `${(100 - usagePct).toFixed(0)}% of your plan remaining`}
          </p>

          {/* Mini chart simulation */}
          <div className="flex items-end gap-1 mt-5 h-12">
            {[35, 48, 42, 65, 58, 72, 68, 80, 74, 90, 85, 95, 88, 78].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: 0.7 + i * 0.05, duration: 0.4 }}
                className="flex-1 rounded-sm bg-brand/30 hover:bg-brand/50 transition-colors"
              />
            ))}
          </div>
          <div className="flex justify-between mt-1.5 text-[9px] text-white/20 font-mono">
            <span>May 17</span>
            <span>Today</span>
          </div>
        </motion.div>

        {/* Quick actions */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5"
        >
          <h3 className="text-sm font-bold text-white mb-4">Quick Actions</h3>
          <div className="flex flex-col gap-2.5">
            {QUICK_ACTIONS.map((action) => (
              <button
                key={action.label}
                onClick={() => onNavigate(action.section)}
                className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-semibold transition-all active:scale-[0.97] ${action.accent}`}
              >
                {action.icon}
                {action.label}
              </button>
            ))}
          </div>

          {/* Agent status */}
          <div className="mt-5 p-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 flex items-center gap-3">
            <div className="relative">
              <Activity className="w-5 h-5 text-emerald-400" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-emerald-400">Agent Active</p>
              <p className="text-[10px] text-white/40">Latency: 1.4s · Uptime: 99.99%</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent calls */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white/[0.03] border border-white/[0.06] rounded-xl overflow-hidden"
      >
        <div className="flex items-center justify-between p-5 border-b border-white/[0.06]">
          <h3 className="text-sm font-bold text-white">Recent Calls</h3>
          <button
            onClick={() => onNavigate('calls')}
            className="text-[11px] text-brand hover:text-brand/80 font-semibold flex items-center gap-1 transition-colors"
          >
            View All <ArrowRight className="w-3 h-3" />
          </button>
        </div>
        <div className="divide-y divide-white/[0.04]">
          {RECENT_CALLS.map((call, i) => (
            <div
              key={i}
              onClick={() => onNavigate('calls')}
              className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/[0.02] cursor-pointer transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand/40 to-purple-900 flex items-center justify-center text-[10px] font-bold text-white shrink-0">
                {call.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-white truncate">{call.name}</p>
                <p className="text-[10px] text-white/40 truncate">{call.scenario}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-[10px] text-white/40 font-mono">{call.time}</p>
                <div className="flex items-center gap-1.5 justify-end mt-0.5">
                  <Clock className="w-3 h-3 text-white/30" />
                  <span className="text-[10px] text-white/30 font-mono">{call.duration}</span>
                </div>
              </div>
              {call.status === 'active' && (
                <span className="shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 text-[9px] font-bold uppercase tracking-wider animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Live
                </span>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
