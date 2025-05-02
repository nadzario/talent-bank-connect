
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import { useEffect, useState } from "react";

// New imports for our role-based pages
import ParticipantsPage from "./pages/ParticipantsPage";
import MentorsPage from "./pages/MentorsPage";
import ExportPage from "./pages/ExportPage";
import ImportPage from "./pages/ImportPage";
import SettingsPage from "./pages/SettingsPage";
import OlympiadsPage from "./pages/OlympiadsPage";
import ProjectsPage from "./pages/ProjectsPage";
import ReportsPage from "./pages/ReportsPage";

// Authentication guard component
interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles = [] }) => {
  // In a real app, you'd use a proper auth context
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get role from localStorage
    const role = localStorage.getItem("userRole");
    setUserRole(role);
    setLoading(false);
  }, []);

  // Show nothing while checking auth
  if (loading) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

  // If not logged in, redirect to login
  if (!userRole) {
    return <Navigate to="/login" replace />;
  }

  // If role restrictions are specified and user doesn't have permission
  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          
          {/* Protected routes with MainLayout */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* User Management */}
            <Route path="/participants" element={<ParticipantsPage />} />
            <Route 
              path="/mentors" 
              element={
                <ProtectedRoute allowedRoles={["admin", "erudit", "municipality"]}>
                  <MentorsPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/users" 
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <div>Пользователи</div>
                </ProtectedRoute>
              } 
            />
            
            {/* Organization */}
            <Route 
              path="/municipalities" 
              element={
                <ProtectedRoute allowedRoles={["admin", "erudit"]}>
                  <div>Муниципалитеты</div>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/schools" 
              element={
                <ProtectedRoute allowedRoles={["admin", "erudit", "municipality"]}>
                  <div>Школы</div>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/classes" 
              element={
                <ProtectedRoute allowedRoles={["admin", "erudit", "municipality", "school"]}>
                  <div>Классы</div>
                </ProtectedRoute>
              } 
            />
            
            {/* Events */}
            <Route path="/events" element={<div>Мероприятия</div>} />
            <Route path="/olympiads" element={<OlympiadsPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            
            {/* Data Management */}
            <Route 
              path="/reports" 
              element={
                <ProtectedRoute allowedRoles={["admin", "erudit"]}>
                  <ReportsPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/analytics" 
              element={
                <ProtectedRoute allowedRoles={["admin", "erudit"]}>
                  <div>Аналитика</div>
                </ProtectedRoute>
              } 
            />
            <Route path="/import" element={<ImportPage />} />
            <Route 
              path="/export" 
              element={
                <ProtectedRoute allowedRoles={["admin", "erudit", "municipality"]}>
                  <ExportPage />
                </ProtectedRoute>
              } 
            />
            
            {/* System */}
            <Route 
              path="/settings" 
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <SettingsPage />
                </ProtectedRoute>
              } 
            />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
