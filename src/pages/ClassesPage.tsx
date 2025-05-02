
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
import { Book, Plus, Search, Users, Award } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface ClassData {
  id: number;
  name: string;
  school: string;
  teacher: string;
  grade: number;
  students: number;
  participants: number;
  achievements: number;
}

const classesData: ClassData[] = [
  {
    id: 1,
    name: "5А",
    school: "Школа №1",
    teacher: "Иванова Елена Сергеевна",
    grade: 5,
    students: 28,
    participants: 5,
    achievements: 2
  },
  {
    id: 2,
    name: "6Б",
    school: "Лицей №2",
    teacher: "Петров Сергей Михайлович",
    grade: 6,
    students: 26,
    participants: 8,
    achievements: 3
  },
  {
    id: 3,
    name: "7В",
    school: "Гимназия №3",
    teacher: "Сидорова Людмила Александровна",
    grade: 7,
    students: 24,
    participants: 7,
    achievements: 4
  },
  {
    id: 4,
    name: "8А",
    school: "Школа №4",
    teacher: "Кузнецова Татьяна Петровна",
    grade: 8,
    students: 25,
    participants: 6,
    achievements: 1
  },
  {
    id: 5,
    name: "9Б",
    school: "Лицей №5",
    teacher: "Николаев Виктор Евгеньевич",
    grade: 9,
    students: 22,
    participants: 9,
    achievements: 5
  },
  {
    id: 6,
    name: "10А",
    school: "Гимназия №3",
    teacher: "Морозова Ирина Константиновна",
    grade: 10,
    students: 20,
    participants: 12,
    achievements: 7
  },
  {
    id: 7,
    name: "11Б",
    school: "Лицей №2",
    teacher: "Соколова Ольга Владимировна",
    grade: 11,
    students: 18,
    participants: 15,
    achievements: 9
  },
  {
    id: 8,
    name: "5Б",
    school: "Школа №1",
    teacher: "Андреева Наталья Викторовна",
    grade: 5,
    students: 27,
    participants: 6,
    achievements: 2
  },
  {
    id: 9,
    name: "9А",
    school: "Школа №4",
    teacher: "Васильев Игорь Дмитриевич",
    grade: 9,
    students: 23,
    participants: 10,
    achievements: 4
  },
  {
    id: 10,
    name: "10Б",
    school: "Лицей №5",
    teacher: "Федорова Екатерина Александровна",
    grade: 10,
    students: 19,
    participants: 14,
    achievements: 8
  }
];

