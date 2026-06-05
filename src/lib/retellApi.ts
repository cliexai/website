// ─── Retell AI API Client ──────────────────────────────────────
// Typed interface + fetch helpers for the analytics dashboard.
// All requests go through /api/retell-calls to keep the API key
// server-side.
// ───────────────────────────────────────────────────────────────

// ─── Type definitions matching Retell API v2 response ──────────

export interface LatencyStats {
  p50: number;
  p90: number;
  p95: number;
  p99: number;
  max: number;
  min: number;
  num: number;
}

export interface ProductCost {
  product: string;
  unitPrice: number;
  cost: number;
}

export interface CallCost {
  product_costs: ProductCost[];
  total_duration_seconds: number;
  combined_cost: number;
}

export interface CallAnalysis {
  call_summary?: string;
  user_sentiment?: 'Positive' | 'Neutral' | 'Negative' | 'Unknown';
  call_successful?: boolean;
  in_voicemail?: boolean;
  custom_analysis_data?: Record<string, unknown>;
}

export interface TranscriptEntry {
  role: 'agent' | 'user';
  content: string;
  words?: Array<{ word: string; start: number; end: number }>;
}

export interface LlmTokenUsage {
  input_tokens: number;
  output_tokens: number;
  input_cache_hit_tokens?: number;
  input_cache_creation_tokens?: number;
}

export interface RetellCall {
  call_id: string;
  call_type: 'web_call' | 'phone_call';
  call_status: 'registered' | 'ongoing' | 'ended' | 'error';
  agent_id: string;
  start_timestamp: number;          // epoch ms
  end_timestamp: number;            // epoch ms
  duration_ms: number;
  from_number?: string;
  to_number?: string;
  direction?: 'inbound' | 'outbound';
  disconnection_reason?: string;
  call_analysis?: CallAnalysis;
  call_cost?: CallCost;
  transcript?: string;
  transcript_object?: TranscriptEntry[];
  recording_url?: string;
  e2e_latency?: LatencyStats;
  llm_latency?: LatencyStats;
  llm_websocket_network_rtt_latency?: LatencyStats;
  metadata?: Record<string, unknown>;
  opt_out_sensitive_data_storage?: boolean;
  llm_token_usage?: LlmTokenUsage;
  voice_model?: string;
  llm_model?: string;
  voice_id?: string;
}

export interface ListCallsResponse {
  items: RetellCall[];
  pagination_key?: string;
  has_more?: boolean;
}

export interface ListCallsFilter {
  filter_criteria?: {
    agent_id?: string[];
    before_start_timestamp?: number;
    after_start_timestamp?: number;
    before_end_timestamp?: number;
    after_end_timestamp?: number;
  };
  sort_order?: 'ascending' | 'descending';
  limit?: number;
  pagination_key?: string;
}

// ─── API client ────────────────────────────────────────────────

const PROXY_URL = '/api/retell-calls';

/**
 * Fetch a page of calls from the Retell API (via proxy).
 */
export async function listCalls(filter?: ListCallsFilter): Promise<ListCallsResponse> {
  const res = await fetch(PROXY_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(filter || {}),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Retell API error ${res.status}: ${errText}`);
  }

  return res.json();
}

/**
 * Fetch ALL calls by paginating through the list-calls endpoint.
 * Returns the full array of calls.
 */
export async function fetchAllCalls(filterCriteria?: ListCallsFilter['filter_criteria']): Promise<RetellCall[]> {
  const allCalls: RetellCall[] = [];
  let paginationKey: string | undefined;
  let hasMore = true;

  while (hasMore) {
    const body: ListCallsFilter = {
      sort_order: 'descending',
      limit: 1000,
    };

    if (filterCriteria) body.filter_criteria = filterCriteria;
    if (paginationKey) body.pagination_key = paginationKey;

    const response = await listCalls(body);
    allCalls.push(...(response.items || []));

    paginationKey = response.pagination_key;
    hasMore = !!response.has_more && !!paginationKey;
  }

  return allCalls;
}

/**
 * Fetch a single call's full detail.
 */
export async function fetchCallDetail(callId: string): Promise<RetellCall> {
  const res = await fetch(`${PROXY_URL}?id=${encodeURIComponent(callId)}`, {
    method: 'GET',
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Retell API error ${res.status}: ${errText}`);
  }

  return res.json();
}
