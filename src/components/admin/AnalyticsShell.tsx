import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BarChart3, PhoneCall, DollarSign, Users, Bot,
  LayoutDashboard, Settings, ChevronLeft, ChevronRight,
  Menu, X, RefreshCw, Loader2,
} from 'lucide-react';
import { LogoMark } from '../SharedPrimitives';
import { ToastProvider } from './Toast';
import { useRetellCalls } from '../../hooks/useRetellCalls';
import { OverviewPage } from './OverviewPage';
import { CallLogsPage } from './CallLogsPage';
import { CostAnalyticsPage } from './CostAnalyticsPage';
import { CallerAnalyticsPage } from './CallerAnalyticsPage';
import { AgentPerformancePage } from './AgentPerformancePage';

// ─── Route config ──────────────────────────────────────────────

type AnalyticsSection = 'overview' | 'calls' | 'costs' | 'callers' | 'agents' | 'settings';

interface NavItem {
  id: AnalyticsSection | 'lead-dashboard';
  label: string;
  icon: React.ReactNode;
  path: string;
  dividerBefore?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'overview', label: 'Overview', icon: <BarChart3 className="w-[18px] h-[18px]" />, path: '/admin/analytics/overview' },
  { id: 'calls', label: 'Call Logs', icon: <PhoneCall className="w-[18px] h-[18px]" />, path: '/admin/analytics/calls' },
  { id: 'costs', label: 'Cost Analytics', icon: <DollarSign className="w-[18px] h-[18px]" />, path: '/admin/analytics/costs' },
  { id: 'callers', label: 'Caller Analytics', icon: <Users className="w-[18px] h-[18px]" />, path: '/admin/analytics/callers' },
  { id: 'agents', label: 'Agent Performance', icon: <Bot className="w-[18px] h-[18px]" />, path: '/admin/analytics/agents' },
  { id: 'lead-dashboard', label: 'Lead Dashboard', icon: <LayoutDashboard className="w-[18px] h-[18px]" />, path: '/admin', dividerBefore: true },
  { id: 'settings', label: 'Settings', icon: <Settings className="w-[18px] h-[18px]" />, path: '/admin/settings' },
];

const SECTION_TITLES: Record<string, string> = {
  overview: 'Overview',
  calls: 'Call Logs',
  costs: 'Cost Analytics',
  callers: 'Caller Analytics',
  agents: 'Agent Performance',
  settings: 'Settings',
};

function getActiveSection(): AnalyticsSection {
  const path = window.location.pathname;
  if (path.includes('/analytics/calls')) return 'calls';
  if (path.includes('/analytics/costs')) return 'costs';
  if (path.includes('/analytics/callers')) return 'callers';
  if (path.includes('/analytics/agents')) return 'agents';
  if (path.includes('/settings')) return 'settings';
  return 'overview';
}

// ─── Shell Component ───────────────────────────────────────────

interface AnalyticsShellProps {
  onLogout: () => void;
}

