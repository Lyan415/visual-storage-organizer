
import { createClient } from '@supabase/supabase-js';

// These should be in your .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;


if (!supabaseUrl || !supabaseAnonKey) {
  console.error('CRITICAL: Missing Supabase URL or Anon Key. Authentication will not work.');
  document.body.innerHTML = '<div style="padding:20px; color:red;"><h1>Setup Error</h1><p>Missing Supabase URL or Key in .env file.</p></div>';
}

export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
);
