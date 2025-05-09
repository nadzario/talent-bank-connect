
export interface Event {
  id: number;
  type: 'project' | 'olympiad';
  title: string;
  date?: string;
  location?: string;
  stage?: string;
  academicYear?: string;
  profile: string;
}

export const mockEvents: Event[] = [
  {
    id: 1,
    type: 'project',
    title: 'Проект Экология',
    date: '2025-06-15',
    location: 'Школа №123',
    profile: 'Экология'
  },
  {
    id: 2,
    type: 'olympiad',
    title: 'Олимпиада по математике',
    stage: 'Региональный этап',
    academicYear: '2024-2025',
    profile: 'Математика'
  },
  {
    id: 3,
    type: 'project',
    title: 'Научно-технологический проект',
    date: '2025-07-10',
    location: 'Лицей №45',
    profile: 'Технологии'
  },
  {
    id: 4,
    type: 'olympiad',
    title: 'Олимпиада по физике',
    stage: 'Муниципальный этап',
    academicYear: '2024-2025',
    profile: 'Физика'
  }
];
