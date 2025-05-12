
import { supabase } from '@/lib/supabase';

export const participationService = {
  async getParticipations() {
    const { data, error } = await supabase
      .from('participation')
      .select(`
        *,
        student:student_id(*),
        mentor:mentor_id(*)
      `);
    if (error) throw error;
    return data;
  },

  async getParticipationById(id: number) {
    const { data, error } = await supabase
      .from('participation')
      .select(`
        *,
        student:student_id(*),
        mentor:mentor_id(*)
      `)
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  async createParticipation(participationData: {
    student_id: number;
    mentor_id: number;
    status: string;
    points: number;
  }) {
    const { data, error } = await supabase
      .from('participation')
      .insert(participationData)
      .select();
    if (error) throw error;
    return data[0];
  },

  async updateParticipation(id: number, updates: {
    student_id?: number;
    mentor_id?: number;
    status?: string;
    points?: number;
  }) {
    const { data, error } = await supabase
      .from('participation')
      .update(updates)
      .eq('id', id)
      .select();
    if (error) throw error;
    return data[0];
  },

  async deleteParticipation(id: number) {
    const { error } = await supabase
      .from('participation')
      .delete()
      .eq('id', id);
    if (error) throw error;
    return { success: true };
  }
};
