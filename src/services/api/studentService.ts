
import { supabase } from "@/integrations/supabase/client";

export const studentService = {
  async getStudents() {
    try {
      const { data, error } = await supabase
        .from('students')
        .select(`
          *,
          class:class_id (*)
        `);
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching students:', error);
      throw error;
    }
  },

  async createStudent(data) {
    try {
      const { data: newStudent, error } = await supabase
        .from('students')
        .insert(data)
        .select('*, class:class_id (*)');
      if (error) throw error;
      return newStudent[0];
    } catch (error) {
      console.error('Error creating student:', error);
      throw error;
    }
  },

  async updateStudent(id, data) {
    try {
      const { data: updatedStudent, error } = await supabase
        .from('students')
        .update(data)
        .eq('id', id)
        .select('*, class:class_id (*)');
      if (error) throw error;
      return updatedStudent[0];
    } catch (error) {
      console.error('Error updating student:', error);
      throw error;
    }
  },

  async deleteStudent(id) {
    try {
      const { data, error } = await supabase
        .from('students')
        .delete()
        .eq('id', id);
      if (error) throw error;
      return { id, success: true };
    } catch (error) {
      console.error('Error deleting student:', error);
      throw error;
    }
  }
};
