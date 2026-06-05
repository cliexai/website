import React from 'react';

interface IntegrationsSectionProps {
  onNavigate: (section: string) => void;
}

export const IntegrationsSection: React.FC<IntegrationsSectionProps> = ({ onNavigate }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-stack-lg max-w-container-max mx-auto w-full">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="font-headline-xl text-headline-xl text-primary mb-2">Account Management</h2>
          <p className="text-body-lg text-on-surface-variant max-w-2xl">Configure your enterprise ecosystem and manage your premium subscription tiers below.</p>
        </div>
      </div>
      
      <div className="flex gap-8 border-b border-outline-variant mb-8">
        <button className="pb-4 font-label-md text-label-md text-primary border-b-2 border-primary transition-all" onClick={() => onNavigate('integrations')}>Integrations</button>
        <button className="pb-4 font-label-md text-label-md text-on-surface-variant hover:text-primary transition-all" onClick={() => onNavigate('billing')}>Billing & Subscription</button>
      </div>

      
<div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">

<div className="glass-card rounded-xl p-stack-md tonal-elevation-1 hover:border-primary/50 transition-all group">
<div className="flex justify-between items-start mb-stack-md">
<div className="w-12 h-12 rounded-lg bg-[#00A1E0]/20 flex items-center justify-center">
<span className="material-symbols-outlined text-[#00A1E0]" style={{ fontVariationSettings: '\'FILL\' 1' }}>cloud</span>
</div>
<span className="px-3 py-1 rounded-full bg-error-container text-error text-caption font-label-md">Disconnected</span>
</div>
<h3 className="font-headline-md text-headline-md mb-2">Salesforce CRM</h3>
<p className="text-body-md text-on-surface-variant mb-6">Sync AI call transcripts and lead data directly to your CRM pipelines.</p>
<button className="w-full py-3 border border-primary text-primary font-label-md rounded-xl hover:bg-primary hover:text-on-primary transition-all">Connect CRM</button>
</div>

<div className="glass-card rounded-xl p-stack-md tonal-elevation-1 hover:border-primary/50 transition-all group">
<div className="flex justify-between items-start mb-stack-md">
<div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
<span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: '\'FILL\' 1' }}>calendar_today</span>
</div>
<span className="px-3 py-1 rounded-full bg-green-900/40 text-green-400 text-caption font-label-md">Active</span>
</div>
<h3 className="font-headline-md text-headline-md mb-2">Calendar Sync</h3>
<p className="text-body-md text-on-surface-variant mb-6">Automate appointment booking through voice interactions.</p>
<button className="w-full py-3 bg-surface-container-high text-on-surface font-label-md rounded-xl hover:bg-surface-container-highest transition-all">Configure</button>
</div>

<div className="glass-card rounded-xl p-stack-md tonal-elevation-1 hover:border-primary/50 transition-all group">
<div className="flex justify-between items-start mb-stack-md">
<div className="w-12 h-12 rounded-lg bg-surface-container-highest flex items-center justify-center">
<span className="material-symbols-outlined text-on-surface-variant" style={{ fontVariationSettings: '\'FILL\' 1' }}>terminal</span>
</div>
<span className="px-3 py-1 rounded-full bg-surface-container-highest text-on-surface-variant text-caption font-label-md">Advanced</span>
</div>
<h3 className="font-headline-md text-headline-md mb-2">Custom Webhooks</h3>
<p className="text-body-md text-on-surface-variant mb-6">Trigger custom logic via HTTP requests on specific call events.</p>
<button className="w-full py-3 border border-outline text-on-surface font-label-md rounded-xl hover:bg-surface-container-low transition-all">Setup Webhook</button>
</div>
</div>

<div className="relative overflow-hidden rounded-2xl bg-surface-container-high text-on-surface p-12 flex items-center justify-between border border-outline-variant">
<div className="relative z-10 max-w-xl">
<h3 className="font-headline-lg text-headline-lg mb-4">API Documentation</h3>
<p className="text-body-lg text-on-surface-variant mb-8">Build custom voice workflows using our robust gRPC and REST APIs. Integrate ClieX AI directly into your native applications.</p>
<div className="flex gap-4">
<button className="bg-primary text-on-primary px-8 py-3 rounded-xl font-label-md hover:scale-105 transition-transform">Explore Docs</button>
<button className="bg-transparent border border-outline px-8 py-3 rounded-xl font-label-md hover:bg-surface-container-highest">View Samples</button>
</div>
</div>
<div className="absolute right-0 top-0 h-full w-1/3 opacity-20 bg-gradient-to-l from-primary to-transparent"></div>
<span className="material-symbols-outlined text-[160px] opacity-10 absolute -right-8 -bottom-8 select-none text-primary">code_off</span>
</div>

    </div>
  );
};
