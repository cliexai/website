import { ChevronRight } from 'lucide-react';

export const LogoMark: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <filter id="logo-glow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="3.5" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <path
      d="M 10 50 H 22 C 25 50 26 40 28 44 C 30 48 32 68 35 32 C 38 12 40 88 43 24 C 46 94 48 6 51 76 C 54 18 56 82 59 30 C 62 64 64 36 67 44 C 70 52 72 60 75 46 C 78 32 80 50 84 50 H 90"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      filter="url(#logo-glow)"
    />
  </svg>
);

interface AppleButtonProps {
  label?: string;
  full?: boolean;
  onClick?: () => void;
  className?: string;
}

export const AppleButton: React.FC<AppleButtonProps> = ({
  label = 'Try Live Demo',
  full = false,
  onClick,
  className = '',
}) => {
  return (
    <button
      onClick={onClick}
      className={`group inline-flex items-center justify-center gap-2 rounded-full bg-black dark:bg-white text-white dark:text-black font-medium text-sm px-5 py-3 transition-all hover:bg-black/90 dark:hover:bg-white/90 active:scale-[0.98] border border-black/10 dark:border-transparent ${
        full ? 'w-full' : ''
      } ${className}`}
    >
      <span>{label}</span>
      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
    </button>
  );
};

interface SectionEyebrowProps {
  label: string;
  tag?: string;
}

export const SectionEyebrow: React.FC<SectionEyebrowProps> = ({ label, tag }) => {
  return (
    <div className="inline-flex items-center gap-3 select-none">
      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 backdrop-blur-md">
        <span className="w-1.5 h-1.5 rounded-full bg-brand" />
        <span className="text-xs font-semibold tracking-wider uppercase text-black/70 dark:text-white/70">
          {label}
        </span>
      </span>
      {tag && (
        <span className="px-2.5 py-0.5 rounded-full border border-black/15 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] text-[10px] font-medium tracking-wide text-black/50 dark:text-white/50 uppercase">
          {tag}
        </span>
      )}
    </div>
  );
};
