
import { supabase } from '@/lib/supabase';
import type { Database } from '@/types/supabase';

// According to our database schema, we should be using the profiles table
// which is linked to auth.users
export type Profile = Database['public']['Tables']['profiles']['Row'];

export const usersService = {
  async getUsers() {
    const { data, error } = await supabase
      .from('profiles')
      .select('*');
    if (error) throw error;
    return data;
  },

  async getUserById(id: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  async createProfile(profile: {
    id: string;
    role: Database['public']['Enums']['user_role'];
    school_id?: number | null;
    municipality_id?: number | null;
  }) {
    const { data, error } = await supabase
      .from('profiles')
      .insert(profile)
      .select();
    if (error) throw error;
    return data[0];
  },

  async updateProfile(id: string, updates: {
    role?: Database['public']['Enums']['user_role'];
    school_id?: number | null;
    municipality_id?: number | null;
  }) {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', id)
      .select();
    if (error) throw error;
    return data[0];
  }
};
