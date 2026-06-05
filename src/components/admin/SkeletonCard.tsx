import React from 'react';

// ─── Skeleton loaders for analytics pages ──────────────────────

export const SkeletonCard: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`bg-white/[0.04] border border-white/10 rounded-2xl p-5 animate-pulse ${className}`}>
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-xl bg-white/[0.06]" />
      <div className="flex-1">
        <div className="h-6 w-20 bg-white/[0.06] rounded-lg mb-2" />
        <div className="h-3 w-28 bg-white/[0.04] rounded" />
      </div>
    </div>
  </div>
);

export const SkeletonChart: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`bg-white/[0.04] border border-white/10 rounded-2xl p-5 animate-pulse ${className}`}>
    <div className="h-4 w-32 bg-white/[0.06] rounded mb-6" />
    <div className="h-48 bg-white/[0.04] rounded-xl" />
  </div>
);

export const SkeletonRow: React.FC = () => (
  <tr className="border-b border-white/[0.05] animate-pulse">
    {Array.from({ length: 8 }).map((_, i) => (
      <td key={i} className="px-4 py-3">
        <div className="h-4 bg-white/[0.06] rounded" style={{ width: `${50 + Math.random() * 50}%` }} />
      </td>
    ))}
  </tr>
);

export const SkeletonTableBody: React.FC<{ rows?: number }> = ({ rows = 5 }) => (
  <tbody>
    {Array.from({ length: rows }).map((_, i) => (
      <SkeletonRow key={i} />
    ))}
  </tbody>
);

/** KPI card row skeleton */
export const SkeletonKPIRow: React.FC<{ count?: number }> = ({ count = 7 }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-4">
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);
