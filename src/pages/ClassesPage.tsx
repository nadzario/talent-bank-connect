
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
import { Book, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ClassData {
  id: number;
  name: string;
  school: string;
  teacher: string;
  grade: number;
  students: number;
  participants: number;
}

const classesData: ClassData[] = [
  {
    id: 1,
    name: "5А",
    school: "Школа №1",
    teacher: "Иванова Е.С.",
    grade: 5,
    students: 28,
    participants: 5
  },
  {
    id: 2,
    name: "6Б",
    school: "Лицей №2",
    teacher: "Петров С.М.",
    grade: 6,
    students: 26,
    participants: 8
  },
  {
    id: 3,
    name: "7В",
    school: "Гимназия №3",
    teacher: "Сидорова Л.А.",
    grade: 7,
    students: 24,
    participants: 7
  },
  {
    id: 4,
    name: "8А",
    school: "Школа №4",
    teacher: "Кузнецова Т.П.",
    grade: 8,
    students: 25,
    participants: 6
  },
  {
    id: 5,
    name: "9Б",
    school: "Лицей №5",
    teacher: "Николаев В.Е.",
    grade: 9,
    students: 22,
    participants: 9
  },
  {
    id: 6,
    name: "10А",
    school: "Гимназия №3",
    teacher: "Морозова И.К.",
    grade: 10,
    students: 20,
    participants: 12
  },
  {
    id: 7,
    name: "11Б",
    school: "Лицей №2",
    teacher: "Соколова О.В.",
    grade: 11,
    students: 18,
    participants: 15
  }
];

const ClassesPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Book className="h-6 w-6 text-bank-blue mr-2" />
          <h1 className="text-2xl font-bold">Классы</h1>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Добавить класс
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Всего классов</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{classesData.length}</div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Всего учеников</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {classesData.reduce((sum, cls) => sum + cls.students, 0)}
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Всего участников</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {classesData.reduce((sum, cls) => sum + cls.participants, 0)}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Список классов</CardTitle>
          <CardDescription>
            Полный список классов, зарегистрированных в системе
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative w-full md:max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Поиск классов..." 
                className="pl-8" 
              />
            </div>
            <div className="w-full md:w-[200px]">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Школа" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все школы</SelectItem>
                  <SelectItem value="school1">Школа №1</SelectItem>
                  <SelectItem value="lyceum2">Лицей №2</SelectItem>
                  <SelectItem value="gymnasium3">Гимназия №3</SelectItem>
                  <SelectItem value="school4">Школа №4</SelectItem>
                  <SelectItem value="lyceum5">Лицей №5</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-[180px]">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Параллель" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все</SelectItem>
                  <SelectItem value="5">5 класс</SelectItem>
                  <SelectItem value="6">6 класс</SelectItem>
                  <SelectItem value="7">7 класс</SelectItem>
                  <SelectItem value="8">8 класс</SelectItem>
                  <SelectItem value="9">9 класс</SelectItem>
                  <SelectItem value="10">10 класс</SelectItem>
                  <SelectItem value="11">11 класс</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Класс</TableHead>
                  <TableHead>Школа</TableHead>
                  <TableHead>Классный руководитель</TableHead>
                  <TableHead className="text-center">Всего учеников</TableHead>
                  <TableHead className="text-center">Участников проекта</TableHead>
                  <TableHead className="text-right">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {classesData.map((cls) => (
                  <TableRow key={cls.id}>
                    <TableCell className="font-medium">{cls.name}</TableCell>
                    <TableCell>{cls.school}</TableCell>
                    <TableCell>{cls.teacher}</TableCell>
                    <TableCell className="text-center">{cls.students}</TableCell>
                    <TableCell className="text-center">{cls.participants}</TableCell>
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

export default ClassesPage;
