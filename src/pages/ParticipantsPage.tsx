
import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/services/api";
import { Loader2, Search, UserPlus, Edit, Trash, Download, Filter, RefreshCw, Eye } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import ParticipantForm from "@/components/participants/ParticipantForm";
import ParticipantsFilters from "@/components/participants/ParticipantsFilters";
import ParticipantCard from "@/components/participants/ParticipantCard";

export type Participant = {
  id: number;
  student_id: number;
  mentor_id: number;
  status: string;
  points: number;
  student: {
    id: number;
    last_name: string;
    first_name: string;
    middle_name?: string;
    snils: string;
    birth_date: string;
    [key: string]: any;
  };
  mentor: {
    id: number;
    last_name: string;
    first_name: string;
    middle_name?: string;
    workplace: string;
    [key: string]: any;
  };
};

const ParticipantsPage: React.FC = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const isMobile = useIsMobile();
  
  // State
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [mentorFilter, setMentorFilter] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  
  // Fetch data
  const { data: participants = [], isLoading, isError, error, refetch } = useQuery({
    queryKey: ['participants'],
    queryFn: api.getParticipations,
  });

  const { data: students = [] } = useQuery({
    queryKey: ['students'],
    queryFn: api.getStudents,
  });

  const { data: mentors = [] } = useQuery({
    queryKey: ['mentors'],
    queryFn: api.getMentors,
  });

  // Mutations
  const createMutation = useMutation({
    mutationFn: api.createParticipation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['participants'] });
      toast({
        title: "Участие добавлено",
        description: "Новая запись об участии успешно создана"
      });
      setIsCreateDialogOpen(false);
    },
    onError: (err: any) => {
      toast({
        title: "Ошибка",
        description: `Не удалось создать запись: ${err.message}`,
        variant: "destructive"
      });
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number, data: any }) => api.updateParticipation(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['participants'] });
      toast({
        title: "Участие обновлено",
        description: "Запись об участии успешно обновлена"
      });
      setIsEditDialogOpen(false);
    },
    onError: (err: any) => {
      toast({
        title: "Ошибка",
        description: `Не удалось обновить запись: ${err.message}`,
        variant: "destructive"
      });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => api.deleteParticipation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['participants'] });
      toast({
        title: "Участие удалено",
        description: "Запись об участии успешно удалена"
      });
      setIsDeleteDialogOpen(false);
    },
    onError: (err: any) => {
      toast({
        title: "Ошибка",
        description: `Не удалось удалить запись: ${err.message}`,
        variant: "destructive"
      });
    }
  });

  // Filter and search participants
  const filteredParticipants = participants.filter((participant: Participant) => {
    const matchesSearch = searchQuery === "" || 
      participant.student?.last_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      participant.student?.first_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      participant.mentor?.last_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      participant.mentor?.first_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      participant.status?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesMentor = mentorFilter === null || participant.mentor_id === mentorFilter;
    const matchesStatus = statusFilter === null || participant.status === statusFilter;
    
    return matchesSearch && matchesMentor && matchesStatus;
  });

  // Handlers
  const handleCreateParticipant = (data: any) => {
    createMutation.mutate(data);
  };

  const handleEditParticipant = (data: any) => {
    if (selectedParticipant) {
      updateMutation.mutate({ id: selectedParticipant.id, data });
    }
  };

  const handleDeleteParticipant = () => {
    if (selectedParticipant) {
      deleteMutation.mutate(selectedParticipant.id);
    }
  };

  const handleShowDetails = (participant: Participant) => {
    setSelectedParticipant(participant);
    setIsDetailsDialogOpen(true);
  };

  const handleEditClick = (participant: Participant) => {
    setSelectedParticipant(participant);
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (participant: Participant) => {
    setSelectedParticipant(participant);
    setIsDeleteDialogOpen(true);
  };

  const handleExportData = () => {
    // Export functionality
    const csv = [
      ["ID", "Фамилия ученика", "Имя ученика", "Отчество ученика", "Фамилия наставника", "Имя наставника", "Отчество наставника", "Статус", "Баллы"],
      ...filteredParticipants.map((p: Participant) => [
        p.id,
        p.student?.last_name || "",
        p.student?.first_name || "",
        p.student?.middle_name || "",
        p.mentor?.last_name || "",
        p.mentor?.first_name || "",
        p.mentor?.middle_name || "",
        p.status,
        p.points
      ])
    ]
    .map(row => row.join(","))
    .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "участники.csv";
    a.click();
    window.URL.revokeObjectURL(url);
    
    toast({
      title: "Данные экспортированы",
      description: "Данные об участии успешно экспортированы в CSV"
    });
  };

  const statusOptions = Array.from(new Set(participants.map((p: Participant) => p.status))).filter(Boolean);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Участие в проектах</h1>
        
        <div className="flex flex-wrap gap-2 w-full sm:w-auto justify-end">
          <Button 
            variant="outline" 
            size={isMobile ? "sm" : "default"}
            onClick={() => refetch()}
            className="whitespace-nowrap"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Обновить
          </Button>
          
          <Button 
            variant="outline" 
            size={isMobile ? "sm" : "default"}
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            className="whitespace-nowrap"
          >
            <Filter className="h-4 w-4 mr-2" />
            Фильтры
          </Button>
          
          <Button 
            variant="outline" 
            size={isMobile ? "sm" : "default"}
            onClick={handleExportData}
            className="whitespace-nowrap"
          >
            <Download className="h-4 w-4 mr-2" />
            Экспорт
          </Button>
          
          <Button 
            onClick={() => setIsCreateDialogOpen(true)}
            size={isMobile ? "sm" : "default"}
            className="whitespace-nowrap"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Добавить участие
          </Button>
        </div>
      </div>
      
      {isFiltersOpen && (
        <Card className="bg-gray-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Фильтры</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Наставник</label>
                <Select value={mentorFilter?.toString() || ""} onValueChange={(val) => setMentorFilter(val ? Number(val) : null)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите наставника" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Все наставники</SelectItem>
                    {mentors.map((mentor: any) => (
                      <SelectItem key={mentor.id} value={mentor.id.toString()}>
                        {mentor.last_name} {mentor.first_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Статус</label>
                <Select value={statusFilter || ""} onValueChange={(val) => setStatusFilter(val || null)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите статус" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Все статусы</SelectItem>
                    {statusOptions.map((status: string) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="relative">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Поиск по участникам, наставникам или статусу..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : isError ? (
        <Card className="bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-500">Ошибка загрузки данных</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{(error as any)?.message || "Произошла ошибка при загрузке данных"}</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => refetch()}>Повторить</Button>
          </CardFooter>
        </Card>
      ) : (
        <>
          {isMobile ? (
            <div className="space-y-4">
              {filteredParticipants.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <p className="text-muted-foreground">Участия не найдены</p>
                </div>
              ) : (
                filteredParticipants.map((participant: Participant) => (
                  <Card key={participant.id} className="overflow-hidden">
                    <CardHeader className="bg-gray-50 p-4">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">
                          {participant.student?.last_name} {participant.student?.first_name}
                        </CardTitle>
                        <div className="flex gap-1">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleShowDetails(participant)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleEditClick(participant)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleDeleteClick(participant)}
                            className="text-red-500"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="font-medium">Наставник:</p>
                          <p>{participant.mentor?.last_name} {participant.mentor?.first_name}</p>
                        </div>
                        <div>
                          <p className="font-medium">Статус:</p>
                          <p>{participant.status}</p>
                        </div>
                        <div>
                          <p className="font-medium">Баллы:</p>
                          <p>{participant.points}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          ) : (
            <div className="rounded-md border bg-white overflow-hidden">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead className="w-[200px]">Участник</TableHead>
                    <TableHead className="w-[200px]">Наставник</TableHead>
                    <TableHead className="w-[120px]">Статус</TableHead>
                    <TableHead className="w-[80px] text-center">Баллы</TableHead>
                    <TableHead className="text-right">Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredParticipants.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8">
                        Участия не найдены
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredParticipants.map((participant: Participant) => (
                      <TableRow key={participant.id}>
                        <TableCell className="font-medium">
                          {participant.student?.last_name} {participant.student?.first_name} {participant.student?.middle_name || ''}
                        </TableCell>
                        <TableCell>
                          {participant.mentor?.last_name} {participant.mentor?.first_name} {participant.mentor?.middle_name || ''}
                        </TableCell>
                        <TableCell>{participant.status}</TableCell>
                        <TableCell className="text-center">{participant.points}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm" onClick={() => handleShowDetails(participant)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleEditClick(participant)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDeleteClick(participant)} className="text-red-500">
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
          
          <div className="text-sm text-muted-foreground mt-2">
            {filteredParticipants.length > 0 && (
              <p>Показано {filteredParticipants.length} из {participants.length} записей</p>
            )}
          </div>
        </>
      )}

      {/* Create Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Добавление нового участия</DialogTitle>
            <DialogDescription>
              Заполните информацию об участии ученика в проекте с наставником
            </DialogDescription>
          </DialogHeader>
          
          <ParticipantForm 
            students={students}
            mentors={mentors}
            isLoading={createMutation.isPending}
            onSubmit={handleCreateParticipant}
            onCancel={() => setIsCreateDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Редактирование участия</DialogTitle>
            <DialogDescription>
              Измените информацию об участии
            </DialogDescription>
          </DialogHeader>
          
          {selectedParticipant && (
            <ParticipantForm 
              students={students}
              mentors={mentors}
              initialData={{
                student_id: selectedParticipant.student_id,
                mentor_id: selectedParticipant.mentor_id,
                status: selectedParticipant.status,
                points: selectedParticipant.points
              }}
              isLoading={updateMutation.isPending}
              onSubmit={handleEditParticipant}
              onCancel={() => setIsEditDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удаление записи об участии</AlertDialogTitle>
            <AlertDialogDescription>
              Вы уверены, что хотите удалить эту запись? Это действие невозможно отменить.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteParticipant}
              className="bg-red-600 hover:bg-red-700"
            >
              {deleteMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Удаление...
                </>
              ) : (
                "Удалить"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Детали участия</DialogTitle>
          </DialogHeader>
          
          {selectedParticipant && (
            <div className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Информация об участнике</h3>
                  <div className="space-y-1">
                    <p><span className="font-medium">ФИО:</span> {selectedParticipant.student?.last_name} {selectedParticipant.student?.first_name} {selectedParticipant.student?.middle_name || ''}</p>
                    <p><span className="font-medium">СНИЛС:</span> {selectedParticipant.student?.snils}</p>
                    <p><span className="font-medium">Дата рождения:</span> {new Date(selectedParticipant.student?.birth_date).toLocaleDateString('ru-RU')}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Информация о наставнике</h3>
                  <div className="space-y-1">
                    <p><span className="font-medium">ФИО:</span> {selectedParticipant.mentor?.last_name} {selectedParticipant.mentor?.first_name} {selectedParticipant.mentor?.middle_name || ''}</p>
                    <p><span className="font-medium">Место работы:</span> {selectedParticipant.mentor?.workplace}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Информация об участии</h3>
                <div className="space-y-1">
                  <p><span className="font-medium">Статус:</span> {selectedParticipant.status}</p>
                  <p><span className="font-medium">Баллы:</span> {selectedParticipant.points}</p>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDetailsDialogOpen(false)}>
                  Закрыть
                </Button>
                <Button onClick={() => {
                  setIsDetailsDialogOpen(false);
                  setIsEditDialogOpen(true);
                }}>
                  Редактировать
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ParticipantsPage;
