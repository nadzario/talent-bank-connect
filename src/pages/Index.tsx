
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-bank-light-blue to-white px-4">
      <div className="max-w-4xl text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-bank-blue mb-6">
          Банк Одаренных Детей
        </h1>
        <p className="text-xl text-gray-700 mb-10 max-w-2xl mx-auto">
          Единая система для сбора, хранения и анализа данных о талантливых детях, их достижениях и образовательных траекториях
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="text-lg px-8"
            onClick={() => navigate("/login")}
          >
            Войти в систему
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="text-lg px-8"
            onClick={() => navigate("/about")}
          >
            Узнать подробнее
          </Button>
        </div>
      </div>
      
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
        <div className="p-6 bg-white rounded-lg shadow-md text-center">
          <div className="w-16 h-16 bg-bank-light-blue rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-bank-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Учет участников</h3>
          <p className="text-gray-600">Ведите подробный учет данных об одаренных детях и их достижениях</p>
        </div>
        
        <div className="p-6 bg-white rounded-lg shadow-md text-center">
          <div className="w-16 h-16 bg-bank-light-blue rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-bank-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Организация мероприятий</h3>
          <p className="text-gray-600">Планируйте и отслеживайте образовательные проекты, олимпиады и конкурсы</p>
        </div>
        
        <div className="p-6 bg-white rounded-lg shadow-md text-center">
          <div className="w-16 h-16 bg-bank-light-blue rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-bank-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Аналитика и отчеты</h3>
          <p className="text-gray-600">Получайте подробную аналитику и формируйте отчеты по различным параметрам</p>
        </div>
      </div>
      
      <footer className="mt-16 text-center text-sm text-gray-500">
        © 2025 Банк Одаренных Детей. Все права защищены.
      </footer>
    </div>
  );
};

export default Index;
