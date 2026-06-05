import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from './ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { LogoMark } from './SharedPrimitives';
import { Sun, Moon, Menu, X, User, LayoutDashboard, LogOut, ChevronDown } from 'lucide-react';


export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const links = [
    { label: 'Features', href: '#services' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Pricing',  href: '#pricing' },
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
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-outline-variant">
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex justify-between items-center px-margin-desktop py-4 max-w-container-max mx-auto"
        >
          {/* Left: Logo */}
          <a href="#" className="flex items-center gap-2" aria-label="ClieX AI Home">
            <LogoMark className="w-7 h-7" />
            <span className="font-headline text-headline-md font-bold text-white">Clie<span className="text-primary">X</span> AI</span>
          </a>

          {/* Center: Links (Desktop) */}
          <div className="hidden md:flex gap-8 items-center">
            {links.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.05, ease: 'easeOut' }}
                className="font-body text-body-md text-on-surface-variant hover:text-primary transition-all duration-200"
              >
                {link.label}
              </motion.a>
            ))}
          </div>

          {/* Right: Actions (Desktop) */}
          <div className="hidden md:flex gap-4 items-center">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full border border-outline-variant bg-surface-container text-on-surface flex items-center justify-center hover:bg-surface-container-high active:scale-95 transition-all"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Auth: logged-in avatar dropdown OR Sign In button */}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border border-outline-variant bg-surface-container hover:bg-surface-container-high transition-all"
                >
                  {avatarUrl ? (
                    <>
                      <img src={avatarUrl} alt={displayName} referrerPolicy="no-referrer" className="w-7 h-7 rounded-full object-cover border border-outline-variant" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling?.classList.remove('hidden'); }} />
                      <div className="hidden w-7 h-7 rounded-full bg-primary/20 items-center justify-center">
                        <User className="w-3.5 h-3.5 text-primary" />
                      </div>
                    </>
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center">
                      <User className="w-3.5 h-3.5 text-primary" />
                    </div>
                  )}
                  <span className="text-xs font-semibold text-on-surface max-w-[80px] truncate">{displayName}</span>
                  <ChevronDown className={`w-3 h-3 text-on-surface-variant transition-transform duration-200 ${userDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {userDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.18 }}
                      className="absolute right-0 top-full mt-2 w-48 rounded-2xl border border-outline-variant bg-surface-container backdrop-blur-xl shadow-xl overflow-hidden"
                    >
                      <div className="px-4 py-3 border-b border-outline-variant">
                        <p className="text-xs font-bold text-on-surface truncate">{displayName}</p>
                        <p className="text-[10px] text-on-surface-variant truncate mt-0.5">{user.email}</p>
                      </div>
                      <div className="p-1.5">
                        <a
                          href="/portal"
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-on-surface-variant hover:text-primary hover:bg-primary/5 transition-all font-medium"
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
                className="hidden lg:block px-6 py-2 border border-primary text-primary rounded-lg font-label-md text-label-md hover:bg-primary/10 transition-all active:scale-95"
              >
                Sign Up / Sign In
              </a>
            )}

            <button
              onClick={() => window.location.href = '/get-started'}
              className="px-6 py-2 bg-primary text-on-primary rounded-lg font-label-md text-label-md shadow-lg shadow-primary/20 hover:opacity-90 transition-all active:scale-95"
            >
              Book a Demo
            </button>
          </div>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full border border-outline-variant bg-surface-container text-on-surface flex items-center justify-center active:scale-95 transition-all"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-9 h-9 rounded-full border border-outline-variant bg-surface-container text-on-surface flex items-center justify-center active:scale-95 transition-all"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Spacer */}
      <div className="h-16 shrink-0" aria-hidden="true" />

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed top-16 left-4 right-4 z-50 rounded-2xl border border-outline-variant bg-surface-container/95 backdrop-blur-2xl shadow-xl overflow-hidden"
          >
            <div className="flex flex-col p-5 gap-4">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-on-surface hover:text-primary text-base font-semibold py-2 transition-colors border-b border-outline-variant last:border-0"
                >
                  {link.label}
                </a>
              ))}

              {/* Auth links in mobile menu */}
              <div className="flex flex-col gap-2 pt-2 border-t border-outline-variant">
                {user ? (
                  <>
                    <div className="flex items-center gap-2.5 pb-2">
                      {avatarUrl ? (
                        <>
                          <img src={avatarUrl} alt={displayName} referrerPolicy="no-referrer" className="w-8 h-8 rounded-full object-cover border border-outline-variant" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling?.classList.remove('hidden'); }} />
                          <div className="hidden w-8 h-8 rounded-full bg-primary/20 items-center justify-center">
                            <User className="w-4 h-4 text-primary" />
                          </div>
                        </>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                          <User className="w-4 h-4 text-primary" />
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-bold text-on-surface">{displayName}</p>
                        <p className="text-[10px] text-on-surface-variant">{user.email}</p>
                      </div>
                    </div>
                    <a
                      href="/portal"
                      className="flex items-center gap-2 text-sm font-semibold text-primary py-2"
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
                    className="text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign In to ClieX Account
                  </a>
                )}
              </div>

              <div className="mt-1">
                <button
                  onClick={() => window.location.href = '/get-started'}
                  className="w-full px-6 py-3 bg-primary text-on-primary rounded-lg font-label-md text-label-md shadow-lg shadow-primary/20 hover:opacity-90 transition-all active:scale-95"
                >
                  Book a Demo
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
