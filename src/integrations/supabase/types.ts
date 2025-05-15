export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      academic_profiles: {
        Row: {
          direction_id: number
          id: number
          name: string
        }
        Insert: {
          direction_id: number
          id?: never
          name: string
        }
        Update: {
          direction_id?: number
          id?: never
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "academic_profiles_direction_id_fkey"
            columns: ["direction_id"]
            isOneToOne: false
            referencedRelation: "directions"
            referencedColumns: ["id"]
          },
        ]
      }
      classes: {
        Row: {
          id: number
          letter: string
          school_id: number
          year_started: number
        }
        Insert: {
          id?: number
          letter: string
          school_id: number
          year_started: number
        }
        Update: {
          id?: number
          letter?: string
          school_id?: number
          year_started?: number
        }
        Relationships: [
          {
            foreignKeyName: "classes_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      directions: {
        Row: {
          id: number
          is_olympiad_only: boolean
          name: string
        }
        Insert: {
          id?: never
          is_olympiad_only?: boolean
          name: string
        }
        Update: {
          id?: never
          is_olympiad_only?: boolean
          name?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          academic_year: string | null
          created_at: string | null
          date: string | null
          id: number
          location: string | null
          profile: string
          stage: string | null
          status_id: number | null
          title: string
          type: string
        }
        Insert: {
          academic_year?: string | null
          created_at?: string | null
          date?: string | null
          id?: number
          location?: string | null
          profile: string
          stage?: string | null
          status_id?: number | null
          title: string
          type: string
        }
        Update: {
          academic_year?: string | null
          created_at?: string | null
          date?: string | null
          id?: number
          location?: string | null
          profile?: string
          stage?: string | null
          status_id?: number | null
          title?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "events_status_id_fkey"
            columns: ["status_id"]
            isOneToOne: false
            referencedRelation: "participation_statuses"
            referencedColumns: ["id"]
          },
        ]
      }
      logs: {
        Row: {
          created_at: string | null
          event_group_id: number | null
          event_type: string
          id: number
          is_archived: boolean | null
          target_id: number
          target_table: string
        }
        Insert: {
          created_at?: string | null
          event_group_id?: number | null
          event_type: string
          id?: never
          is_archived?: boolean | null
          target_id: number
          target_table: string
        }
        Update: {
          created_at?: string | null
          event_group_id?: number | null
          event_type?: string
          id?: never
          is_archived?: boolean | null
          target_id?: number
          target_table?: string
        }
        Relationships: []
      }
      mentors: {
        Row: {
          first_name: string
          id: number
          last_name: string
          middle_name: string | null
          workplace: string
        }
        Insert: {
          first_name: string
          id?: never
          last_name: string
          middle_name?: string | null
          workplace: string
        }
        Update: {
          first_name?: string
          id?: never
          last_name?: string
          middle_name?: string | null
          workplace?: string
        }
        Relationships: []
      }
      municipalities: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string | null
          id: number
          is_read: boolean | null
          recipient_id: number | null
          recipient_type: Database["public"]["Enums"]["recipient_type"]
          text: string
          title: string
          type: Database["public"]["Enums"]["notification_type"]
        }
        Insert: {
          created_at?: string | null
          id?: number
          is_read?: boolean | null
          recipient_id?: number | null
          recipient_type?: Database["public"]["Enums"]["recipient_type"]
          text: string
          title: string
          type?: Database["public"]["Enums"]["notification_type"]
        }
        Update: {
          created_at?: string | null
          id?: number
          is_read?: boolean | null
          recipient_id?: number | null
          recipient_type?: Database["public"]["Enums"]["recipient_type"]
          text?: string
          title?: string
          type?: Database["public"]["Enums"]["notification_type"]
        }
        Relationships: []
      }
      olympiads: {
        Row: {
          academic_year: string
          event_id: number
          id: number
          points: number
          profile_id: number
          stage: Database["public"]["Enums"]["olympiad_stage"]
        }
        Insert: {
          academic_year: string
          event_id: number
          id?: never
          points?: number
          profile_id: number
          stage: Database["public"]["Enums"]["olympiad_stage"]
        }
        Update: {
          academic_year?: string
          event_id?: number
          id?: never
          points?: number
          profile_id?: number
          stage?: Database["public"]["Enums"]["olympiad_stage"]
        }
        Relationships: [
          {
            foreignKeyName: "olympiads_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: true
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "olympiads_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "academic_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      participation: {
        Row: {
          id: number
          mentor_id: number
          points: number
          status_id: number | null
          student_id: number
        }
        Insert: {
          id?: never
          mentor_id: number
          points?: number
          status_id?: number | null
          student_id: number
        }
        Update: {
          id?: never
          mentor_id?: number
          points?: number
          status_id?: number | null
          student_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "participation_mentor_id_fkey"
            columns: ["mentor_id"]
            isOneToOne: false
            referencedRelation: "mentors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "participation_status_id_fkey"
            columns: ["status_id"]
            isOneToOne: false
            referencedRelation: "participation_statuses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "participation_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      participation_statuses: {
        Row: {
          created_at: string | null
          id: number
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          name: string
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          id: string
          municipality_id: number | null
          role: Database["public"]["Enums"]["user_role"]
          school_id: number | null
        }
        Insert: {
          id: string
          municipality_id?: number | null
          role?: Database["public"]["Enums"]["user_role"]
          school_id?: number | null
        }
        Update: {
          id?: string
          municipality_id?: number | null
          role?: Database["public"]["Enums"]["user_role"]
          school_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_municipality_id_fkey"
            columns: ["municipality_id"]
            isOneToOne: false
            referencedRelation: "municipalities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          date: string | null
          description: string | null
          event_id: number
          id: number
          location: string | null
          name: string
          profile_id: number
        }
        Insert: {
          date?: string | null
          description?: string | null
          event_id: number
          id?: never
          location?: string | null
          name: string
          profile_id: number
        }
        Update: {
          date?: string | null
          description?: string | null
          event_id?: number
          id?: never
          location?: string | null
          name?: string
          profile_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "projects_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: true
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "academic_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      schools: {
        Row: {
          id: number
          municipality_id: number
          name: string
          operator_id: string
        }
        Insert: {
          id?: number
          municipality_id: number
          name: string
          operator_id: string
        }
        Update: {
          id?: number
          municipality_id?: number
          name?: string
          operator_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "schools_municipality_id_fkey"
            columns: ["municipality_id"]
            isOneToOne: false
            referencedRelation: "municipalities"
            referencedColumns: ["id"]
          },
        ]
      }
      students: {
        Row: {
          birth_date: string
          class_id: number
          email: string | null
          first_name: string
          guardian_email: string
          guardian_full_name: string
          guardian_phone: string
          id: number
          last_name: string
          middle_name: string | null
          phone: string | null
          snils: string
        }
        Insert: {
          birth_date: string
          class_id: number
          email?: string | null
          first_name: string
          guardian_email: string
          guardian_full_name: string
          guardian_phone: string
          id?: number
          last_name: string
          middle_name?: string | null
          phone?: string | null
          snils: string
        }
        Update: {
          birth_date?: string
          class_id?: number
          email?: string | null
          first_name?: string
          guardian_email?: string
          guardian_full_name?: string
          guardian_phone?: string
          id?: number
          last_name?: string
          middle_name?: string | null
          phone?: string | null
          snils?: string
        }
        Relationships: [
          {
            foreignKeyName: "students_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      notification_type: "TIP" | "NEWS" | "NEW_VALUE_1" | "NEW_VALUE_2"
      olympiad_stage: "SCHOOL" | "MUNICIPAL" | "REGIONAL" | "FINAL"
      recipient_type: "MUNICIPALITY" | "SCHOOL" | "ALL"
      user_role: "ADMIN" | "MUNICIPALITY" | "SCHOOL" | "ERUDIT"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      notification_type: ["TIP", "NEWS", "NEW_VALUE_1", "NEW_VALUE_2"],
      olympiad_stage: ["SCHOOL", "MUNICIPAL", "REGIONAL", "FINAL"],
      recipient_type: ["MUNICIPALITY", "SCHOOL", "ALL"],
      user_role: ["ADMIN", "MUNICIPALITY", "SCHOOL", "ERUDIT"],
    },
  },
} as const
