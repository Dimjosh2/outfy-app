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
      outfit_plans: {
        Row: {
          created_at: string
          id: string
          notes: string | null
          outfit_id: string | null
          planned_date: string
          user_id: string
          weather_condition: string | null
          weather_temp: number | null
        }
        Insert: {
          created_at?: string
          id?: string
          notes?: string | null
          outfit_id?: string | null
          planned_date: string
          user_id: string
          weather_condition?: string | null
          weather_temp?: number | null
        }
        Update: {
          created_at?: string
          id?: string
          notes?: string | null
          outfit_id?: string | null
          planned_date?: string
          user_id?: string
          weather_condition?: string | null
          weather_temp?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "outfit_plans_outfit_id_fkey"
            columns: ["outfit_id"]
            isOneToOne: false
            referencedRelation: "outfits"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "outfit_plans_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      outfits: {
        Row: {
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          is_favorite: boolean | null
          items: string[]
          name: string
          occasion: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_favorite?: boolean | null
          items: string[]
          name: string
          occasion?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_favorite?: boolean | null
          items?: string[]
          name?: string
          occasion?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "outfits_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          body_type: string | null
          color_season: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          preferred_colors: string[] | null
          style_goals: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          body_type?: string | null
          color_season?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          preferred_colors?: string[] | null
          style_goals?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          body_type?: string | null
          color_season?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          preferred_colors?: string[] | null
          style_goals?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      saved_looks: {
        Row: {
          id: string
          look_data: Json
          saved_at: string
          user_id: string
        }
        Insert: {
          id?: string
          look_data: Json
          saved_at?: string
          user_id: string
        }
        Update: {
          id?: string
          look_data?: Json
          saved_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_looks_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      wardrobe_items: {
        Row: {
          category: string
          color: string | null
          created_at: string
          id: string
          image_url: string | null
          name: string
          season: string | null
          tags: string[] | null
          user_id: string
        }
        Insert: {
          category: string
          color?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          name: string
          season?: string | null
          tags?: string[] | null
          user_id: string
        }
        Update: {
          category?: string
          color?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          name?: string
          season?: string | null
          tags?: string[] | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wardrobe_items_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
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
      [_ in never]: never
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
    Enums: {},
  },
} as const
