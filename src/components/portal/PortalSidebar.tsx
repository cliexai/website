import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export type PortalSection =
  | 'dashboard'
  | 'calls'
  | 'sandbox'
  | 'knowledge'
  | 'integrations'
  | 'support'
  | 'billing'
  | 'settings';

interface NavItem {
  id: PortalSection;
  label: string;
  iconName: string;
  badge?: string | number;
  pulse?: boolean;
}

interface PortalSidebarProps {
  active: PortalSection;
  onNavigate: (section: PortalSection) => void;
  onSignOut: () => void;
  userName: string;
  userEmail: string;
  userAvatar?: string;
  planName: string;
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
  navRef?: React.RefObject<HTMLElement | null>;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard',    label: 'Overview',       iconName: 'dashboard' },
  { id: 'sandbox',      label: 'My Agent',       iconName: 'keyboard_voice', pulse: true },
  { id: 'calls',        label: 'Call Logs',      iconName: 'call', badge: 12 },
  { id: 'knowledge',    label: 'Knowledge Base', iconName: 'book' },
  { id: 'integrations', label: 'Integrations',   iconName: 'hub' },
  { id: 'billing',      label: 'Billing',        iconName: 'payments' },
  { id: 'settings',     label: 'Settings',       iconName: 'settings' },
];

const PLAN_COLORS: Record<string, string> = {
  Starter:    'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'Pro Growth': 'bg-primary/10 text-primary border-primary/20',
  Enterprise: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  Free:       'bg-white/5 text-white/50 border-white/10',
};

export const PortalSidebar: React.FC<PortalSidebarProps> = ({
  active, onNavigate, onSignOut,
  userName, userEmail, userAvatar, planName,
  collapsed, onToggleCollapse,
  mobileOpen, onMobileClose,
  navRef,
}) => {

  const sidebar = (
    <div className={`h-full flex flex-col bg-surface-container-low border-r border-outline-variant transition-all duration-300 ${collapsed ? 'w-[68px]' : 'w-64'} p-4 gap-2`}>
      {/* Header */}
      <div className={`flex items-center shrink-0 ${collapsed ? 'justify-center mb-4' : 'justify-between mb-8 px-2'}`}>
        <button onClick={() => window.location.href = '/'} className="flex items-center gap-3 min-w-0 hover:opacity-80 transition-opacity cursor-pointer text-left" title="Back to Landing Page">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-on-primary shadow-[0_0_20px_rgba(108,60,225,0.3)] shrink-0">
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>keyboard_voice</span>
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <h1 className="font-headline-md text-label-md font-bold text-on-surface leading-tight">ClieX AI</h1>
              <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Enterprise Console</p>
            </div>
          )}
        </button>
        {/* Collapse toggle (desktop only) */}
        {!collapsed && (
          <button
            onClick={onToggleCollapse}
            className="hidden md:flex w-6 h-6 rounded-md items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all shrink-0"
            aria-label="Collapse sidebar"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
        {collapsed && (
          <button
            onClick={onToggleCollapse}
            className="hidden md:flex w-6 h-6 rounded-md items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all shrink-0 mt-2"
            aria-label="Expand sidebar"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* User card */}
      <div className={`shrink-0 border-b border-outline-variant pb-4 mb-2 ${collapsed ? 'px-1 py-1' : 'px-2 py-2'}`}>
        <div className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'}`}>
          {userAvatar ? (
            <img src={userAvatar} alt="" referrerPolicy="no-referrer" className="w-8 h-8 rounded-full shrink-0 ring-2 ring-primary/20" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling?.classList.remove('hidden'); }} />
          ) : null}
          <div className={`${userAvatar ? 'hidden' : ''} w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-800 flex items-center justify-center text-[11px] font-bold text-white shrink-0`}>
            {userName.charAt(0).toUpperCase()}
          </div>
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-on-surface truncate">{userName}</p>
              <p className="text-[10px] text-on-surface-variant truncate">{userEmail}</p>
            </div>
          )}
        </div>
        {!collapsed && (
          <span className={`mt-2.5 inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold border uppercase tracking-wider ${PLAN_COLORS[planName] ?? PLAN_COLORS.Free}`}>
            {planName} Plan
          </span>
        )}
      </div>

      {/* Nav items */}
      <nav ref={navRef} className="flex-1 overflow-y-auto flex flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => { onNavigate(item.id); onMobileClose(); }}
              title={collapsed ? item.label : undefined}
              className={`group relative flex items-center gap-3 rounded-lg transition-all duration-200 text-left ${
                collapsed ? 'justify-center p-2.5' : 'px-4 py-2.5'
              } ${
                isActive
                  ? 'bg-primary text-on-primary shadow-lg shadow-primary/10'
                  : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
              }`}
            >
              <span className={`material-symbols-outlined text-[20px] shrink-0 ${isActive ? 'text-on-primary' : 'text-on-surface-variant group-hover:text-on-surface'}`} style={{ fontVariationSettings: isActive ? "'FILL' 1" : undefined }}>
                {item.iconName}
              </span>
              {!collapsed && (
                <>
                  <span className="text-xs font-semibold flex-1 truncate">{item.label}</span>
                  {item.badge !== undefined && (
                    <span className="text-[10px] bg-primary-container text-on-primary-container px-1.5 py-0.5 rounded font-mono font-bold">
                      {item.badge}
                    </span>
                  )}
                  {item.pulse && (
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  )}
                </>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="pt-4 border-t border-outline-variant flex flex-col gap-1 mt-auto">
        {!collapsed && (
          <button
            onClick={() => onNavigate('billing')}
            className="w-full bg-primary text-on-primary font-label-md text-xs py-3 rounded-xl mb-4 hover:brightness-110 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[18px]">upgrade</span>
            Upgrade Plan
          </button>
        )}
        
        {/* Support Link */}
        <button
          onClick={() => { onNavigate('support'); onMobileClose(); }}
          title={collapsed ? "Help Center" : undefined}
          className={`flex items-center gap-3 rounded-lg text-left transition-all ${
            collapsed ? 'justify-center p-2.5' : 'px-4 py-2'
          } ${active === 'support' ? 'bg-primary text-on-primary' : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'}`}
        >
          <span className="material-symbols-outlined text-[20px] shrink-0">help</span>
          {!collapsed && <span className="text-xs font-semibold">Help Center</span>}
        </button>

        <button
          onClick={onSignOut}
          className={`flex items-center gap-3 rounded-lg text-left transition-all ${
            collapsed ? 'justify-center p-2.5' : 'px-4 py-2'
          } text-error/80 hover:bg-error/10 hover:text-error`}
          title="Sign Out"
        >
          <span className="material-symbols-outlined text-[20px] shrink-0">logout</span>
          {!collapsed && <span className="text-xs font-semibold">Logout</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
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
              onClick={onMobileClose}
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
    </>
  );
};
