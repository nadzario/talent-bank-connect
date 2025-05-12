
import { supabase } from '@/lib/supabase';
import { Database } from '@/integrations/supabase/types';

type ProfileRow = Database['public']['Tables']['academic_profiles']['Row'];
type ProfileInsert = Database['public']['Tables']['academic_profiles']['Insert'];
type ProfileUpdate = Database['public']['Tables']['academic_profiles']['Update'];

export const academicProfileService = {
  async getProfiles() {
    const { data, error } = await supabase
      .from('academic_profiles')
      .select(`
        *,
        direction:direction_id(*)
      `)
      .order('name', { ascending: true });
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
      .maybeSingle();
    if (error) throw error;
    return data;
  },

  async getProfilesByDirectionId(directionId: number) {
    const { data, error } = await supabase
      .from('academic_profiles')
      .select(`
        *,
        direction:direction_id(*)
      `)
      .eq('direction_id', directionId)
      .order('name', { ascending: true });
    if (error) throw error;
    return data;
  },

  async createProfile(profileData: ProfileInsert) {
    const { data, error } = await supabase
      .from('academic_profiles')
      .insert(profileData)
      .select();
    if (error) throw error;
    return data[0];
  },

  async updateProfile(id: number, updates: ProfileUpdate) {
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
