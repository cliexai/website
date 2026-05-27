import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from './ThemeContext';
import { LogoMark, AppleButton } from './SharedPrimitives';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { scrollToId } from '../utils/smoothScroll';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    { label: 'Services', href: '#services' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Industries', href: '#industries' },
    { label: 'About', href: '#about' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-black/10 dark:border-white/10 bg-white/85 dark:bg-[#0c0c0c]/85 md:bg-white/70 md:dark:bg-[#0c0c0c]/70 md:backdrop-blur-xl md:backdrop-saturate-150">
        <div className="max-w-7xl mx-auto px-6 py-2.5 md:py-3 flex items-center justify-between">
        <a href="#" className="text-brand flex items-center justify-center" aria-label="ClieX AI Home">
          <LogoMark className="w-7 h-7 text-brand" />
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white text-sm font-medium transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right: Theme toggle + CTA (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="w-11 h-11 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-black dark:text-white flex items-center justify-center hover:bg-black/10 dark:hover:bg-white/10 active:scale-95 transition-all"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <AppleButton label="Try Live Demo" onClick={() => scrollToId('lead-form')} />
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            className="w-11 h-11 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-black dark:text-white flex items-center justify-center hover:bg-black/10 dark:hover:bg-white/10 active:scale-95 transition-all"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-11 h-11 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-black dark:text-white flex items-center justify-center active:scale-95 transition-all"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
        </div>
      </header>

      {/* Spacer matching fixed header height so page content starts below the bar */}
      <div className="h-12 md:h-14 shrink-0" aria-hidden="true" />

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed top-12 md:top-14 left-6 right-6 z-50 rounded-2xl border border-black/10 dark:border-white/10 bg-white/90 dark:bg-black/90 backdrop-blur-2xl shadow-xl overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
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
              <div className="mt-4">
                <AppleButton
                  label="Try Live Demo"
                  full
                  onClick={() => {
                    setMobileMenuOpen(false);
                    scrollToId('lead-form');
                  }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
