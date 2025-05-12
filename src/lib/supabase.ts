
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

// Use environment variables for the Supabase URL and anon key
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://loegsdjbyazhlfrnfrlc.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvZWdzZGpieWF6aGxmcm5mcmxjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY3OTkwNjIsImV4cCI6MjA2MjM3NTA2Mn0.VTBpHHMvQlRVN_nLTb94T34giI3idpcfYYgdGPtITrQ';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
