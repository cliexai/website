import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Menu } from 'lucide-react';
import { PortalSidebar, type PortalSection } from './PortalSidebar';
import { DashboardSection } from './DashboardSection';
import { CallHistorySection } from './CallHistorySection';
import { SandboxSection } from './SandboxSection';
import { KnowledgeBaseSection } from './KnowledgeBaseSection';
import { IntegrationsSection } from './IntegrationsSection';
import { SupportSection } from './SupportSection';
import { BillingSection } from './BillingSection';
import { SettingsSection } from './SettingsSection';

interface PortalShellProps {
  userName: string;
  userEmail: string;
  userAvatar?: string;
  onSignOut: () => void;
}

const SECTION_TITLES: Record<PortalSection, string> = {
  dashboard:    'Dashboard',
  calls:        'Call History',
  sandbox:      'Agent Sandbox',
  knowledge:    'Knowledge Base',
  integrations: 'Integrations',
  support:      'Support',
  billing:      'Billing & Usage',
  settings:     'Settings',
};

export const PortalShell: React.FC<PortalShellProps> = ({
  userName, userEmail, userAvatar, onSignOut,
}) => {
  const [activeSection, setActiveSection] = useState<PortalSection>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Determine plan from localStorage or default
  const planName = (() => {
    try {
      const s = localStorage.getItem('cliex-settings');
      if (s) {
        const parsed = JSON.parse(s);
        if (parsed.planName) return parsed.planName;
      }
    } catch { /* ignore */ }
    return 'Pro Growth';
  })();

  const navigateTo = (section: string) => {
    setActiveSection(section as PortalSection);
  };

  // Determine if section needs full-height (no padding) layout
  const isFullHeightSection = activeSection === 'calls' || activeSection === 'sandbox';

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardSection userName={userName} planName={planName} onNavigate={navigateTo} />;
      case 'calls':
        return <CallHistorySection />;
      case 'sandbox':
        return <SandboxSection />;
      case 'knowledge':
        return <KnowledgeBaseSection />;
      case 'integrations':
        return <IntegrationsSection />;
      case 'support':
        return <SupportSection />;
      case 'billing':
        return <BillingSection planName={planName} userEmail={userEmail} />;
      case 'settings':
        return <SettingsSection userName={userName} userEmail={userEmail} userAvatar={userAvatar} onSignOut={onSignOut} />;
      default:
        return <DashboardSection userName={userName} planName={planName} onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="h-screen bg-[#0c0c0c] text-white flex overflow-hidden font-sans selection:bg-brand/30">
      {/* Sidebar */}
      <PortalSidebar
        active={activeSection}
        onNavigate={setActiveSection}
        onSignOut={onSignOut}
        userName={userName}
        userEmail={userEmail}
        userAvatar={userAvatar}
        planName={planName}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        mobileOpen={mobileMenuOpen}
        onMobileClose={() => setMobileMenuOpen(false)}
      />

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar (mobile menu button + section title) */}
        <header className="h-12 md:h-14 border-b border-white/[0.06] flex items-center justify-between px-4 md:px-6 shrink-0 bg-[#0c0c0c]">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden w-8 h-8 rounded-lg flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 transition-all"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h2 className="text-sm font-bold text-white tracking-tight">
              {SECTION_TITLES[activeSection]}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 text-[10px] text-white/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Agent Online</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className={`flex-1 overflow-y-auto overflow-x-hidden ${isFullHeightSection ? '' : 'p-4 md:p-6 lg:p-8'}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className={isFullHeightSection ? 'h-full' : ''}
            >
              {renderSection()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};
