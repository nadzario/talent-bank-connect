
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Download, Plus, Search } from "lucide-react";

// Types for our data
interface Mentor {
  id: number;
  lastName: string;
  firstName: string;
  middleName: string;
  workplace: string;
  phone?: string;
  email?: string;
}

const mockMentors: Mentor[] = [
  {
    id: 1,
    lastName: "Смирнов",
    firstName: "Алексей",
    middleName: "Викторович",
    workplace: "Школа №1",
    phone: "+7 (999) 123-45-67",
    email: "smirnov@example.com"
  },
  {
    id: 2,
    lastName: "Кузнецова",
    firstName: "Елена",
    middleName: "Павловна",
    workplace: "Лицей №2",
    phone: "+7 (999) 987-65-43",
    email: "kuznetsova@example.com"
  },
  {
    id: 3,
    lastName: "Попов",
    firstName: "Сергей",
    middleName: "Андреевич",
    workplace: "Гимназия №3",
    phone: "+7 (999) 111-22-33",
    email: "popov@example.com"
  }
];

const MentorsPage: React.FC = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [mentors, setMentors] = useState<Mentor[]>(mockMentors);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newMentor, setNewMentor] = useState<Omit<Mentor, 'id'>>({
    lastName: "",
    firstName: "",
    middleName: "",
    workplace: "",
    phone: "",
    email: ""
  });

  // Filter mentors based on search query
  const filteredMentors = mentors.filter(mentor => 
    mentor.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mentor.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mentor.middleName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mentor.workplace.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewMentor(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddMentor = () => {
    // In a real app, this would call an API
    const newId = Math.max(...mentors.map(m => m.id)) + 1;
    const mentorToAdd = { ...newMentor, id: newId };
    
    setMentors(prev => [...prev, mentorToAdd]);
    setIsDialogOpen(false);
    
    toast({
      title: "Наставник добавлен",
      description: `${newMentor.lastName} ${newMentor.firstName} успешно добавлен в систему.`
    });
    
    // Reset form
    setNewMentor({
      lastName: "",
      firstName: "",
      middleName: "",
      workplace: "",
      phone: "",
      email: ""
    });
  };

  const handleExportData = () => {
    // In a real app, this would generate a CSV/Excel file
    toast({
      title: "Экспорт данных",
      description: "Данные о наставниках успешно экспортированы."
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Наставники</h1>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={handleExportData}>
            <Download className="h-4 w-4 mr-2" />
            Экспорт
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Добавить наставника
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Новый наставник</DialogTitle>
                <DialogDescription>
                  Заполните информацию о новом наставнике
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Фамилия</label>
                  <Input 
                    name="lastName"
                    value={newMentor.lastName}
                    onChange={handleInputChange}
                    placeholder="Фамилия"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Имя</label>
                  <Input 
                    name="firstName"
                    value={newMentor.firstName}
                    onChange={handleInputChange}
                    placeholder="Имя"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Отчество</label>
                  <Input 
                    name="middleName"
                    value={newMentor.middleName}
                    onChange={handleInputChange}
                    placeholder="Отчество"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Место работы</label>
                  <Input 
                    name="workplace"
                    value={newMentor.workplace}
                    onChange={handleInputChange}
                    placeholder="Место работы"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Телефон</label>
                  <Input 
                    name="phone"
                    value={newMentor.phone}
                    onChange={handleInputChange}
                    placeholder="+7 (XXX) XXX-XX-XX"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <Input 
                    name="email"
                    type="email"
                    value={newMentor.email}
                    onChange={handleInputChange}
                    placeholder="email@example.com"
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Отмена</Button>
                <Button onClick={handleAddMentor}>Сохранить</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Поиск по ФИО или месту работы..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Фамилия</TableHead>
                <TableHead>Имя</TableHead>
                <TableHead>Отчество</TableHead>
                <TableHead>Место работы</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Телефон</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMentors.map((mentor) => (
                <TableRow key={mentor.id}>
                  <TableCell>{mentor.lastName}</TableCell>
                  <TableCell>{mentor.firstName}</TableCell>
                  <TableCell>{mentor.middleName}</TableCell>
                  <TableCell>{mentor.workplace}</TableCell>
                  <TableCell>{mentor.email}</TableCell>
                  <TableCell>{mentor.phone}</TableCell>
                </TableRow>
              ))}
              
              {filteredMentors.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4 text-gray-500">
                    Наставники не найдены
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        <div className="mt-4 text-sm text-gray-500">
          Показано {filteredMentors.length} из {mentors.length} наставников
        </div>
      </div>
    </div>
  );
};

export default MentorsPage;
