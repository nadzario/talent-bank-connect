
import { supabase } from '@/lib/supabase';
import type { Database } from '@/types/supabase';

type Student = Database['public']['Tables']['students']['Row'];

export const studentsService = {
  async getStudents() {
    const { data, error } = await supabase
      .from('students')
      .select(`
        *,
        class:class_id (
          *,
          school:school_id (
            *,
            municipality:municipality_id (*)
          )
        )
      `);
    if (error) throw error;
    return data;
  },

  async getStudentById(id: number) {
    const { data, error } = await supabase
      .from('students')
      .select(`
        *,
        class:class_id (
          *,
          school:school_id (
            *,
            municipality:municipality_id (*)
          )
        )
      `)
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  async createStudent(student: Omit<Student, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('students')
      .insert(student)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async updateStudent(id: number, updates: Partial<Student>) {
    const { data, error } = await supabase
      .from('students')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async deleteStudent(id: number) {
    const { error } = await supabase
      .from('students')
      .delete()
      .eq('id', id);
    if (error) throw error;
    return true;
  }
};
