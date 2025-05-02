
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Shield, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Permission {
  id: string;
  name: string;
  description: string;
  roles: {
    [role: string]: boolean;
  };
}

const RolePermissionsManager: React.FC = () => {
  const { toast } = useToast();
  
  const [permissions, setPermissions] = useState<Permission[]>([
    {
      id: "view_participants",
      name: "Просмотр участников",
      description: "Доступ к просмотру списка всех участников проекта",
      roles: {
        admin: true,
        erudit: true,
        municipality: true,
        school: true,
      }
    },
    {
      id: "edit_participants",
      name: "Редактирование участников",
      description: "Возможность редактировать данные участников",
      roles: {
        admin: true,
        erudit: true,
        municipality: false,
        school: false,
      }
    },
    {
      id: "view_mentors",
      name: "Просмотр наставников",
      description: "Доступ к просмотру списка наставников",
      roles: {
        admin: true,
        erudit: true,
        municipality: true,
        school: false,
      }
    },
    {
      id: "edit_mentors",
      name: "Редактирование наставников",
      description: "Возможность редактировать данные наставников",
      roles: {
        admin: true,
        erudit: true,
        municipality: false,
        school: false,
      }
    },
    {
      id: "view_schools",
      name: "Просмотр школ",
      description: "Доступ к просмотру списка школ",
      roles: {
        admin: true,
        erudit: true,
        municipality: true,
        school: true,
      }
    },
    {
      id: "edit_schools",
      name: "Редактирование школ",
      description: "Возможность редактировать данные школ",
      roles: {
        admin: true,
        erudit: true,
        municipality: false,
        school: false,
      }
    },
    {
      id: "view_municipalities",
      name: "Просмотр муниципалитетов",
      description: "Доступ к просмотру списка муниципалитетов",
      roles: {
        admin: true,
        erudit: true,
        municipality: false,
        school: false,
      }
    },
    {
      id: "edit_municipalities",
      name: "Редактирование муниципалитетов",
      description: "Возможность редактировать данные муниципалитетов",
      roles: {
        admin: true,
        erudit: false,
        municipality: false,
        school: false,
      }
    },
    {
      id: "view_events",
      name: "Просмотр мероприятий",
      description: "Доступ к просмотру мероприятий",
      roles: {
        admin: true,
        erudit: true,
        municipality: true,
        school: true,
      }
    },
    {
      id: "edit_events",
      name: "Редактирование мероприятий",
      description: "Возможность создавать и редактировать мероприятия",
      roles: {
        admin: true,
        erudit: true,
        municipality: false,
        school: false,
      }
    },
    {
      id: "view_reports",
      name: "Просмотр отчетов",
      description: "Доступ к просмотру аналитических отчетов",
      roles: {
        admin: true,
        erudit: true,
        municipality: true,
        school: false,
      }
    },
    {
      id: "manage_system",
      name: "Управление системой",
      description: "Полный доступ к настройкам системы",
      roles: {
        admin: true,
        erudit: false,
        municipality: false,
        school: false,
      }
    },
  ]);

  const togglePermission = (permissionId: string, role: string) => {
    setPermissions(prevPermissions => 
      prevPermissions.map(permission => 
        permission.id === permissionId
          ? { 
              ...permission, 
              roles: { 
                ...permission.roles, 
                [role]: !permission.roles[role] 
              } 
            }
          : permission
      )
    );
  };

  const handleSavePermissions = () => {
    // В реальном приложении здесь был бы API-запрос для сохранения прав доступа
    toast({
      title: "Права доступа обновлены",
      description: "Изменения в правах доступа успешно сохранены"
    });
  };

  const roles = [
    { id: "admin", name: "Администратор" },
    { id: "erudit", name: "Эрудит" },
    { id: "municipality", name: "Муниципалитет" },
    { id: "school", name: "Школа" }
  ];

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-bank-blue" />
            <CardTitle>Управление правами доступа</CardTitle>
          </div>
          <Button onClick={handleSavePermissions}>
            <Save className="h-4 w-4 mr-2" />
            Сохранить изменения
          </Button>
        </div>
        <CardDescription>
          Настройте, какие разделы и функции системы будут доступны для каждой роли
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 w-1/3">Разрешение</th>
                {roles.map(role => (
                  <th key={role.id} className="text-center py-3 px-4">{role.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {permissions.map(permission => (
                <tr key={permission.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="font-medium">{permission.name}</div>
                    <div className="text-sm text-muted-foreground">{permission.description}</div>
                  </td>
                  {roles.map(role => (
                    <td key={`${permission.id}-${role.id}`} className="text-center py-3 px-4">
                      <Checkbox 
                        checked={permission.roles[role.id]} 
                        onCheckedChange={() => togglePermission(permission.id, role.id)}
                        id={`${permission.id}-${role.id}`}
                        disabled={role.id === "admin" && permission.id === "manage_system"} // Администратор всегда имеет полный доступ
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-6">
          <h3 className="text-sm font-medium mb-2">Примечание:</h3>
          <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
            <li>Администратор системы всегда имеет доступ к управлению системой</li>
            <li>Изменения в правах доступа вступают в силу сразу после сохранения</li>
            <li>Пользователи должны перелогиниться для применения новых прав доступа</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default RolePermissionsManager;
