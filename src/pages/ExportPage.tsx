
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
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Download, FileText, Table as TableIcon, Users } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const ExportPage: React.FC = () => {
  const { toast } = useToast();
  const [exportFormat, setExportFormat] = useState("excel");
  const [currentTab, setCurrentTab] = useState("participants");
  
  // Selected fields for each entity
  const [selectedParticipantFields, setSelectedParticipantFields] = useState<string[]>([
    "snils", "lastName", "firstName", "middleName", "birthDate", "phone", "email"
  ]);
  
  const [selectedMentorFields, setSelectedMentorFields] = useState<string[]>([
    "lastName", "firstName", "middleName", "workplace", "phone", "email"
  ]);
  
  const [selectedEventFields, setSelectedEventFields] = useState<string[]>([
    "name", "type", "date", "location", "profile"
  ]);

  const handleExportData = () => {
    // In a real app, this would generate a file based on selections
    toast({
      title: "Экспорт данных",
      description: `Данные успешно экспортированы в формате ${exportFormat === "excel" ? "Excel" : exportFormat === "csv" ? "CSV" : "JSON"}.`,
      duration: 3000,
    });
  };

  const toggleParticipantField = (field: string) => {
    setSelectedParticipantFields(prev => 
      prev.includes(field) 
        ? prev.filter(f => f !== field) 
        : [...prev, field]
    );
  };
  
  const toggleMentorField = (field: string) => {
    setSelectedMentorFields(prev => 
      prev.includes(field) 
        ? prev.filter(f => f !== field) 
        : [...prev, field]
    );
  };
  
  const toggleEventField = (field: string) => {
    setSelectedEventFields(prev => 
      prev.includes(field) 
        ? prev.filter(f => f !== field) 
        : [...prev, field]
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Экспорт данных</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Выберите данные для экспорта</CardTitle>
              <CardDescription>
                Укажите, какие данные вы хотите выгрузить из системы
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={currentTab} onValueChange={setCurrentTab}>
                <TabsList className="mb-6">
                  <TabsTrigger value="participants" className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    Участники
                  </TabsTrigger>
                  <TabsTrigger value="mentors" className="flex items-center">
                    <TableIcon className="h-4 w-4 mr-2" />
                    Наставники
                  </TabsTrigger>
                  <TabsTrigger value="events" className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    Мероприятия
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="participants">
                  <div className="space-y-4">
                    <div className="text-sm font-medium">Выберите поля для экспорта:</div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="participants-snils" 
                          checked={selectedParticipantFields.includes("snils")}
                          onCheckedChange={() => toggleParticipantField("snils")}
                        />
                        <Label htmlFor="participants-snils">СНИЛС</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="participants-lastName" 
                          checked={selectedParticipantFields.includes("lastName")}
                          onCheckedChange={() => toggleParticipantField("lastName")}
                        />
                        <Label htmlFor="participants-lastName">Фамилия</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="participants-firstName" 
                          checked={selectedParticipantFields.includes("firstName")}
                          onCheckedChange={() => toggleParticipantField("firstName")}
                        />
                        <Label htmlFor="participants-firstName">Имя</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="participants-middleName" 
                          checked={selectedParticipantFields.includes("middleName")}
                          onCheckedChange={() => toggleParticipantField("middleName")}
                        />
                        <Label htmlFor="participants-middleName">Отчество</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="participants-birthDate" 
                          checked={selectedParticipantFields.includes("birthDate")}
                          onCheckedChange={() => toggleParticipantField("birthDate")}
                        />
                        <Label htmlFor="participants-birthDate">Дата рождения</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="participants-phone" 
                          checked={selectedParticipantFields.includes("phone")}
                          onCheckedChange={() => toggleParticipantField("phone")}
                        />
                        <Label htmlFor="participants-phone">Телефон</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="participants-email" 
                          checked={selectedParticipantFields.includes("email")}
                          onCheckedChange={() => toggleParticipantField("email")}
                        />
                        <Label htmlFor="participants-email">Email</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="participants-representative" 
                          checked={selectedParticipantFields.includes("representativeName")}
                          onCheckedChange={() => toggleParticipantField("representativeName")}
                        />
                        <Label htmlFor="participants-representative">Законный представитель</Label>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="mentors">
                  <div className="space-y-4">
                    <div className="text-sm font-medium">Выберите поля для экспорта:</div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="mentors-lastName" 
                          checked={selectedMentorFields.includes("lastName")}
                          onCheckedChange={() => toggleMentorField("lastName")}
                        />
                        <Label htmlFor="mentors-lastName">Фамилия</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="mentors-firstName" 
                          checked={selectedMentorFields.includes("firstName")}
                          onCheckedChange={() => toggleMentorField("firstName")}
                        />
                        <Label htmlFor="mentors-firstName">Имя</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="mentors-middleName" 
                          checked={selectedMentorFields.includes("middleName")}
                          onCheckedChange={() => toggleMentorField("middleName")}
                        />
                        <Label htmlFor="mentors-middleName">Отчество</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="mentors-workplace" 
                          checked={selectedMentorFields.includes("workplace")}
                          onCheckedChange={() => toggleMentorField("workplace")}
                        />
                        <Label htmlFor="mentors-workplace">Место работы</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="mentors-phone" 
                          checked={selectedMentorFields.includes("phone")}
                          onCheckedChange={() => toggleMentorField("phone")}
                        />
                        <Label htmlFor="mentors-phone">Телефон</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="mentors-email" 
                          checked={selectedMentorFields.includes("email")}
                          onCheckedChange={() => toggleMentorField("email")}
                        />
                        <Label htmlFor="mentors-email">Email</Label>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="events">
                  <div className="space-y-4">
                    <div className="text-sm font-medium">Выберите поля для экспорта:</div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="events-name" 
                          checked={selectedEventFields.includes("name")}
                          onCheckedChange={() => toggleEventField("name")}
                        />
                        <Label htmlFor="events-name">Название</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="events-type" 
                          checked={selectedEventFields.includes("type")}
                          onCheckedChange={() => toggleEventField("type")}
                        />
                        <Label htmlFor="events-type">Тип</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="events-date" 
                          checked={selectedEventFields.includes("date")}
                          onCheckedChange={() => toggleEventField("date")}
                        />
                        <Label htmlFor="events-date">Дата</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="events-location" 
                          checked={selectedEventFields.includes("location")}
                          onCheckedChange={() => toggleEventField("location")}
                        />
                        <Label htmlFor="events-location">Место проведения</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="events-profile" 
                          checked={selectedEventFields.includes("profile")}
                          onCheckedChange={() => toggleEventField("profile")}
                        />
                        <Label htmlFor="events-profile">Профиль</Label>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Параметры экспорта</CardTitle>
              <CardDescription>
                Выберите формат и другие настройки
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Формат файла</Label>
                <Select value={exportFormat} onValueChange={setExportFormat}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите формат" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                    <SelectItem value="csv">CSV (.csv)</SelectItem>
                    <SelectItem value="json">JSON (.json)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                onClick={handleExportData}
                className="w-full"
                disabled={
                  (currentTab === "participants" && selectedParticipantFields.length === 0) ||
                  (currentTab === "mentors" && selectedMentorFields.length === 0) ||
                  (currentTab === "events" && selectedEventFields.length === 0)
                }
              >
                <Download className="h-4 w-4 mr-2" />
                Экспортировать данные
              </Button>
              
              <div className="rounded-md bg-blue-50 p-3 text-sm text-blue-800">
                <div className="flex">
                  <FileText className="h-5 w-5 mr-3 flex-shrink-0 text-blue-800" />
                  <div>
                    <p className="font-medium">Информация</p>
                    <p className="mt-1">
                      Экспорт данных выполняется с учетом прав доступа. 
                      Персональная информация будет экспортирована в соответствии с законодательством 
                      о защите персональных данных.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ExportPage;
