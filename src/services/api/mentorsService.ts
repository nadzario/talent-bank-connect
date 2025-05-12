
import { supabase } from '@/lib/supabase';

export const mentorsService = {
  async getMentors() {
    const { data, error } = await supabase
      .from('mentors')
      .select('*');
    if (error) throw error;
    return data;
  },

  async getMentorById(id: number) {
    const { data, error } = await supabase
      .from('mentors')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  async createMentor(mentorData: {
    last_name: string;
    first_name: string;
    middle_name?: string;
    workplace: string;
  }) {
    const { data, error } = await supabase
      .from('mentors')
      .insert(mentorData)
      .select();
    if (error) throw error;
    return data[0];
  },

  async updateMentor(id: number, updates: {
    last_name?: string;
    first_name?: string;
    middle_name?: string;
    workplace?: string;
  }) {
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
