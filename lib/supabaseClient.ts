import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://hqsfouxmubvsoehopdxa.supabase.co"
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhxc2ZvdXhtdWJ2c29laG9wZHhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYzOTQ0MDYsImV4cCI6MjA3MTk3MDQwNn0.9PXf_UmswKhVbVnyIdfZ7yrfVGBZE6Nim23h0DHLdpE"

// Export a Supabase client instance
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
