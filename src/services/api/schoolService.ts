
import { supabase } from "@/integrations/supabase/client";

export const schoolService = {
  async getSchools() {
    try {
      const { data, error } = await supabase
        .from('schools')
        .select(`
          *,
          municipality:municipality_id(*),
          classes(*)
        `);
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching schools:', error);
      throw error;
    }
  },

  async createSchool(data) {
    try {
      const { data: newSchool, error } = await supabase
        .from('schools')
        .insert(data)
        .select(`
          *,
          municipality:municipality_id(*),
          classes(*)
        `);
      if (error) throw error;
      return newSchool[0];
    } catch (error) {
      console.error('Error creating school:', error);
      throw error;
    }
  }
};
