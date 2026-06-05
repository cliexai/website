// ─── Analytics Utility Functions ───────────────────────────────
// Shared helpers for formatting, bucketing, and aggregating
// call data across all analytics pages.
// ───────────────────────────────────────────────────────────────

import type { RetellCall } from './retellApi';

// ─── Formatting ────────────────────────────────────────────────

/** Format milliseconds as "M:SS" or "H:MM:SS" */
export function formatDuration(ms: number): string {
  const totalSeconds = Math.round(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

/** Format a cost value as USD. */
export function formatCost(cost: number): string {
  return `$${cost.toFixed(4)}`;
}

/** Format a cost value as USD (short, 2 decimal places). */
export function formatCostShort(cost: number): string {
  if (cost >= 1000) return `$${(cost / 1000).toFixed(1)}k`;
  if (cost >= 1) return `$${cost.toFixed(2)}`;
  return `$${cost.toFixed(4)}`;
}

/** Format a large number with K/M suffix. */
export function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString();
}

/** Format epoch timestamp to localized date/time. */
export function formatTimestamp(epochMs: number): string {
  return new Date(epochMs).toLocaleString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

/** Format epoch timestamp to date only. */
export function formatDate(epochMs: number): string {
  return new Date(epochMs).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });
}

/** Format epoch timestamp to short date. */
export function formatDateShort(epochMs: number): string {
  return new Date(epochMs).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric',
  });
}

// ─── Bucketing ─────────────────────────────────────────────────

export type DurationBucket = '<1min' | '1-3min' | '3-5min' | '5min+';

/** Bucket a duration (in ms) into a human-readable range. */
export function bucketDuration(ms: number): DurationBucket {
  const seconds = ms / 1000;
  if (seconds < 60) return '<1min';
  if (seconds < 180) return '1-3min';
  if (seconds < 300) return '3-5min';
  return '5min+';
}

/** Extract area code from E.164 phone number. */
export function parseAreaCode(phone?: string): string {
  if (!phone) return 'Unknown';
  // US/CA: +1XXXNNNNNNN → extract area code XXX
  const match = phone.match(/^\+1(\d{3})/);
  if (match) return `+1 (${match[1]})`;
  // International: just show country code
  const intlMatch = phone.match(/^(\+\d{1,3})/);
  if (intlMatch) return intlMatch[1];
  return phone.slice(0, 6) || 'Unknown';
}

/** Get the country code prefix from an E.164 number. */
export function parseCountryCode(phone?: string): string {
  if (!phone) return 'Unknown';
  const match = phone.match(/^(\+\d{1,3})/);
  return match ? match[1] : 'Unknown';
}

// ─── Aggregation ───────────────────────────────────────────────

export interface DailyAggregate {
  date: string;        // YYYY-MM-DD
  label: string;       // "Jan 5"
  calls: number;
  totalDurationMs: number;
  totalCost: number;
  positive: number;
  neutral: number;
  negative: number;
}

/** Group calls by calendar day. */
export function groupByDay(calls: RetellCall[]): DailyAggregate[] {
  const map = new Map<string, DailyAggregate>();

  for (const call of calls) {
    const d = new Date(call.start_timestamp);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

    if (!map.has(key)) {
      map.set(key, {
        date: key,
        label: formatDateShort(call.start_timestamp),
        calls: 0,
        totalDurationMs: 0,
        totalCost: 0,
        positive: 0,
        neutral: 0,
        negative: 0,
      });
    }

    const agg = map.get(key)!;
    agg.calls++;
    agg.totalDurationMs += call.duration_ms || 0;
    agg.totalCost += call.call_cost?.combined_cost || 0;

    const sentiment = call.call_analysis?.user_sentiment;
    if (sentiment === 'Positive') agg.positive++;
    else if (sentiment === 'Negative') agg.negative++;
    else agg.neutral++;
  }

  return Array.from(map.values()).sort((a, b) => a.date.localeCompare(b.date));
}

/** Group calls by hour of day (0-23). */
export function groupByHour(calls: RetellCall[]): Array<{ hour: number; label: string; calls: number }> {
  const hours = Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    label: `${i === 0 ? '12' : i > 12 ? i - 12 : i}${i < 12 ? 'am' : 'pm'}`,
    calls: 0,
  }));

  for (const call of calls) {
    const h = new Date(call.start_timestamp).getHours();
    hours[h].calls++;
  }

  return hours;
}

// ─── Outcome classification ────────────────────────────────────

export type CallOutcome = 'Completed' | 'Transferred' | 'Voicemail' | 'Failed' | 'Other';

export function classifyOutcome(call: RetellCall): CallOutcome {
  if (call.call_analysis?.in_voicemail) return 'Voicemail';
  if (call.disconnection_reason === 'call_transfer') return 'Transferred';
  if (call.call_status === 'error') return 'Failed';
  if (call.disconnection_reason === 'error_inactivity' ||
      call.disconnection_reason === 'error_llm_websocket_open' ||
      call.disconnection_reason === 'error_llm_websocket_lost_connection' ||
      call.disconnection_reason === 'error_frontend_corrupted_payload' ||
      call.disconnection_reason === 'error_twilio' ||
      call.disconnection_reason === 'error_no_audio_received' ||
      call.disconnection_reason === 'error_asr' ||
      call.disconnection_reason === 'error_retell' ||
      call.disconnection_reason === 'error_unknown') return 'Failed';
  if (call.call_status === 'ended') return 'Completed';
  return 'Other';
}

