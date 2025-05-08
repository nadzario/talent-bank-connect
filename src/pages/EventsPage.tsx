
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarIcon, MapPin, Plus } from 'lucide-react';
import { api } from '@/services/api';
import { useToast } from '@/components/ui/use-toast';

interface Event {
  id: number;
  type: 'project' | 'olympiad';
  project?: {
    name: string;
    date: string;
    location: string;
    profile: {
      name: string;
    };
  };
  olympiad?: {
    academicYear: string;
    stage: string;
    profile: {
      name: string;
    };
  };
}

const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const data = await api.getEvents();
      setEvents(data);
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить события",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (type: string) => {
    const statusClasses = {
      project: "bg-green-100 text-green-800",
      olympiad: "bg-blue-100 text-blue-800",
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs ${statusClasses[type]}`}>
        {type === "project" ? "Проект" : "Олимпиада"}
      </span>
    );
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">События</h1>
        <Button onClick={() => {}}>
          <Plus className="h-4 w-4 mr-2" />
          Добавить событие
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map(event => (
          <Card key={event.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">
                  {event.project?.name || `Олимпиада ${event.olympiad?.academicYear}`}
                </CardTitle>
                {getStatusBadge(event.type)}
              </div>
              <CardDescription>
                {event.project ? 'Проект' : `Этап: ${event.olympiad?.stage}`}
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex flex-wrap gap-y-2 text-sm text-gray-500">
                {event.project && (
                  <>
                    <div className="flex items-center mr-4">
                      <CalendarIcon className="h-3.5 w-3.5 mr-1" />
                      <span>{new Date(event.project.date).toLocaleDateString('ru-RU')}</span>
                    </div>
                    <div className="flex items-center mr-4">
                      <MapPin className="h-3.5 w-3.5 mr-1" />
                      <span>{event.project.location}</span>
                    </div>
                  </>
                )}
                <div>
                  Профиль: {event.project?.profile.name || event.olympiad?.profile.name}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Подробнее</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
