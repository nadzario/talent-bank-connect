
import { supabase } from "@/integrations/supabase/client";

export const municipalityService = {
  async getMunicipalities() {
    try {
      const { data, error } = await supabase
        .from('municipalities')
        .select('*, schools(*)');
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching municipalities:', error);
      throw error;
    }
  },

  async createMunicipality(data) {
    try {
      const { data: newMunicipality, error } = await supabase
        .from('municipalities')
        .insert(data)
        .select();
      if (error) throw error;
      return newMunicipality[0];
    } catch (error) {
      console.error('Error creating municipality:', error);
      throw error;
    }
  }
};
