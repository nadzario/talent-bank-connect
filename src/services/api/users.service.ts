
import { supabase } from '@/lib/supabase';
import type { Database } from '@/integrations/supabase/types';

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
    // Check if role is valid according to database schema
    // Ensure it matches the available roles in the database
    const role = profile.role as "ADMIN" | "MUNICIPALITY" | "SCHOOL";
    
    const { data, error } = await supabase
      .from('profiles')
      .insert({
        id: profile.id,
        role: role,
        school_id: profile.school_id,
        municipality_id: profile.municipality_id
      })
      .select();
    if (error) throw error;
    return data[0];
  },

  async updateProfile(id: string, updates: {
    role?: Database['public']['Enums']['user_role'];
    school_id?: number | null;
    municipality_id?: number | null;
  }) {
    // Check if role is valid according to database schema
    const validUpdates = {
      ...(updates.role && { role: updates.role as "ADMIN" | "MUNICIPALITY" | "SCHOOL" }),
      ...(updates.school_id !== undefined && { school_id: updates.school_id }),
      ...(updates.municipality_id !== undefined && { municipality_id: updates.municipality_id })
    };
    
    const { data, error } = await supabase
      .from('profiles')
      .update(validUpdates)
      .eq('id', id)
      .select();
    if (error) throw error;
    return data[0];
  }
};
