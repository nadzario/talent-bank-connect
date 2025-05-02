
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, Info, MapPin, Plus, Search, User, Users } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface EducationalProject {
  id: number;
  name: string;
  date: string;
  location: string;
  profile: string;
  description: string;
  participants: number;
  status: "upcoming" | "active" | "completed";
}

const mockProjects: EducationalProject[] = [
  {
    id: 1,
    name: "Летняя школа программирования",
    date: "2025-06-15",
    location: "IT-Центр",
    profile: "Информатика",
    description: "Интенсивный двухнедельный курс программирования для школьников 8-11 классов",
    participants: 45,
    status: "upcoming"
  },
  {
    id: 2,
    name: "Экспериментальная физическая лаборатория",
    date: "2025-05-20",
    location: "Научный центр",
    profile: "Физика",
    description: "Серия практических занятий по физике с проведением экспериментов",
    participants: 32,
    status: "upcoming"
  },
  {
    id: 3,
    name: "Математический клуб 'Эврика'",
    date: "2025-05-05",
    location: "Школа №1",
    profile: "Математика",
    description: "Еженедельные встречи для решения олимпиадных задач по математике",
    participants: 28,
    status: "active"
  },
  {
    id: 4,
    name: "Клуб юных химиков",
    date: "2025-03-10",
    location: "Химическая лаборатория",
    profile: "Химия",
    description: "Практические занятия по химии с проведением опытов и экспериментов",
    participants: 24,
    status: "completed"
  },
  {
    id: 5,
    name: "Школа юного биолога",
    date: "2025-02-15",
    location: "Экоцентр",
    profile: "Биология",
    description: "Изучение флоры и фауны родного края, практические занятия",
    participants: 36,
    status: "completed"
  }
];

const ProjectsPage: React.FC = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [projects, setProjects] = useState<EducationalProject[]>(mockProjects);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newProject, setNewProject] = useState<Omit<EducationalProject, 'id' | 'participants' | 'status'>>({
    name: "",
    date: "",
    location: "",
    profile: "",
    description: ""
  });
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  // Filter projects based on search query and status filter
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.profile.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = !selectedStatus || project.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProject(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddProject = () => {
    // In a real app, this would call an API
    const newId = Math.max(...projects.map(p => p.id)) + 1;
    const projectToAdd = { 
      ...newProject, 
      id: newId, 
      participants: 0,
      status: "upcoming" as const
    };
    
    setProjects(prev => [...prev, projectToAdd]);
    setIsDialogOpen(false);
    
    toast({
      title: "Проект добавлен",
      description: `"${newProject.name}" успешно добавлен в систему.`
    });
    
    // Reset form
    setNewProject({
      name: "",
      date: "",
      location: "",
      profile: "",
      description: ""
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <Badge variant="secondary">Предстоящий</Badge>;
      case 'active':
        return <Badge variant="default" className="bg-green-500">Активный</Badge>;
      case 'completed':
        return <Badge variant="outline">Завершен</Badge>;
      default:
        return null;
    }
  };

  const filterByStatus = (status: string | null) => {
    setSelectedStatus(status);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Info className="h-6 w-6 text-bank-blue mr-2" />
          <h1 className="text-2xl font-bold">Образовательные проекты</h1>
        </div>
        <div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Добавить проект
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Новый образовательный проект</DialogTitle>
                <DialogDescription>
                  Заполните информацию о новом проекте
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Название проекта</Label>
                  <Input 
                    id="name"
                    name="name"
                    value={newProject.name}
                    onChange={handleInputChange}
                    placeholder="Введите название проекта"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Дата проведения</Label>
                    <Input 
                      id="date"
                      name="date"
                      type="date"
                      value={newProject.date}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="profile">Профиль</Label>
                    <Input 
                      id="profile"
                      name="profile"
                      value={newProject.profile}
                      onChange={handleInputChange}
                      placeholder="Например: Математика"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Место проведения</Label>
                  <Input 
                    id="location"
                    name="location"
                    value={newProject.location}
                    onChange={handleInputChange}
                    placeholder="Введите место проведения"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Описание</Label>
                  <Textarea 
                    id="description"
                    name="description"
                    value={newProject.description}
                    onChange={handleInputChange}
                    placeholder="Введите описание проекта"
                    className="min-h-[100px]"
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Отмена</Button>
                <Button onClick={handleAddProject}>Сохранить</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 items-start">
        <div className="w-full sm:w-64 bg-white rounded-lg shadow p-4 space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-3">Фильтры</h3>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Поиск проекта..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <h4 className="text-sm font-medium mb-2">Статус</h4>
            <div className="space-y-2">
              <Button 
                variant={!selectedStatus ? "default" : "outline"}
                className="w-full justify-start"
                onClick={() => filterByStatus(null)}
              >
                Все проекты
              </Button>
              <Button 
                variant={selectedStatus === "active" ? "default" : "outline"}
                className="w-full justify-start"
                onClick={() => filterByStatus("active")}
              >
                Активные
              </Button>
              <Button 
                variant={selectedStatus === "upcoming" ? "default" : "outline"}
                className="w-full justify-start"
                onClick={() => filterByStatus("upcoming")}
              >
                Предстоящие
              </Button>
              <Button 
                variant={selectedStatus === "completed" ? "default" : "outline"}
                className="w-full justify-start"
                onClick={() => filterByStatus("completed")}
              >
                Завершенные
              </Button>
            </div>
          </div>
          
          <div className="pt-4 border-t">
            <h4 className="text-sm font-medium mb-2">Статистика</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Всего проектов:</span>
                <span className="font-medium">{projects.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Активных:</span>
                <span className="font-medium">{projects.filter(p => p.status === "active").length}</span>
              </div>
              <div className="flex justify-between">
                <span>Предстоящих:</span>
                <span className="font-medium">{projects.filter(p => p.status === "upcoming").length}</span>
              </div>
              <div className="flex justify-between">
                <span>Завершенных:</span>
                <span className="font-medium">{projects.filter(p => p.status === "completed").length}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredProjects.length > 0 ? (
            filteredProjects.map(project => (
              <Card key={project.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    {getStatusBadge(project.status)}
                  </div>
                  <CardDescription>{project.profile}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-y-2 text-sm text-gray-500">
                    <div className="flex items-center mr-4">
                      <CalendarIcon className="h-3.5 w-3.5 mr-1" />
                      <span>{new Date(project.date).toLocaleDateString('ru-RU')}</span>
                    </div>
                    <div className="flex items-center mr-4">
                      <MapPin className="h-3.5 w-3.5 mr-1" />
                      <span>{project.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-3.5 w-3.5 mr-1" />
                      <span>{project.participants} участников</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-2">
                  <Button variant="outline" size="sm" className="w-full">Подробнее</Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center bg-white rounded-lg shadow p-12">
              <Info className="h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-xl font-medium mb-2">Проекты не найдены</h3>
              <p className="text-gray-500 text-center mb-4">
                Не удалось найти проекты, соответствующие заданным критериям.
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedStatus(null);
                }}
              >
                Сбросить фильтры
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
