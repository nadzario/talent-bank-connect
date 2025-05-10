
import { supabase } from "@/integrations/supabase/client";
import { NotificationType, RecipientType } from "@/hooks/use-notifications";

export const notificationService = {
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
  }
};
