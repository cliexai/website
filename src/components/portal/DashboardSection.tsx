import React from 'react';

interface DashboardSectionProps {
  userName: string;
  planName: string;
  onNavigate: (section: string) => void;
}

export const DashboardSection: React.FC<DashboardSectionProps> = (_props) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-container-max mx-auto w-full">
      

<div className="flex flex-col md:flex-row md:items-end justify-between mb-stack-lg">
<div>
<h2 className="font-headline-lg text-headline-lg text-on-surface">Agency Overview</h2>
<p className="text-body-lg text-on-surface-variant">Real-time performance of your AI voice agents.</p>
</div>
<div className="flex items-center gap-3 mt-4 md:mt-0">
<div className="voice-wave px-4 bg-surface-container-high border border-outline-variant rounded-full h-10">
<div className="wave-bar" style={{ animationDelay: '0.1s', height: '16px', animationDuration: '1.05279s' }}></div>
<div className="wave-bar" style={{ animationDelay: '0.3s', height: '10px', animationDuration: '1.16288s' }}></div>
<div className="wave-bar" style={{ animationDelay: '0.2s', height: '13px', animationDuration: '1.2224s' }}></div>
<div className="wave-bar" style={{ animationDelay: '0.5s', height: '13px', animationDuration: '0.819512s' }}></div>
<div className="wave-bar" style={{ animationDelay: '0.4s', height: '5px', animationDuration: '1.26972s' }}></div>
<span className="text-caption font-bold ml-2 text-primary">AGENT LIVE</span>
</div>
<button className="bg-surface-container-high border border-outline-variant px-4 py-2 rounded-xl font-label-md flex items-center gap-2 hover:bg-surface-container-highest transition-all text-on-surface">
<span className="material-symbols-outlined text-[18px]">calendar_today</span>
                Last 7 Days
            </button>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter mb-stack-lg">

<div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant hover:border-primary/50 transition-all group">
<div className="flex justify-between items-start mb-4">
<div className="p-3 bg-primary/10 rounded-lg text-primary group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined" style={{ fontVariationSettings: '\'FILL\' 1' }}>call</span>
</div>
<span className="text-caption font-bold text-green-400 flex items-center gap-1 bg-green-400/10 px-2 py-0.5 rounded-full">
<span className="material-symbols-outlined text-[14px]">trending_up</span> 12%
                </span>
</div>
<p className="text-on-surface-variant font-label-md">Total Calls</p>
<h3 className="text-headline-md font-headline-md text-on-surface mt-1">12,496</h3>
</div>

<div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant hover:border-primary/50 transition-all group">
<div className="flex justify-between items-start mb-4">
<div className="p-3 bg-secondary/10 rounded-lg text-secondary group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined" style={{ fontVariationSettings: '\'FILL\' 1' }}>timer</span>
</div>
<span className="text-caption font-bold text-green-400 flex items-center gap-1 bg-green-400/10 px-2 py-0.5 rounded-full">
<span className="material-symbols-outlined text-[14px]">trending_down</span> 4%
                </span>
</div>
<p className="text-on-surface-variant font-label-md">Avg. Handle Time</p>
<h3 className="text-headline-md font-headline-md text-on-surface mt-1">1m 42s</h3>
</div>

<div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant hover:border-primary/50 transition-all group">
<div className="flex justify-between items-start mb-4">
<div className="p-3 bg-purple-500/10 rounded-lg text-purple-400 group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined" style={{ fontVariationSettings: '\'FILL\' 1' }}>move_up</span>
</div>
<span className="text-caption font-bold text-error flex items-center gap-1 bg-error/10 px-2 py-0.5 rounded-full">
<span className="material-symbols-outlined text-[14px]">trending_up</span> 2%
                </span>
</div>
<p className="text-on-surface-variant font-label-md">Transfer Rate</p>
<h3 className="text-headline-md font-headline-md text-on-surface mt-1">8.4%</h3>
</div>

<div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant hover:border-primary/50 transition-all group">
<div className="flex justify-between items-start mb-4">
<div className="p-3 bg-primary/10 rounded-lg text-primary group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined" style={{ fontVariationSettings: '\'FILL\' 1' }}>cloud_done</span>
</div>
<span className="text-caption font-bold text-green-400 flex items-center gap-1 bg-green-400/10 px-2 py-0.5 rounded-full">
                    Stable
                </span>
