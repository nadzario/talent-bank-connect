
import { supabase } from '@/lib/supabase';
import { Database } from '@/integrations/supabase/types';

type ParticipationRow = Database['public']['Tables']['participation']['Row'];
type ParticipationInsert = Database['public']['Tables']['participation']['Insert'];
type ParticipationUpdate = Database['public']['Tables']['participation']['Update'];

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
      .maybeSingle();
    if (error) throw error;
    return data;
  },

  async getParticipationsByStudentId(studentId: number) {
    const { data, error } = await supabase
      .from('participation')
      .select(`
        *,
        student:student_id(*),
        mentor:mentor_id(*)
      `)
      .eq('student_id', studentId);
    if (error) throw error;
    return data;
  },

  async getParticipationsByMentorId(mentorId: number) {
    const { data, error } = await supabase
      .from('participation')
      .select(`
        *,
        student:student_id(*),
        mentor:mentor_id(*)
      `)
      .eq('mentor_id', mentorId);
    if (error) throw error;
    return data;
  },

  async createParticipation(participationData: ParticipationInsert) {
    const { data, error } = await supabase
      .from('participation')
      .insert(participationData)
      .select(`
        *,
        student:student_id(*),
        mentor:mentor_id(*)
      `);
    if (error) throw error;
    return data[0];
  },

  async updateParticipation(id: number, updates: ParticipationUpdate) {
    const { data, error } = await supabase
      .from('participation')
      .update(updates)
      .eq('id', id)
      .select(`
        *,
        student:student_id(*),
        mentor:mentor_id(*)
      `);
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
  },
  
  async getParticipationStatistics() {
    // Fix the error by using proper RPC typing
    const { data, error } = await supabase
      .rpc('get_participation_statistics');
    if (error) throw error;
    return data;
  }
};
