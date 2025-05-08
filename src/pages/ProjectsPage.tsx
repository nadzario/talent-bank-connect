
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, MapPin, Users, Search } from "lucide-react";
import { api } from "@/services/api";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/date-picker";

interface Project {
  id: number;
  name: string;
  date: string;
  location: string;
  description: string;
  participants: number;
}

const ProjectsPage = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [projects, setProjects] = useState<Project[]>([]);

  const handleDetailsClick = (project: Project) => {
    setSelectedProject(project);
  };

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(project => (
          <Card key={project.id}>
            <CardHeader>
              <CardTitle>{project.name}</CardTitle>
              <CardDescription>
                <div className="flex items-center space-x-2">
                  <CalendarIcon className="h-4 w-4" />
                  <span>{new Date(project.date).toLocaleDateString('ru-RU')}</span>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>{project.location}</span>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <Users className="h-4 w-4" />
                <span>{project.participants} участников</span>
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

      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedProject?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium">Описание</h4>
              <p>{selectedProject?.description}</p>
            </div>
            <div>
              <h4 className="font-medium">Дата проведения</h4>
              <p>{selectedProject && new Date(selectedProject.date).toLocaleDateString('ru-RU')}</p>
            </div>
            <div>
              <h4 className="font-medium">Место проведения</h4>
              <p>{selectedProject?.location}</p>
            </div>
            <div>
              <h4 className="font-medium">Количество участников</h4>
              <p>{selectedProject?.participants}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectsPage;