</div>
<p className="text-on-surface-variant font-label-md">Uptime</p>
<h3 className="text-headline-md font-headline-md text-on-surface mt-1">99.98%</h3>
</div>
</div>

<div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">

<div className="lg:col-span-2 bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden flex flex-col">
<div className="p-6 border-b border-outline-variant flex justify-between items-center bg-surface-container-low/50">
<h4 className="font-headline-md text-body-lg font-bold text-on-surface">Recent Call Activity</h4>
<button className="text-primary font-label-md hover:text-secondary transition-colors">View All Logs</button>
</div>
<div className="p-2 overflow-y-auto max-h-[500px]">
<table className="w-full text-left border-collapse">
<thead>
<tr className="text-caption text-on-surface-variant border-b border-outline-variant">
<th className="p-4 font-bold uppercase tracking-wider">Contact</th>
<th className="p-4 font-bold uppercase tracking-wider">Intent</th>
<th className="p-4 font-bold uppercase tracking-wider">Duration</th>
<th className="p-4 font-bold uppercase tracking-wider">Sentiment</th>
<th className="p-4 font-bold text-right uppercase tracking-wider">Action</th>
</tr>
</thead>
<tbody className="divide-y divide-outline-variant/50">
<tr className="hover:bg-surface-container-high/50 transition-colors group">
<td className="p-4">
<div className="flex items-center gap-3">
<div className="w-8 h-8 bg-surface-container-highest rounded-full flex items-center justify-center text-primary font-bold text-caption">JD</div>
<div>
<p className="font-label-md text-on-surface">+1 (555) 012-3456</p>
<p className="text-[10px] text-on-surface-variant">2 mins ago</p>
</div>
</div>
</td>
<td className="p-4">
<span className="bg-surface-container-highest text-on-surface-variant border border-outline-variant px-2 py-1 rounded-full text-[11px] font-bold">Billing Inquiry</span>
</td>
<td className="p-4 text-caption text-on-surface">2m 14s</td>
<td className="p-4">
<div className="flex items-center gap-1 text-green-400">
<span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: '\'FILL\' 1' }}>sentiment_satisfied</span>
<span className="text-caption font-bold">Positive</span>
</div>
</td>
<td className="p-4 text-right">
<button className="text-on-surface-variant hover:text-primary transition-colors opacity-0 group-hover:opacity-100">
<span className="material-symbols-outlined">play_circle</span>
</button>
</td>
</tr>
<tr className="hover:bg-surface-container-high/50 transition-colors group">
<td className="p-4">
<div className="flex items-center gap-3">
<div className="w-8 h-8 bg-surface-container-highest rounded-full flex items-center justify-center text-primary font-bold text-caption">SM</div>
<div>
<p className="font-label-md text-on-surface">+1 (555) 098-7654</p>
<p className="text-[10px] text-on-surface-variant">15 mins ago</p>
</div>
</div>
</td>
<td className="p-4">
<span className="bg-surface-container-highest text-on-surface-variant border border-outline-variant px-2 py-1 rounded-full text-[11px] font-bold">Scheduling</span>
</td>
<td className="p-4 text-caption text-on-surface">0m 45s</td>
<td className="p-4">
<div className="flex items-center gap-1 text-on-surface-variant">
<span className="material-symbols-outlined text-[16px]">sentiment_neutral</span>
<span className="text-caption font-bold">Neutral</span>
</div>
</td>
<td className="p-4 text-right">
<button className="text-on-surface-variant hover:text-primary transition-colors opacity-0 group-hover:opacity-100">
<span className="material-symbols-outlined">play_circle</span>
</button>
</td>
</tr>
<tr className="hover:bg-surface-container-high/50 transition-colors group">
<td className="p-4">
<div className="flex items-center gap-3">
<div className="w-8 h-8 bg-surface-container-highest rounded-full flex items-center justify-center text-primary font-bold text-caption">RT</div>
<div>
<p className="font-label-md text-on-surface">+1 (555) 234-5678</p>
<p className="text-[10px] text-on-surface-variant">1 hour ago</p>
</div>
</div>
</td>
<td className="p-4">
<span className="bg-surface-container-highest text-on-surface-variant border border-outline-variant px-2 py-1 rounded-full text-[11px] font-bold">Technical Support</span>
</td>
<td className="p-4 text-caption text-on-surface">4m 32s</td>
<td className="p-4">
<div className="flex items-center gap-1 text-error/80">
<span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: '\'FILL\' 1' }}>sentiment_dissatisfied</span>
<span className="text-caption font-bold">Negative</span>
</div>
</td>
<td className="p-4 text-right">
<button className="text-on-surface-variant hover:text-primary transition-colors opacity-0 group-hover:opacity-100">
<span className="material-symbols-outlined">play_circle</span>
</button>
</td>
</tr>
</tbody>
</table>
</div>
</div>

