// =============================================================
// Vercel Serverless Function – Retell Web Call Token Generator
//
// Proxies the Retell /v2/create-web-call API so the webhook API
// key never reaches the browser.  The frontend calls:
//   POST /api/retell-token
// and receives { access_token: "..." }
//
// Environment variables required on Vercel:
//   RETELL_API_KEY   – your Retell webhook/API key
//   RETELL_AGENT_ID  – the agent to call
// =============================================================

import type { VercelRequest, VercelResponse } from '@vercel/node';

const RETELL_API_KEY  = process.env.RETELL_API_KEY!;
const RETELL_AGENT_ID = process.env.RETELL_AGENT_ID!;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Guard: key and agent must be configured
  if (!RETELL_API_KEY) {
    console.error('[retell-token] RETELL_API_KEY is not set');
    return res.status(500).json({ error: 'Server misconfigured' });
  }
  if (!RETELL_AGENT_ID) {
    console.error('[retell-token] RETELL_AGENT_ID is not set');
    return res.status(500).json({ error: 'Server misconfigured' });
  }

  try {
    const retellRes = await fetch('https://api.retellai.com/v2/create-web-call', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RETELL_API_KEY}`,
      },
      body: JSON.stringify({ agent_id: RETELL_AGENT_ID }),
    });

    if (!retellRes.ok) {
      const errText = await retellRes.text();
      console.error('[retell-token] Retell API error:', retellRes.status, errText);
      return res.status(retellRes.status).json({ error: errText });
    }

    const data = await retellRes.json();

    return res.status(200).json({ access_token: data.access_token });
  } catch (err) {
    console.error('[retell-token] Fatal error:', err);
    return res.status(500).json({ error: 'Failed to create web call' });
  }
}
