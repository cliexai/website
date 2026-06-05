import React from 'react';

export const AgentPerformancePage: React.FC<{ data: any }> = () => {
  return (
    <div className="p-6 bg-white/[0.04] border border-white/10 rounded-2xl text-center">
      <h3 className="text-sm font-bold text-white mb-2">Agent Performance</h3>
      <p className="text-xs text-white/40">Agent latency and efficiency metrics coming soon.</p>
    </div>
  );
};
