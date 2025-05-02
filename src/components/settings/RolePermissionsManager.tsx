
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Shield, ShieldCheck } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface Permission {
  id: string;
  name: string;
  description: string;
  admin: boolean;
  erudit: boolean;
  municipality: boolean;
  school: boolean;
}

const RolePermissionsManager: React.FC = () => {
  const { toast } = useToast();
  const [permissions, setPermissions] = useState<Permission[]>([
    {
      id: "view_participants",
      name: "Просмотр участников",
      description: "Доступ к просмотру списка участников и их данных",
      admin: true,
      erudit: true,
      municipality: true,
      school: true,
    },
    {
      id: "edit_participants",
      name: "Редактирование участников",
      description: "Возможность изменять данные участников",
      admin: true,
      erudit: true,
      municipality: true,
      school: false,
    },
    {
      id: "view_mentors",
      name: "Просмотр наставников",
      description: "Доступ к просмотру списка наставников",
      admin: true,
      erudit: true,
      municipality: true,
      school: false,
    },
    {
      id: "manage_events",
      name: "Управление мероприятиями",
      description: "Создание, редактирование и удаление мероприятий",
      admin: true,
      erudit: true,
      municipality: false,
      school: false,
    },
    {
      id: "export_data",
      name: "Экспорт данных",
      description: "Возможность выгружать данные из системы",
      admin: true,
      erudit: true,
      municipality: true,
      school: false,
    },
    {
      id: "reports",
      name: "Доступ к отчетам",
      description: "Просмотр аналитических отчетов",
      admin: true,
      erudit: true,
      municipality: false,
      school: false,
    },
    {
      id: "approve_accounts",
      name: "Подтверждение аккаунтов",
      description: "Возможность подтверждать новые аккаунты",
      admin: true,
      erudit: false,
      municipality: false,
      school: false,
    },
  ]);

  const togglePermission = (id: string, role: keyof Omit<Permission, "id" | "name" | "description">) => {
    setPermissions(permissions.map(permission => 
      permission.id === id 
        ? { ...permission, [role]: !permission[role] }
        : permission
    ));
  };

  const savePermissions = () => {
    toast({
      title: "Права доступа обновлены",
      description: "Изменения прав доступа для ролей были успешно сохранены",
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <ShieldCheck className="h-5 w-5 text-blue-600" />
          <CardTitle>Управление правами доступа</CardTitle>
        </div>
        <CardDescription>
          Настройка прав доступа для различных ролей пользователей
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Право доступа</TableHead>
              <TableHead className="text-center">Админ</TableHead>
              <TableHead className="text-center">Эрудит</TableHead>
              <TableHead className="text-center">Муниципалитет</TableHead>
              <TableHead className="text-center">Школа</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {permissions.map((permission) => (
              <TableRow key={permission.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{permission.name}</p>
                    <p className="text-xs text-muted-foreground">{permission.description}</p>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <Switch 
                    checked={permission.admin} 
                    disabled={permission.id === "approve_accounts"} 
                    onCheckedChange={() => togglePermission(permission.id, "admin")}
                  />
                </TableCell>
                <TableCell className="text-center">
                  <Switch 
                    checked={permission.erudit} 
                    onCheckedChange={() => togglePermission(permission.id, "erudit")}
                  />
                </TableCell>
                <TableCell className="text-center">
                  <Switch 
                    checked={permission.municipality} 
                    onCheckedChange={() => togglePermission(permission.id, "municipality")}
                  />
                </TableCell>
                <TableCell className="text-center">
                  <Switch 
                    checked={permission.school} 
                    onCheckedChange={() => togglePermission(permission.id, "school")}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={savePermissions}>
          Сохранить изменения
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RolePermissionsManager;
