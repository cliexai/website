import React from 'react';

interface BillingSectionProps {
  planName: string;
  userEmail: string;
  onNavigate: (section: string) => void;
}

export const BillingSection: React.FC<BillingSectionProps> = ({ onNavigate }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-stack-lg max-w-container-max mx-auto w-full">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="font-headline-xl text-headline-xl text-primary mb-2">Account Management</h2>
          <p className="text-body-lg text-on-surface-variant max-w-2xl">Configure your enterprise ecosystem and manage your premium subscription tiers below.</p>
        </div>
        <div className="voice-wave-container px-6 py-3 rounded-full bg-surface-container-high flex items-center gap-2">
          <div className="voice-bar w-[3px] bg-primary rounded-full animate-[wave_1.2s_infinite]" style={{ animationDelay: '0.1s', height: '16px' }}></div>
          <div className="voice-bar w-[3px] bg-primary rounded-full animate-[wave_1.2s_infinite]" style={{ animationDelay: '0.3s', height: '12px' }}></div>
          <div className="voice-bar w-[3px] bg-primary rounded-full animate-[wave_1.2s_infinite]" style={{ animationDelay: '0.2s', height: '20px' }}></div>
          <span className="ml-3 font-label-md text-label-md text-primary">Live Agent Active</span>
        </div>
      </div>
      
      <div className="flex gap-8 border-b border-outline-variant mb-8">
        <button className="pb-4 font-label-md text-label-md text-on-surface-variant hover:text-primary transition-all" onClick={() => onNavigate('integrations')}>Integrations</button>
        <button className="pb-4 font-label-md text-label-md text-primary border-b-2 border-primary transition-all" onClick={() => onNavigate('billing')}>Billing & Subscription</button>
      </div>

      
<div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">

<div className="lg:col-span-2 glass-card rounded-2xl p-8 border-2 border-primary/40">
<div className="flex justify-between items-start mb-8">
<div>
<span className="text-primary font-label-md uppercase tracking-widest text-caption">Current Plan</span>
<h3 className="font-headline-xl text-headline-xl">Professional Agent</h3>
<p className="text-on-surface-variant">Unlimited calls, 10 custom voices, 24/7 support.</p>
</div>
<div className="text-right">
<p className="text-headline-lg font-headline-lg text-primary">$499<span className="text-body-md font-normal text-on-surface-variant">/mo</span></p>
<p className="text-caption text-on-surface-variant">Billed monthly</p>
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6 border-y border-outline-variant">
<div>
<p className="text-caption text-on-surface-variant uppercase font-label-md mb-1">Next Billing Date</p>
<p className="font-headline-md text-headline-md">Oct 24, 2024</p>
</div>
<div>
<p className="text-caption text-on-surface-variant uppercase font-label-md mb-1">Next Amount</p>
<p className="font-headline-md text-headline-md">$499.00</p>
</div>
<div>
<p className="text-caption text-on-surface-variant uppercase font-label-md mb-1">Payment Method</p>
<p className="flex items-center gap-2 font-headline-md text-headline-md">
<span className="material-symbols-outlined">credit_card</span>
                                •••• 4242
                            </p>
</div>
</div>
<div className="mt-8 flex gap-4">
<button className="bg-primary text-on-primary px-8 py-3 rounded-xl font-label-md hover:shadow-lg transition-all">Upgrade to Enterprise</button>
<button className="border border-outline text-on-surface px-8 py-3 rounded-xl font-label-md hover:bg-surface-container-high transition-all">Change Plan</button>
</div>
</div>

<div className="bg-surface-container-low rounded-2xl p-8 flex flex-col border border-outline-variant">
<h4 className="font-headline-md text-headline-md mb-6">Usage Stats</h4>
<div className="space-y-6 flex-grow">
<div>
<div className="flex justify-between text-label-md mb-2">
<span className="text-on-surface-variant">Voice Minutes</span>
<span className="text-primary font-bold">1,240 / 5,000</span>
</div>
<div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
<div className="h-full bg-primary" style={{ width: '25%' }}></div>
</div>
</div>
<div>
<div className="flex justify-between text-label-md mb-2">
<span className="text-on-surface-variant">API Requests</span>
<span className="text-primary font-bold">45,802 / 100k</span>
</div>
<div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
<div className="h-full bg-primary" style={{ width: '46%' }}></div>
</div>
</div>
<div>
<div className="flex justify-between text-label-md mb-2">
<span className="text-on-surface-variant">Active Agents</span>
<span className="text-primary font-bold">3 / 5</span>
</div>
<div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
<div className="h-full bg-primary" style={{ width: '60%' }}></div>
</div>
</div>
</div>
<button className="mt-8 text-primary font-label-md flex items-center justify-center gap-2 hover:opacity-80">
                        View detailed usage logs <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
</button>
</div>
</div>

<div className="glass-card rounded-2xl overflow-hidden border border-outline-variant">
<div className="px-8 py-6 border-b border-outline-variant flex justify-between items-center">
<h3 className="font-headline-md text-headline-md">Invoice History</h3>
<button className="text-primary font-label-md hover:opacity-80">Download All (PDF)</button>
</div>
<table className="w-full text-left">
<thead className="bg-surface-container-high">
<tr className="text-label-md text-on-surface-variant">
<th className="px-8 py-4">Invoice ID</th>
<th className="px-8 py-4">Date</th>
<th className="px-8 py-4">Amount</th>
<th className="px-8 py-4">Status</th>
<th className="px-8 py-4 text-right">Action</th>
</tr>
</thead>
<tbody className="divide-y divide-outline-variant">
<tr className="hover:bg-surface-container-high/50 transition-colors">
<td className="px-8 py-4 font-label-md">INV-2024-008</td>
<td className="px-8 py-4 text-on-surface-variant">Sep 24, 2024</td>
<td className="px-8 py-4">$499.00</td>
<td className="px-8 py-4">
<span className="px-2 py-1 bg-green-900/30 text-green-400 text-caption rounded-lg border border-green-900">Paid</span>
</td>
<td className="px-8 py-4 text-right">
<button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">download</button>
</td>
</tr>
<tr className="hover:bg-surface-container-high/50 transition-colors">
<td className="px-8 py-4 font-label-md">INV-2024-007</td>
<td className="px-8 py-4 text-on-surface-variant">Aug 24, 2024</td>
<td className="px-8 py-4">$499.00</td>
<td className="px-8 py-4">
<span className="px-2 py-1 bg-green-900/30 text-green-400 text-caption rounded-lg border border-green-900">Paid</span>
</td>
<td className="px-8 py-4 text-right">
<button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">download</button>
</td>
</tr>
<tr className="hover:bg-surface-container-high/50 transition-colors">
<td className="px-8 py-4 font-label-md">INV-2024-006</td>
<td className="px-8 py-4 text-on-surface-variant">Jul 24, 2024</td>
<td className="px-8 py-4">$499.00</td>
<td className="px-8 py-4">
<span className="px-2 py-1 bg-green-900/30 text-green-400 text-caption rounded-lg border border-green-900">Paid</span>
</td>
<td className="px-8 py-4 text-right">
<button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">download</button>
</td>
</tr>
</tbody>
</table>
</div>

    </div>
  );
};
