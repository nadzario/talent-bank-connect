
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { useNotifications } from "@/hooks/use-notifications";

const MainLayout: React.FC = () => {
  const { notifications, unreadCount } = useNotifications();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    toast({
      title: sidebarOpen ? "Sidebar collapsed" : "Sidebar expanded",
      description: "Navigation panel has been updated",
      duration: 2000,
    });
  };

  // Show notification badge in title if there are unread notifications
  useEffect(() => {
    if (unreadCount > 0) {
      document.title = `(${unreadCount}) Talent Database`;
    } else {
      document.title = 'Talent Database';
    }
  }, [unreadCount]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header toggleSidebar={toggleSidebar} />
      <div className="flex flex-col md:flex-row min-h-screen">
        <Sidebar isOpen={sidebarOpen} />
        <main
          className={cn(
            "pt-16 min-h-screen transition-all duration-300 flex-1",
            isMobile ? "px-2" : sidebarOpen ? "md:pl-64" : "md:pl-16"
          )}
        >
          <div className="container mx-auto p-4 md:p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
