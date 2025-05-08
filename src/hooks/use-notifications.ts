
import { useState, useEffect } from 'react';

interface Notification {
  id: string;
  title: string;
  description: string;
  date: string;
  read: boolean;
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // TODO: Replace with actual API call
    const mockNotifications = [
      {
        id: '1',
        title: 'Новая заявка на регистрацию',
        description: 'Поступила новая заявка на регистрацию от школы №123',
        date: new Date().toISOString(),
        read: false
      }
    ];
    setNotifications(mockNotifications);
  }, []);

  return { notifications };
}
