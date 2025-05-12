
import { supabase } from '@/lib/supabase';

export const academicProfileService = {
  async getProfiles() {
    const { data, error } = await supabase
      .from('academic_profiles')
      .select(`
        *,
        direction:direction_id(*)
      `);
    if (error) throw error;
    return data;
  },

  async getProfileById(id: number) {
    const { data, error } = await supabase
      .from('academic_profiles')
      .select(`
        *,
        direction:direction_id(*)
      `)
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  async createProfile(profileData: {
    name: string;
    direction_id: number;
  }) {
    const { data, error } = await supabase
      .from('academic_profiles')
      .insert(profileData)
      .select();
    if (error) throw error;
    return data[0];
  },

  async updateProfile(id: number, updates: {
    name?: string;
    direction_id?: number;
  }) {
    const { data, error } = await supabase
      .from('academic_profiles')
      .update(updates)
      .eq('id', id)
      .select();
    if (error) throw error;
    return data[0];
  },

  async deleteProfile(id: number) {
    const { error } = await supabase
      .from('academic_profiles')
      .delete()
      .eq('id', id);
    if (error) throw error;
    return { success: true };
  }
};
