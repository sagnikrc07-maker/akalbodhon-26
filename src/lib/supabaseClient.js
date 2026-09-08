import { createClient } from '@supabase/supabase-js';

// Environment variables configuration (supports Vite, Next.js, and standard process.env)
const supabaseUrl = 
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL) ||
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.SUPABASE_URL ||
  'https://yagvczdnfyhdtvggkclj.supabase.co';

const supabaseAnonKey = 
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_ANON_KEY) ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlhZ3ZjemRuZnloZHR2Z2drY2xqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgwODM2MDcsImV4cCI6MjEwMzY1OTYwN30.VsaIdEh9PZGdFfVuJy1KMAISkl8yhRepxAXNGGMxibA';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase Environment Variables: SUPABASE_URL and SUPABASE_ANON_KEY must be provided.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
  },
});

export default supabase;
