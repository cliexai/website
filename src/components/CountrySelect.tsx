import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import countriesData from '../lib/countries.json';

export interface Country {
  name: string;
  code: string;
  dial_code: string;
  flag: string;
}

const countries = countriesData as Country[];

interface CountrySelectProps {
  value: string; // The country code (e.g. 'US')
  onChange: (code: string) => void;
}

export const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedCountry = countries.find(c => c.code === value) || countries.find(c => c.code === 'US') || countries[0];

  const filteredCountries = countries.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.dial_code.includes(search) ||
    c.code.toLowerCase().includes(search.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Reset search when opened
  useEffect(() => {
    if (isOpen) {
      setSearch('');
    }
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center h-full pl-3 pr-2 border-r border-black/10 dark:border-white/10 select-none hover:bg-black/5 dark:hover:bg-white/5 transition-colors focus:outline-none"
      >
        <span className="text-base mr-1.5">{selectedCountry.flag}</span>
        <span className="text-sm text-black/70 dark:text-white/70 font-medium mr-1">{selectedCountry.dial_code}</span>
        <ChevronDown className="w-3.5 h-3.5 text-black/40 dark:text-white/40" />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            data-lenis-prevent
            initial={{ opacity: 0, y: -5, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-2 w-[280px] bg-white dark:bg-[#1a1a1a] border border-black/10 dark:border-white/10 rounded-xl shadow-xl z-50 overflow-hidden"
          >
            {/* Search */}
            <div className="p-2 border-b border-black/5 dark:border-white/5">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40 dark:text-white/40" />
                <input
                  type="text"
                  placeholder="Search countries..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-black/5 dark:bg-black/20 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand/50 transition-all text-black dark:text-white placeholder:text-black/30 dark:placeholder:text-white/30"
                  autoFocus
                />
              </div>
            </div>

            {/* List */}
            <div className="max-h-[240px] overflow-y-auto overscroll-contain">
              {filteredCountries.length === 0 ? (
                <div className="p-4 text-center text-sm text-black/50 dark:text-white/50">
                  No countries found
                </div>
              ) : (
                <div className="py-1">
                  {filteredCountries.map((country) => (
                    <button
                      key={country.code}
                      type="button"
                      onClick={() => {
                        onChange(country.code);
                        setIsOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/5 transition-colors ${value === country.code ? 'bg-brand/10 dark:bg-brand/20 text-brand' : 'text-black/80 dark:text-white/80'}`}
                    >
                      <div className="flex items-center gap-2 truncate pr-4">
                        <span className="text-base leading-none">{country.flag}</span>
                        <span className="truncate">{country.name}</span>
                      </div>
                      <span className="text-xs font-medium text-black/50 dark:text-white/50 shrink-0">
                        {country.dial_code}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
