
import React from "react";
import { Bell, Menu, User, LogOut, Shield, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  
  // This would be fetched from a user context/auth context in a real app
  const userRole = localStorage.getItem("userRole") || "guest";
  const username = localStorage.getItem("username") || "Гость";
  
  // Get initials for avatar
  const getInitials = (name: string) => {
    return name.slice(0, 2).toUpperCase();
  };
  
  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("username");
    navigate("/login");
  };
  
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          className="mr-2" 
          onClick={toggleSidebar}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex items-center">
          <Shield className="h-6 w-6 text-bank-blue mr-2" />
          <div className="text-xl font-bold text-bank-blue">Банк Одаренных Детей</div>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="flex items-center justify-between px-4 py-2">
              <span className="font-medium">Уведомления</span>
              <Button variant="ghost" size="sm">
                Отметить все как прочитанные
              </Button>
            </div>
            <DropdownMenuSeparator />
            <div className="max-h-80 overflow-y-auto">
              <DropdownMenuItem className="cursor-pointer p-4">
                <div className="flex flex-col">
                  <span className="font-bold">Уведомление системы</span>
                  <span className="text-sm text-gray-500">Добро пожаловать в систему Банка Одаренных Детей</span>
                  <span className="text-xs text-gray-400 mt-2">Сегодня, 10:30</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer p-4">
                <div className="flex flex-col">
                  <span className="font-bold">Новые данные</span>
                  <span className="text-sm text-gray-500">Добавлены новые участники из Школы №8</span>
                  <span className="text-xs text-gray-400 mt-2">Вчера, 15:45</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer p-4">
                <div className="flex flex-col">
                  <span className="font-bold">Отчет готов</span>
                  <span className="text-sm text-gray-500">Отчет по олимпиаде доступен для скачивания</span>
                  <span className="text-xs text-gray-400 mt-2">02.05.2025, 09:15</span>
                </div>
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator />
            <Button variant="ghost" className="w-full" onClick={() => navigate("/notifications")}>
              Все уведомления
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button variant="ghost" size="icon" onClick={() => navigate("/help")}>
          <HelpCircle className="h-5 w-5" />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative flex items-center space-x-2 focus:ring-0">
              <Avatar className="h-8 w-8 border border-gray-200">
                <AvatarFallback className="bg-bank-light-blue text-bank-blue">
                  {getInitials(username)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start text-sm">
                <span>{username}</span>
                <span className="text-xs text-gray-500 capitalize">
                  {userRole === "admin" ? "Администратор" : 
                   userRole === "erudit" ? "Эрудит" : 
                   userRole === "municipality" ? "Муниципалитет" :
                   userRole === "school" ? "Школа" : "Гость"}
                </span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem className="cursor-pointer" onClick={() => navigate("/profile")}>
              <User className="mr-2 h-4 w-4" />
              <span>Профиль</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Выход</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
