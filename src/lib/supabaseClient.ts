import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    '[ClieX AI] Missing Supabase env vars. ' +
    'Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local'
  );
}

// Singleton client — import this wherever you need Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ─── Type definitions ─────────────────────────────────────────
export interface Lead {
  id: string;
  full_name: string;
  business: string;
  email: string;
  whatsapp: string;
  plan: string;
  created_at: string;
}
