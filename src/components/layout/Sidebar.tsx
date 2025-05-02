
import React from "react";
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
  ChevronRight
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
}

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  isOpen: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon: Icon, label, isOpen }) => {
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
  return (
    <div className="mb-6">
      {isOpen && (
        <div className="px-4 py-2 text-xs font-semibold uppercase text-gray-500">
          {title}
        </div>
      )}
      <div className="space-y-1">{children}</div>
    </div>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  return (
    <aside
      className={cn(
        "bg-white border-r border-gray-200 h-screen transition-all duration-300 fixed top-0 left-0 z-40 pt-16",
        isOpen ? "w-64" : "w-16"
      )}
    >
      <div className="flex flex-col p-4 h-full overflow-y-auto">
        <NavSection title="Главное" isOpen={isOpen}>
          <NavItem to="/" icon={Home} label="Главная" isOpen={isOpen} />
          <NavItem to="/dashboard" icon={Layout} label="Дашборд" isOpen={isOpen} />
        </NavSection>

        <NavSection title="Пользователи" isOpen={isOpen}>
          <NavItem to="/participants" icon={Users} label="Участники" isOpen={isOpen} />
          <NavItem to="/mentors" icon={UserCheck} label="Наставники" isOpen={isOpen} />
          <NavItem to="/users" icon={User} label="Пользователи" isOpen={isOpen} />
        </NavSection>

        <NavSection title="Организация" isOpen={isOpen}>
          <NavItem to="/municipalities" icon={Database} label="Муниципалитеты" isOpen={isOpen} />
          <NavItem to="/schools" icon={School} label="Школы" isOpen={isOpen} />
        </NavSection>

        <NavSection title="События" isOpen={isOpen}>
          <NavItem to="/events" icon={Calendar} label="Мероприятия" isOpen={isOpen} />
        </NavSection>
      </div>
    </aside>
  );
};

export default Sidebar;
