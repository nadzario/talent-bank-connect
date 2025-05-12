
import React from "react";
import { useForm } from "react-hook-form";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Validation schema
const participantSchema = z.object({
  student_id: z.number({
    required_error: "Выберите ученика",
    invalid_type_error: "Выберите ученика",
  }),
  mentor_id: z.number({
    required_error: "Выберите наставника",
    invalid_type_error: "Выберите наставника",
  }),
  status: z.string().min(1, "Укажите статус"),
  points: z.coerce.number().int().min(0, "Баллы не могут быть отрицательными")
});

type ParticipantFormValues = z.infer<typeof participantSchema>;

interface Student {
  id: number;
  last_name: string;
  first_name: string;
  middle_name?: string;
  [key: string]: any;
}

interface Mentor {
  id: number;
  last_name: string;
  first_name: string;
  middle_name?: string;
  workplace: string;
  [key: string]: any;
}

interface ParticipantFormProps {
  students: Student[];
  mentors: Mentor[];
  initialData?: Partial<ParticipantFormValues>;
  isLoading?: boolean;
  onSubmit: (data: ParticipantFormValues) => void;
  onCancel: () => void;
}

const ParticipantForm: React.FC<ParticipantFormProps> = ({
  students,
  mentors,
  initialData,
  isLoading = false,
  onSubmit,
  onCancel
}) => {
  // Default values
  const defaultValues = {
    student_id: initialData?.student_id || undefined,
    mentor_id: initialData?.mentor_id || undefined,
    status: initialData?.status || "",
    points: initialData?.points || 0
  };

  // Form definition
  const form = useForm<ParticipantFormValues>({
    resolver: zodResolver(participantSchema),
    defaultValues
  });

  // Submit handler
  const handleSubmit = (values: ParticipantFormValues) => {
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="student_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ученик</FormLabel>
              <Select
                disabled={isLoading}
                value={field.value?.toString()}
                onValueChange={(value) => field.onChange(Number(value))}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите ученика" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="max-h-[200px]">
                  {students.map((student) => (
                    <SelectItem key={student.id} value={student.id.toString()}>
                      {student.last_name} {student.first_name} {student.middle_name || ''}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="mentor_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Наставник</FormLabel>
              <Select
                disabled={isLoading}
                value={field.value?.toString()}
                onValueChange={(value) => field.onChange(Number(value))}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите наставника" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="max-h-[200px]">
                  {mentors.map((mentor) => (
                    <SelectItem key={mentor.id} value={mentor.id.toString()}>
                      {mentor.last_name} {mentor.first_name} {mentor.middle_name || ''} - {mentor.workplace}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Статус</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Статус участия" 
                  {...field} 
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="points"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Баллы</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="Количество баллов"
                  min={0}
                  {...field} 
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
          >
            Отмена
          </Button>
          <Button
            type="submit" 
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Сохранение...
              </>
            ) : (
              "Сохранить"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ParticipantForm;
