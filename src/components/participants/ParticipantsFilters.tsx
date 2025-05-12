
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from 'lucide-react';

interface Mentor {
  id: number;
  first_name: string;
  last_name: string;
  middle_name?: string;
}

interface FiltersProps {
  mentors: Mentor[];
  statusOptions: string[];
  selectedMentor: number | null;
  selectedStatus: string | null;
  onMentorChange: (value: number | null) => void;
  onStatusChange: (value: string | null) => void;
  onReset: () => void;
  onClose: () => void;
}

const ParticipantsFilters: React.FC<FiltersProps> = ({
  mentors,
  statusOptions,
  selectedMentor,
  selectedStatus,
  onMentorChange,
  onStatusChange,
  onReset,
  onClose
}) => {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>Фильтры</CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription>Фильтруйте участников по различным параметрам</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Наставник</label>
            <Select 
              value={selectedMentor?.toString() || ""}
              onValueChange={(value) => onMentorChange(value ? Number(value) : null)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Выберите наставника" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Все наставники</SelectItem>
                {mentors.map((mentor) => (
                  <SelectItem key={mentor.id} value={mentor.id.toString()}>
                    {mentor.last_name} {mentor.first_name} {mentor.middle_name || ''}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Статус</label>
            <Select 
              value={selectedStatus || ""}
              onValueChange={(value) => onStatusChange(value || null)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Выберите статус" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Все статусы</SelectItem>
                {statusOptions.map((status) => (
                  <SelectItem key={status} value={status}>{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end border-t pt-3 space-x-2">
        <Button variant="outline" onClick={onReset}>Сбросить</Button>
      </CardFooter>
    </Card>
  );
};

export default ParticipantsFilters;