export const AnalyticsShell: React.FC<AnalyticsShellProps> = ({ onLogout }) => {
  const [activeSection, setActiveSection] = useState<AnalyticsSection>(getActiveSection);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const data = useRetellCalls();

  // Sync active section with browser URL on popstate
  useEffect(() => {
    const handlePopState = () => setActiveSection(getActiveSection());
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (item: NavItem) => {
    if (item.id === 'lead-dashboard') {
      window.location.href = '/admin';
      return;
    }
    window.history.pushState(null, '', item.path);
    setActiveSection(item.id as AnalyticsSection);
    setMobileOpen(false);
  };

  const renderPage = () => {
    switch (activeSection) {
      case 'overview':
        return <OverviewPage data={data} />;
      case 'calls':
        return <CallLogsPage data={data} />;
      case 'costs':
        return <CostAnalyticsPage data={data} />;
      case 'callers':
        return <CallerAnalyticsPage data={data} />;
      case 'agents':
        return <AgentPerformancePage data={data} />;
      case 'settings':
        return (
          <div className="flex flex-col items-center justify-center py-32 gap-4 text-white/30">
            <Settings className="w-12 h-12" />
            <p className="text-sm">Settings page coming soon</p>
          </div>
        );
      default:
        return <OverviewPage data={data} />;
    }
  };

  // ─── Sidebar content ──────────────────────────────────────
  const sidebar = (
    <div className={`h-full flex flex-col bg-[#0a0a0b] border-r border-white/[0.06] transition-all duration-300 ${collapsed ? 'w-[68px]' : 'w-[250px]'}`}>
      {/* Header */}
      <div className={`h-14 border-b border-white/[0.06] flex items-center shrink-0 ${collapsed ? 'justify-center px-2' : 'px-4 justify-between'}`}>
        <button onClick={() => window.location.href = '/'} className="flex items-center gap-2.5 min-w-0 hover:opacity-80 transition-opacity cursor-pointer" title="Back to Landing Page">
          <LogoMark className="w-6 h-6 text-brand shrink-0 pointer-events-none" />
          {!collapsed && <span className="font-bold text-[13px] tracking-tight text-white truncate pointer-events-none">ClieX AI</span>}
        </button>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex w-6 h-6 rounded-md items-center justify-center text-white/30 hover:text-white/60 hover:bg-white/5 transition-all shrink-0"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
        </button>
        <button
          onClick={() => setMobileOpen(false)}
          className="md:hidden w-7 h-7 rounded-md flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5"
          aria-label="Close menu"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Admin badge */}
      <div className={`shrink-0 border-b border-white/[0.06] ${collapsed ? 'px-2 py-3' : 'p-4'}`}>
        <div className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'}`}>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand to-purple-800 flex items-center justify-center text-[11px] font-bold text-white shrink-0">A</div>
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-white truncate">Admin Portal</p>
              <p className="text-[10px] text-white/40 truncate">Voice Analytics</p>
            </div>
          )}
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 flex flex-col gap-0.5">
        {NAV_ITEMS.map((item) => {
          const isActive = item.id === activeSection;
          return (
            <React.Fragment key={item.id}>
              {item.dividerBefore && (
                <div className="my-2 mx-2 border-t border-white/[0.06]" />
              )}
              <button
                onClick={() => navigate(item)}
                title={collapsed ? item.label : undefined}
                className={`group relative flex items-center gap-2.5 rounded-lg transition-all duration-200 text-left ${
                  collapsed ? 'justify-center px-2 py-2.5' : 'px-3 py-2.5'
                } ${
                  isActive
                    ? 'bg-brand/10 text-white'
                    : 'text-white/50 hover:text-white/80 hover:bg-white/[0.04]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="admin-nav-indicator"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-brand rounded-r-full"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span className={`shrink-0 ${isActive ? 'text-brand' : 'text-white/40 group-hover:text-white/60'}`}>
                  {item.icon}
                </span>
                {!collapsed && (
                  <span className="text-xs font-medium flex-1 truncate">{item.label}</span>
                )}
              </button>
            </React.Fragment>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className={`shrink-0 border-t border-white/[0.06] ${collapsed ? 'px-2 py-3' : 'p-3'}`}>
        {!collapsed && (
          <div className="p-3 rounded-xl border border-white/[0.06] bg-white/[0.02] mb-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold text-brand uppercase tracking-wider">System Online</span>
            </div>
            <span className="text-[10px] text-white/40 leading-relaxed">
              {data.allCalls.length} calls tracked
            </span>
          </div>
        )}
        <button
          onClick={onLogout}
          className={`flex items-center gap-2 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-500/5 transition-all ${
            collapsed ? 'justify-center p-2.5 w-full' : 'px-3 py-2 w-full'
          }`}
          title="Sign Out"
        >
          <Settings className="w-4 h-4 shrink-0" />
          {!collapsed && <span className="text-xs font-medium">Sign Out</span>}
        </button>
      </div>
    </div>
  );

  return (
    <ToastProvider>
      <div className="h-screen bg-[#0c0c0c] text-white flex overflow-hidden font-sans selection:bg-brand/30">
        {/* Desktop sidebar */}
        <div className="hidden md:block h-full shrink-0">
          {sidebar}
        </div>

        {/* Mobile overlay */}
        <AnimatePresence>
          {mobileOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                onClick={() => setMobileOpen(false)}
              />
              <motion.div
                initial={{ x: -280 }}
                animate={{ x: 0 }}
                exit={{ x: -280 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="md:hidden fixed left-0 top-0 bottom-0 z-50"
              >
                {sidebar}
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Main content */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Top bar */}
          <header className="h-12 md:h-14 border-b border-white/[0.06] flex items-center justify-between px-4 md:px-6 shrink-0 bg-[#0c0c0c]">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileOpen(true)}
                className="md:hidden w-8 h-8 rounded-lg flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 transition-all"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>
              <h2 className="text-sm font-bold text-white tracking-tight">
                {SECTION_TITLES[activeSection] || 'Analytics'}
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={data.refresh}
                disabled={data.loading}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-all disabled:opacity-30"
                title="Refresh data"
              >
                {data.loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
              </button>
              <div className="hidden md:flex items-center gap-2 text-[10px] text-white/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>{data.allCalls.length} calls loaded</span>
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 lg:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
              >
                {renderPage()}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </ToastProvider>
  );
};
