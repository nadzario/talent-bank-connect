
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
interface Participant {
  id: number;
  snils: string;
  lastName: string;
  firstName: string;
  middleName: string;
  birthDate: string;
  phone: string;
  email: string;
  representativeName: string;
  representativePhone: string;
  representativeEmail: string;
  schoolId: number;
  classId: number;
}

const mockParticipants: Participant[] = [
  {
    id: 1,
    snils: "123-456-789 00",
    lastName: "Иванов",
    firstName: "Иван",
    middleName: "Иванович",
    birthDate: "2012-05-15",
    phone: "+7 (999) 123-45-67",
    email: "ivanov@example.com",
    representativeName: "Иванова Мария Петровна",
    representativePhone: "+7 (999) 987-65-43",
    representativeEmail: "ivanova@example.com",
    schoolId: 1,
    classId: 1
  },
  {
    id: 2,
    snils: "987-654-321 00",
    lastName: "Петров",
    firstName: "Петр",
    middleName: "Петрович",
    birthDate: "2011-10-22",
    phone: "+7 (999) 111-22-33",
    email: "petrov@example.com",
    representativeName: "Петрова Анна Ивановна",
    representativePhone: "+7 (999) 444-55-66",
    representativeEmail: "petrova@example.com",
    schoolId: 2,
    classId: 2
  },
  {
    id: 3,
    snils: "111-222-333 00",
    lastName: "Сидорова",
    firstName: "Анна",
    middleName: "Александровна",
    birthDate: "2013-03-07",
    phone: "+7 (999) 777-88-99",
    email: "sidorova@example.com",
    representativeName: "Сидоров Александр Петрович",
    representativePhone: "+7 (999) 555-44-33",
    representativeEmail: "sidorov@example.com",
    schoolId: 1,
    classId: 3
  }
];

const ParticipantsPage: React.FC = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [participants, setParticipants] = useState<Participant[]>(mockParticipants);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newParticipant, setNewParticipant] = useState<Omit<Participant, 'id'>>({
    snils: "",
    lastName: "",
    firstName: "",
    middleName: "",
    birthDate: "",
    phone: "",
    email: "",
    representativeName: "",
    representativePhone: "",
    representativeEmail: "",
    schoolId: 1,
    classId: 1
  });

  // Filter participants based on search query
  const filteredParticipants = participants.filter(participant => 
    participant.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    participant.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    participant.middleName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    participant.snils.includes(searchQuery)
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewParticipant(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddParticipant = () => {
    // In a real app, this would call an API
    const newId = Math.max(...participants.map(p => p.id)) + 1;
    const participantToAdd = { ...newParticipant, id: newId };
    
    setParticipants(prev => [...prev, participantToAdd]);
    setIsDialogOpen(false);
    
    toast({
      title: "Участник добавлен",
      description: `${newParticipant.lastName} ${newParticipant.firstName} успешно добавлен в систему.`
    });
    
    // Reset form
    setNewParticipant({
      snils: "",
      lastName: "",
      firstName: "",
      middleName: "",
      birthDate: "",
      phone: "",
      email: "",
      representativeName: "",
      representativePhone: "",
      representativeEmail: "",
      schoolId: 1,
      classId: 1
    });
  };

  const handleExportData = () => {
    // In a real app, this would generate a CSV/Excel file
    toast({
      title: "Экспорт данных",
      description: "Данные об участниках успешно экспортированы."
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Участники</h1>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={handleExportData}>
            <Download className="h-4 w-4 mr-2" />
            Экспорт
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Добавить участника
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Новый участник</DialogTitle>
                <DialogDescription>
                  Заполните информацию о новом участнике
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">СНИЛС</label>
                  <Input 
                    name="snils"
                    value={newParticipant.snils}
                    onChange={handleInputChange}
                    placeholder="XXX-XXX-XXX XX"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Фамилия</label>
                  <Input 
                    name="lastName"
                    value={newParticipant.lastName}
                    onChange={handleInputChange}
                    placeholder="Фамилия"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Имя</label>
                  <Input 
                    name="firstName"
                    value={newParticipant.firstName}
                    onChange={handleInputChange}
                    placeholder="Имя"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Отчество</label>
                  <Input 
                    name="middleName"
                    value={newParticipant.middleName}
                    onChange={handleInputChange}
                    placeholder="Отчество"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Дата рождения</label>
                  <Input 
                    name="birthDate"
                    type="date"
                    value={newParticipant.birthDate}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Телефон</label>
                  <Input 
                    name="phone"
                    value={newParticipant.phone}
                    onChange={handleInputChange}
                    placeholder="+7 (XXX) XXX-XX-XX"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <Input 
                    name="email"
                    type="email"
                    value={newParticipant.email}
                    onChange={handleInputChange}
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">ФИО законного представителя</label>
                  <Input 
                    name="representativeName"
                    value={newParticipant.representativeName}
                    onChange={handleInputChange}
                    placeholder="ФИО представителя"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Телефон представителя</label>
                  <Input 
                    name="representativePhone"
                    value={newParticipant.representativePhone}
                    onChange={handleInputChange}
                    placeholder="+7 (XXX) XXX-XX-XX"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Email представителя</label>
                  <Input 
                    name="representativeEmail"
                    type="email"
                    value={newParticipant.representativeEmail}
                    onChange={handleInputChange}
                    placeholder="email@example.com"
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Отмена</Button>
                <Button onClick={handleAddParticipant}>Сохранить</Button>
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
              placeholder="Поиск по ФИО или СНИЛС..."
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
                <TableHead className="w-[100px]">СНИЛС</TableHead>
                <TableHead>Фамилия</TableHead>
                <TableHead>Имя</TableHead>
                <TableHead>Отчество</TableHead>
                <TableHead className="w-[120px]">Дата рождения</TableHead>
                <TableHead>Email</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredParticipants.map((participant) => (
                <TableRow key={participant.id}>
                  <TableCell>{participant.snils}</TableCell>
                  <TableCell>{participant.lastName}</TableCell>
                  <TableCell>{participant.firstName}</TableCell>
                  <TableCell>{participant.middleName}</TableCell>
                  <TableCell>{new Date(participant.birthDate).toLocaleDateString('ru-RU')}</TableCell>
                  <TableCell>{participant.email}</TableCell>
                </TableRow>
              ))}
              
              {filteredParticipants.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4 text-gray-500">
                    Участники не найдены
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        <div className="mt-4 text-sm text-gray-500">
          Показано {filteredParticipants.length} из {participants.length} участников
        </div>
      </div>
    </div>
  );
};

export default ParticipantsPage;
