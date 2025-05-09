
import React, { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, CheckCircle, AlertCircle } from "lucide-react";
import { useNotifications } from "@/hooks/use-notifications";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const NotificationsPage: React.FC = () => {
  const { 
    notifications, 
    loading, 
    error, 
    markAsRead,
    markAllAsRead,
    unreadCount
  } = useNotifications();
  const [activeTab, setActiveTab] = useState<string>("all");
  const [filteredNotifications, setFilteredNotifications] = useState(notifications);

  useEffect(() => {
    if (activeTab === "all") {
      setFilteredNotifications(notifications);
    } else if (activeTab === "unread") {
      setFilteredNotifications(notifications.filter(n => !n.read));
    } else if (activeTab === "news") {
      setFilteredNotifications(notifications.filter(n => n.type === "NEWS"));
    } else if (activeTab === "tips") {
      setFilteredNotifications(notifications.filter(n => n.type === "TIP"));
    }
  }, [activeTab, notifications]);

  const formatNotificationDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return format(date, "dd MMM yyyy, HH:mm", { locale: ru });
    } catch (error) {
      return dateStr;
    }
  };

  const handleMarkAllAsRead = () => {
    markAllAsRead();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-lg text-muted-foreground">Загрузка уведомлений...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <AlertCircle className="h-10 w-10 text-red-500 mb-2" />
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Bell className="h-6 w-6 text-bank-blue mr-2" />
          <h1 className="text-2xl font-bold">Уведомления</h1>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" onClick={handleMarkAllAsRead}>
            <CheckCircle className="h-4 w-4 mr-2" />
            Отметить все как прочитанные
          </Button>
        )}
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Центр уведомлений</CardTitle>
              <CardDescription>
                Просмотр системных уведомлений и сообщений
              </CardDescription>
            </div>
            {unreadCount > 0 && (
              <Badge className="bg-red-500">{unreadCount} непрочитанных</Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">Все</TabsTrigger>
              <TabsTrigger value="unread" disabled={unreadCount === 0}>Непрочитанные</TabsTrigger>
              <TabsTrigger value="news">Новости</TabsTrigger>
              <TabsTrigger value="tips">Советы</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab}>
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Тип</TableHead>
                      <TableHead>Заголовок</TableHead>
                      <TableHead>Текст уведомления</TableHead>
                      <TableHead className="w-[180px]">Дата</TableHead>
                      <TableHead className="text-right">Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredNotifications.length > 0 ? (
                      filteredNotifications.map((notification) => (
                        <TableRow 
                          key={notification.id} 
                          className={notification.read ? "" : "bg-blue-50"}
                        >
                          <TableCell>
                            <Badge variant={notification.type === "NEWS" ? "default" : "secondary"}>
                              {notification.type === "NEWS" ? "Новость" : "Совет"}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-medium">
                            {notification.title}
                          </TableCell>
                          <TableCell>{notification.text}</TableCell>
                          <TableCell>{formatNotificationDate(notification.createdAt)}</TableCell>
                          <TableCell className="text-right">
                            {!notification.read && (
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => markAsRead(notification.id)}
                              >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Отметить
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-10">
                          Нет уведомлений
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationsPage;
