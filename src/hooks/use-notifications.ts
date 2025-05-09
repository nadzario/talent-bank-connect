
import { useState, useEffect } from 'react';
import { api } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

export interface Notification {
  id: number;
  title: string;
  text: string;
  type: 'TIP' | 'NEWS';
  recipientType: 'MUNICIPALITY' | 'SCHOOL' | 'ALL';
  recipientId?: number | null;
  read: boolean;
  createdAt: string;
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
        // Предположим, что api.getNotifications будет реализовано в будущем
        // Сейчас используем моковые данные, соответствующие схеме БД
        const mockNotifications: Notification[] = [
          {
            id: 1,
            title: 'Новая заявка на регистрацию',
            text: 'Поступила новая заявка на регистрацию от школы №123',
            type: 'NEWS',
            recipientType: 'ALL',
            read: false,
            createdAt: new Date().toISOString()
          },
          {
            id: 2,
            title: 'Обновление системы',
            text: 'Система была обновлена до последней версии. Добавлено разделение мероприятий на олимпиады и конкурсы.',
            type: 'TIP',
            recipientType: 'ALL',
            read: false,
            createdAt: new Date(Date.now() - 86400000).toISOString()
          },
          {
            id: 3,
            title: 'Новые данные по муниципалитету',
            text: 'Добавлены новые статистические данные по вашему муниципалитету.',
            type: 'NEWS',
            recipientType: 'MUNICIPALITY',
            recipientId: 1,
            read: true,
            createdAt: new Date(Date.now() - 172800000).toISOString()
          }
        ];
        
        // Фильтрация уведомлений в зависимости от роли пользователя
        let filteredNotifications = mockNotifications;
        if (userRole === 'MUNICIPALITY' && userId) {
          filteredNotifications = mockNotifications.filter(n => 
            n.recipientType === 'ALL' || 
            (n.recipientType === 'MUNICIPALITY' && (!n.recipientId || n.recipientId === userId))
          );
        } else if (userRole === 'SCHOOL' && userId) {
          filteredNotifications = mockNotifications.filter(n => 
            n.recipientType === 'ALL' || 
            (n.recipientType === 'SCHOOL' && (!n.recipientId || n.recipientId === userId))
          );
        }
        
        setNotifications(filteredNotifications);
        
        // Показываем новое уведомление, если оно не прочитано
        const unreadNotifications = filteredNotifications.filter(n => !n.read);
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

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true } 
          : notification
      )
    );
    // В реальном приложении здесь был бы API-запрос для обновления статуса в БД
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
    // В реальном приложении здесь был бы API-запрос для обновления статуса в БД
  };

  return { 
    notifications, 
    loading, 
    error,
    markAsRead,
    markAllAsRead,
    unreadCount: notifications.filter(n => !n.read).length
  };
}
