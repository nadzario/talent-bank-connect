
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Settings, Shield, Users, Bell, Database } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const SettingsPage: React.FC = () => {
  const { toast } = useToast();
  
  const handleSaveSettings = () => {
    toast({
      title: "Настройки сохранены",
      description: "Изменения успешно применены."
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Настройки системы</h1>
        <Button onClick={handleSaveSettings}>
          Сохранить изменения
        </Button>
      </div>
      
      <Tabs defaultValue="general">
        <div className="flex">
          <div className="w-56 mr-6">
            <TabsList className="flex flex-col h-auto bg-transparent p-0 space-y-1">
              <TabsTrigger 
                value="general" 
                className="flex items-center justify-start px-4 py-2 w-full"
              >
                <Settings className="h-4 w-4 mr-2" />
                Общие
              </TabsTrigger>
              <TabsTrigger 
                value="security" 
                className="flex items-center justify-start px-4 py-2 w-full"
              >
                <Shield className="h-4 w-4 mr-2" />
                Безопасность
              </TabsTrigger>
              <TabsTrigger 
                value="users" 
                className="flex items-center justify-start px-4 py-2 w-full"
              >
                <Users className="h-4 w-4 mr-2" />
                Пользователи
              </TabsTrigger>
              <TabsTrigger 
                value="notifications" 
                className="flex items-center justify-start px-4 py-2 w-full"
              >
                <Bell className="h-4 w-4 mr-2" />
                Уведомления
              </TabsTrigger>
              <TabsTrigger 
                value="backup" 
                className="flex items-center justify-start px-4 py-2 w-full"
              >
                <Database className="h-4 w-4 mr-2" />
                Резервное копирование
              </TabsTrigger>
            </TabsList>
          </div>
          
          <div className="flex-1">
            <TabsContent value="general">
              <Card>
                <CardHeader>
                  <CardTitle>Общие настройки</CardTitle>
                  <CardDescription>
                    Настройте основные параметры системы
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="system-name">Название системы</Label>
                    <Input id="system-name" defaultValue="Банк Одаренных Детей" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="system-description">Описание системы</Label>
                    <Input id="system-description" defaultValue="Система учета и мониторинга одаренных детей" />
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Настройки интерфейса</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="theme-switch">Темная тема</Label>
                        <p className="text-sm text-muted-foreground">
                          Включить темную тему интерфейса
                        </p>
                      </div>
                      <Switch id="theme-switch" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="sidebar-collapse">Автоскрытие боковой панели</Label>
                        <p className="text-sm text-muted-foreground">
                          Автоматически скрывать боковую панель на маленьких экранах
                        </p>
                      </div>
                      <Switch id="sidebar-collapse" defaultChecked />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Настройки безопасности</CardTitle>
                  <CardDescription>
                    Управление параметрами безопасности системы
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="two-factor">Двухфакторная аутентификация</Label>
                        <p className="text-sm text-muted-foreground">
                          Требовать двухфакторную аутентификацию для всех пользователей
                        </p>
                      </div>
                      <Switch id="two-factor" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="session-timeout">Тайм-аут сессии</Label>
                        <p className="text-sm text-muted-foreground">
                          Автоматически завершать сеанс после 30 минут неактивности
                        </p>
                      </div>
                      <Switch id="session-timeout" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="password-policy">Строгая политика паролей</Label>
                        <p className="text-sm text-muted-foreground">
                          Требовать сложные пароли (не менее 8 символов, буквы, цифры и специальные символы)
                        </p>
                      </div>
                      <Switch id="password-policy" defaultChecked />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <Label htmlFor="ip-restrictions">IP ограничения</Label>
                    <Input id="ip-restrictions" placeholder="Введите разрешенные IP-адреса через запятую" />
                    <p className="text-xs text-muted-foreground">
                      Оставьте поле пустым, чтобы разрешить доступ со всех IP-адресов
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>Настройки пользователей</CardTitle>
                  <CardDescription>
                    Управление параметрами пользователей системы
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="allow-registration">Разрешить регистрацию</Label>
                        <p className="text-sm text-muted-foreground">
                          Пользователи могут самостоятельно регистрироваться в системе
                        </p>
                      </div>
                      <Switch id="allow-registration" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email-verification">Подтверждение email</Label>
                        <p className="text-sm text-muted-foreground">
                          Требовать подтверждение email при регистрации
                        </p>
                      </div>
                      <Switch id="email-verification" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="admin-approval">Подтверждение администратором</Label>
                        <p className="text-sm text-muted-foreground">
                          Требовать одобрение новых пользователей администратором
                        </p>
                      </div>
                      <Switch id="admin-approval" />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <Label htmlFor="default-role">Роль по умолчанию</Label>
                    <Input id="default-role" defaultValue="Школа" />
                    <p className="text-xs text-muted-foreground">
                      Роль, которая будет назначена новым пользователям при регистрации
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Настройки уведомлений</CardTitle>
                  <CardDescription>
                    Управление системой уведомлений
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <h3 className="text-lg font-medium">Системные уведомления</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="new-user">Новые пользователи</Label>
                        <p className="text-sm text-muted-foreground">
                          Уведомлять о регистрации новых пользователей
                        </p>
                      </div>
                      <Switch id="new-user" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="data-import">Импорт данных</Label>
                        <p className="text-sm text-muted-foreground">
                          Уведомлять о завершении импорта данных
                        </p>
                      </div>
                      <Switch id="data-import" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="data-export">Экспорт данных</Label>
                        <p className="text-sm text-muted-foreground">
                          Уведомлять о завершении экспорта данных
                        </p>
                      </div>
                      <Switch id="data-export" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="system-backup">Резервное копирование</Label>
                        <p className="text-sm text-muted-foreground">
                          Уведомлять о завершении резервного копирования
                        </p>
                      </div>
                      <Switch id="system-backup" defaultChecked />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="backup">
              <Card>
                <CardHeader>
                  <CardTitle>Резервное копирование</CardTitle>
                  <CardDescription>
                    Настройки резервного копирования данных
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="auto-backup">Автоматическое резервное копирование</Label>
                        <p className="text-sm text-muted-foreground">
                          Выполнять резервное копирование базы данных автоматически
                        </p>
                      </div>
                      <Switch id="auto-backup" defaultChecked />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="backup-frequency">Частота резервного копирования</Label>
                    <Input id="backup-frequency" defaultValue="7" />
                    <p className="text-xs text-muted-foreground">
                      Количество дней между автоматическим резервным копированием
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="backup-retention">Срок хранения резервных копий</Label>
                    <Input id="backup-retention" defaultValue="30" />
                    <p className="text-xs text-muted-foreground">
                      Количество дней, в течение которых хранятся резервные копии
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-medium">Ручное резервное копирование</h3>
                      <p className="text-sm text-muted-foreground">
                        Создать резервную копию базы данных прямо сейчас
                      </p>
                    </div>
                    <Button variant="secondary">
                      Создать резервную копию
                    </Button>
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/50 rounded-b-lg text-sm text-muted-foreground">
                  Последнее резервное копирование: 02.05.2025, 03:15
                </CardFooter>
              </Card>
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
