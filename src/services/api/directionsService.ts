
import { supabase } from '@/lib/supabase';
import { Database } from '@/integrations/supabase/types';

type DirectionRow = Database['public']['Tables']['directions']['Row'];
type DirectionInsert = Database['public']['Tables']['directions']['Insert'];
type DirectionUpdate = Database['public']['Tables']['directions']['Update'];

export const directionsService = {
  async getDirections() {
    const { data, error } = await supabase
      .from('directions')
      .select('*')
      .order('name', { ascending: true });
    if (error) throw error;
    return data;
  },

  async getDirectionById(id: number) {
    const { data, error } = await supabase
      .from('directions')
      .select('*')
      .eq('id', id)
      .maybeSingle();
    if (error) throw error;
    return data;
  },

  async getOlympiadOnlyDirections() {
    const { data, error } = await supabase
      .from('directions')
      .select('*')
      .eq('is_olympiad_only', true)
      .order('name', { ascending: true });
    if (error) throw error;
    return data;
  },

  async createDirection(directionData: DirectionInsert) {
    const { data, error } = await supabase
      .from('directions')
      .insert(directionData)
      .select();
    if (error) throw error;
    return data[0];
  },

  async updateDirection(id: number, updates: DirectionUpdate) {
    const { data, error } = await supabase
      .from('directions')
      .update(updates)
      .eq('id', id)
      .select();
    if (error) throw error;
    return data[0];
  },

  async deleteDirection(id: number) {
    const { error } = await supabase
      .from('directions')
      .delete()
      .eq('id', id);
    if (error) throw error;
    return { success: true };
  }
};
