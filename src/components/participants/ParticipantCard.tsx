
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Eye, Trash } from 'lucide-react';
import { type Participant } from '@/pages/ParticipantsPage';

interface ParticipantCardProps {
  participant: Participant;
  onView: (participant: Participant) => void;
  onEdit: (participant: Participant) => void;
  onDelete: (participant: Participant) => void;
}

const ParticipantCard: React.FC<ParticipantCardProps> = ({
  participant,
  onView,
  onEdit,
  onDelete
}) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gray-50 p-4">
        <div className="flex justify-between">
          <div>
            <h3 className="font-medium">
              {participant.student?.last_name} {participant.student?.first_name}
            </h3>
            <p className="text-sm text-muted-foreground">СНИЛС: {participant.student?.snils}</p>
          </div>
          <div className="text-right">
            <div className="font-medium">{participant.status}</div>
            <div className="text-sm">{participant.points} баллов</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="text-sm">
          <div className="mb-2">
            <span className="font-medium">Наставник:</span> {participant.mentor?.last_name} {participant.mentor?.first_name}
          </div>
          <div>
            <span className="font-medium">Место работы:</span> {participant.mentor?.workplace}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 p-3 bg-gray-50 border-t">
        <Button variant="ghost" size="sm" onClick={() => onView(participant)}>
          <Eye className="h-4 w-4 mr-1" />
          Детали
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onEdit(participant)}>
          <Edit className="h-4 w-4 mr-1" />
          Изменить
        </Button>
        <Button variant="ghost" size="sm" className="text-red-600" onClick={() => onDelete(participant)}>
          <Trash className="h-4 w-4 mr-1" />
          Удалить
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ParticipantCard;
