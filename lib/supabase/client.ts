import { createBrowserClient } from '@supabase/ssr'

// Temporary hardcoded Supabase credentials
const SUPABASE_URL = 'https://svxrsjrkghluzxwtmjvt.supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_3YYKpXLOX0qq77ugJZ0_Mw_s2nU4rXH'

export function createClient() {
  return createBrowserClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
  )
}
