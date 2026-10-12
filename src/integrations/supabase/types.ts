export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      appointments: {
        Row: {
          age: number | null
          appt_date: string
          appt_time: string
          booking_code: string
          branch: string
          created_at: string
          doctor: string
          gender: string | null
          id: string
          patient_name: string
          phone: string
          reason: string | null
          service: string
          status: string
          token_id: string | null
          user_id: string | null
          visit_type: string
        }
        Insert: {
          age?: number | null
          appt_date: string
          appt_time: string
          booking_code: string
          branch: string
          created_at?: string
          doctor?: string
          gender?: string | null
          id?: string
          patient_name: string
          phone: string
          reason?: string | null
          service?: string
          status?: string
          token_id?: string | null
          user_id?: string | null
          visit_type?: string
        }
        Update: {
          age?: number | null
          appt_date?: string
          appt_time?: string
          booking_code?: string
          branch?: string
          created_at?: string
          doctor?: string
          gender?: string | null
          id?: string
          patient_name?: string
          phone?: string
          reason?: string | null
          service?: string
          status?: string
          token_id?: string | null
          user_id?: string | null
          visit_type?: string
        }
        Relationships: []
      }
      lab_orders: {
        Row: {
          address: string | null
          branch: string
          collection: string
          created_at: string
          id: string
          order_code: string
          patient_name: string
          phone: string
          pref_date: string
          slot: string
          status: string
          tests: string[]
          user_id: string | null
        }
        Insert: {
          address?: string | null
          branch: string
          collection: string
          created_at?: string
          id?: string
          order_code: string
          patient_name: string
          phone: string
          pref_date: string
          slot: string
          status?: string
          tests: string[]
          user_id?: string | null
        }
        Update: {
          address?: string | null
          branch?: string
          collection?: string
          created_at?: string
          id?: string
          order_code?: string
          patient_name?: string
          phone?: string
          pref_date?: string
          slot?: string
          status?: string
          tests?: string[]
          user_id?: string | null
        }
        Relationships: []
      }
      tokens: {
        Row: {
          branch: string
          called_at: string | null
          created_at: string
          id: string
          priority: boolean
          source: string
          status: string
          token_date: string
          token_number: number
        }
        Insert: {
          branch: string
          called_at?: string | null
          created_at?: string
          id?: string
          priority?: boolean
          source?: string
          status?: string
          token_date: string
          token_number: number
        }
        Update: {
          branch?: string
          called_at?: string | null
          created_at?: string
          id?: string
          priority?: boolean
          source?: string
          status?: string
          token_date?: string
          token_number?: number
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      book_appointment: {
        Args: {
          p_age: number
          p_branch: string
          p_date: string
          p_gender: string
          p_name: string
          p_phone: string
          p_reason: string
          p_service: string
          p_time: string
          p_visit_type: string
        }
        Returns: Json
      }
      booked_slots: {
        Args: { p_branch: string; p_date: string }
        Returns: {
          appt_time: string
          booked: number
        }[]
      }
      create_lab_order: {
        Args: {
          p_address: string
          p_branch: string
          p_collection: string
          p_date: string
          p_name: string
          p_phone: string
          p_slot: string
          p_tests: string[]
        }
        Returns: Json
      }
      get_walkin_token: {
        Args: { p_branch: string; p_name: string; p_phone: string }
        Returns: Json
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_staff: { Args: { _user_id: string }; Returns: boolean }
      ist_today: { Args: never; Returns: string }
      next_token: {
        Args: { p_branch: string; p_date: string; p_source: string }
        Returns: {
          branch: string
          called_at: string | null
          created_at: string
          id: string
          priority: boolean
          source: string
          status: string
          token_date: string
          token_number: number
        }
        SetofOptions: {
          from: "*"
          to: "tokens"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      staff_add_token: {
        Args: {
          p_branch: string
          p_name: string
          p_phone: string
          p_priority: boolean
        }
        Returns: Json
      }
      validate_patient: {
        Args: { p_name: string; p_phone: string }
        Returns: undefined
      }
    }
    Enums: {
      app_role: "admin" | "staff"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "staff"],
    },
  },
} as const
