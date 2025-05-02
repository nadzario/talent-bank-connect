
import React from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

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
      return <span className="bg-blue-100 text-blue-600 p-1 rounded">Вход</span>;
    case "create":
      return <span className="bg-green-100 text-green-600 p-1 rounded">Создание</span>;
    case "delete":
      return <span className="bg-red-100 text-red-600 p-1 rounded">Удаление</span>;
    case "edit":
      return <span className="bg-amber-100 text-amber-600 p-1 rounded">Изменение</span>;
  }
};

const RecentActivityList: React.FC = () => {
  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle>Недавняя активность</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {activityData.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-4">
              <div className="w-20">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1">
                <p className="font-medium">{activity.action}</p>
                <p className="text-sm text-muted-foreground">
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
