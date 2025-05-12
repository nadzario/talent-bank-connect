
import { supabase } from "@/lib/supabase";
import { Database } from "@/integrations/supabase/types";

export type NotificationType = Database['public']['Enums']['notification_type'];
export type RecipientType = Database['public']['Enums']['recipient_type'];

export interface Notification {
  id: number;
  created_at: string;
  is_read: boolean;
  recipient_id: number | null;
  recipient_type: RecipientType;
  text: string;
  title: string;
  type: NotificationType;
}

export const notificationService = {
  async getNotifications() {
    try {
      console.log('Fetching notifications...');
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) {
        console.error('Error fetching notifications:', error);
        throw error;
      }
      console.log('Notifications fetched successfully:', data);
      return data || [];
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
          title: data.title,
          text: data.text,
          type: data.type,
          recipient_type: data.recipient_type,
          recipient_id: data.recipient_id,
          is_read: false
        })
        .select();

      if (error) {
        console.error('Error creating notification:', error);
        throw error;
      }
      return newNotification[0];
    } catch (error) {
      console.error('Error creating notification:', error);
      throw error;
    }
  },

  async markNotificationAsRead(id: number) {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('id', id)
        .select();

      if (error) {
        console.error('Error marking notification as read:', error);
        throw error;
      }
      return { id, success: true };
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
  },

  async markAllNotificationsAsRead(notificationIds: number[]) {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .in('id', notificationIds)
        .select();

      if (error) {
        console.error('Error marking all notifications as read:', error);
        throw error;
      }
      return { success: true, count: notificationIds.length };
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      throw error;
    }
  }
};
