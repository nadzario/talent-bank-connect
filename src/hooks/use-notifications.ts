import { useState, useEffect, useCallback } from "react";
import { api } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

export type NotificationType = "TIP" | "NEWS";
export type RecipientType = "MUNICIPALITY" | "SCHOOL" | "ALL";

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

  const userId = "your_user_id"; // Replace with actual user ID
  const userRole = "ADMIN"; // Replace with actual user role

  const fetchNotifications = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getNotifications(userRole, userId);
      setNotifications(data);
    } catch (e) {
      setError("Failed to fetch notifications");
      console.error("Failed to fetch notifications:", e);
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить уведомления",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast, userId, userRole]);

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
  };
};
