
import { useState, useEffect } from 'react';
import { api } from '@/services/api';
import { useToast } from '@/hooks/use-toast';
import { supabase } from "@/integrations/supabase/client";

export type NotificationType = 'TIP' | 'NEWS';
export type RecipientType = 'MUNICIPALITY' | 'SCHOOL' | 'ALL';

export interface Notification {
  id: number;
  title: string;
  text: string;
  type: NotificationType;
  recipient_type: RecipientType;
  recipient_id?: number | null;
  is_read: boolean;
  created_at: string;
}

export function useNotifications(userRole?: string, userId?: number) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchNotifications() {
      try {
        setLoading(true);
        
        // Fetch from Supabase if available
        const { data, error } = await supabase
          .from('notifications')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          throw error;
        }
        
        // Use mock data if we don't have data from Supabase
        let notificationsData = data && data.length > 0 ? data : [
          {
            id: 1,
            title: 'Новая заявка на регистрацию',
            text: 'Поступила новая заявка на регистрацию от школы №123',
            type: 'NEWS',
            recipient_type: 'ALL',
            is_read: false,
            created_at: new Date().toISOString()
          },
          {
            id: 2,
            title: 'Обновление системы',
            text: 'Система была обновлена до последней версии. Добавлено разделение мероприятий на олимпиады и конкурсы.',
            type: 'TIP',
            recipient_type: 'ALL',
            is_read: false,
            created_at: new Date(Date.now() - 86400000).toISOString()
          },
          {
            id: 3,
            title: 'Новые данные по муниципалитету',
            text: 'Добавлены новые статистические данные по вашему муниципалитету.',
            type: 'NEWS',
            recipient_type: 'MUNICIPALITY',
            recipient_id: 1,
            is_read: true,
            created_at: new Date(Date.now() - 172800000).toISOString()
          }
        ];
        
        // Filter notifications based on user role
        let filteredNotifications = notificationsData;
        if (userRole === 'MUNICIPALITY' && userId) {
          filteredNotifications = notificationsData.filter(n => 
            n.recipient_type === 'ALL' || 
            (n.recipient_type === 'MUNICIPALITY' && (!n.recipient_id || n.recipient_id === userId))
          );
        } else if (userRole === 'SCHOOL' && userId) {
          filteredNotifications = notificationsData.filter(n => 
            n.recipient_type === 'ALL' || 
            (n.recipient_type === 'SCHOOL' && (!n.recipient_id || n.recipient_id === userId))
          );
        }
        
        setNotifications(filteredNotifications);
        
        // Show toast for unread notifications
        const unreadNotifications = filteredNotifications.filter(n => !n.is_read);
        if (unreadNotifications.length > 0) {
          toast({
            title: `У вас ${unreadNotifications.length} новых уведомлений`,
            description: unreadNotifications[0].title,
          });
        }
      } catch (err) {
        console.error('Error fetching notifications:', err);
        setError('Не удалось загрузить уведомления');
      } finally {
        setLoading(false);
      }
    }

    fetchNotifications();
  }, [userRole, userId, toast]);

  const markAsRead = async (id: number) => {
    try {
      // Update locally first for better UX
      setNotifications(prev => 
        prev.map(notification => 
          notification.id === id 
            ? { ...notification, is_read: true } 
            : notification
        )
      );
      
      // Then update in Supabase
      await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('id', id);
        
    } catch (error) {
      console.error('Error marking notification as read:', error);
      // Revert local change if update failed
      const { data } = await supabase
        .from('notifications')
        .select('*')
        .eq('id', id)
        .single();
        
      if (data) {
        setNotifications(prev =>
          prev.map(notification =>
            notification.id === id
              ? { ...notification, is_read: data.is_read }
              : notification
          )
        );
      }
    }
  };

  const markAllAsRead = async () => {
    try {
      // Update locally first
      setNotifications(prev => 
        prev.map(notification => ({ ...notification, is_read: true }))
      );
      
      // Then update in Supabase for all unread notifications
      const unreadIds = notifications.filter(n => !n.is_read).map(n => n.id);
      
      if (unreadIds.length > 0) {
        await supabase
          .from('notifications')
          .update({ is_read: true })
          .in('id', unreadIds);
      }
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      // If update fails, refresh the list to ensure data consistency
      const { data } = await supabase
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (data) {
        setNotifications(data);
      }
    }
  };

  return { 
    notifications, 
    loading, 
    error,
    markAsRead,
    markAllAsRead,
    unreadCount: notifications.filter(n => !n.is_read).length
  };
}
