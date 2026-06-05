// =============================================================
// Vercel Serverless Function – Retell Call Analytics Proxy
//
// Proxies Retell API endpoints so the API key stays server-side.
//
// POST /api/retell-calls          → POST https://api.retellai.com/v2/list-calls
// GET  /api/retell-calls?id=xxx   → GET  https://api.retellai.com/v2/get-call/{id}
//
// Environment variables required:
//   RETELL_API_KEY
// =============================================================

import type { VercelRequest, VercelResponse } from '@vercel/node';

const RETELL_API_KEY = process.env.RETELL_API_KEY!;
const RETELL_BASE = 'https://api.retellai.com/v2';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers — restrict to known origins
  const ALLOWED_ORIGINS = [
    'http://localhost:5173',
    'http://localhost:4173',
    'https://cliexai.com',
    'https://www.cliexai.com',
  ];
  const origin = req.headers.origin;
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    res.setHeader('Access-Control-Allow-Origin', 'https://cliexai.com');
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (!RETELL_API_KEY) {
    console.error('[retell-calls] RETELL_API_KEY is not set');
    return res.status(500).json({ error: 'Server misconfigured' });
  }

  try {
    // ── GET: Fetch single call detail ──────────────────────
    if (req.method === 'GET') {
      const callId = req.query.id as string;
      if (!callId) {
        return res.status(400).json({ error: 'Missing "id" query parameter' });
      }

      const retellRes = await fetch(`${RETELL_BASE}/get-call/${callId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${RETELL_API_KEY}`,
        },
      });

      const data = await retellRes.json();
      return res.status(retellRes.ok ? 200 : retellRes.status).json(data);
    }

    // ── POST: List calls with filters + pagination ─────────
    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

      const retellRes = await fetch(`${RETELL_BASE}/list-calls`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${RETELL_API_KEY}`,
        },
        body: JSON.stringify(body || {}),
      });

      const data = await retellRes.json();
      return res.status(retellRes.ok ? 200 : retellRes.status).json(data);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('[retell-calls] Fatal error:', err);
    return res.status(500).json({ error: 'Failed to proxy Retell API' });
  }
}
