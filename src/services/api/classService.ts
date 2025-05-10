
import { supabase } from "@/integrations/supabase/client";

export const classService = {
  async getClasses() {
    try {
      const { data, error } = await supabase
        .from('classes')
        .select(`
          *,
          school:school_id(*),
          students(*)
        `);
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching classes:', error);
      throw error;
    }
  },

  async createClass(data) {
    try {
      const { data: newClass, error } = await supabase
        .from('classes')
        .insert(data)
        .select('*, school:school_id(*)');
      if (error) throw error;
      return newClass[0];
    } catch (error) {
      console.error('Error creating class:', error);
      throw error;
    }
  }
};
