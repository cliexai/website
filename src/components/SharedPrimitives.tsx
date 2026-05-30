import { ChevronRight } from 'lucide-react';

export const LogoMark: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
  <img
    src="/favicon.png"
    alt="ClieX AI Logo"
    className={`${className} object-contain select-none`}
  />
);

interface AppleButtonProps {
  label?: string;
  full?: boolean;
  onClick?: () => void;
  className?: string;
}

export const AppleButton: React.FC<AppleButtonProps> = ({
  label = 'Try for free',
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
