
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          login: string
          password: string
          role: 'ADMIN' | 'ERUDIT' | 'MUNICIPALITY' | 'SCHOOL'
          created_at: string
        }
        Insert: {
          id?: string
          login: string
          password: string
          role: 'ADMIN' | 'ERUDIT' | 'MUNICIPALITY' | 'SCHOOL'
          created_at?: string
        }
        Update: {
          id?: string
          login?: string
          password?: string
          role?: 'ADMIN' | 'ERUDIT' | 'MUNICIPALITY' | 'SCHOOL'
          created_at?: string
        }
      }
      mentors: {
        Row: {
          id: number
          last_name: string
          first_name: string
          middle_name: string | null
          workplace: string
          created_at: string
        }
        Insert: {
          id?: number
          last_name: string
          first_name: string
          middle_name?: string | null
          workplace: string
          created_at?: string
        }
        Update: {
          id?: number
          last_name?: string
          first_name?: string
          middle_name?: string | null
          workplace?: string
          created_at?: string
        }
      }
      students: {
        Row: {
          id: number
          snils: string
          last_name: string
          first_name: string
          middle_name: string | null
          birth_date: string
          phone: string | null
          email: string | null
          guardian_full_name: string
          guardian_phone: string
          guardian_email: string
          class_id: number
          created_at?: string
        }
        Insert: {
          id?: number
          snils: string
          last_name: string
          first_name: string
          middle_name?: string | null
          birth_date: string
          phone?: string | null
          email?: string | null
          guardian_full_name: string
          guardian_phone: string
          guardian_email: string
          class_id: number
          created_at?: string
        }
        Update: {
          id?: number
          snils?: string
          last_name?: string
          first_name?: string
          middle_name?: string | null
          birth_date?: string
          phone?: string | null
          email?: string | null
          guardian_full_name?: string
          guardian_phone?: string
          guardian_email?: string
          class_id?: number
          created_at?: string
        }
      }
      classes: {
        Row: {
          id: number
          year_started: number
          letter: string
          school_id: number
          created_at?: string
        }
        Insert: {
          id?: number
          year_started: number
          letter: string
          school_id: number
          created_at?: string
        }
        Update: {
          id?: number
          year_started?: number
          letter?: string
          school_id?: number
          created_at?: string
        }
      }
      schools: {
        Row: {
          id: number
          name: string
          operator_id: string
          municipality_id: number
          created_at?: string
        }
        Insert: {
          id?: number
          name: string
          operator_id: string
          municipality_id: number
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          operator_id?: string
          municipality_id?: number
          created_at?: string
        }
      }
      municipalities: {
        Row: {
          id: number
          name: string
          created_at?: string
        }
        Insert: {
          id?: number
          name: string
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          created_at?: string
        }
      }
      // Add other table types here...
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: 'ADMIN' | 'ERUDIT' | 'MUNICIPALITY' | 'SCHOOL'
      event_type: 'LOGIN' | 'CREATE' | 'DELETE' | 'EDIT'
      olympiad_stage: 'SCHOOL' | 'MUNICIPAL' | 'REGIONAL' | 'FINAL'
      notification_type: 'TIP' | 'NEWS'
      recipient_type: 'MUNICIPALITY' | 'SCHOOL' | 'ALL'
    }
  }
}