const ClassesPage: React.FC = () => {
  const { toast } = useToast();
  const [showDialog, setShowDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSchool, setSelectedSchool] = useState<string | undefined>(undefined);
  const [selectedGrade, setSelectedGrade] = useState<string | undefined>(undefined);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const handleAddClass = () => {
    setShowDialog(false);
    toast({
      title: "Класс добавлен",
      description: "Новый класс успешно добавлен в систему"
    });
  };
  
  const handleViewDetails = (classId: number) => {
    toast({
      title: "Просмотр класса",
      description: `Открыта детальная информация по классу #${classId}`
    });
  };
  
  const filteredClasses = classesData.filter(cls => {
    let matchesSearch = true;
    let matchesSchool = true;
    let matchesGrade = true;
    
    if (searchQuery) {
      matchesSearch = 
        cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cls.school.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cls.teacher.toLowerCase().includes(searchQuery.toLowerCase());
    }
    
    if (selectedSchool && selectedSchool !== "all") {
      // Преобразуем ID выбранной школы в название для сравнения
      const schoolMap: { [key: string]: string } = {
        "school1": "Школа №1",
        "lyceum2": "Лицей №2",
        "gymnasium3": "Гимназия №3",
        "school4": "Школа №4",
        "lyceum5": "Лицей №5"
      };
      matchesSchool = cls.school === schoolMap[selectedSchool];
    }
    
    if (selectedGrade && selectedGrade !== "all") {
      matchesGrade = cls.grade === parseInt(selectedGrade);
    }
    
    return matchesSearch && matchesSchool && matchesGrade;
  });

  const totalStudents = filteredClasses.reduce((sum, cls) => sum + cls.students, 0);
  const totalParticipants = filteredClasses.reduce((sum, cls) => sum + cls.participants, 0);
  const totalAchievements = filteredClasses.reduce((sum, cls) => sum + cls.achievements, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Book className="h-6 w-6 text-bank-blue mr-2" />
          <h1 className="text-2xl font-bold">Классы</h1>
        </div>
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Добавить класс
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Добавление класса</DialogTitle>
              <DialogDescription>
                Введите информацию для добавления нового класса
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="className" className="text-right">
                  Название
                </Label>
                <Input id="className" placeholder="Например: 5А" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="school" className="text-right">
                  Школа
                </Label>
                <Select>
                  <SelectTrigger id="school" className="col-span-3">
                    <SelectValue placeholder="Выберите школу" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="school1">Школа №1</SelectItem>
                    <SelectItem value="lyceum2">Лицей №2</SelectItem>
                    <SelectItem value="gymnasium3">Гимназия №3</SelectItem>
                    <SelectItem value="school4">Школа №4</SelectItem>
                    <SelectItem value="lyceum5">Лицей №5</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="teacher" className="text-right">
                  Классный руководитель
                </Label>
                <Input id="teacher" placeholder="ФИО учителя" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="grade" className="text-right">
                  Параллель
                </Label>
                <Select>
                  <SelectTrigger id="grade" className="col-span-3">
                    <SelectValue placeholder="Выберите класс" />
                  </SelectTrigger>
                  <SelectContent>
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
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="students" className="text-right">
                  Учеников
                </Label>
                <Input id="students" type="number" placeholder="Количество учеников" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDialog(false)}>Отмена</Button>
              <Button onClick={handleAddClass}>Добавить</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Всего классов</CardTitle>
              <Book className="h-5 w-5 text-bank-blue" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{filteredClasses.length}</div>
            <div className="text-sm text-muted-foreground mt-1">
              Из {classesData.length} зарегистрированных
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Всего учеников</CardTitle>
              <Users className="h-5 w-5 text-bank-blue" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {totalStudents}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              Средний размер класса: {Math.round(totalStudents / filteredClasses.length || 1)}
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Всего участников</CardTitle>
              <Award className="h-5 w-5 text-bank-blue" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {totalParticipants}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              Достижений: {totalAchievements}
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
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            <div className="w-full md:w-[200px]">
              <Select value={selectedSchool} onValueChange={setSelectedSchool}>
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
              <Select value={selectedGrade} onValueChange={setSelectedGrade}>
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
            <div className="w-full md:w-auto">
              <Button 
                variant="ghost" 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedSchool(undefined);
                  setSelectedGrade(undefined);
                }}
              >
                Сбросить фильтры
              </Button>
            </div>
          </div>
          
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Класс</TableHead>
                  <TableHead>Школа</TableHead>
                  <TableHead>Классный руководитель</TableHead>
                  <TableHead className="text-center">Всего учеников</TableHead>
                  <TableHead className="text-center">Участников проекта</TableHead>
                  <TableHead className="text-center">Достижения</TableHead>
                  <TableHead className="text-right">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClasses.length > 0 ? (
                  filteredClasses.map((cls) => (
                    <TableRow key={cls.id}>
                      <TableCell className="font-medium">{cls.name}</TableCell>
                      <TableCell>{cls.school}</TableCell>
                      <TableCell className="max-w-[250px] truncate">{cls.teacher}</TableCell>
                      <TableCell className="text-center">{cls.students}</TableCell>
                      <TableCell className="text-center">{cls.participants}</TableCell>
                      <TableCell className="text-center">{cls.achievements}</TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleViewDetails(cls.id)}
                        >
                          Подробнее
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-10">
                      Классы не найдены
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          {filteredClasses.length > 0 && filteredClasses.length !== classesData.length && (
            <div className="mt-4 text-sm text-muted-foreground">
              Найдено {filteredClasses.length} из {classesData.length} классов
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ClassesPage;
