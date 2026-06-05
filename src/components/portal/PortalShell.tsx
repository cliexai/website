import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Menu } from 'lucide-react';
import Lenis from 'lenis';
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
  dashboard:    'Overview',
  calls:        'Call Logs',
  sandbox:      'My Agent',
  knowledge:    'Knowledge Base',
  integrations: 'Integrations',
  support:      'Help Center',
  billing:      'Billing',
  settings:     'Settings',
};

export const PortalShell: React.FC<PortalShellProps> = ({
  userName, userEmail, userAvatar, onSignOut,
}) => {
  const [activeSection, setActiveSection] = useState<PortalSection>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mainContentRef = useRef<HTMLElement | null>(null);
  const sidebarNavRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    document.title = `${SECTION_TITLES[activeSection]} | ClieX AI`;
  }, [activeSection]);

  // Lenis smooth scroll for the main content + sidebar nav
  useEffect(() => {
    if (!mainContentRef.current || !sidebarNavRef.current) return;

    const mainLenis = new Lenis({
      wrapper: mainContentRef.current,
      duration: 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 0.8,
    });

    const sidebarLenis = new Lenis({
      wrapper: sidebarNavRef.current,
      duration: 1.0,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 0.6,
    });

    let rafId: number;
    const raf = (time: number) => {
      mainLenis.raf(time);
      sidebarLenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      mainLenis.destroy();
      sidebarLenis.destroy();
    };
  }, []);

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
        return <IntegrationsSection onNavigate={navigateTo} />;
      case 'support':
        return <SupportSection />;
      case 'billing':
        return <BillingSection planName={planName} userEmail={userEmail} onNavigate={navigateTo} />;
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
        navRef={sidebarNavRef}
      />

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-background">
        {/* Top bar (mobile menu button + search + notifications + profile) */}
        <header className="sticky top-0 w-full z-40 bg-surface/60 backdrop-blur-xl border-b border-outline-variant flex justify-between items-center px-4 md:px-8 py-3 h-14 shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden w-8 h-8 rounded-lg flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 transition-all"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            {/* Search bar inside header (desktop only) */}
            <div className="hidden sm:flex items-center bg-surface-container-high px-4 py-2 rounded-full w-64 md:w-80 lg:w-96 border border-outline-variant/50 focus-within:border-primary/50 transition-all">
              <span className="material-symbols-outlined text-on-surface-variant mr-2 text-[18px]">search</span>
              <input
                className="bg-transparent border-none p-0 focus:ring-0 text-[13px] w-full placeholder:text-on-surface-variant/50 text-on-surface outline-none"
                placeholder="Search logs, agents or settings..."
                type="text"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Notification trigger */}
            <button className="hover:bg-surface-container-high rounded-full p-2 transition-all active:scale-90 relative text-on-surface-variant">
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full"></span>
            </button>

            {/* Profile badge (pl-4 border-l border-outline-variant) */}
            <div className="flex items-center gap-3 pl-4 border-l border-outline-variant">
              <div className="text-right hidden md:block">
                <p className="font-label-md text-label-md text-on-surface">{userName}</p>
                <p className="text-caption text-on-surface-variant">{planName} Plan</p>
              </div>
              
              {userAvatar ? (
                <>
                  <img
                    alt="User Profile"
                    className="w-8 h-8 rounded-full border-2 border-primary object-cover"
                    src={userAvatar}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  <div className="hidden w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-800 flex items-center justify-center text-xs font-bold text-white">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                </>
              ) : (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-800 flex items-center justify-center text-xs font-bold text-white">
                  {userName.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content */}
        <main ref={mainContentRef} className={`flex-1 overflow-y-auto overflow-x-hidden ${isFullHeightSection ? '' : 'p-6 md:p-8 lg:p-10'}`}>
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
