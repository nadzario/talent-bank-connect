
import React from "react";
import StatCard from "@/components/dashboard/StatCard";
import RecentActivityList from "@/components/dashboard/RecentActivityList";
import { Users, Award, School, Calendar } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Панель управления</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Всего участников" 
          value="1,247" 
          icon={<Users />}
          description="+12% с прошлого месяца"
        />
        <StatCard 
          title="Наставников" 
          value="156" 
          icon={<Award />}
          description="8 новых за неделю"
        />
        <StatCard 
          title="Школы" 
          value="42" 
          icon={<School />}
          description="Из 5 муниципалитетов"
        />
        <StatCard 
          title="Мероприятия" 
          value="36" 
          icon={<Calendar />}
          description="7 активных сейчас"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RecentActivityList />
        
        <div className="col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Предстоящие мероприятия</h2>
            
            <div className="space-y-4">
              <div className="border-l-4 border-bank-blue pl-4 py-1">
                <div className="font-medium">Городская олимпиада</div>
                <div className="text-sm text-gray-500">15 мая 2025</div>
              </div>
              
              <div className="border-l-4 border-bank-blue pl-4 py-1">
                <div className="font-medium">Летняя школа программирования</div>
                <div className="text-sm text-gray-500">1-14 июня 2025</div>
              </div>
              
              <div className="border-l-4 border-bank-blue pl-4 py-1">
                <div className="font-medium">Конкурс научных работ</div>
                <div className="text-sm text-gray-500">25 июня 2025</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Напоминания</h2>
            
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="h-5 w-5 mt-0.5 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-yellow-600 text-xs">!</span>
                </div>
                <div>
                  <p className="text-sm">Подготовить отчет по итогам региональной олимпиады</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="h-5 w-5 mt-0.5 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-yellow-600 text-xs">!</span>
                </div>
                <div>
                  <p className="text-sm">Проверить данные новых участников из школы №8</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
