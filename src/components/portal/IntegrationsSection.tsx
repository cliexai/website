import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, ExternalLink } from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  connected: boolean;
}

const STORAGE_KEY = 'cliex-integrations';

const DEFAULT_INTEGRATIONS: Integration[] = [
  { id: 'gcal',       name: 'Google Calendar',  description: 'Sync appointments & booking slots in real-time.',        category: 'Calendar',  icon: '📅', connected: false },
  { id: 'outlook',    name: 'Outlook Calendar', description: 'Connect Microsoft 365 calendar for scheduling.',          category: 'Calendar',  icon: '📧', connected: false },
  { id: 'hubspot',    name: 'HubSpot CRM',      description: 'Auto-log calls & update contact records instantly.',      category: 'CRM',       icon: '🟠', connected: false },
  { id: 'salesforce', name: 'Salesforce',        description: 'Push call data and leads to Salesforce objects.',         category: 'CRM',       icon: '☁️', connected: false },
  { id: 'ghl',        name: 'GoHighLevel',       description: 'Full CRM sync with GHL workflows and pipelines.',        category: 'CRM',       icon: '🚀', connected: false },
  { id: 'zapier',     name: 'Zapier',            description: 'Connect to 5,000+ apps via automated Zap workflows.',    category: 'Automation',icon: '⚡', connected: false },
  { id: 'twilio',     name: 'Twilio',            description: 'Custom phone numbers and SIP trunking integration.',      category: 'Telephony', icon: '📞', connected: true },
  { id: 'slack',      name: 'Slack',             description: 'Get real-time call alerts and summaries in channels.',    category: 'Messaging', icon: '💬', connected: false },
  { id: 'stripe',     name: 'Stripe',            description: 'Process payments and track billing during calls.',        category: 'Payments',  icon: '💳', connected: true },
  { id: 'webhook',    name: 'Custom Webhooks',   description: 'Send call events to any endpoint via POST requests.',     category: 'Developer', icon: '🔗', connected: false },
  { id: 'sheets',     name: 'Google Sheets',     description: 'Auto-export call logs and lead data to spreadsheets.',    category: 'Data',      icon: '📊', connected: false },
  { id: 'make',       name: 'Make (Integromat)', description: 'Visual workflow builder with advanced logic triggers.',    category: 'Automation',icon: '🔄', connected: false },
];

export const IntegrationsSection: React.FC = () => {
  const [integrations, setIntegrations] = useState<Integration[]>(() => {
    try { const s = localStorage.getItem(STORAGE_KEY); return s ? JSON.parse(s) : DEFAULT_INTEGRATIONS; } catch { return DEFAULT_INTEGRATIONS; }
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(integrations)); }, [integrations]);

  const toggleConnection = (id: string) => {
    setIntegrations(prev => prev.map(i => i.id === id ? { ...i, connected: !i.connected } : i));
  };

  const categories = ['All', ...Array.from(new Set(integrations.map(i => i.category)))];
  const connectedCount = integrations.filter(i => i.connected).length;

  const filtered = integrations.filter(i => {
    if (categoryFilter !== 'All' && i.category !== categoryFilter) return false;
    if (searchQuery.trim()) return i.name.toLowerCase().includes(searchQuery.toLowerCase()) || i.description.toLowerCase().includes(searchQuery.toLowerCase());
    return true;
  });

  return (
    <div className="flex flex-col gap-5 max-w-[1000px]">
      {/* Header */}
      <div>
        <h2 className="text-lg font-extrabold text-white">Integrations</h2>
        <p className="text-xs text-white/40 mt-0.5">
          Connect your tools to supercharge your AI agent. <span className="text-brand font-semibold">{connectedCount} active</span>
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-white/30 absolute left-3 top-1/2 -translate-y-1/2" />
          <input type="text" placeholder="Search integrations..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/[0.06] rounded-lg py-2 pl-9 pr-3 text-xs text-white outline-none focus:border-brand/40 placeholder-white/30"
          />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {categories.map(cat => (
            <button key={cat} onClick={() => setCategoryFilter(cat)}
              className={`px-2.5 py-1.5 rounded-lg text-[10px] font-semibold transition-all ${
                categoryFilter === cat ? 'bg-brand text-white' : 'bg-white/5 text-white/40 hover:text-white/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((integration, i) => (
          <motion.div
            key={integration.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className={`relative bg-white/[0.02] border rounded-xl p-4 hover:border-white/15 transition-all group ${
              integration.connected ? 'border-emerald-500/20' : 'border-white/[0.06]'
            }`}
          >
            {/* Connected indicator */}
            {integration.connected && (
              <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-emerald-500" />
            )}

            <div className="flex items-start gap-3 mb-3">
              <span className="text-2xl leading-none">{integration.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-white flex items-center gap-1.5">
                  {integration.name}
                  <ExternalLink className="w-3 h-3 text-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </p>
                <span className="text-[9px] text-white/30 font-semibold uppercase tracking-wider">{integration.category}</span>
              </div>
            </div>
            <p className="text-[11px] text-white/40 leading-relaxed mb-4">{integration.description}</p>

            <button
              onClick={() => toggleConnection(integration.id)}
              className={`w-full py-2 rounded-lg text-[11px] font-semibold transition-all active:scale-[0.97] ${
                integration.connected
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20'
                  : 'bg-white/5 text-white/60 border border-white/[0.06] hover:border-brand/30 hover:text-brand'
              }`}
            >
              {integration.connected ? 'Disconnect' : 'Connect'}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
