
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Database, 
  Home, 
  School, 
  User, 
  Users, 
  Calendar, 
  UserCheck, 
  Layout,
  ChevronRight,
  FileText,
  Award,
  Upload,
  Download,
  Settings,
  BarChart,
  Book,
  Info
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
}

const NavItem: React.FC<NavItemProps> = ({ to, icon: Icon, label, isOpen, requiredRoles = [] }) => {
  // This would be fetched from a user context in a real app
  const userRole = localStorage.getItem("userRole") || "guest";
  
  // Filter items based on role
  if (requiredRoles.length > 0 && !requiredRoles.includes(userRole)) {
    return null;
  }
  
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center py-2 px-4 rounded-md transition-colors",
          isActive ? "bg-bank-light-blue text-bank-blue font-medium" : "hover:bg-gray-100",
          !isOpen && "justify-center px-2"
        )
      }
    >
      <Icon className={cn("h-5 w-5", isOpen && "mr-3")} />
      {isOpen && <span>{label}</span>}
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
    <div className="mb-6">
      {isOpen && (
        <div className="px-4 py-2 text-xs font-semibold uppercase text-gray-500">
          {title}
        </div>
      )}
      <div className="space-y-1">{filteredChildren}</div>
    </div>
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
      <div className="flex flex-col p-4 h-full overflow-y-auto">
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
          <NavItem 
            to="/users" 
            icon={User} 
            label="Пользователи" 
            isOpen={isOpen}
            requiredRoles={["admin"]} 
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
            icon={Info} 
            label="Проекты" 
            isOpen={isOpen}
            requiredRoles={["admin", "erudit", "municipality", "school"]}
          />
        </NavSection>
        
        <NavSection title="Данные" isOpen={isOpen}>
          <NavItem 
            to="/reports" 
            icon={FileText} 
            label="Отчеты" 
            isOpen={isOpen}
            requiredRoles={["admin", "erudit"]}
          />
          <NavItem 
            to="/analytics" 
            icon={BarChart} 
            label="Аналитика" 
            isOpen={isOpen}
            requiredRoles={["admin", "erudit"]}
          />
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
          />
        </NavSection>
      </div>
    </aside>
  );
};

export default Sidebar;
