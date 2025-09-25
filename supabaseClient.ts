// lib/supabaseClient.ts
import { createClient } from "@supabase/supabase-js"

// These environment variables must exist in your .env file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Export a Supabase client instance
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
