
import { supabase } from "@/lib/supabase";

export interface Event {
  id: number;
  title: string;
  type: string;
  profile: string;
  date?: string;
  location?: string;
  stage?: string;
  academicYear?: string;
  created_at?: string;
}

export const eventService = {
  async getEvents(): Promise<Event[]> {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Map the data to the Event interface
      return (data || []).map(event => ({
        id: event.id,
        title: event.title,
        type: event.type,
        profile: event.profile,
        date: event.date,
        location: event.location,
        stage: event.stage,
        academicYear: event.academic_year,
        created_at: event.created_at
      }));
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  },

  async createEvent(data: Omit<Event, 'id' | 'created_at'>) {
    try {
      const { data: newEvent, error } = await supabase
        .from('events')
        .insert({
          title: data.title,
          type: data.type,
          profile: data.profile,
          date: data.date,
          location: data.location,
          stage: data.stage,
          academic_year: data.academicYear
        })
        .select();
        
      if (error) throw error;
      
      return {
        id: newEvent[0].id,
        title: newEvent[0].title,
        type: newEvent[0].type,
        profile: newEvent[0].profile,
        date: newEvent[0].date,
        location: newEvent[0].location,
        stage: newEvent[0].stage,
        academicYear: newEvent[0].academic_year,
        created_at: newEvent[0].created_at
      };
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  },

  async updateEvent(id: number, data: Partial<Event>) {
    try {
      const { data: updatedEvent, error } = await supabase
        .from('events')
        .update({
          title: data.title,
          type: data.type,
          profile: data.profile,
          date: data.date,
          location: data.location,
          stage: data.stage,
          academic_year: data.academicYear
        })
        .eq('id', id)
        .select();
        
      if (error) throw error;
      
      return {
        id: updatedEvent[0].id,
        title: updatedEvent[0].title,
        type: updatedEvent[0].type,
        profile: updatedEvent[0].profile,
        date: updatedEvent[0].date,
        location: updatedEvent[0].location,
        stage: updatedEvent[0].stage,
        academicYear: updatedEvent[0].academic_year,
        created_at: updatedEvent[0].created_at
      };
    } catch (error) {
      console.error('Error updating event:', error);
      throw error;
    }
  },

  async deleteEvent(id: number) {
    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      return { id, success: true };
    } catch (error) {
      console.error('Error deleting event:', error);
      throw error;
    }
  }
};
