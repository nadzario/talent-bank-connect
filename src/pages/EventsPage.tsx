
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarIcon, MapPin, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Event } from '@/services/mockEvents';
import { api } from '@/services/api';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem,
  CarouselNext,
  CarouselPrevious 
} from '@/components/ui/carousel';

const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      try {
        const eventsData = await api.getEvents();
        setEvents(eventsData);
      } catch (error) {
        console.error('Error fetching events:', error);
        toast({
          title: "Ошибка загрузки",
          description: "Не удалось загрузить события",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    }
    
    fetchEvents();
  }, [toast]);

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

  const handleAddEvent = () => {
    toast({
      title: "Добавление события",
      description: "Функциональность добавления событий в разработке",
    });
  };

  if (loading) {
    return <div className="py-10 text-center">Загрузка событий...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">События</h1>
        <Button onClick={handleAddEvent}>
          <Plus className="h-4 w-4 mr-2" />
          Добавить событие
        </Button>
      </div>

      {events.length > 0 ? (
        <div className="py-6">
          <h2 className="text-xl font-semibold mb-4">Актуальные события</h2>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {events.slice(0, 5).map((event) => (
                <CarouselItem key={event.id} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="h-full">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">
                          {event.title}
                        </CardTitle>
                        {getStatusBadge(event.type)}
                      </div>
                      <CardDescription>
                        {event.type === 'project' ? 'Проект' : `Этап: ${event.stage}`}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex flex-wrap gap-y-2 text-sm text-gray-500">
                        {event.type === 'project' && event.date && (
                          <div className="flex items-center mr-4">
                            <CalendarIcon className="h-3.5 w-3.5 mr-1" />
                            <span>{new Date(event.date).toLocaleDateString('ru-RU')}</span>
                          </div>
                        )}
                        {event.type === 'project' && event.location && (
                          <div className="flex items-center mr-4">
                            <MapPin className="h-3.5 w-3.5 mr-1" />
                            <span>{event.location}</span>
                          </div>
                        )}
                        {event.type === 'olympiad' && event.academicYear && (
                          <div className="flex items-center mr-4">
                            <CalendarIcon className="h-3.5 w-3.5 mr-1" />
                            <span>{event.academicYear}</span>
                          </div>
                        )}
                        <div>
                          Профиль: {event.profile}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">Подробнее</Button>
                    </CardFooter>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map(event => (
          <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">
                  {event.title}
                </CardTitle>
                {getStatusBadge(event.type)}
              </div>
              <CardDescription>
                {event.type === 'project' ? 'Проект' : `Этап: ${event.stage}`}
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex flex-wrap gap-y-2 text-sm text-gray-500">
                {event.type === 'project' && event.date && (
                  <div className="flex items-center mr-4">
                    <CalendarIcon className="h-3.5 w-3.5 mr-1" />
                    <span>{new Date(event.date).toLocaleDateString('ru-RU')}</span>
                  </div>
                )}
                {event.type === 'project' && event.location && (
                  <div className="flex items-center mr-4">
                    <MapPin className="h-3.5 w-3.5 mr-1" />
                    <span>{event.location}</span>
                  </div>
                )}
                {event.type === 'olympiad' && event.academicYear && (
                  <div className="flex items-center mr-4">
                    <CalendarIcon className="h-3.5 w-3.5 mr-1" />
                    <span>{event.academicYear}</span>
                  </div>
                )}
                <div>
                  Профиль: {event.profile}
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
