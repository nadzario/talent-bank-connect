
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, MapPin, Users, Search } from "lucide-react";
import { api } from "@/services/api";
import { Event } from "@/services/api/eventService";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/date-picker";
import { useToast } from "@/hooks/use-toast";

const ProjectsPage = () => {
  const [selectedProject, setSelectedProject] = useState<Event | null>(null);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [projects, setProjects] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const events = await api.getEvents();
        // Filter only project type events
        const projectEvents = events.filter(event => event.type === 'project');
        setProjects(projectEvents);
      } catch (error) {
        console.error('Error fetching projects:', error);
        toast({
          title: "Ошибка загрузки",
          description: "Не удалось загрузить проекты",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [toast]);

  const handleDetailsClick = (project: Event) => {
    setSelectedProject(project);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('ru-RU');
  };

  if (loading) {
    return <div className="py-10 text-center">Загрузка проектов...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Конкурсы</h1>
        <div className="flex gap-4">
          <DatePicker
            selected={startDate}
            onSelect={setStartDate}
            placeholder="С даты"
          />
          <DatePicker
            selected={endDate}
            onSelect={setEndDate}
            placeholder="По дату"
          />
        </div>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-lg text-muted-foreground">Проекты не найдены</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <Card key={project.id}>
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>
                  <div className="flex items-center space-x-2">
                    <CalendarIcon className="h-4 w-4" />
                    <span>{project.date ? formatDate(project.date) : 'Дата не указана'}</span>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>{project.location || 'Место не указано'}</span>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <Users className="h-4 w-4" />
                  <span>Профиль: {project.profile}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleDetailsClick(project)}
                >
                  Подробнее
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedProject?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium">Профиль</h4>
              <p>{selectedProject?.profile}</p>
            </div>
            <div>
              <h4 className="font-medium">Дата проведения</h4>
              <p>{selectedProject?.date ? formatDate(selectedProject.date) : 'Не указана'}</p>
            </div>
            <div>
              <h4 className="font-medium">Место проведения</h4>
              <p>{selectedProject?.location || 'Не указано'}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectsPage;
