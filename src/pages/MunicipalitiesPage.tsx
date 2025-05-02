
import React from "react";
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
import { Database, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Municipality {
  id: number;
  name: string;
  head: string;
  schools: number;
  participants: number;
}

const municipalityData: Municipality[] = [
  {
    id: 1,
    name: "Центральный район",
    head: "Иванов И.И.",
    schools: 12,
    participants: 458
  },
  {
    id: 2,
    name: "Северный район",
    head: "Петров П.П.",
    schools: 8,
    participants: 312
  },
  {
    id: 3,
    name: "Восточный район",
    head: "Сидорова А.В.",
    schools: 10,
    participants: 387
  },
  {
    id: 4,
    name: "Западный район",
    head: "Козлов Д.С.",
    schools: 7,
    participants: 276
  },
  {
    id: 5,
    name: "Южный район",
    head: "Соколова М.А.",
    schools: 9,
    participants: 340
  }
];

const MunicipalitiesPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Database className="h-6 w-6 text-bank-blue mr-2" />
          <h1 className="text-2xl font-bold">Муниципалитеты</h1>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Добавить муниципалитет
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Всего муниципалитетов</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{municipalityData.length}</div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Школ в муниципалитетах</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {municipalityData.reduce((sum, mun) => sum + mun.schools, 0)}
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Участников из муниципалитетов</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {municipalityData.reduce((sum, mun) => sum + mun.participants, 0)}
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
              />
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Название</TableHead>
                  <TableHead>Руководитель</TableHead>
                  <TableHead className="text-center">Школ</TableHead>
                  <TableHead className="text-center">Участников</TableHead>
                  <TableHead className="text-right">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {municipalityData.map((municipality) => (
                  <TableRow key={municipality.id}>
                    <TableCell className="font-medium">{municipality.name}</TableCell>
                    <TableCell>{municipality.head}</TableCell>
                    <TableCell className="text-center">{municipality.schools}</TableCell>
                    <TableCell className="text-center">{municipality.participants}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        Подробнее
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MunicipalitiesPage;
