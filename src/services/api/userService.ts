
import { supabase } from "@/integrations/supabase/client";

export const userService = {
  async getUsers() {
    try {
      const { data, error } = await supabase.from('profiles').select('*');
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }
};
