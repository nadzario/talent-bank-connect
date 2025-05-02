
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Database, Plus, Search, Building, School } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface Municipality {
  id: number;
  name: string;
  head: string;
  schools: number;
  participants: number;
  contacts: string;
  region: string;
}

const municipalityData: Municipality[] = [
  {
    id: 1,
    name: "Центральный район",
    head: "Иванов Иван Иванович",
    schools: 12,
    participants: 458,
    contacts: "central@edu.gov",
    region: "Центральный"
  },
  {
    id: 2,
    name: "Северный район",
    head: "Петров Петр Петрович",
    schools: 8,
    participants: 312,
    contacts: "north@edu.gov",
    region: "Северный"
  },
  {
    id: 3,
    name: "Восточный район",
    head: "Сидорова Анна Викторовна",
    schools: 10,
    participants: 387,
    contacts: "east@edu.gov",
    region: "Восточный"
  },
  {
    id: 4,
    name: "Западный район",
    head: "Козлов Дмитрий Сергеевич",
    schools: 7,
    participants: 276,
    contacts: "west@edu.gov",
    region: "Западный"
  },
  {
    id: 5,
    name: "Южный район",
    head: "Соколова Мария Александровна",
    schools: 9,
    participants: 340,
    contacts: "south@edu.gov",
    region: "Южный"
  },
  {
    id: 6,
    name: "Приморский район",
    head: "Морозов Алексей Владимирович",
    schools: 11,
    participants: 405,
    contacts: "seaside@edu.gov",
    region: "Приморский"
  },
  {
    id: 7,
    name: "Заречный район",
    head: "Новикова Елена Павловна",
    schools: 6,
    participants: 287,
    contacts: "riverside@edu.gov",
    region: "Пригородный"
  },
  {
    id: 8,
    name: "Горный район",
    head: "Волков Сергей Николаевич",
    schools: 5,
    participants: 215,
    contacts: "mountain@edu.gov",
    region: "Горный"
  }
];

const MunicipalitiesPage: React.FC = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [showDialog, setShowDialog] = useState(false);

  const filteredMunicipalities = municipalityData.filter(municipality => {
    if (!searchQuery) return true;
    return municipality.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
           municipality.head.toLowerCase().includes(searchQuery.toLowerCase()) ||
           municipality.region.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const totalSchools = municipalityData.reduce((sum, mun) => sum + mun.schools, 0);
  const totalParticipants = municipalityData.reduce((sum, mun) => sum + mun.participants, 0);

  const handleAddMunicipality = () => {
    setShowDialog(false);
    toast({
      title: "Муниципалитет добавлен",
      description: "Новый муниципалитет успешно добавлен в систему"
    });
  };

  const handleViewDetails = (municipalityId: number) => {
    toast({
      title: "Информация о муниципалитете",
      description: `Просмотр данных о муниципалитете #${municipalityId}`
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Database className="h-6 w-6 text-bank-blue mr-2" />
          <h1 className="text-2xl font-bold">Муниципалитеты</h1>
        </div>
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Добавить муниципалитет
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Добавление муниципалитета</DialogTitle>
              <DialogDescription>
                Введите данные нового муниципалитета
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Название
                </Label>
                <Input id="name" placeholder="Введите название" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="head" className="text-right">
                  Руководитель
                </Label>
                <Input id="head" placeholder="ФИО руководителя" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="region" className="text-right">
                  Регион
                </Label>
                <Input id="region" placeholder="Укажите регион" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="contacts" className="text-right">
                  Контакты
                </Label>
                <Input id="contacts" placeholder="Email или телефон" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDialog(false)}>Отмена</Button>
              <Button onClick={handleAddMunicipality}>Сохранить</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Всего муниципалитетов</CardTitle>
              <Building className="h-5 w-5 text-bank-blue" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{municipalityData.length}</div>
            <div className="text-sm text-muted-foreground mt-1">
              В общую структуру системы
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Школ в муниципалитетах</CardTitle>
              <School className="h-5 w-5 text-bank-blue" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {totalSchools}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              Среднее на муниципалитет: {Math.round(totalSchools / municipalityData.length)}
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Участников из муниципалитетов</CardTitle>
              <Database className="h-5 w-5 text-bank-blue" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {totalParticipants}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              В среднем по {Math.round(totalParticipants / municipalityData.length)} участников
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Список муниципалитетов</CardTitle>
          <CardDescription>
            Полный список муниципалитетов, зарегистрированных в системе
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex mb-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Поиск муниципалитетов..." 
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} 
              />
            </div>
          </div>
          
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Название</TableHead>
                  <TableHead>Руководитель</TableHead>
                  <TableHead>Регион</TableHead>
                  <TableHead className="text-center">Школ</TableHead>
                  <TableHead className="text-center">Участников</TableHead>
                  <TableHead className="text-right">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMunicipalities.length > 0 ? (
                  filteredMunicipalities.map((municipality) => (
                    <TableRow key={municipality.id}>
                      <TableCell className="font-medium">{municipality.name}</TableCell>
                      <TableCell>{municipality.head}</TableCell>
                      <TableCell>{municipality.region}</TableCell>
                      <TableCell className="text-center">{municipality.schools}</TableCell>
                      <TableCell className="text-center">{municipality.participants}</TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleViewDetails(municipality.id)}
                        >
                          Подробнее
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-10">
                      Муниципалитеты не найдены
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {filteredMunicipalities.length > 0 && filteredMunicipalities.length !== municipalityData.length && (
            <div className="mt-4 text-sm text-muted-foreground">
              Найдено {filteredMunicipalities.length} из {municipalityData.length} муниципалитетов
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MunicipalitiesPage;
