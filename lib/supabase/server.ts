import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

/**
 * Server-only Supabase client with hard-coded keys.
 * Use ONLY in:
 * - Server Components
 * - Route Handlers
 * - Server Actions
 *
 * DO NOT import in middleware.ts
 */
export async function createSupabaseServerClient() {
  const cookieStore = await cookies()

  return createServerClient(
    'https://svxrsjrkghluzxwtmjvt.supabase.co', // Supabase URL
    'sb_publishable_3YYKpXLOX0qq77ugJZ0_Mw_s2nU4rXH', // Public anon key
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options)
          })
        },
      },
    }
  )
}
