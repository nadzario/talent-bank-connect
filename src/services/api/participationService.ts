import { supabase } from '@/lib/supabase';
import { Database } from '@/integrations/supabase/types';

type OlympiadStage = Database['public']['Enums']['olympiad_stage'];

export const olympiadsService = {
  async getOlympiads() {
    const { data, error } = await supabase
      .from('olympiads')
      .select(`
        *,
        profile:profile_id(*),
        event:event_id(*)
      `);
    if (error) throw error;
    return data;
  },

  async getOlympiadById(id: number) {
    const { data, error } = await supabase
      .from('olympiads')
      .select(`
        *,
        profile:profile_id(*),
        event:event_id(*)
      `)
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  async createOlympiad(olympiadData: {
    academic_year: string;
    stage: OlympiadStage;
    points: number;
    profile_id: number;
    event_id: number;
  }) {
    const { data, error } = await supabase
      .from('olympiads')
      .insert(olympiadData)
      .select();
    if (error) throw error;
    return data[0];
  },

  async updateOlympiad(id: number, updates: {
    academic_year?: string;
    stage?: OlympiadStage;
    points?: number;
    profile_id?: number;
    event_id?: number;
  }) {
    const { data, error } = await supabase
      .from('olympiads')
      .update(updates)
      .eq('id', id)
      .select();
    if (error) throw error;
    return data[0];
  },

  async deleteOlympiad(id: number) {
    const { error } = await supabase
      .from('olympiads')
      .delete()
      .eq('id', id);
    if (error) throw error;
    return { success: true };
  }
};

export const getParticipationStatistics = async () => {
  const { data, error } = await supabase.rpc('get_participation_statistics');
  if (error) throw error;
  return data;
};
