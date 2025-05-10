
import { supabase } from "@/integrations/supabase/client";
import { NotificationType, RecipientType } from "@/hooks/use-notifications";

export const api = {
  // Users
  async getUsers() {
    try {
      const { data, error } = await supabase.from('profiles').select('*');
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },
  
  // Students
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
  },
  
  // Events
  async getEvents() {
    try {
      // First attempt to get from Supabase if the events table exists
      const { data, error } = await supabase.from('events').select('*');
      
      // If successful, return the data
      if (!error && data) {
        return data;
      }
      
      // If there's an error (likely table doesn't exist), use mock data
      console.log('Using mock events data as fallback');
      return import('@/services/mockEvents').then(module => module.mockEvents);
    } catch (error) {
      console.error('Error fetching events, using mock data:', error);
      return import('@/services/mockEvents').then(module => module.mockEvents);
    }
  },

  async createEvent(data) {
    try {
      const { data: newEvent, error } = await supabase
        .from('events')
        .insert(data)
        .select();
        
      if (error) {
        // If there's an error, log it and use mock implementation
        console.error('Error creating event, using mock implementation:', error);
        return { ...data, id: Math.floor(Math.random() * 1000) };
      }
      
      return newEvent[0];
    } catch (error) {
      console.error('Error creating event, using mock implementation:', error);
      return { ...data, id: Math.floor(Math.random() * 1000) };
    }
  },

  async updateEvent(id, data) {
    try {
      const { data: updatedEvent, error } = await supabase
        .from('events')
        .update(data)
        .eq('id', id)
        .select();
        
      if (error) {
        console.error('Error updating event, using mock implementation:', error);
        return { ...data, id };
      }
      
      return updatedEvent[0];
    } catch (error) {
      console.error('Error updating event, using mock implementation:', error);
      return { ...data, id };
    }
  },

  async deleteEvent(id) {
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
  },

  // Notifications
  async getNotifications(userRole, userId) {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      // Filter notifications based on role and ID if provided
      if (userRole && userId) {
        return data.filter(notification => {
          if (notification.recipient_type === 'ALL') return true;
          if (notification.recipient_type === userRole) {
            if (!notification.recipient_id) return true;
            return notification.recipient_id === userId;
          }
          return false;
        });
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw error;
    }
  },

  async createNotification(data: {
    title: string;
    text: string;
    type: NotificationType;
    recipient_type: RecipientType;
    recipient_id?: number | null;
  }) {
    try {
      const { data: newNotification, error } = await supabase
        .from('notifications')
        .insert({
          ...data,
          is_read: false,
          created_at: new Date().toISOString()
        })
        .select();
      if (error) throw error;
      return newNotification[0];
    } catch (error) {
      console.error('Error creating notification:', error);
      throw error;
    }
  },

  async markNotificationAsRead(id) {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('id', id)
        .select();
      if (error) throw error;
      return { id, success: true };
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
  },

  async markAllNotificationsAsRead(notificationIds) {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .in('id', notificationIds)
        .select();
      if (error) throw error;
      return { success: true, count: notificationIds.length };
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      throw error;
    }
  },

  // Municipalities 
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
  },

  // Schools
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
  },

  // Classes
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
