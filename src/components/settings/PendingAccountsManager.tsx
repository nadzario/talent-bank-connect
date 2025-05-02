
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, User, UserCheck, Clock, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";

interface PendingAccount {
  id: number;
  name: string;
  email: string;
  role: string;
  organization: string;
  requestDate: string;
  status: "pending" | "approved" | "rejected";
}

const PendingAccountsManager: React.FC = () => {
  const { toast } = useToast();
  
  const [pendingAccounts, setPendingAccounts] = useState<PendingAccount[]>([
    {
      id: 1,
      name: "Смирнов Алексей Петрович",
      email: "smirnov@school15.edu",
      role: "school",
      organization: "Школа №15",
      requestDate: "2025-05-01",
      status: "pending"
    },
    {
      id: 2,
      name: "Кузнецова Мария Ивановна",
      email: "kuznetsova@edu.gov",
      role: "municipality",
      organization: "Департамент образования",
      requestDate: "2025-05-01",
      status: "pending"
    },
    {
      id: 3,
      name: "Иванов Дмитрий Сергеевич",
      email: "ivanov@lyceum8.edu",
      role: "school",
      organization: "Лицей №8",
      requestDate: "2025-04-30",
      status: "pending"
    },
    {
      id: 4,
      name: "Петрова Елена Николаевна",
      email: "petrova@erudit.org",
      role: "erudit",
      organization: "Эрудит",
      requestDate: "2025-04-28",
      status: "approved"
    },
    {
      id: 5,
      name: "Васильев Игорь Владимирович",
      email: "vasiliev@edu.gov",
      role: "municipality",
      organization: "Восточный муниципалитет",
      requestDate: "2025-04-25",
      status: "rejected"
    }
  ]);

  const [selectedAccount, setSelectedAccount] = useState<PendingAccount | null>(null);
  const [viewDetailsOpen, setViewDetailsOpen] = useState(false);

  const handleApprove = (id: number) => {
    setPendingAccounts(prevAccounts =>
      prevAccounts.map(account =>
        account.id === id ? { ...account, status: "approved" } : account
      )
    );
    toast({
      title: "Аккаунт подтвержден",
      description: "Пользователь получит уведомление о подтверждении аккаунта"
    });
  };

  const handleReject = (id: number) => {
    setPendingAccounts(prevAccounts =>
      prevAccounts.map(account =>
        account.id === id ? { ...account, status: "rejected" } : account
      )
    );
    toast({
      title: "Аккаунт отклонен",
      description: "Пользователь получит уведомление об отклонении регистрации"
    });
  };

  const handleViewDetails = (account: PendingAccount) => {
    setSelectedAccount(account);
    setViewDetailsOpen(true);
  };

  const getPendingAccountsCount = () => {
    return pendingAccounts.filter(account => account.status === "pending").length;
  };

  const getRoleName = (role: string) => {
    switch(role) {
      case "admin": return "Администратор";
      case "erudit": return "Эрудит";
      case "municipality": return "Муниципалитет";
      case "school": return "Школа";
      default: return role;
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "pending":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-300">На рассмотрении</Badge>;
      case "approved":
        return <Badge variant="outline" className="bg-green-50 text-green-800 border-green-300">Подтвержден</Badge>;
      case "rejected":
        return <Badge variant="outline" className="bg-red-50 text-red-800 border-red-300">Отклонен</Badge>;
      default:
        return <Badge variant="outline">Неизвестно</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <UserCheck className="h-5 w-5 text-bank-blue" />
            <CardTitle>Управление заявками на регистрацию</CardTitle>
          </div>
          {getPendingAccountsCount() > 0 && (
            <Badge variant="secondary" className="bg-red-50 text-red-800">
              {getPendingAccountsCount()} новых заявок
            </Badge>
          )}
        </div>
        <CardDescription>
          Подтверждение и отклонение запросов на создание новых аккаунтов
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-left font-medium text-sm text-gray-500">Имя</th>
                <th className="py-3 px-4 text-left font-medium text-sm text-gray-500">Email</th>
                <th className="py-3 px-4 text-left font-medium text-sm text-gray-500">Роль</th>
                <th className="py-3 px-4 text-left font-medium text-sm text-gray-500">Организация</th>
                <th className="py-3 px-4 text-left font-medium text-sm text-gray-500">Дата заявки</th>
                <th className="py-3 px-4 text-left font-medium text-sm text-gray-500">Статус</th>
                <th className="py-3 px-4 text-right font-medium text-sm text-gray-500">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {pendingAccounts.map((account) => (
                <tr key={account.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span>{account.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">{account.email}</td>
                  <td className="py-3 px-4">{getRoleName(account.role)}</td>
                  <td className="py-3 px-4">{account.organization}</td>
                  <td className="py-3 px-4">{new Date(account.requestDate).toLocaleDateString('ru-RU')}</td>
                  <td className="py-3 px-4">{getStatusBadge(account.status)}</td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleViewDetails(account)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {account.status === "pending" && (
                        <>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-green-600 hover:text-green-800 hover:bg-green-50"
                            onClick={() => handleApprove(account.id)}
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-600 hover:text-red-800 hover:bg-red-50"
                            onClick={() => handleReject(account.id)}
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {pendingAccounts.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-6 text-center text-gray-500">
                    Нет заявок на регистрацию
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Dialog open={viewDetailsOpen} onOpenChange={setViewDetailsOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Детали заявки</DialogTitle>
              <DialogDescription>
                Полная информация о заявке на регистрацию
              </DialogDescription>
            </DialogHeader>
            
            {selectedAccount && (
              <div className="space-y-4">
                <div className="flex items-center space-x-4 py-2">
                  <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <User className="h-6 w-6 text-gray-500" />
                  </div>
                  <div>
                    <div className="font-medium">{selectedAccount.name}</div>
                    <div className="text-sm text-muted-foreground">{selectedAccount.email}</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Роль</div>
                    <div className="font-medium">{getRoleName(selectedAccount.role)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Организация</div>
                    <div className="font-medium">{selectedAccount.organization}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Дата заявки</div>
                    <div className="font-medium">{new Date(selectedAccount.requestDate).toLocaleDateString('ru-RU')}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Статус</div>
                    <div>{getStatusBadge(selectedAccount.status)}</div>
                  </div>
                </div>
                
                <div className="pt-2">
                  <div className="text-sm text-muted-foreground">История обработки</div>
                  <div className="mt-2 space-y-3">
                    {selectedAccount.status !== "pending" && (
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                          {selectedAccount.status === "approved" ? (
                            <CheckCircle className="h-4 w-4 text-blue-600" />
                          ) : (
                            <XCircle className="h-4 w-4 text-blue-600" />
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-medium">
                            {selectedAccount.status === "approved" ? "Заявка одобрена" : "Заявка отклонена"}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {new Date().toLocaleDateString('ru-RU')} в {new Date().toLocaleTimeString('ru-RU')}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                        <Clock className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">Заявка создана</div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(selectedAccount.requestDate).toLocaleDateString('ru-RU')} в 10:30:15
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <DialogFooter className="sm:justify-end">
              {selectedAccount && selectedAccount.status === "pending" && (
                <>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      handleReject(selectedAccount.id);
                      setViewDetailsOpen(false);
                    }}
                  >
                    Отклонить
                  </Button>
                  <Button
                    onClick={() => {
                      handleApprove(selectedAccount.id);
                      setViewDetailsOpen(false);
                    }}
                  >
                    Подтвердить
                  </Button>
                </>
              )}
              {selectedAccount && selectedAccount.status !== "pending" && (
                <Button
                  variant="outline"
                  onClick={() => setViewDetailsOpen(false)}
                >
                  Закрыть
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default PendingAccountsManager;
