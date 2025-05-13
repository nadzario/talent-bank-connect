
import React, { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
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
import { Award, Download, Filter, Plus, Search, Calendar, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredOlympiads, setFilteredOlympiads] = useState<Olympiad[]>(mockOlympiads);
  const [allOlympiads] = useState<Olympiad[]>(mockOlympiads);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedStage, setSelectedStage] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(!isMobile);
  const [newOlympiad, setNewOlympiad] = useState<Omit<Olympiad, 'id' | 'participants'>>({
    name: "",
    academicYear: "2024-2025",
    stage: "Школьный",
    profile: "",
    date: ""
  });
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  // Close filters by default on mobile
  useEffect(() => {
    setIsFiltersOpen(!isMobile);
  }, [isMobile]);

  const filterOlympiads = useCallback(() => {
    let filtered = [...allOlympiads];
    
    if (startDate) {
      filtered = filtered.filter(olympiad => new Date(olympiad.date) >= startDate);
    }
    
    if (endDate) {
      filtered = filtered.filter(olympiad => new Date(olympiad.date) <= endDate);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(olympiad => {
        return olympiad.name.toLowerCase().includes(query) || 
               olympiad.profile.toLowerCase().includes(query);
      });
    }
    
    if (selectedYear && selectedYear !== "all") {
      filtered = filtered.filter(olympiad => olympiad.academicYear === selectedYear);
    }
    
    if (selectedStage && selectedStage !== "all") {
      filtered = filtered.filter(olympiad => olympiad.stage === selectedStage);
    }
    
    setFilteredOlympiads(filtered);
  }, [startDate, endDate, searchQuery, selectedYear, selectedStage, allOlympiads]);

  // Apply filters whenever any filter changes
  useEffect(() => {
    filterOlympiads();
  }, [startDate, endDate, searchQuery, selectedYear, selectedStage, filterOlympiads]);

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
    const newId = Math.max(...allOlympiads.map(o => o.id)) + 1;
    const olympiadToAdd = { 
      ...newOlympiad, 
      id: newId,
      participants: 0
    };

    setFilteredOlympiads(prev => [...prev, olympiadToAdd]);
    setIsDialogOpen(false);

    toast({
      title: "Олимпиада добавлена",
      description: `"${newOlympiad.name}" успешно добавлена в систему.`,
      duration: 3000,
    });

    setNewOlympiad({
      name: "",
      academicYear: "2024-2025",
      stage: "Школьный",
      profile: "",
      date: ""
    });
  };

  const handleExportData = () => {
    toast({
      title: "Экспорт данных",
      description: "Данные об олимпиадах успешно экспортированы.",
      duration: 3000,
    });
  };

  const clearFilters = () => {
    setSelectedYear(null);
    setSelectedStage(null);
    setSearchQuery("");
    setStartDate(undefined);
    setEndDate(undefined);
    setFilteredOlympiads(allOlympiads);
  };

  const toggleFilters = () => {
    setIsFiltersOpen(!isFiltersOpen);
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2 md:mb-6">
        <div className="flex items-center space-x-3">
          <div className="bg-primary/10 p-2 rounded-lg">
            <Award className="h-5 w-5 md:h-6 md:w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold">Олимпиады</h1>
            <p className="text-xs md:text-sm text-muted-foreground">Управление олимпиадами и результатами</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            onClick={handleExportData} 
            className="gap-2 text-xs md:text-sm"
            size={isMobile ? "sm" : "default"}
          >
            <Download className="h-3 w-3 md:h-4 md:w-4" />
            {!isMobile && "Экспорт"}
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 text-xs md:text-sm" size={isMobile ? "sm" : "default"}>
                <Plus className="h-3 w-3 md:h-4 md:w-4" />
                {!isMobile && "Добавить олимпиаду"}
                {isMobile && "Добавить"}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Новая олимпиада</DialogTitle>
                <DialogDescription>
                  Заполните информацию о новой олимпиаде
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Название олимпиады</Label>
                  <Input 
                    id="name"
                    name="name"
                    value={newOlympiad.name}
                    onChange={handleInputChange}
                    placeholder="Введите название олимпиады"
                    className="w-full"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    className="w-full"
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
                    className="w-full"
                  />
                </div>
              </div>

              <DialogFooter className="pt-4">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Отмена</Button>
                <Button onClick={handleAddOlympiad}>Сохранить</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Search bar - always visible */}
      <div className="relative">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Поиск по названию или профилю..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button 
            variant="outline" 
            size="icon" 
            className="md:hidden" 
            onClick={toggleFilters}
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Filters card - can be toggled on mobile */}
      {isFiltersOpen && (
        <Card className="border-none shadow-md">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg md:text-xl">Фильтры</CardTitle>
              <CardDescription>Найдите нужные олимпиады с помощью фильтров</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearFilters} 
                className="text-primary text-xs md:text-sm"
              >
                Сбросить все фильтры
              </Button>
              {isMobile && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={toggleFilters}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="year">Учебный год</Label>
                  <Select value={selectedYear || undefined} onValueChange={(value) => setSelectedYear(value)}>
                    <SelectTrigger id="year" className="w-full">
                      <SelectValue placeholder="Выберите год" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все годы</SelectItem>
                      <SelectItem value="2024-2025">2024-2025</SelectItem>
                      <SelectItem value="2023-2024">2023-2024</SelectItem>
                      <SelectItem value="2022-2023">2022-2023</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="stage">Этап</Label>
                  <Select value={selectedStage || undefined} onValueChange={(value) => setSelectedStage(value)}>
                    <SelectTrigger id="stage" className="w-full">
                      <SelectValue placeholder="Выберите этап" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все этапы</SelectItem>
                      <SelectItem value="Школьный">Школьный</SelectItem>
                      <SelectItem value="Муниципальный">Муниципальный</SelectItem>
                      <SelectItem value="Региональный">Региональный</SelectItem>
                      <SelectItem value="Заключительный">Заключительный</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="start-date">Дата начала</Label>
                  <div className="flex items-center space-x-2 w-full border rounded-md px-3 py-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <DatePicker 
                      value={startDate} 
                      onChange={setStartDate}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="end-date">Дата окончания</Label>
                  <div className="flex items-center space-x-2 w-full border rounded-md px-3 py-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <DatePicker 
                      value={endDate} 
                      onChange={setEndDate}
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="border-none shadow-md overflow-hidden">
        {filteredOlympiads.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Award className="h-12 w-12 text-muted-foreground/40 mb-4" />
            <h3 className="text-xl font-medium mb-2">Олимпиады не найдены</h3>
            <p className="text-muted-foreground mb-4 text-center px-4">По заданным критериям не найдено ни одной олимпиады</p>
            <Button variant="outline" onClick={clearFilters}>Сбросить фильтры</Button>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-medium">Название</TableHead>
                    {!isMobile && <TableHead className="font-medium w-28">Уч. год</TableHead>}
                    <TableHead className="font-medium w-32">Этап</TableHead>
                    {!isMobile && <TableHead className="font-medium w-28">Профиль</TableHead>}
                    {!isMobile && <TableHead className="font-medium w-28">Дата</TableHead>}
                    <TableHead className="font-medium text-right w-28">Участников</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOlympiads.map((olympiad) => (
                    <TableRow 
                      key={olympiad.id}
                      className="hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                      <TableCell className="font-medium">
                        <div>
                          {olympiad.name}
                          {isMobile && (
                            <div className="text-xs text-muted-foreground mt-1">
                              {olympiad.profile} • {new Date(olympiad.date).toLocaleDateString('ru-RU')}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      {!isMobile && <TableCell>{olympiad.academicYear}</TableCell>}
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          olympiad.stage === 'Школьный' ? 'bg-green-100 text-green-800' :
                          olympiad.stage === 'Муниципальный' ? 'bg-blue-100 text-blue-800' :
                          olympiad.stage === 'Региональный' ? 'bg-purple-100 text-purple-800' :
                          'bg-amber-100 text-amber-800'
                        }`}>
                          {olympiad.stage}
                        </span>
                      </TableCell>
                      {!isMobile && <TableCell>{olympiad.profile}</TableCell>}
                      {!isMobile && <TableCell>{new Date(olympiad.date).toLocaleDateString('ru-RU')}</TableCell>}
                      <TableCell className="text-right font-medium">{olympiad.participants}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="p-3 md:p-4 border-t bg-muted/10 text-xs md:text-sm text-muted-foreground flex flex-col md:flex-row justify-between md:items-center gap-2">
              <span>Показано {filteredOlympiads.length} из {allOlympiads.length} олимпиад</span>
              <div className="flex items-center gap-2">
                <Filter className="h-3 w-3 md:h-4 md:w-4" />
                <span>{filteredOlympiads.length !== allOlympiads.length ? "Применены фильтры" : "Без фильтров"}</span>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default OlympiadsPage;
