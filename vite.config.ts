import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import type { Plugin } from 'vite'

// Dev-only plugin that mimics the Vercel /api/retell-token serverless function
function retellDevProxy(): Plugin {
  let apiKey: string
  let agentId: string

  return {
    name: 'retell-dev-proxy',
    configResolved(config) {
      const env = loadEnv(config.mode, config.root, '')
      apiKey  = env.RETELL_API_KEY  || ''
      agentId = env.RETELL_AGENT_ID  || ''
    },
    configureServer(server) {
      server.middlewares.use('/api/retell-token', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.end(JSON.stringify({ error: 'Method not allowed' }))
          return
        }
        if (!apiKey) {
          res.statusCode = 500
          res.end(JSON.stringify({ error: 'RETELL_API_KEY not set in .env.local' }))
          return
        }
        try {
          const retellRes = await fetch('https://api.retellai.com/v2/create-web-call', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({ agent_id: agentId }),
          })
          const data = (await retellRes.json()) as any
          res.statusCode = retellRes.ok ? 200 : retellRes.status
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(retellRes.ok ? { access_token: data.access_token } : { error: JSON.stringify(data) }))
        } catch (err) {
          res.statusCode = 500
          res.end(JSON.stringify({ error: String(err) }))
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), retellDevProxy()],
})
