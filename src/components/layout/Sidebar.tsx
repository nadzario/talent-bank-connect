
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Home, 
  School, 
  Users, 
  Calendar, 
  UserCheck, 
  Layout,
  FileText,
  Award,
  Upload,
  Download,
  Settings,
  BarChart,
  Book,
  Database,
  Trophy,
  HelpCircle,
  Bell,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
}

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  isOpen: boolean;
  requiredRoles?: string[];
  badge?: number;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon: Icon, label, isOpen, requiredRoles = [], badge }) => {
  // This would be fetched from a user context in a real app
  const userRole = localStorage.getItem("userRole") || "admin";
  
  // Filter items based on role
  if (requiredRoles.length > 0 && !requiredRoles.includes(userRole)) {
    return null;
  }
  
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center py-2 px-4 rounded-md transition-colors relative",
          isActive ? "bg-bank-light-blue text-bank-blue font-medium" : "hover:bg-gray-100",
          !isOpen && "justify-center px-2"
        )
      }
    >
      <Icon className={cn("h-5 w-5 flex-shrink-0", isOpen && "mr-3")} />
      {isOpen && <span className="truncate">{label}</span>}
      
      {badge !== undefined && badge > 0 && (
        <span className={cn(
          "bg-red-500 text-white text-xs rounded-full flex items-center justify-center absolute",
          isOpen ? "right-2 top-2 w-5 h-5" : "-right-1 -top-1 w-4 h-4"
        )}>
          {badge > 9 ? "9+" : badge}
        </span>
      )}
    </NavLink>
  );
};

const NavSection: React.FC<{
  title: string;
  isOpen: boolean;
  children: React.ReactNode;
}> = ({ title, children, isOpen }) => {
  // Filter out null children (filtered by role)
  const filteredChildren = React.Children.toArray(children).filter(child => child !== null);
  
  // Don't render section if all children were filtered out
  if (filteredChildren.length === 0) {
    return null;
  }
  
  return (
    <div className="mb-4">
      {isOpen && (
        <div className="px-4 py-2 text-xs font-semibold uppercase text-gray-500">
          {title}
        </div>
      )}
      <div className="space-y-1">{filteredChildren}</div>
    </div>
  );
};

const SupportButton: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  const handleSupportClick = () => {
    // Здесь могла бы быть логика открытия чата поддержки
    alert("Открытие чата поддержки");
  };

  return (
    <button 
      onClick={handleSupportClick}
      className={cn(
        "flex items-center py-2 px-4 rounded-md transition-colors bg-bank-light-blue text-bank-blue font-medium",
        !isOpen && "justify-center px-2"
      )}
    >
      <HelpCircle className={cn("h-5 w-5 flex-shrink-0", isOpen && "mr-3")} />
      {isOpen && <span className="truncate">Поддержка</span>}
    </button>
  );
};

const NotificationsButton: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  const [hasNotifications] = useState(true);
  
  const handleNotificationsClick = () => {
    // Логика открытия уведомлений
    alert("Открытие панели уведомлений");
  };

  return (
    <button 
      onClick={handleNotificationsClick}
      className={cn(
        "flex items-center py-2 px-4 rounded-md transition-colors hover:bg-gray-100 relative",
        !isOpen && "justify-center px-2"
      )}
    >
      <Bell className={cn("h-5 w-5 flex-shrink-0", isOpen && "mr-3")} />
      {isOpen && <span className="truncate">Уведомления</span>}
      
      {hasNotifications && (
        <span className={cn(
          "bg-red-500 text-white text-xs rounded-full flex items-center justify-center absolute",
          isOpen ? "right-2 top-2 w-5 h-5" : "-right-1 -top-1 w-4 h-4"
        )}>
          3
        </span>
      )}
    </button>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    // Avoid hydration issues
    return null;
  }
  
  return (
    <aside
      className={cn(
        "bg-white border-r border-gray-200 h-screen transition-all duration-300 fixed top-0 left-0 z-40 pt-16",
        isOpen ? "w-64" : "w-16"
      )}
    >
      <div className="flex flex-col p-3 h-full overflow-y-auto scrollbar-thin">
        <NavSection title="Главное" isOpen={isOpen}>
          <NavItem to="/dashboard" icon={Layout} label="Дашборд" isOpen={isOpen} />
        </NavSection>

        <NavSection title="Пользователи" isOpen={isOpen}>
          <NavItem 
            to="/participants" 
            icon={Users} 
            label="Участники" 
            isOpen={isOpen} 
            requiredRoles={["admin", "erudit", "school", "municipality"]}
          />
          <NavItem 
            to="/mentors" 
            icon={UserCheck} 
            label="Наставники" 
            isOpen={isOpen}
            requiredRoles={["admin", "erudit", "municipality"]} 
          />
        </NavSection>

        <NavSection title="Организация" isOpen={isOpen}>
          <NavItem 
            to="/municipalities" 
            icon={Database} 
            label="Муниципалитеты" 
            isOpen={isOpen}
            requiredRoles={["admin", "erudit"]} 
          />
          <NavItem 
            to="/schools" 
            icon={School} 
            label="Школы" 
            isOpen={isOpen}
            requiredRoles={["admin", "erudit", "municipality"]}
          />
          <NavItem 
            to="/classes" 
            icon={Book} 
            label="Классы" 
            isOpen={isOpen}
            requiredRoles={["admin", "erudit", "municipality", "school"]}
          />
        </NavSection>

        <NavSection title="Мероприятия" isOpen={isOpen}>
          <NavItem 
            to="/events" 
            icon={Calendar} 
            label="Все мероприятия" 
            isOpen={isOpen}
            requiredRoles={["admin", "erudit", "municipality", "school"]} 
          />
          <NavItem 
            to="/olympiads" 
            icon={Award} 
            label="Олимпиады" 
            isOpen={isOpen}
            requiredRoles={["admin", "erudit", "municipality", "school"]}
          />
          <NavItem 
            to="/projects" 
            icon={Trophy} 
            label="Конкурсы" 
            isOpen={isOpen}
            requiredRoles={["admin", "erudit", "municipality", "school"]}
          />
        </NavSection>
        
        <NavSection title="Аналитика" isOpen={isOpen}>
          <NavItem 
            to="/analytics" 
            icon={BarChart} 
            label="Аналитика" 
            isOpen={isOpen}
            requiredRoles={["admin", "erudit", "municipality"]}
          />
          <NavItem 
            to="/reports" 
            icon={FileText} 
            label="Отчеты" 
            isOpen={isOpen}
            requiredRoles={["admin", "erudit"]}
          />
        </NavSection>
        
        <NavSection title="Данные" isOpen={isOpen}>
          <NavItem 
            to="/import" 
            icon={Upload} 
            label="Импорт данных" 
            isOpen={isOpen}
            requiredRoles={["admin", "erudit", "municipality", "school"]}
          />
          <NavItem 
            to="/export" 
            icon={Download} 
            label="Экспорт данных" 
            isOpen={isOpen}
            requiredRoles={["admin", "erudit", "municipality"]}
          />
        </NavSection>
        
        <NavSection title="Система" isOpen={isOpen}>
          <NavItem 
            to="/settings" 
            icon={Settings} 
            label="Настройки" 
            isOpen={isOpen}
            requiredRoles={["admin"]}
            badge={3}
          />
        </NavSection>
        
        <div className="mt-auto space-y-2 pt-4 border-t border-gray-200">
          <NotificationsButton isOpen={isOpen} />
          <SupportButton isOpen={isOpen} />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
