import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { 
  Home, 
  School, 
  User, 
  Database,
  Medal,
  FileText,
  Users,
  Settings,
  Bell,
  ChevronRight,
  BookOpen,
  BarChart,
  Upload,
  Download,
  Lightbulb,
  UserCog
} from "lucide-react";
import { useNotifications } from "@/hooks/use-notifications";

interface NavigationItem {
  name: string;
  href?: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  items?: { name: string; href: string; icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; }[];
}

const renderIcon = (
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>,
  className?: string
) => {
  return <icon className={cn("h-4 w-4", className)} />;
};

const renderNavigationItems = (items: NavigationItem[], isOpen: boolean) => {
  return items.map((item) => {
    if (item.items) {
      return (
        <details key={item.name}>
          <summary className="flex items-center justify-between p-2 rounded-md hover:bg-gray-200">
            <div className="flex items-center">
              {renderIcon(item.icon)}
              {isOpen && <span className="ml-2">{item.name}</span>}
            </div>
            {isOpen && <ChevronRight className="h-4 w-4 shrink-0 ml-1 transition-transform duration-200 [&[open]]:rotate-90" />}
          </summary>
          <div className="mt-2 space-y-1">
            {item.items.map((subItem) => (
              <NavLink
                key={subItem.name}
                to={subItem.href}
                className={({ isActive }) =>
                  cn(
                    "flex items-center p-2 rounded-md hover:bg-gray-200",
                    isActive ? "bg-gray-200 font-medium" : ""
                  )
                }
              >
                {isOpen && <span className="ml-7">{subItem.name}</span>}
              </NavLink>
            ))}
          </div>
        </details>
      );
    } else {
      return (
        <NavLink
          key={item.name}
          to={item.href || ""}
          className={({ isActive }) =>
            cn(
              "flex items-center p-2 rounded-md hover:bg-gray-200",
              isActive ? "bg-gray-200 font-medium" : ""
            )
          }
        >
          {renderIcon(item.icon)}
          {isOpen && <span className="ml-2">{item.name}</span>}
        </NavLink>
      );
    }
  });
};

// Updated navigation items array to include Notifications
const navigationItems: NavigationItem[] = [
  { name: "Дашборд", href: "/", icon: Home },
  { name: "Участники", href: "/participants", icon: User },
  { name: "Наставники", href: "/mentors", icon: Users },
  { name: "Школы", href: "/schools", icon: School },
  { name: "Муниципалитеты", href: "/municipalities", icon: Database },
  { name: "Классы", href: "/classes", icon: BookOpen },
  {
    name: "Мероприятия",
    icon: Medal,
    items: [
      { name: "Список", href: "/events", icon: ChevronRight },
      { name: "Проекты", href: "/projects", icon: ChevronRight },
      { name: "Олимпиады", href: "/olympiads", icon: ChevronRight },
    ],
  },
  {
    name: "Аналитика",
    icon: BarChart,
    items: [
      { name: "Общая", href: "/analytics", icon: ChevronRight },
      { name: "Отчеты", href: "/reports", icon: FileText }
    ],
  },
  {
    name: "Данные",
    icon: Database,
    items: [
      { name: "Импорт", href: "/import", icon: Upload },
      { name: "Экспорт", href: "/export", icon: Download },
    ],
  },
  { name: "Уведомления", href: "/notifications", icon: Bell },
  { name: "Настройки", href: "/settings", icon: Settings },
];

const SidebarContent: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  return (
    <div className="flex flex-col space-y-2">
      {renderNavigationItems(navigationItems, isOpen)}
    </div>
  );
};

// Updated with notifications count badge
const NotificationsButton: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  const { toast } = useToast();
  const { notifications, unreadCount } = useNotifications();

  const handleNotificationsClick = () => {
    toast({
      title: `${unreadCount} непрочитанных уведомлений`,
      description: unreadCount > 0 
        ? "У вас есть непрочитанные уведомления" 
        : "У вас нет новых уведомлений",
      duration: 3000,
    });
  };

  // Return null if notifications are hidden in sidebar
  if (!isOpen) return null;

  return (
    <button
      className="flex items-center justify-between w-full p-2 mt-4 text-sm rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
      onClick={handleNotificationsClick}
    >
      <div className="flex items-center">
        <Bell className="h-4 w-4 mr-2" />
        <span>Уведомления</span>
      </div>
      {unreadCount > 0 && (
        <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
          {unreadCount}
        </span>
      )}
    </button>
  );
};

const Sidebar: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-50 flex flex-col h-screen bg-white border-r border-gray-200 w-64 transition-transform duration-300",
        isOpen ? "translate-x-0" : "-translate-x-full",
        "md:translate-x-0 md:sticky"
      )}
    >
      <div className="flex items-center justify-center h-16 border-b border-gray-200">
        <span className="text-lg font-semibold">Talent Database</span>
      </div>
      <div className="flex-grow p-4 overflow-y-auto">
        <SidebarContent isOpen={isOpen} />
      </div>
    </aside>
  );
};

export default Sidebar;
