
import React from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { LogIn, FilePlus, Trash2, FileEdit } from "lucide-react";

interface Activity {
  id: number;
  action: string;
  user: string;
  timestamp: string;
  type: "login" | "create" | "delete" | "edit";
}

const activityData: Activity[] = [
  {
    id: 1,
    action: "Вход в систему",
    user: "Администратор",
    timestamp: "15:30:12 02.05.2025",
    type: "login",
  },
  {
    id: 2,
    action: "Создание профиля участника",
    user: "Школа №5",
    timestamp: "14:25:00 02.05.2025",
    type: "create",
  },
  {
    id: 3,
    action: "Редактирование мероприятия",
    user: "Эрудит",
    timestamp: "11:18:33 02.05.2025",
    type: "edit",
  },
  {
    id: 4,
    action: "Удаление участника",
    user: "Муниципалитет",
    timestamp: "10:05:57 02.05.2025",
    type: "delete",
  },
];

const getActivityIcon = (type: Activity["type"]) => {
  switch (type) {
    case "login":
      return <LogIn className="h-5 w-5 text-blue-600" />;
    case "create":
      return <FilePlus className="h-5 w-5 text-green-600" />;
    case "delete":
      return <Trash2 className="h-5 w-5 text-red-600" />;
    case "edit":
      return <FileEdit className="h-5 w-5 text-amber-600" />;
  }
};

const RecentActivityList: React.FC = () => {
  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle>Недавняя активность</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activityData.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-4 p-2 rounded-md hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{activity.action}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {activity.user} • {activity.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivityList;
