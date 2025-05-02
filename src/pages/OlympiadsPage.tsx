
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
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
  DialogTrigger 
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Award, Download, Plus, Search } from "lucide-react";
import { Label } from "@/components/ui/label";

interface Olympiad {
  id: number;
  name: string;
  academicYear: string;
  stage: string;
  profile: string;
  date: string;
  participants: number;
}

const mockOlympiads: Olympiad[] = [
  {
    id: 1,
    name: "Всероссийская олимпиада школьников по математике",
    academicYear: "2024-2025",
    stage: "Школьный",
    profile: "Математика",
    date: "2024-10-15",
    participants: 145
  },
  {
    id: 2,
    name: "Всероссийская олимпиада школьников по информатике",
    academicYear: "2024-2025",
    stage: "Школьный",
    profile: "Информатика",
    date: "2024-10-22",
    participants: 87
  },
  {
    id: 3,
    name: "Всероссийская олимпиада школьников по физике",
    academicYear: "2024-2025",
    stage: "Муниципальный",
    profile: "Физика",
    date: "2024-11-18",
    participants: 62
  },
  {
    id: 4,
    name: "Всероссийская олимпиада школьников по химии",
    academicYear: "2024-2025",
    stage: "Школьный",
    profile: "Химия",
    date: "2024-10-25",
    participants: 54
  },
  {
    id: 5,
    name: "Всероссийская олимпиада школьников по биологии",
    academicYear: "2024-2025",
    stage: "Школьный",
    profile: "Биология",
    date: "2024-10-27",
    participants: 78
  }
];

const OlympiadsPage: React.FC = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [olympiads, setOlympiads] = useState<Olympiad[]>(mockOlympiads);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedStage, setSelectedStage] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newOlympiad, setNewOlympiad] = useState<Omit<Olympiad, 'id' | 'participants'>>({
    name: "",
    academicYear: "2024-2025",
    stage: "Школьный",
    profile: "",
    date: ""
  });

  // Filter olympiads based on search query and filters
  const filteredOlympiads = olympiads.filter(olympiad => {
    const matchesSearch = olympiad.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      olympiad.profile.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesYear = !selectedYear || olympiad.academicYear === selectedYear;
    const matchesStage = !selectedStage || olympiad.stage === selectedStage;
    
    return matchesSearch && matchesYear && matchesStage;
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewOlympiad(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setNewOlympiad(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddOlympiad = () => {
    // In a real app, this would call an API
    const newId = Math.max(...olympiads.map(o => o.id)) + 1;
    const olympiadToAdd = { 
      ...newOlympiad, 
      id: newId,
      participants: 0
    };
    
    setOlympiads(prev => [...prev, olympiadToAdd]);
    setIsDialogOpen(false);
    
    toast({
      title: "Олимпиада добавлена",
      description: `"${newOlympiad.name}" успешно добавлена в систему.`
    });
    
    // Reset form
    setNewOlympiad({
      name: "",
      academicYear: "2024-2025",
      stage: "Школьный",
      profile: "",
      date: ""
    });
  };

  const handleExportData = () => {
    // In a real app, this would generate a CSV/Excel file
    toast({
      title: "Экспорт данных",
      description: "Данные об олимпиадах успешно экспортированы."
    });
  };

  const clearFilters = () => {
    setSelectedYear(null);
    setSelectedStage(null);
    setSearchQuery("");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Award className="h-6 w-6 text-bank-blue mr-2" />
          <h1 className="text-2xl font-bold">Олимпиады</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={handleExportData}>
            <Download className="h-4 w-4 mr-2" />
            Экспорт
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Добавить олимпиаду
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Новая олимпиада</DialogTitle>
                <DialogDescription>
                  Заполните информацию о новой олимпиаде
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Название олимпиады</Label>
                  <Input 
                    id="name"
                    name="name"
                    value={newOlympiad.name}
                    onChange={handleInputChange}
                    placeholder="Введите название олимпиады"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="academicYear">Учебный год</Label>
                    <Select 
                      value={newOlympiad.academicYear} 
                      onValueChange={(value) => handleSelectChange("academicYear", value)}
                    >
                      <SelectTrigger id="academicYear">
                        <SelectValue placeholder="Выберите учебный год" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2024-2025">2024-2025</SelectItem>
                        <SelectItem value="2023-2024">2023-2024</SelectItem>
                        <SelectItem value="2022-2023">2022-2023</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="stage">Этап</Label>
                    <Select 
                      value={newOlympiad.stage} 
                      onValueChange={(value) => handleSelectChange("stage", value)}
                    >
                      <SelectTrigger id="stage">
                        <SelectValue placeholder="Выберите этап" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Школьный">Школьный</SelectItem>
                        <SelectItem value="Муниципальный">Муниципальный</SelectItem>
                        <SelectItem value="Региональный">Региональный</SelectItem>
                        <SelectItem value="Заключительный">Заключительный</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="profile">Профиль</Label>
                  <Input 
                    id="profile"
                    name="profile"
                    value={newOlympiad.profile}
                    onChange={handleInputChange}
                    placeholder="Например: Математика, Информатика и т.д."
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="date">Дата проведения</Label>
                  <Input 
                    id="date"
                    name="date"
                    type="date"
                    value={newOlympiad.date}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Отмена</Button>
                <Button onClick={handleAddOlympiad}>Сохранить</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Фильтры и поиск</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Поиск по названию или профилю..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={selectedYear || ""} onValueChange={setSelectedYear}>
              <SelectTrigger>
                <SelectValue placeholder="Учебный год" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Все годы</SelectItem>
                <SelectItem value="2024-2025">2024-2025</SelectItem>
                <SelectItem value="2023-2024">2023-2024</SelectItem>
                <SelectItem value="2022-2023">2022-2023</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStage || ""} onValueChange={setSelectedStage}>
              <SelectTrigger>
                <SelectValue placeholder="Этап" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Все этапы</SelectItem>
                <SelectItem value="Школьный">Школьный</SelectItem>
                <SelectItem value="Муниципальный">Муниципальный</SelectItem>
                <SelectItem value="Региональный">Региональный</SelectItem>
                <SelectItem value="Заключительный">Заключительный</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="mt-4 text-right">
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Сбросить фильтры
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Название</TableHead>
              <TableHead className="w-28">Уч. год</TableHead>
              <TableHead className="w-32">Этап</TableHead>
              <TableHead className="w-28">Профиль</TableHead>
              <TableHead className="w-28">Дата</TableHead>
              <TableHead className="text-right w-28">Участников</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOlympiads.map((olympiad) => (
              <TableRow key={olympiad.id}>
                <TableCell className="font-medium">{olympiad.name}</TableCell>
                <TableCell>{olympiad.academicYear}</TableCell>
                <TableCell>{olympiad.stage}</TableCell>
                <TableCell>{olympiad.profile}</TableCell>
                <TableCell>{new Date(olympiad.date).toLocaleDateString('ru-RU')}</TableCell>
                <TableCell className="text-right">{olympiad.participants}</TableCell>
              </TableRow>
            ))}
            
            {filteredOlympiads.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  <div className="flex flex-col items-center justify-center">
                    <Award className="h-8 w-8 text-gray-300 mb-2" />
                    <p>Олимпиады не найдены</p>
                    <Button variant="link" onClick={clearFilters} className="mt-2">Сбросить фильтры</Button>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        
        <div className="p-4 border-t text-sm text-gray-500">
          Показано {filteredOlympiads.length} из {olympiads.length} олимпиад
        </div>
      </div>
    </div>
  );
};

export default OlympiadsPage;
