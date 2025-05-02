
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Check, ShieldCheck, X, Users } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

interface PendingAccount {
  id: string;
  name: string;
  email: string;
  organization: string;
  requestedRole: string;
  registrationDate: string;
}

const PendingAccountsManager: React.FC = () => {
  const { toast } = useToast();
  const [pendingAccounts, setPendingAccounts] = useState<PendingAccount[]>([
    {
      id: "1",
      name: "Иванов Иван Иванович",
      email: "ivanov@school42.ru",
      organization: "Школа №42",
      requestedRole: "school",
      registrationDate: "01.05.2025"
    },
    {
      id: "2",
      name: "Петрова Мария Сергеевна",
      email: "petrova@educomp.ru",
      organization: "Образовательный комплекс №5",
      requestedRole: "municipality",
      registrationDate: "30.04.2025"
    },
    {
      id: "3",
      name: "Сидоров Алексей Петрович",
      email: "sidorov@erudit.ru",
      organization: "Центр Эрудит",
      requestedRole: "erudit",
      registrationDate: "29.04.2025"
    }
  ]);
  
  const [selectedAccount, setSelectedAccount] = useState<PendingAccount | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>("");

  const getRoleName = (role: string) => {
    switch (role) {
      case "admin": return "Администратор";
      case "erudit": return "Эрудит";
      case "municipality": return "Муниципалитет";
      case "school": return "Школа";
      default: return role;
    }
  };

  const openApprovalDialog = (account: PendingAccount) => {
    setSelectedAccount(account);
    setSelectedRole(account.requestedRole);
    setIsDialogOpen(true);
  };

  const approveAccount = () => {
    if (!selectedAccount) return;
    
    // Here you'd make an API call to approve the account
    // For now we'll just remove it from the pending list
    setPendingAccounts(pendingAccounts.filter(
      account => account.id !== selectedAccount.id
    ));
    
    setIsDialogOpen(false);
    
    toast({
      title: "Аккаунт подтвержден",
      description: `Аккаунт ${selectedAccount.name} успешно подтвержден с ролью ${getRoleName(selectedRole)}`,
    });
  };

  const rejectAccount = (account: PendingAccount) => {
    // Here you'd make an API call to reject the account
    setPendingAccounts(pendingAccounts.filter(
      item => item.id !== account.id
    ));
    
    toast({
      title: "Аккаунт отклонен",
      description: `Запрос на создание аккаунта ${account.name} был отклонен`,
    });
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Users className="h-5 w-5 text-blue-600" />
          <CardTitle>Ожидающие подтверждения аккаунты</CardTitle>
        </div>
        <CardDescription>
          Список учетных записей, ожидающих подтверждения администратором
        </CardDescription>
      </CardHeader>
      <CardContent>
        {pendingAccounts.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            Нет аккаунтов, ожидающих подтверждения
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Имя</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Организация</TableHead>
                <TableHead>Запрашиваемая роль</TableHead>
                <TableHead>Дата регистрации</TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingAccounts.map((account) => (
                <TableRow key={account.id}>
                  <TableCell>{account.name}</TableCell>
                  <TableCell>{account.email}</TableCell>
                  <TableCell>{account.organization}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {getRoleName(account.requestedRole)}
                    </Badge>
                  </TableCell>
                  <TableCell>{account.registrationDate}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="h-8 px-2 text-green-600"
                        onClick={() => openApprovalDialog(account)}
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Подтвердить
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="h-8 px-2 text-red-600"
                        onClick={() => rejectAccount(account)}
                      >
                        <X className="h-4 w-4 mr-1" />
                        Отклонить
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Подтверждение аккаунта</DialogTitle>
              <DialogDescription>
                Выберите роль для пользователя и подтвердите создание аккаунта.
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4">
              {selectedAccount && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Имя пользователя</p>
                    <p className="text-sm text-muted-foreground">{selectedAccount.name}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{selectedAccount.email}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Организация</p>
                    <p className="text-sm text-muted-foreground">{selectedAccount.organization}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Роль пользователя</label>
                    <Select value={selectedRole} onValueChange={setSelectedRole}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите роль" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="school">Школа</SelectItem>
                        <SelectItem value="municipality">Муниципалитет</SelectItem>
                        <SelectItem value="erudit">Эрудит</SelectItem>
                        <SelectItem value="admin">Администратор</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Отмена
              </Button>
              <Button onClick={approveAccount}>
                Подтвердить аккаунт
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default PendingAccountsManager;