// ─── KPI calculation ───────────────────────────────────────────

export interface KPIs {
  totalCalls: number;
  totalCallsThisMonth: number;
  totalMinutes: number;
  totalMinutesThisMonth: number;
  totalCost: number;
  totalCostThisMonth: number;
  avgDurationMs: number;
  successRate: number;           // 0-100
  transferRate: number;          // 0-100
  sentimentPositive: number;
  sentimentNeutral: number;
  sentimentNegative: number;
}

export function computeKPIs(calls: RetellCall[]): KPIs {
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).getTime();

  let totalMinutesMs = 0;
  let totalMinutesThisMonthMs = 0;
  let totalCost = 0;
  let totalCostThisMonth = 0;
  let successCount = 0;
  let transferCount = 0;
  let sentimentPositive = 0;
  let sentimentNeutral = 0;
  let sentimentNegative = 0;
  let callsThisMonth = 0;

  for (const call of calls) {
    totalMinutesMs += call.duration_ms || 0;
    totalCost += call.call_cost?.combined_cost || 0;

    if (call.start_timestamp >= monthStart) {
      callsThisMonth++;
      totalMinutesThisMonthMs += call.duration_ms || 0;
      totalCostThisMonth += call.call_cost?.combined_cost || 0;
    }

    if (call.call_analysis?.call_successful) successCount++;
    const outcome = classifyOutcome(call);
    if (outcome === 'Transferred') transferCount++;

    const sentiment = call.call_analysis?.user_sentiment;
    if (sentiment === 'Positive') sentimentPositive++;
    else if (sentiment === 'Negative') sentimentNegative++;
    else sentimentNeutral++;
  }

  const total = calls.length || 1; // avoid division by zero

  return {
    totalCalls: calls.length,
    totalCallsThisMonth: callsThisMonth,
    totalMinutes: Math.round(totalMinutesMs / 60000),
    totalMinutesThisMonth: Math.round(totalMinutesThisMonthMs / 60000),
    totalCost,
    totalCostThisMonth,
    avgDurationMs: totalMinutesMs / total,
    successRate: (successCount / total) * 100,
    transferRate: (transferCount / total) * 100,
    sentimentPositive,
    sentimentNeutral,
    sentimentNegative,
  };
}

// ─── Date range presets ────────────────────────────────────────

export type DatePreset = 'today' | '7d' | '30d' | '90d' | 'all' | 'custom';

export function getDateRange(preset: DatePreset): { start: number; end: number } | null {
  if (preset === 'all') return null;

  const now = Date.now();
  const dayMs = 86400000;
  const todayStart = new Date().setHours(0, 0, 0, 0);

  switch (preset) {
    case 'today':
      return { start: todayStart, end: now };
    case '7d':
      return { start: now - 7 * dayMs, end: now };
    case '30d':
      return { start: now - 30 * dayMs, end: now };
    case '90d':
      return { start: now - 90 * dayMs, end: now };
    default:
      return null;
  }
}

/** Filter calls to a date range. */
export function filterByDateRange(
  calls: RetellCall[],
  range: { start: number; end: number } | null
): RetellCall[] {
  if (!range) return calls;
  return calls.filter(c => c.start_timestamp >= range.start && c.start_timestamp <= range.end);
}

// ─── Chart color palette ───────────────────────────────────────

export const CHART_COLORS = {
  brand: '#8B5CF6',
  brandLight: '#A78BFA',
  brandDark: '#6D28D9',
  positive: '#10B981',
  neutral: '#6B7280',
  negative: '#EF4444',
  blue: '#3B82F6',
  cyan: '#06B6D4',
  amber: '#F59E0B',
  pink: '#EC4899',
  orange: '#F97316',
  lime: '#84CC16',
  teal: '#14B8A6',
  white10: 'rgba(255,255,255,0.1)',
  white20: 'rgba(255,255,255,0.2)',
  white40: 'rgba(255,255,255,0.4)',
  white60: 'rgba(255,255,255,0.6)',
};

/** Colors for outcome badges. */
export const OUTCOME_COLORS: Record<CallOutcome, string> = {
  Completed: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  Transferred: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Voicemail: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  Failed: 'bg-red-500/10 text-red-400 border-red-500/20',
  Other: 'bg-white/5 text-white/50 border-white/10',
};

/** Colors for sentiment badges. */
export const SENTIMENT_COLORS: Record<string, string> = {
  Positive: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  Neutral: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
  Negative: 'bg-red-500/10 text-red-400 border-red-500/20',
  Unknown: 'bg-white/5 text-white/50 border-white/10',
};

/** Colors for direction badges. */
export const DIRECTION_COLORS: Record<string, string> = {
  inbound: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  outbound: 'bg-brand/10 text-brand border-brand/20',
};
