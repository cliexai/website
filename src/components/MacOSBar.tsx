import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { LogoMark } from './SharedPrimitives';
import { Search } from 'lucide-react';

export const MacOSBar: React.FC = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      // Format as "Wed May 27 1:09 PM" (or similar)
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      };
      setTime(date.toLocaleString('en-US', options).replace(',', ''));
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const menuItems = ['File', 'Edit', 'View', 'Go', 'Window', 'Help'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.9 }}
      className="w-full h-10 bg-black/5 dark:bg-black/40 backdrop-blur-md border-t border-b border-black/10 dark:border-white/10 relative z-10"
    >
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between text-xs text-black/70 dark:text-white/70 font-medium">
        {/* Left menu items */}
        <div className="flex items-center gap-4">
          <LogoMark className="w-3.5 h-3.5 text-brand" />
          <span className="font-extrabold text-black dark:text-white tracking-tight">ClieX AI</span>
          
          {menuItems.map((item, i) => {
            let visibilityClass = '';
            if (i > 2) visibilityClass = 'hidden sm:inline';
            if (i > 3) visibilityClass = 'hidden md:inline';
            return (
              <span
                key={item}
                className={`cursor-pointer hover:text-black dark:hover:text-white transition-colors duration-150 ${visibilityClass}`}
              >
                {item}
              </span>
            );
          })}
        </div>

        {/* Right tools and dynamic clock */}
        <div className="flex items-center gap-4">
          <Search className="w-3.5 h-3.5 cursor-pointer hover:text-black dark:hover:text-white transition-colors" />
          <span className="tabular-nums font-medium">{time || 'Wed May 27 9:29 AM'}</span>
        </div>
      </div>
    </motion.div>
  );
};
