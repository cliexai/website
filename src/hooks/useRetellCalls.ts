// ─── useRetellCalls Hook ───────────────────────────────────────
// Manages fetching, caching, and state for Retell call data.
// ───────────────────────────────────────────────────────────────

import { useState, useEffect, useCallback, useMemo } from 'react';
import { fetchAllCalls, fetchCallDetail, type RetellCall } from '../lib/retellApi';
import {
  computeKPIs, filterByDateRange, getDateRange,
  type DatePreset, type KPIs,
} from '../lib/analyticsUtils';

interface UseRetellCallsReturn {
  /** All fetched calls (unfiltered). */
  allCalls: RetellCall[];
  /** Calls filtered by active date range. */
  calls: RetellCall[];
  /** Computed KPI metrics for filtered calls. */
  kpis: KPIs;
  /** Whether the initial fetch is in progress. */
  loading: boolean;
  /** Error message if fetch failed. */
  error: string | null;
  /** Re-fetch all data from the API. */
  refresh: () => void;
  /** Active date preset. */
  datePreset: DatePreset;
  /** Change the date preset. */
  setDatePreset: (preset: DatePreset) => void;
  /** Custom date range (when preset is 'custom'). */
  customRange: { start: number; end: number } | null;
  /** Set custom date range. */
  setCustomRange: (range: { start: number; end: number } | null) => void;
  /** Fetch a single call's full detail. */
  getCallDetail: (callId: string) => Promise<RetellCall>;
  /** Cache of detailed call data. */
  detailCache: Map<string, RetellCall>;
}

export function useRetellCalls(): UseRetellCallsReturn {
  const [allCalls, setAllCalls] = useState<RetellCall[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [datePreset, setDatePreset] = useState<DatePreset>('all');
  const [customRange, setCustomRange] = useState<{ start: number; end: number } | null>(null);
  const [detailCache] = useState(() => new Map<string, RetellCall>());

  const loadCalls = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAllCalls();
      setAllCalls(data);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to fetch calls';
      setError(msg);
      console.error('[useRetellCalls]', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCalls();
  }, [loadCalls]);

  // Filter calls by active date range
  const calls = useMemo(() => {
    const range = datePreset === 'custom' ? customRange : getDateRange(datePreset);
    return filterByDateRange(allCalls, range);
  }, [allCalls, datePreset, customRange]);

  // Compute KPIs for filtered calls
  const kpis = useMemo(() => computeKPIs(calls), [calls]);

  // Fetch single call detail (with cache)
  const getCallDetail = useCallback(async (callId: string): Promise<RetellCall> => {
    if (detailCache.has(callId)) return detailCache.get(callId)!;
    const detail = await fetchCallDetail(callId);
    detailCache.set(callId, detail);
    return detail;
  }, [detailCache]);

  return {
    allCalls,
    calls,
    kpis,
    loading,
    error,
    refresh: loadCalls,
    datePreset,
    setDatePreset,
    customRange,
    setCustomRange,
    getCallDetail,
    detailCache,
  };
}
