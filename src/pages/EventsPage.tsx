
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Award, Calendar, Plus, Search, Trophy } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface Event {
  id: number;
  title: string;
  type: "olympiad" | "contest";
  status: "scheduled" | "active" | "completed";
  date: string;
  location: string;
  participants: number;
  organizer: string;
}

const eventsData: Event[] = [
  {
    id: 1,
    title: "Региональная математическая олимпиада",
    type: "olympiad",
    status: "scheduled",
    date: "15.05.2025",
    location: "Онлайн",
    participants: 158,
    organizer: "Эрудит"
  },
  {
    id: 2,
    title: "Городской конкурс проектных работ",
    type: "contest",
    status: "active",
    date: "10.05-25.05.2025",
    location: "Центр развития образования",
    participants: 47,
    organizer: "Департамент образования"
  },
  {
    id: 3,
    title: "Олимпиада по информатике",
    type: "olympiad",
    status: "scheduled",
    date: "20.05.2025",
    location: "Школа №1",
    participants: 83,
    organizer: "Эрудит"
  },
  {
    id: 4,
    title: "Конкурс художественного творчества",
    type: "contest",
    status: "active",
    date: "01.05-30.05.2025",
    location: "Дом творчества",
    participants: 112,
    organizer: "Департамент культуры"
  },
  {
    id: 5,
    title: "Олимпиада по физике",
    type: "olympiad",
    status: "completed",
    date: "28.04.2025",
    location: "Лицей №2",
    participants: 76,
    organizer: "Эрудит"
  },
  {
    id: 6,
    title: "Конкурс научных проектов",
    type: "contest",
    status: "scheduled",
    date: "10.06.2025",
    location: "Технопарк",
    participants: 35,
    organizer: "Муниципалитет"
  },
  {
    id: 7,
    title: "Олимпиада по английскому языку",
    type: "olympiad",
    status: "completed",
    date: "25.04.2025",
    location: "Гимназия №3",
    participants: 92,
    organizer: "Департамент образования"
  }
];

const EventsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  
  const filteredEvents = activeTab === "all" 
    ? eventsData 
    : eventsData.filter(event => event.type === activeTab);

  const getStatusBadge = (status: Event["status"]) => {
    switch (status) {
      case "scheduled":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">Запланировано</Badge>;
      case "active":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">Активно</Badge>;
      case "completed":
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-300">Завершено</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Calendar className="h-6 w-6 text-bank-blue mr-2" />
          <h1 className="text-2xl font-bold">Мероприятия</h1>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Добавить мероприятие
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Всего мероприятий</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{eventsData.length}</div>
            <div className="text-sm text-muted-foreground mt-1">
              За текущий год
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Олимпиады</CardTitle>
              <Award className="h-5 w-5 text-bank-blue" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {eventsData.filter(event => event.type === "olympiad").length}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              Плановых: {eventsData.filter(event => event.type === "olympiad" && event.status === "scheduled").length}
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Конкурсы</CardTitle>
              <Trophy className="h-5 w-5 text-bank-blue" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {eventsData.filter(event => event.type === "contest").length}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              Активных: {eventsData.filter(event => event.type === "contest" && event.status === "active").length}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Список мероприятий</CardTitle>
          <CardDescription>
            Полный список олимпиад и конкурсов в системе
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex items-center justify-between mb-4">
              <TabsList>
                <TabsTrigger value="all">Все мероприятия</TabsTrigger>
                <TabsTrigger value="olympiad">Олимпиады</TabsTrigger>
                <TabsTrigger value="contest">Конкурсы</TabsTrigger>
              </TabsList>
              
              <div className="relative w-[250px]">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Поиск мероприятий..." 
                  className="pl-8" 
                />
              </div>
            </div>
            
            <TabsContent value={activeTab}>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Название</TableHead>
                      <TableHead>Тип</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead>Дата</TableHead>
                      <TableHead>Место проведения</TableHead>
                      <TableHead className="text-center">Участников</TableHead>
                      <TableHead className="text-right">Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEvents.map((event) => (
                      <TableRow key={event.id}>
                        <TableCell className="font-medium">{event.title}</TableCell>
                        <TableCell>
                          {event.type === "olympiad" ? "Олимпиада" : "Конкурс"}
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(event.status)}
                        </TableCell>
                        <TableCell>{event.date}</TableCell>
                        <TableCell>{event.location}</TableCell>
                        <TableCell className="text-center">{event.participants}</TableCell>
                        <TableCell className="text-right">
                          <Link to={event.type === "olympiad" ? `/olympiads/${event.id}` : `/projects/${event.id}`}>
                            <Button variant="ghost" size="sm">
                              Подробнее
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventsPage;