<div className="space-y-gutter">

<div className="bg-primary text-on-primary p-6 rounded-xl shadow-[0_10px_30px_rgba(108,60,225,0.2)] relative overflow-hidden">
<div className="relative z-10">
<h4 className="font-headline-md text-body-lg font-bold mb-4">Quick Actions</h4>
<div className="flex flex-col gap-3">
<button className="w-full bg-white/10 hover:bg-white/20 text-white rounded-lg p-3 flex items-center justify-between transition-all group backdrop-blur-sm border border-white/5">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined">settings_voice</span>
<span className="font-label-md">Configure Agent</span>
</div>
<span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
</button>
<button className="w-full bg-white/10 hover:bg-white/20 text-white rounded-lg p-3 flex items-center justify-between transition-all group backdrop-blur-sm border border-white/5">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined">list_alt</span>
<span className="font-label-md">View Call Logs</span>
</div>
<span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
</button>
<button className="w-full bg-white/10 hover:bg-white/20 text-white rounded-lg p-3 flex items-center justify-between transition-all group backdrop-blur-sm border border-white/5">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined">person_add</span>
<span className="font-label-md">Invite Team</span>
</div>
<span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
</button>
</div>
</div>

<div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/20 rounded-full blur-3xl"></div>
</div>

<div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant">
<h4 className="font-headline-md text-label-md font-bold mb-4 text-on-surface-variant">Active Voice Profile</h4>
<div className="flex items-center gap-4 p-4 bg-surface-container-high rounded-xl border border-outline-variant/30">
<div className="w-12 h-12 bg-secondary/20 text-secondary rounded-full flex items-center justify-center border border-secondary/20">
<span className="material-symbols-outlined" style={{ fontVariationSettings: '\'FILL\' 1' }}>face</span>
</div>
<div>
<p className="font-label-md text-on-surface">"Nova" - Corporate Professional</p>
<p className="text-caption text-on-surface-variant">English (US) • Neutral Gender</p>
</div>
</div>
<div className="mt-6 flex justify-between text-caption font-bold uppercase tracking-wider text-on-surface-variant mb-2">
<span className="">CPU Load</span>
<span className="text-primary">42%</span>
</div>
<div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
<div className="h-full bg-primary rounded-full shadow-[0_0_10px_rgba(108,60,225,0.5)]" style={{ width: '42%' }}></div>
</div>
</div>
</div>
</div>

<div className="mt-stack-lg flex flex-col md:flex-row justify-between items-center bg-surface-container-low p-4 rounded-xl border border-outline-variant">
<div className="flex items-center gap-4 mb-4 md:mb-0">
<span className="flex h-3 w-3 relative">
<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
<span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
</span>
<p className="text-caption font-bold text-on-surface-variant">© 2024 ClieX AI Solutions</p>
</div>
<div className="flex items-center gap-6">
<div className="text-right">
<p className="text-[10px] text-on-surface-variant uppercase font-bold">Data Sovereignty</p>
<p className="text-caption font-bold text-primary">© 2024 ClieX AI Solutions</p>
</div>
<div className="h-8 w-px bg-outline-variant"></div>
<p className="text-caption text-on-surface-variant">© 2024 ClieX AI Solutions</p>
</div>
</div>

    </div>
  );
};
