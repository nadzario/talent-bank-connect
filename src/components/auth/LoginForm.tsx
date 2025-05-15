import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  username: z.string().min(1, "Логин обязателен"),
  password: z.string().min(1, "Пароль обязателен"),
});

type FormValues = z.infer<typeof formSchema>;

const LoginForm: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showRecovery, setShowRecovery] = useState(false);
  const [email, setEmail] = useState("");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    console.log("Logging in with:", values);

    // Hardcoded demo login for prototype
    // In a real app, this would connect to your authentication API
    let userRole: string | null = null;

    // Simple role-based auth for demonstration
    if (values.username === "admin" && values.password === "admin") {
      userRole = "admin";
    } else if (values.username === "erudit" && values.password === "erudit") {
      userRole = "erudit";
    } else if (values.username === "school" && values.password === "school") {
      userRole = "school";
    } else if (values.username === "municipality" && values.password === "municipality") {
      userRole = "municipality";
    }

    if (userRole) {
      localStorage.setItem("username", values.username);
      localStorage.setItem("userRole", userRole);

      toast({
        title: "Вход выполнен",
        description: "Вы успешно вошли в систему",
      });

      navigate("/dashboard");
    } else {
      toast({
        title: "Ошибка входа",
        description: "Неверный логин или пароль",
        variant: "destructive",
      });
    }
  };

  const onForgotPassword = async () => {
    try {
      await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      toast({
        title: "Инструкции по восстановлению отправлены",
        description: "Проверьте вашу электронную почту для дальнейших действий."
      });
      setShowRecovery(false);
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить инструкции по восстановлению.",
        variant: "destructive"
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Логин</FormLabel>
              <FormControl>
                <Input placeholder="Введите логин" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Введите пароль" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between items-center">
          <div className="text-sm">
            <Button
              variant="link"
              className="p-0 h-auto"
              onClick={() => setShowRecovery(true)}
            >
              Забыли пароль?
            </Button>
          </div>
        </div>
        {showRecovery && (
          <div>
            <Input type="email" placeholder="Введите email" value={email} onChange={e => setEmail(e.target.value)}/>
            <Button type="button" onClick={onForgotPassword}>
              Отправить инструкции
            </Button>
          </div>
        )}
        <Button type="submit" className="w-full">
          Войти
        </Button>
      </form>

      <div className="mt-4 text-sm text-gray-500 text-center">
        <p>Для тестирования используйте:</p>
        <ul className="list-disc list-inside mt-1 text-left">
          <li>admin / admin (Администратор)</li>
          <li>erudit / erudit (Эрудит)</li>
          <li>school / school (Школа)</li>
          <li>municipality / municipality (Муниципалитет)</li>
        </ul>
      </div>
    </Form>
  );
};

export default LoginForm;
