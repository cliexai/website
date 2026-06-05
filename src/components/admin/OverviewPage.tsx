import React, { useMemo } from 'react';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import {
  Phone, Clock, DollarSign, TrendingUp,
  SmilePlus, PhoneForwarded,
} from 'lucide-react';
import { DateRangeFilter } from './DateRangeFilter';
import { SkeletonKPIRow, SkeletonChart } from './SkeletonCard';
import {
  formatDuration, formatCostShort, formatNumber,
  groupByDay, groupByHour, bucketDuration, classifyOutcome,
  CHART_COLORS, type CallOutcome,
} from '../../lib/analyticsUtils';
import type { useRetellCalls } from '../../hooks/useRetellCalls';

// ─── Types ─────────────────────────────────────────────────────

interface OverviewPageProps {
  data: ReturnType<typeof useRetellCalls>;
}

// ─── KPI Stat Card ─────────────────────────────────────────────

const StatCard: React.FC<{
  label: string;
  value: string | number;
  sub?: string;
  icon: React.ReactNode;
  color: string;
  pill?: React.ReactNode;
}> = ({ label, value, sub, icon, color, pill }) => (
  <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-4 lg:p-5 hover:border-white/15 transition-colors">
    <div className="flex items-center gap-3 mb-3">
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${color}`}>
        {icon}
      </div>
      <p className="text-[10px] text-white/40 font-semibold uppercase tracking-wider">{label}</p>
    </div>
    <p className="text-2xl font-extrabold text-white">{value}</p>
    {sub && <p className="text-[10px] text-white/30 mt-1">{sub}</p>}
    {pill}
  </div>
);

// ─── Custom dark tooltip ───────────────────────────────────────

const DarkTooltip: React.FC<{
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}> = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#1a1a1f] border border-white/10 rounded-xl px-3 py-2 shadow-xl">
      <p className="text-[10px] text-white/50 mb-1">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="text-xs font-semibold" style={{ color: entry.color }}>
          {entry.name}: {typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}
        </p>
      ))}
    </div>
  );
};

// ─── Chart Wrapper ─────────────────────────────────────────────

const ChartCard: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className = '' }) => (
  <div className={`bg-white/[0.04] border border-white/10 rounded-2xl p-5 hover:border-white/15 transition-colors ${className}`}>
    <h3 className="text-xs font-bold text-white/60 uppercase tracking-wider mb-4">{title}</h3>
    {children}
  </div>
);

// ─── Overview Page ─────────────────────────────────────────────

export const OverviewPage: React.FC<OverviewPageProps> = ({ data }) => {
  const { calls, kpis, loading, datePreset, setDatePreset, customRange, setCustomRange } = data;

  // ── Chart data ────────────────────────────────────────────
  const dailyData = useMemo(() => groupByDay(calls), [calls]);
  const hourlyData = useMemo(() => groupByHour(calls), [calls]);

  const durationBuckets = useMemo(() => {
    const counts: Record<string, number> = { '<1min': 0, '1-3min': 0, '3-5min': 0, '5min+': 0 };
    calls.forEach(c => { counts[bucketDuration(c.duration_ms)]++; });
    return Object.entries(counts).map(([range, count]) => ({ range, count }));
  }, [calls]);

  const sentimentData = useMemo(() => [
    { name: 'Positive', value: kpis.sentimentPositive, color: CHART_COLORS.positive },
    { name: 'Neutral', value: kpis.sentimentNeutral, color: CHART_COLORS.neutral },
    { name: 'Negative', value: kpis.sentimentNegative, color: CHART_COLORS.negative },
  ], [kpis]);

  const outcomeData = useMemo(() => {
    const counts: Record<CallOutcome, number> = { Completed: 0, Transferred: 0, Voicemail: 0, Failed: 0, Other: 0 };
    calls.forEach(c => { counts[classifyOutcome(c)]++; });
    return [
      { name: 'Completed', value: counts.Completed, color: CHART_COLORS.positive },
      { name: 'Transferred', value: counts.Transferred, color: CHART_COLORS.blue },
      { name: 'Voicemail', value: counts.Voicemail, color: CHART_COLORS.amber },
      { name: 'Failed', value: counts.Failed, color: CHART_COLORS.negative },
    ].filter(d => d.value > 0);
  }, [calls]);

  // ── Loading state ─────────────────────────────────────────
  if (loading) {
    return (
      <div className="space-y-8">
        <SkeletonKPIRow />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {Array.from({ length: 6 }).map((_, i) => <SkeletonChart key={i} />)}
        </div>
      </div>
    );
  }

  // ── Empty state ───────────────────────────────────────────
  if (calls.length === 0 && !loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4 text-white/30">
        <Phone className="w-12 h-12" />
        <p className="text-sm font-medium">No calls found for this date range</p>
        <p className="text-xs text-white/20">Adjust the date filter or wait for incoming calls</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Date filter */}
      <DateRangeFilter
        active={datePreset}
        onChange={setDatePreset}
        customRange={customRange}
        onCustomRangeChange={setCustomRange}
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-3">
        <StatCard
          label="Total Calls"
          value={formatNumber(kpis.totalCalls)}
          sub={`${kpis.totalCallsThisMonth} this month`}
          icon={<Phone className="w-4 h-4" />}
          color="bg-brand/10 text-brand"
        />
        <StatCard
          label="Total Minutes"
          value={formatNumber(kpis.totalMinutes)}
          sub={`${kpis.totalMinutesThisMonth} this month`}
          icon={<Clock className="w-4 h-4" />}
          color="bg-blue-500/10 text-blue-400"
        />
        <StatCard
          label="Total Cost"
          value={formatCostShort(kpis.totalCost)}
          sub={`${formatCostShort(kpis.totalCostThisMonth)} this month`}
          icon={<DollarSign className="w-4 h-4" />}
          color="bg-emerald-500/10 text-emerald-400"
        />
        <StatCard
          label="Avg Duration"
          value={formatDuration(kpis.avgDurationMs)}
          icon={<Clock className="w-4 h-4" />}
          color="bg-cyan-500/10 text-cyan-400"
        />
        <StatCard
          label="Success Rate"
          value={`${kpis.successRate.toFixed(1)}%`}
          icon={<TrendingUp className="w-4 h-4" />}
          color="bg-emerald-500/10 text-emerald-400"
        />
        <StatCard
          label="Transfer Rate"
          value={`${kpis.transferRate.toFixed(1)}%`}
          icon={<PhoneForwarded className="w-4 h-4" />}
          color="bg-amber-500/10 text-amber-400"
        />
        <StatCard
          label="Avg Sentiment"
          value=""
          icon={<SmilePlus className="w-4 h-4" />}
          color="bg-pink-500/10 text-pink-400"
          pill={
            <div className="flex gap-1.5 mt-2">
              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                +{kpis.sentimentPositive}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-gray-500/10 text-gray-400 border border-gray-500/20">
                ~{kpis.sentimentNeutral}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-red-500/10 text-red-400 border border-red-500/20">
                −{kpis.sentimentNegative}
              </span>
            </div>
          }
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Calls Over Time */}
        <ChartCard title="Calls Over Time">
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="label" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<DarkTooltip />} />
              <Line type="monotone" dataKey="calls" stroke={CHART_COLORS.brand} strokeWidth={2} dot={false} name="Calls" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Cost Over Time */}
        <ChartCard title="Cost Over Time (USD)">
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="label" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<DarkTooltip />} />
              <defs>
                <linearGradient id="costGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={CHART_COLORS.positive} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={CHART_COLORS.positive} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="totalCost" stroke={CHART_COLORS.positive} fill="url(#costGrad)" strokeWidth={2} name="Cost ($)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Sentiment Breakdown */}
        <ChartCard title="Sentiment Breakdown">
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={sentimentData}
                cx="50%" cy="50%"
                innerRadius={60} outerRadius={90}
                paddingAngle={3}
                dataKey="value"
              >
                {sentimentData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} stroke="transparent" />
                ))}
              </Pie>
              <Tooltip content={<DarkTooltip />} />
              <Legend
                verticalAlign="bottom"
                iconType="circle"
                iconSize={8}
                formatter={(value) => <span className="text-xs text-white/50">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Call Outcome Breakdown */}
        <ChartCard title="Call Outcome Breakdown">
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={outcomeData}
                cx="50%" cy="50%"
                innerRadius={60} outerRadius={90}
                paddingAngle={3}
                dataKey="value"
              >
                {outcomeData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} stroke="transparent" />
                ))}
              </Pie>
              <Tooltip content={<DarkTooltip />} />
              <Legend
                verticalAlign="bottom"
                iconType="circle"
                iconSize={8}
                formatter={(value) => <span className="text-xs text-white/50">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Duration Distribution */}
        <ChartCard title="Call Duration Distribution">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={durationBuckets}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="range" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<DarkTooltip />} />
              <Bar dataKey="count" fill={CHART_COLORS.brand} radius={[6, 6, 0, 0]} name="Calls" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Calls by Hour */}
        <ChartCard title="Calls by Hour of Day">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="label" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 9 }} axisLine={false} tickLine={false} interval={2} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<DarkTooltip />} />
              <Bar dataKey="calls" fill={CHART_COLORS.cyan} radius={[4, 4, 0, 0]} name="Calls" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
};
