
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
import { Shield, ShieldCheck, Trash, PenSquare, UserCog, FileCog, ChevronDown, ChevronUp } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface Permission {
  id: string;
  name: string;
  description: string;
  category: "participants" | "mentors" | "schools" | "events" | "system";
  admin: boolean;
  erudit: boolean;
  municipality: boolean;
  school: boolean;
}

interface PermissionCategory {
  id: string;
  name: string;
  icon: React.ElementType;
  permissions: Permission[];
}

const RolePermissionsManager: React.FC = () => {
  const { toast } = useToast();
  
  const [permissionCategories, setPermissionCategories] = useState<PermissionCategory[]>([
    {
      id: "participants",
      name: "Управление участниками",
      icon: UserCog,
      permissions: [
        {
          id: "view_participants",
          name: "Просмотр участников",
          description: "Доступ к просмотру списка участников и их данных",
          category: "participants",
          admin: true,
          erudit: true,
          municipality: true,
          school: true,
        },
        {
          id: "edit_participants",
          name: "Редактирование участников",
          description: "Возможность изменять данные участников",
          category: "participants",
          admin: true,
          erudit: true,
          municipality: true,
          school: false,
        },
        {
          id: "delete_participants",
          name: "Удаление участников",
          description: "Возможность удалять участников из системы",
          category: "participants",
          admin: true,
          erudit: false,
          municipality: false,
          school: false,
        }
      ]
    },
    {
      id: "mentors",
      name: "Управление наставниками",
      icon: Shield,
      permissions: [
        {
          id: "view_mentors",
          name: "Просмотр наставников",
          description: "Доступ к просмотру списка наставников",
          category: "mentors",
          admin: true,
          erudit: true,
          municipality: true,
          school: false,
        },
        {
          id: "edit_mentors",
          name: "Редактирование наставников",
          description: "Возможность изменять данные наставников",
          category: "mentors",
          admin: true,
          erudit: true,
          municipality: false,
          school: false,
        }
      ]
    },
    {
      id: "schools",
      name: "Управление школами",
      icon: PenSquare,
      permissions: [
        {
          id: "view_schools",
          name: "Просмотр школ",
          description: "Доступ к просмотру списка школ",
          category: "schools",
          admin: true,
          erudit: true,
          municipality: true,
          school: false,
        },
        {
          id: "edit_schools",
          name: "Редактирование школ",
          description: "Возможность изменять данные школ",
          category: "schools",
          admin: true,
          erudit: true,
          municipality: false,
          school: false,
        }
      ]
    },
    {
      id: "events",
      name: "Управление мероприятиями",
      icon: FileCog,
      permissions: [
        {
          id: "manage_events",
          name: "Управление мероприятиями",
          description: "Создание, редактирование и удаление мероприятий",
          category: "events",
          admin: true,
          erudit: true,
          municipality: false,
          school: false,
        },
        {
          id: "view_all_events",
          name: "Просмотр всех мероприятий",
          description: "Доступ к просмотру мероприятий всех организаций",
          category: "events",
          admin: true,
          erudit: true,
          municipality: true,
          school: true,
        }
      ]
    },
    {
      id: "system",
      name: "Системные функции",
      icon: Trash,
      permissions: [
        {
          id: "export_data",
          name: "Экспорт данных",
          description: "Возможность выгружать данные из системы",
          category: "system",
          admin: true,
          erudit: true,
          municipality: true,
          school: false,
        },
        {
          id: "reports",
          name: "Доступ к отчетам",
          description: "Просмотр аналитических отчетов",
          category: "system",
          admin: true,
          erudit: true,
          municipality: false,
          school: false,
        },
        {
          id: "approve_accounts",
          name: "Подтверждение аккаунтов",
          description: "Возможность подтверждать новые аккаунты",
          category: "system",
          admin: true,
          erudit: false,
          municipality: false,
          school: false,
        },
      ]
    }
  ]);
  
  const [openCategories, setOpenCategories] = useState<string[]>([
    "participants", "mentors", "schools", "events", "system"
  ]);

  const toggleCategory = (categoryId: string) => {
    setOpenCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const togglePermission = (categoryId: string, permissionId: string, role: keyof Omit<Permission, "id" | "name" | "description" | "category">) => {
    setPermissionCategories(categories => 
      categories.map(category => 
        category.id === categoryId
          ? { 
              ...category, 
              permissions: category.permissions.map(permission => 
                permission.id === permissionId
                  ? { ...permission, [role]: !permission[role] }
                  : permission
              )
            }
          : category
      )
    );
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
        <div className="space-y-4">
          {permissionCategories.map((category) => (
            <Collapsible key={category.id} open={openCategories.includes(category.id)}>
              <div className="rounded-md border">
                <CollapsibleTrigger asChild>
                  <div 
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-t-md cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => toggleCategory(category.id)}
                  >
                    <div className="flex items-center space-x-2">
                      <category.icon className="h-5 w-5 text-blue-600" />
                      <span className="font-medium">{category.name}</span>
                    </div>
                    {openCategories.includes(category.id) ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-white">
                        <TableHead className="w-[300px]">Право доступа</TableHead>
                        <TableHead className="text-center">Админ</TableHead>
                        <TableHead className="text-center">Эрудит</TableHead>
                        <TableHead className="text-center">Муниципалитет</TableHead>
                        <TableHead className="text-center">Школа</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {category.permissions.map((permission) => (
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
                              onCheckedChange={() => togglePermission(category.id, permission.id, "admin")}
                            />
                          </TableCell>
                          <TableCell className="text-center">
                            <Switch 
                              checked={permission.erudit} 
                              onCheckedChange={() => togglePermission(category.id, permission.id, "erudit")}
                            />
                          </TableCell>
                          <TableCell className="text-center">
                            <Switch 
                              checked={permission.municipality} 
                              onCheckedChange={() => togglePermission(category.id, permission.id, "municipality")}
                            />
                          </TableCell>
                          <TableCell className="text-center">
                            <Switch 
                              checked={permission.school} 
                              onCheckedChange={() => togglePermission(category.id, permission.id, "school")}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CollapsibleContent>
              </div>
            </Collapsible>
          ))}
        </div>
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
