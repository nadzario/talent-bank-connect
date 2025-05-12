
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/integrations/supabase/types';

const supabaseUrl = 'https://loegsdjbyazhlfrnfrlc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvZWdzZGpieWF6aGxmcm5mcmxjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY3OTkwNjIsImV4cCI6MjA2MjM3NTA2Mn0.VTBpHHMvQlRVN_nLTb94T34giI3idpcfYYgdGPtITrQ';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
