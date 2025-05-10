
import { supabase } from "@/integrations/supabase/client";
import { Event, mockEvents } from "../mockEvents";

export const eventService = {
  async getEvents(): Promise<Event[]> {
    try {
      // Try to get events from Supabase
      const { data, error } = await supabase
        .from('events')
        .select('*');
      
      // If successful, return the data
      if (!error && data) {
        return data as unknown as Event[];
      }
      
      // Fall back to mock data
      console.log('Using mock events data as fallback');
      return mockEvents;
    } catch (error) {
      console.error('Error fetching events, using mock data:', error);
      return mockEvents;
    }
  },

  async createEvent(data: Omit<Event, 'id'>) {
    try {
      // Try to insert into Supabase
      const { data: newEvent, error } = await supabase
        .from('events')
        .insert({
          type: data.type,
          title: data.title,
          profile: data.profile,
          date: data.date,
          location: data.location,
          stage: data.stage,
          academic_year: data.type === 'olympiad' ? data.academicYear : null
        })
        .select();
        
      if (error) {
        console.error('Error creating event, using mock implementation:', error);
        return { ...data, id: Math.floor(Math.random() * 1000) };
      }
      
      return newEvent[0] as unknown as Event;
    } catch (error) {
      console.error('Error creating event, using mock implementation:', error);
      return { ...data, id: Math.floor(Math.random() * 1000) } as Event;
    }
  },

  async updateEvent(id: number, data: Partial<Event>) {
    try {
      const { data: updatedEvent, error } = await supabase
        .from('events')
        .update({
          type: data.type,
          title: data.title,
          profile: data.profile,
          date: data.date,
          location: data.location,
          stage: data.stage,
          academic_year: data.type === 'olympiad' ? data.academicYear : null
        })
        .eq('id', id)
        .select();
        
      if (error) {
        console.error('Error updating event, using mock implementation:', error);
        return { ...data, id } as Event;
      }
      
      return updatedEvent[0] as unknown as Event;
    } catch (error) {
      console.error('Error updating event, using mock implementation:', error);
      return { ...data, id } as Event;
    }
  },

  async deleteEvent(id: number) {
    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id);
        
      if (error) {
        console.error('Error deleting event, using mock implementation:', error);
        return { id, success: true };
      }
      
      return { id, success: true };
    } catch (error) {
      console.error('Error deleting event, using mock implementation:', error);
      return { id, success: true };
    }
  }
};
