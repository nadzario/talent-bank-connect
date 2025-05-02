
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, Users, Bell, Shield } from "lucide-react";
import RolePermissionsManager from "@/components/settings/RolePermissionsManager";
import PendingAccountsManager from "@/components/settings/PendingAccountsManager";

const SettingsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Settings className="h-6 w-6 text-bank-blue mr-2" />
          <h1 className="text-2xl font-bold">Настройки системы</h1>
        </div>
      </div>
      
      <Tabs defaultValue="general">
        <TabsList className="mb-6">
          <TabsTrigger value="general" className="flex items-center">
            <Settings className="h-4 w-4 mr-2" />
            Общие настройки
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center">
            <Users className="h-4 w-4 mr-2" />
            Управление пользователями
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center">
            <Bell className="h-4 w-4 mr-2" />
            Уведомления
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center">
            <Shield className="h-4 w-4 mr-2" />
            Безопасность
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Общие настройки системы</CardTitle>
              <CardDescription>
                Управление основными настройками системы "Банк одаренных детей"
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Здесь будут располагаться общие настройки системы, такие как настройки интерфейса, региональные настройки и т.д.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users">
          <RolePermissionsManager />
          <PendingAccountsManager />
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Настройки уведомлений</CardTitle>
              <CardDescription>
                Управление системой уведомлений и оповещений
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Настройка параметров уведомлений и способов их доставки.
              </p>
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
            <CardContent>
              <p className="text-muted-foreground">
                Настройка политик безопасности, паролей, двухфакторной аутентификации и журналов доступа.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
