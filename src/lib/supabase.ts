
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://gxsqlyjdkfjwscukhukq.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4c3FseWpka2Zqd3NjdWtodWtxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5NjEzNDMsImV4cCI6MjA2MjUzNzM0M30.YQD5ChOjAS-jUN4yklw8ydFMWUVtlV5wi10E242SdVY';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
