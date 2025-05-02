
import React from "react";
import LoginForm from "@/components/auth/LoginForm";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-bank-blue">Банк Одаренных Детей</h1>
          <p className="mt-2 text-sm text-gray-600">
            Система учета и мониторинга одаренных детей
          </p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow">
          <h2 className="text-center text-xl font-semibold mb-6">Вход в систему</h2>
          <LoginForm />
        </div>
        <p className="text-center text-sm text-gray-500">
          © 2025 Банк Одаренных Детей. Все права защищены.
        </p>
      </div>
    </div>
  );
};

export default Login;
