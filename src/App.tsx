import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import ParticipantsPage from "./pages/ParticipantsPage";
import MentorsPage from "./pages/MentorsPage";
import SchoolsPage from "./pages/SchoolsPage";
import MunicipalitiesPage from "./pages/MunicipalitiesPage";
import ClassesPage from "./pages/ClassesPage";
import EventsPage from "./pages/EventsPage";
import ProjectsPage from "./pages/ProjectsPage";
import OlympiadsPage from "./pages/OlympiadsPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import ReportsPage from "./pages/ReportsPage";
import ImportPage from "./pages/ImportPage";
import ExportPage from "./pages/ExportPage";
import SettingsPage from "./pages/SettingsPage";
import NotificationsPage from "./pages/NotificationsPage";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "participants", element: <ParticipantsPage /> },
      { path: "mentors", element: <MentorsPage /> },
      { path: "schools", element: <SchoolsPage /> },
      { path: "municipalities", element: <MunicipalitiesPage /> },
      { path: "classes", element: <ClassesPage /> },
      { path: "events", element: <EventsPage /> },
      { path: "projects", element: <ProjectsPage /> },
      { path: "olympiads", element: <OlympiadsPage /> },
      { path: "analytics", element: <AnalyticsPage /> },
      { path: "reports", element: <ReportsPage /> },
      { path: "import", element: <ImportPage /> },
      { path: "export", element: <ExportPage /> },
      { path: "settings", element: <SettingsPage /> },
      { path: "notifications", element: <NotificationsPage /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
