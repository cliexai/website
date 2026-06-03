import React from 'react';
import { motion } from 'motion/react';
import {
  CreditCard, Download, ArrowUpRight,
  CheckCircle, TrendingUp,
} from 'lucide-react';

interface BillingSectionProps {
  planName: string;
  userEmail: string;
}

const INVOICES = [
  { id: 'INV-2026-005', date: 'May 1, 2026',  amount: '$499.00', status: 'paid' as const },
  { id: 'INV-2026-004', date: 'Apr 1, 2026',  amount: '$499.00', status: 'paid' as const },
  { id: 'INV-2026-003', date: 'Mar 1, 2026',  amount: '$499.00', status: 'paid' as const },
  { id: 'INV-2026-002', date: 'Feb 1, 2026',  amount: '$499.00', status: 'paid' as const },
  { id: 'INV-2026-001', date: 'Jan 15, 2026', amount: '$1,998.00', status: 'paid' as const },
];

const PLAN_DETAILS: Record<string, { price: string; minutes: string; agents: string; features: string[] }> = {
  'Starter':    { price: '$199', minutes: '1,000', agents: '1 Inbound Agent',           features: ['Standard FAQs', 'Email Support', '1,000 Call Min/mo'] },
  'Pro Growth': { price: '$499', minutes: '2,500', agents: '3 Specialized Agents',      features: ['Full CRM & Calendar Sync', 'Smart Human Handoff', 'Priority Support'] },
  'Enterprise': { price: 'Custom', minutes: '10,000+', agents: 'Unlimited Custom Agents', features: ['Custom Voice Cloning', 'Multi-Language', 'HIPAA/PCI Compliance', 'Dedicated Manager'] },
};

export const BillingSection: React.FC<BillingSectionProps> = ({ planName, userEmail }) => {
  const plan = PLAN_DETAILS[planName] || PLAN_DETAILS['Starter'];
  const minutesUsed = 1847;
  const minutesLimit = parseInt(plan.minutes.replace(/,/g, '')) || 2500;
  const usagePct = Math.min((minutesUsed / minutesLimit) * 100, 100);
  const costPerMinute = planName === 'Enterprise' ? '$0.04' : planName === 'Pro Growth' ? '$0.08' : '$0.12';
  const overageRate = '$0.15/min';

  return (
    <div className="flex flex-col gap-5 max-w-[1000px]">
      <div>
        <h2 className="text-lg font-extrabold text-white">Billing & Usage</h2>
        <p className="text-xs text-white/40 mt-0.5">Manage your subscription, track usage, and view invoices.</p>
      </div>

      {/* Plan card + Usage */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Current plan */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden bg-gradient-to-br from-brand/15 via-brand/5 to-transparent border border-brand/20 rounded-xl p-5"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-brand/10 rounded-full blur-[60px] pointer-events-none" />
          <div className="relative z-10">
            <span className="text-[10px] font-bold text-brand uppercase tracking-wider">Current Plan</span>
            <h3 className="text-2xl font-extrabold text-white mt-1">{planName}</h3>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-3xl font-extrabold text-white">{plan.price}</span>
              {plan.price !== 'Custom' && <span className="text-xs text-white/40">/month</span>}
            </div>
            <p className="text-[11px] text-white/40 mt-2">{plan.agents}</p>

            <div className="flex flex-col gap-1.5 mt-4">
              {plan.features.map((f, i) => (
                <div key={i} className="flex items-center gap-2 text-[11px] text-white/60">
                  <CheckCircle className="w-3.5 h-3.5 text-brand shrink-0" />
                  {f}
                </div>
              ))}
            </div>

            <div className="flex gap-2 mt-5">
              <button
                onClick={() => { window.location.href = '/get-started'; }}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-brand text-white rounded-lg text-[11px] font-semibold hover:bg-brand/90 active:scale-95 transition-all"
              >
                <ArrowUpRight className="w-3.5 h-3.5" /> Upgrade Plan
              </button>
            </div>
          </div>
        </motion.div>

        {/* Usage breakdown */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 flex flex-col"
        >
          <span className="text-[10px] font-bold text-white/50 uppercase tracking-wider mb-4">Usage This Period</span>

          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-white/60 font-medium">Minutes Used</span>
            <span className="text-xs font-mono font-bold text-white">{minutesUsed.toLocaleString()} / {plan.minutes}</span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-white/5 overflow-hidden mb-4">
            <motion.div initial={{ width: 0 }} animate={{ width: `${usagePct}%` }} transition={{ duration: 1, delay: 0.3 }}
              className={`h-full rounded-full ${usagePct > 90 ? 'bg-red-500' : usagePct > 70 ? 'bg-amber-500' : 'bg-brand'}`}
            />
          </div>

          <div className="grid grid-cols-2 gap-3 mt-auto">
            <div className="bg-white/[0.03] border border-white/[0.04] rounded-lg p-3">
              <p className="text-[10px] text-white/40 font-medium">Cost / Minute</p>
              <p className="text-sm font-bold text-white mt-0.5">{costPerMinute}</p>
            </div>
            <div className="bg-white/[0.03] border border-white/[0.04] rounded-lg p-3">
              <p className="text-[10px] text-white/40 font-medium">Overage Rate</p>
              <p className="text-sm font-bold text-white mt-0.5">{overageRate}</p>
            </div>
            <div className="bg-white/[0.03] border border-white/[0.04] rounded-lg p-3">
              <p className="text-[10px] text-white/40 font-medium">Next Renewal</p>
              <p className="text-sm font-bold text-white mt-0.5">Jun 1, 2026</p>
            </div>
            <div className="bg-white/[0.03] border border-white/[0.04] rounded-lg p-3">
              <p className="text-[10px] text-white/40 font-medium">Est. This Month</p>
              <p className="text-sm font-bold text-white mt-0.5 flex items-center gap-1">
                $499.00 <TrendingUp className="w-3 h-3 text-emerald-400" />
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Payment method */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-500 rounded-md flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-xs font-semibold text-white">Visa ending in •••• 4242</p>
            <p className="text-[10px] text-white/35 mt-0.5">Expires 12/2028 · {userEmail}</p>
          </div>
        </div>
        <button className="px-3 py-1.5 rounded-lg border border-white/10 text-[11px] font-semibold text-white/60 hover:text-white hover:bg-white/5 transition-all">
          Update
        </button>
      </motion.div>

      {/* Invoice history */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="bg-white/[0.02] border border-white/[0.06] rounded-xl overflow-hidden"
      >
        <div className="p-4 border-b border-white/[0.06]">
          <h3 className="text-sm font-bold text-white">Invoice History</h3>
        </div>
        <div className="divide-y divide-white/[0.04]">
          {INVOICES.map((inv) => (
            <div key={inv.id} className="flex items-center justify-between px-4 py-3 hover:bg-white/[0.02] transition-colors">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-4 h-4 text-emerald-500/60 shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-white">{inv.id}</p>
                  <p className="text-[10px] text-white/35">{inv.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-white">{inv.amount}</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {inv.status === 'paid' ? 'Paid' : 'Pending'}
                </span>
                <button className="w-7 h-7 rounded-lg flex items-center justify-center text-white/20 hover:text-white/50 hover:bg-white/5 transition-all" title="Download">
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="px-4 py-3 border-t border-white/[0.04] text-[10px] text-white/25 text-center">
          Showing last 5 invoices · <button className="text-brand hover:underline">View all</button>
        </div>
      </motion.div>
    </div>
  );
};
