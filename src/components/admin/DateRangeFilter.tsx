import React from 'react';
import { Calendar } from 'lucide-react';
import type { DatePreset } from '../../lib/analyticsUtils';

// ─── Date Range Filter ─────────────────────────────────────────

interface DateRangeFilterProps {
  active: DatePreset;
  onChange: (preset: DatePreset) => void;
  customRange: { start: number; end: number } | null;
  onCustomRangeChange: (range: { start: number; end: number } | null) => void;
}

const PRESETS: { key: DatePreset; label: string }[] = [
  { key: 'today', label: 'Today' },
  { key: '7d', label: '7 Days' },
  { key: '30d', label: '30 Days' },
  { key: '90d', label: '90 Days' },
  { key: 'all', label: 'All Time' },
  { key: 'custom', label: 'Custom' },
];

export const DateRangeFilter: React.FC<DateRangeFilterProps> = ({
  active, onChange, customRange, onCustomRangeChange,
}) => {
  const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const start = new Date(e.target.value).getTime();
    onCustomRangeChange({
      start,
      end: customRange?.end || Date.now(),
    });
  };

  const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const end = new Date(e.target.value).getTime() + 86399999; // end of day
    onCustomRangeChange({
      start: customRange?.start || Date.now() - 30 * 86400000,
      end,
    });
  };

  const toInputValue = (epoch: number) => {
    const d = new Date(epoch);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Calendar className="w-4 h-4 text-white/30" />
      {PRESETS.map(p => (
        <button
          key={p.key}
          onClick={() => onChange(p.key)}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
            active === p.key
              ? 'bg-brand text-white border-brand shadow-md shadow-brand/20'
              : 'bg-white/5 text-white/50 border-white/10 hover:border-white/20 hover:text-white'
          }`}
        >
          {p.label}
        </button>
      ))}

      {active === 'custom' && (
        <div className="flex items-center gap-2 ml-2">
          <input
            type="date"
            value={customRange ? toInputValue(customRange.start) : ''}
            onChange={handleStartChange}
            className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-xs text-white outline-none focus:border-brand/40 transition-colors [color-scheme:dark]"
          />
          <span className="text-white/30 text-xs">to</span>
          <input
            type="date"
            value={customRange ? toInputValue(customRange.end) : ''}
            onChange={handleEndChange}
            className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-xs text-white outline-none focus:border-brand/40 transition-colors [color-scheme:dark]"
          />
        </div>
      )}
    </div>
  );
};
