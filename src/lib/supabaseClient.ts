import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Hardcoded fallbacks to ensure it works even if deployment env vars are missing
const finalUrl = supabaseUrl || 'https://fdczfkhgmcwojcywskow.supabase.co';
const finalAnonKey = supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkY3pma2hnbWN3b2pjeXdza293Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkxODIwOTIsImV4cCI6MjA4NDc1ODA5Mn0.SR3UyDoftp4asYRzWPRR5x_MltKItGpPE548JR-oOIc';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Using fallback Supabase credentials. For production, please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your deployment environment variables.');
}

export const supabase = createClient(finalUrl, finalAnonKey);
