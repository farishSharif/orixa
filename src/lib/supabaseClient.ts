import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Use dummy values if missing to avoid fatal error during initialization
const finalUrl = supabaseUrl || 'https://placeholder-url.supabase.co';
const finalAnonKey = supabaseAnonKey || 'placeholder-key';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL or Anon Key is missing. UI will be visible but backend features may not work. Check your .env file.');
}

export const supabase = createClient(finalUrl, finalAnonKey);
