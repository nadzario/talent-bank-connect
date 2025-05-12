
import { supabase } from '@/lib/supabase';
import { Database } from '@/integrations/supabase/types';

type MentorRow = Database['public']['Tables']['mentors']['Row'];
type MentorInsert = Database['public']['Tables']['mentors']['Insert'];
type MentorUpdate = Database['public']['Tables']['mentors']['Update'];

export const mentorsService = {
  async getMentors() {
    const { data, error } = await supabase
      .from('mentors')
      .select('*')
      .order('last_name', { ascending: true });
    if (error) throw error;
    return data;
  },

  async getMentorById(id: number) {
    const { data, error } = await supabase
      .from('mentors')
      .select('*')
      .eq('id', id)
      .maybeSingle();
    if (error) throw error;
    return data;
  },

  async searchMentors(query: string) {
    const { data, error } = await supabase
      .from('mentors')
      .select('*')
      .or(`last_name.ilike.%${query}%,first_name.ilike.%${query}%,middle_name.ilike.%${query}%,workplace.ilike.%${query}%`)
      .order('last_name', { ascending: true });
    if (error) throw error;
    return data;
  },

  async createMentor(mentorData: MentorInsert) {
    const { data, error } = await supabase
      .from('mentors')
      .insert(mentorData)
      .select();
    if (error) throw error;
    return data[0];
  },

  async updateMentor(id: number, updates: MentorUpdate) {
    const { data, error } = await supabase
      .from('mentors')
      .update(updates)
      .eq('id', id)
      .select();
    if (error) throw error;
    return data[0];
  },

  async deleteMentor(id: number) {
    const { error } = await supabase
      .from('mentors')
      .delete()
      .eq('id', id);
    if (error) throw error;
    return { success: true };
  }
};
