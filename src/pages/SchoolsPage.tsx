
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
import { Plus, School, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface SchoolData {
  id: number;
  name: string;
  director: string;
  municipality: string;
  type: "Общеобразовательная" | "Лицей" | "Гимназия";
  students: number;
  participants: number;
}

const schoolsData: SchoolData[] = [
  {
    id: 1,
    name: "Школа №1",
    director: "Иванов И.И.",
    municipality: "Центральный район",
    type: "Общеобразовательная",
    students: 720,
    participants: 58
  },
  {
    id: 2,
    name: "Лицей №2",
    director: "Петрова М.С.",
    municipality: "Северный район",
    type: "Лицей",
    students: 850,
    participants: 124
  },
  {
    id: 3,
    name: "Гимназия №3",
    director: "Сидоров А.В.",
    municipality: "Восточный район",
    type: "Гимназия",
    students: 680,
    participants: 87
  },
  {
    id: 4,
    name: "Школа №4",
    director: "Кузнецова О.Н.",
    municipality: "Западный район",
    type: "Общеобразовательная",
    students: 540,
    participants: 42
  },
  {
    id: 5,
    name: "Лицей №5",
    director: "Николаев Д.А.",
    municipality: "Южный район",
    type: "Лицей",
    students: 790,
    participants: 103
  }
];

const SchoolsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <School className="h-6 w-6 text-bank-blue mr-2" />
          <h1 className="text-2xl font-bold">Школы</h1>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Добавить школу
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Всего школ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{schoolsData.length}</div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Всего учащихся</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {schoolsData.reduce((sum, school) => sum + school.students, 0)}
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Участников проекта</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {schoolsData.reduce((sum, school) => sum + school.participants, 0)}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Список школ</CardTitle>
          <CardDescription>
            Полный список школ, зарегистрированных в системе
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative w-full md:max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Поиск школ..." 
                className="pl-8" 
              />
            </div>
            <div className="w-full md:w-[200px]">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Муниципалитет" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все муниципалитеты</SelectItem>
                  <SelectItem value="central">Центральный район</SelectItem>
                  <SelectItem value="north">Северный район</SelectItem>
                  <SelectItem value="east">Восточный район</SelectItem>
                  <SelectItem value="west">Западный район</SelectItem>
                  <SelectItem value="south">Южный район</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-[180px]">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Тип школы" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все типы</SelectItem>
                  <SelectItem value="school">Общеобразовательная</SelectItem>
                  <SelectItem value="lyceum">Лицей</SelectItem>
                  <SelectItem value="gymnasium">Гимназия</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Название</TableHead>
                  <TableHead>Директор</TableHead>
                  <TableHead>Муниципалитет</TableHead>
                  <TableHead>Тип</TableHead>
                  <TableHead className="text-center">Учащихся</TableHead>
                  <TableHead className="text-center">Участников</TableHead>
                  <TableHead className="text-right">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {schoolsData.map((school) => (
                  <TableRow key={school.id}>
                    <TableCell className="font-medium">{school.name}</TableCell>
                    <TableCell>{school.director}</TableCell>
                    <TableCell>{school.municipality}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={
                        school.type === "Лицей" 
                          ? "bg-blue-50 text-blue-700 border-blue-300" 
                          : school.type === "Гимназия" 
                            ? "bg-purple-50 text-purple-700 border-purple-300" 
                            : "bg-gray-50 text-gray-700 border-gray-300"
                      }>
                        {school.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">{school.students}</TableCell>
                    <TableCell className="text-center">{school.participants}</TableCell>
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

export default SchoolsPage;
