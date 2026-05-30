import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from './ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { LogoMark, AppleButton } from './SharedPrimitives';
import { Sun, Moon, Menu, X, User, LayoutDashboard, LogOut, ChevronDown } from 'lucide-react';


export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const links = [
    { label: 'Services', href: '#services' },
    { label: 'Pricing',  href: '#pricing' },
    { label: 'Industries', href: '#industries' },
    { label: 'About',    href: '#about' },
    { label: 'FAQ',      href: '#faq' },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const avatarUrl   = user?.user_metadata?.avatar_url as string | undefined;
  const displayName = (user?.user_metadata?.full_name as string | undefined) ?? user?.email?.split('@')[0] ?? 'Account';

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-black/10 dark:border-white/10 bg-white/85 dark:bg-[#0c0c0c]/85 md:bg-white/70 md:dark:bg-[#0c0c0c]/70 md:backdrop-blur-xl md:backdrop-saturate-150">
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-7xl mx-auto px-6 py-2.5 md:py-3 flex items-center justify-between"
        >
          {/* Left: LogoMark */}
          <a href="#" className="text-brand flex items-center justify-center" aria-label="ClieX AI Home">
            <LogoMark className="w-7 h-7 text-brand" />
          </a>

          {/* Center: Links (Desktop) */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.05, ease: 'easeOut' }}
                className="text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white text-sm font-medium transition-colors duration-200"
              >
                {link.label}
              </motion.a>
            ))}
          </div>

          {/* Right: Theme toggle + Auth + CTA (Desktop) */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-black dark:text-white flex items-center justify-center hover:bg-black/10 dark:hover:bg-white/10 active:scale-95 transition-all"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Auth: logged-in avatar dropdown OR Sign In button */}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-all"
                >
                  {avatarUrl ? (
                    <img src={avatarUrl} alt={displayName} className="w-7 h-7 rounded-full object-cover border border-white/10" />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-brand/20 flex items-center justify-center">
                      <User className="w-3.5 h-3.5 text-brand" />
                    </div>
                  )}
                  <span className="text-xs font-semibold text-black dark:text-white max-w-[80px] truncate">{displayName}</span>
                  <ChevronDown className={`w-3 h-3 text-black/50 dark:text-white/50 transition-transform duration-200 ${userDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {userDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.18 }}
                      className="absolute right-0 top-full mt-2 w-48 rounded-2xl border border-black/10 dark:border-white/10 bg-white/95 dark:bg-[#0c0c0c]/95 backdrop-blur-xl shadow-xl overflow-hidden"
                    >
                      <div className="px-4 py-3 border-b border-black/5 dark:border-white/5">
                        <p className="text-xs font-bold text-black dark:text-white truncate">{displayName}</p>
                        <p className="text-[10px] text-black/40 dark:text-white/30 truncate mt-0.5">{user.email}</p>
                      </div>
                      <div className="p-1.5">
                        <a
                          href="/portal"
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-black/70 dark:text-white/70 hover:text-brand dark:hover:text-brand hover:bg-brand/5 transition-all font-medium"
                          onClick={() => setUserDropdownOpen(false)}
                        >
                          <LayoutDashboard className="w-3.5 h-3.5" />
                          My Portal
                        </a>
                        <button
                          onClick={() => { setUserDropdownOpen(false); signOut(); }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-red-500 hover:bg-red-500/5 transition-all font-medium"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <a
                href="/login"
                className="text-sm font-semibold text-black/70 dark:text-white/70 hover:text-brand dark:hover:text-brand transition-colors px-2 py-1"
              >
                Sign In / Sign Up
              </a>
            )}

            <AppleButton label="Try for free" onClick={() => window.location.href = '/signup'} />
          </div>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-black dark:text-white flex items-center justify-center hover:bg-black/10 dark:hover:bg-white/10 active:scale-95 transition-all"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-9 h-9 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-black dark:text-white flex items-center justify-center active:scale-95 transition-all"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Spacer */}
      <div className="h-12 md:h-14 shrink-0" aria-hidden="true" />

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed top-12 left-4 right-4 z-50 rounded-2xl border border-black/10 dark:border-white/10 bg-white/95 dark:bg-black/95 backdrop-blur-2xl shadow-xl overflow-hidden"
          >
            <div className="flex flex-col p-5 gap-4">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-black/80 dark:text-white/80 hover:text-brand dark:hover:text-brand text-base font-semibold py-2 transition-colors border-b border-black/5 dark:border-white/5 last:border-0"
                >
                  {link.label}
                </a>
              ))}

              {/* Auth links in mobile menu */}
              <div className="flex flex-col gap-2 pt-2 border-t border-black/5 dark:border-white/5">
                {user ? (
                  <>
                    <div className="flex items-center gap-2.5 pb-2">
                      {avatarUrl ? (
                        <img src={avatarUrl} alt={displayName} className="w-8 h-8 rounded-full object-cover border border-white/10" />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-brand/20 flex items-center justify-center">
                          <User className="w-4 h-4 text-brand" />
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-bold text-black dark:text-white">{displayName}</p>
                        <p className="text-[10px] text-black/40 dark:text-white/30">{user.email}</p>
                      </div>
                    </div>
                    <a
                      href="/portal"
                      className="flex items-center gap-2 text-sm font-semibold text-brand py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      My Portal
                    </a>
                    <button
                      onClick={() => { setMobileMenuOpen(false); signOut(); }}
                      className="flex items-center gap-2 text-sm font-semibold text-red-500 py-1"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <a
                    href="/login"
                    className="text-sm font-semibold text-black/70 dark:text-white/70 hover:text-brand dark:hover:text-brand transition-colors py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign In to ClieX Account
                  </a>
                )}
              </div>

              <div className="mt-1">
                <AppleButton
                  label="Try for free"
                  full
                  onClick={() => window.location.href = '/signup'}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
