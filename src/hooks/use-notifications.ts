
import { useState, useEffect, useCallback } from "react";
import { api } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import { NotificationType, RecipientType } from "@/services/api/notificationService";

export type { NotificationType, RecipientType };

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

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const { toast } = useToast();

  const fetchNotifications = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Fetching notifications from hook...');
      const data = await api.getNotifications();
      console.log('Notifications received in hook:', data);
      setNotifications(data);
    } catch (e: any) {
      const errorMessage = "Failed to fetch notifications: " + (e?.message || '');
      setError(errorMessage);
      console.error(errorMessage, e);
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить уведомления",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  useEffect(() => {
    const count = notifications.filter((n) => !n.is_read).length;
    setUnreadCount(count);
  }, [notifications]);

  const markAsRead = async (id: number) => {
    try {
      await api.markNotificationAsRead(id);
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.id === id ? { ...notification, is_read: true } : notification
        )
      );
      setUnreadCount((prevCount) => Math.max(0, prevCount - 1));
      toast({
        title: "Уведомление отмечено как прочитанное",
      });
    } catch (e) {
      console.error("Failed to mark notification as read:", e);
      toast({
        title: "Ошибка",
        description: "Не удалось отметить уведомление как прочитанное",
        variant: "destructive",
      });
    }
  };

  const markAllAsRead = async () => {
    try {
      const unreadNotificationIds = notifications
        .filter((notification) => !notification.is_read)
        .map((notification) => notification.id);
        
      if (unreadNotificationIds.length === 0) return;
      
      await api.markAllNotificationsAsRead(unreadNotificationIds);
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) => ({ ...notification, is_read: true }))
      );
      setUnreadCount(0);
      toast({
        title: "Все уведомления отмечены как прочитанные",
      });
    } catch (e) {
      console.error("Failed to mark all notifications as read:", e);
      toast({
        title: "Ошибка",
        description: "Не удалось отметить все уведомления как прочитанные",
        variant: "destructive",
      });
    }
  };

  return {
    notifications,
    loading,
    error,
    markAsRead,
    markAllAsRead,
    unreadCount,
    refresh: fetchNotifications
  };
};
