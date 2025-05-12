
import { supabase } from '@/lib/supabase';

export const projectsService = {
  async getProjects() {
    const { data, error } = await supabase
      .from('projects')
      .select(`
        *,
        profile:profile_id(*),
        event:event_id(*)
      `);
    if (error) throw error;
    return data;
  },

  async getProjectById(id: number) {
    const { data, error } = await supabase
      .from('projects')
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

  async createProject(projectData: {
    name: string;
    date?: string | null;
    location?: string | null;
    profile_id: number;
    event_id: number;
  }) {
    const { data, error } = await supabase
      .from('projects')
      .insert(projectData)
      .select();
    if (error) throw error;
    return data[0];
  },

  async updateProject(id: number, updates: {
    name?: string;
    date?: string | null;
    location?: string | null;
    profile_id?: number;
    event_id?: number;
  }) {
    const { data, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', id)
      .select();
    if (error) throw error;
    return data[0];
  },

  async deleteProject(id: number) {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);
    if (error) throw error;
    return { success: true };
  }
};
