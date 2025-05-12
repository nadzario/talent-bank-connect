
import { supabase } from '@/lib/supabase';

export const directionsService = {
  async getDirections() {
    const { data, error } = await supabase
      .from('directions')
      .select('*');
    if (error) throw error;
    return data;
  },

  async getDirectionById(id: number) {
    const { data, error } = await supabase
      .from('directions')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  async createDirection(directionData: {
    name: string;
    is_olympiad_only: boolean;
  }) {
    const { data, error } = await supabase
      .from('directions')
      .insert(directionData)
      .select();
    if (error) throw error;
    return data[0];
  },

  async updateDirection(id: number, updates: {
    name?: string;
    is_olympiad_only?: boolean;
  }) {
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
