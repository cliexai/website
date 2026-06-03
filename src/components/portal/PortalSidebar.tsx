import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  LayoutDashboard, PhoneCall, Sparkles, BookOpen,
  Puzzle, LifeBuoy, CreditCard, Settings, LogOut,
  X, ChevronLeft, ChevronRight,
} from 'lucide-react';
import { LogoMark } from '../SharedPrimitives';

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
  icon: React.ReactNode;
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
}

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard',    label: 'Dashboard',      icon: <LayoutDashboard className="w-[18px] h-[18px]" /> },
  { id: 'calls',        label: 'Call History',    icon: <PhoneCall className="w-[18px] h-[18px]" />, badge: 12 },
  { id: 'sandbox',      label: 'Agent Sandbox',   icon: <Sparkles className="w-[18px] h-[18px]" />, pulse: true },
  { id: 'knowledge',    label: 'Knowledge Base',  icon: <BookOpen className="w-[18px] h-[18px]" /> },
  { id: 'integrations', label: 'Integrations',    icon: <Puzzle className="w-[18px] h-[18px]" /> },
  { id: 'support',      label: 'Support',         icon: <LifeBuoy className="w-[18px] h-[18px]" /> },
  { id: 'billing',      label: 'Billing & Usage', icon: <CreditCard className="w-[18px] h-[18px]" /> },
  { id: 'settings',     label: 'Settings',        icon: <Settings className="w-[18px] h-[18px]" /> },
];

const PLAN_COLORS: Record<string, string> = {
  Starter:    'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'Pro Growth': 'bg-brand/10 text-brand border-brand/20',
  Enterprise: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  Free:       'bg-white/5 text-white/50 border-white/10',
};

export const PortalSidebar: React.FC<PortalSidebarProps> = ({
  active, onNavigate, onSignOut,
  userName, userEmail, userAvatar, planName,
  collapsed, onToggleCollapse,
  mobileOpen, onMobileClose,
}) => {

  const sidebar = (
    <div className={`h-full flex flex-col bg-[#0a0a0b] border-r border-white/[0.06] transition-all duration-300 ${collapsed ? 'w-[68px]' : 'w-[250px]'}`}>
      {/* Header */}
      <div className={`h-14 border-b border-white/[0.06] flex items-center shrink-0 ${collapsed ? 'justify-center px-2' : 'px-4 justify-between'}`}>
        <button onClick={() => window.location.href = '/'} className="flex items-center gap-2.5 min-w-0 hover:opacity-80 transition-opacity cursor-pointer" title="Back to Landing Page">
          <LogoMark className="w-6 h-6 text-brand shrink-0 pointer-events-none" />
          {!collapsed && (
            <span className="font-bold text-[13px] tracking-tight text-white truncate pointer-events-none">ClieX AI</span>
          )}
        </button>
        {/* Collapse toggle (desktop only) */}
        <button
          onClick={onToggleCollapse}
          className="hidden md:flex w-6 h-6 rounded-md items-center justify-center text-white/30 hover:text-white/60 hover:bg-white/5 transition-all shrink-0"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
        </button>
        {/* Mobile close */}
        <button
          onClick={onMobileClose}
          className="md:hidden w-7 h-7 rounded-md flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5"
          aria-label="Close menu"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* User card */}
      <div className={`shrink-0 border-b border-white/[0.06] ${collapsed ? 'px-2 py-3' : 'p-4'}`}>
        <div className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'}`}>
          {userAvatar ? (
            <>
              <img src={userAvatar} alt="" referrerPolicy="no-referrer" className="w-8 h-8 rounded-full shrink-0 ring-2 ring-white/10" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling?.classList.remove('hidden'); }} />
              <div className="hidden w-8 h-8 rounded-full bg-gradient-to-br from-brand to-purple-800 items-center justify-center text-[11px] font-bold text-white shrink-0">
                {userName.charAt(0).toUpperCase()}
              </div>
            </>
          ) : (
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand to-purple-800 flex items-center justify-center text-[11px] font-bold text-white shrink-0">
              {userName.charAt(0).toUpperCase()}
            </div>
          )}
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-white truncate">{userName}</p>
              <p className="text-[10px] text-white/40 truncate">{userEmail}</p>
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
      <nav className="flex-1 overflow-y-auto py-3 px-2 flex flex-col gap-0.5">
        {NAV_ITEMS.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => { onNavigate(item.id); onMobileClose(); }}
              title={collapsed ? item.label : undefined}
              className={`group relative flex items-center gap-2.5 rounded-lg transition-all duration-200 text-left ${
                collapsed ? 'justify-center px-2 py-2.5' : 'px-3 py-2.5'
              } ${
                isActive
                  ? 'bg-brand/10 text-white'
                  : 'text-white/50 hover:text-white/80 hover:bg-white/[0.04]'
              }`}
            >
              {/* Active indicator bar */}
              {isActive && (
                <motion.div
                  layoutId="portal-nav-indicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-brand rounded-r-full"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              <span className={`shrink-0 ${isActive ? 'text-brand' : 'text-white/40 group-hover:text-white/60'}`}>
                {item.icon}
              </span>
              {!collapsed && (
                <>
                  <span className="text-xs font-medium flex-1 truncate">{item.label}</span>
                  {item.badge !== undefined && (
                    <span className="text-[10px] bg-brand/15 text-brand px-1.5 py-0.5 rounded font-mono font-bold">
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
      <div className={`shrink-0 border-t border-white/[0.06] ${collapsed ? 'px-2 py-3' : 'p-3'}`}>
        {/* Engine status card */}
        {!collapsed && (
          <div className="p-3 rounded-xl border border-white/[0.06] bg-white/[0.02] mb-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold text-brand uppercase tracking-wider">Agent Online</span>
            </div>
            <span className="text-[10px] text-white/40 leading-relaxed">
              Engine running at <strong className="text-white/70">98% efficiency</strong>
            </span>
          </div>
        )}
        <button
          onClick={onSignOut}
          className={`flex items-center gap-2 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-500/5 transition-all ${
            collapsed ? 'justify-center p-2.5 w-full' : 'px-3 py-2 w-full'
          }`}
          title="Sign Out"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {!collapsed && <span className="text-xs font-medium">Sign Out</span>}
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
