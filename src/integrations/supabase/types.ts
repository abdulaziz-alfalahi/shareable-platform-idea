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
      career_path_nodes: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          level: string
          path_id: string | null
          position_x: number
          position_y: number
          salary_max: number
          salary_min: number
          time_to_achieve: number
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          level: string
          path_id?: string | null
          position_x: number
          position_y: number
          salary_max: number
          salary_min: number
          time_to_achieve: number
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          level?: string
          path_id?: string | null
          position_x?: number
          position_y?: number
          salary_max?: number
          salary_min?: number
          time_to_achieve?: number
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "career_path_nodes_path_id_fkey"
            columns: ["path_id"]
            isOneToOne: false
            referencedRelation: "career_paths"
            referencedColumns: ["id"]
          },
        ]
      }
      career_paths: {
        Row: {
          created_at: string | null
          description: string | null
          difficulty: number
          id: string
          industry: string | null
          popularity: number
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          difficulty?: number
          id?: string
          industry?: string | null
          popularity?: number
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          difficulty?: number
          id?: string
          industry?: string | null
          popularity?: number
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      node_prerequisites: {
        Row: {
          id: string
          node_id: string | null
          prerequisite_node_id: string | null
        }
        Insert: {
          id?: string
          node_id?: string | null
          prerequisite_node_id?: string | null
        }
        Update: {
          id?: string
          node_id?: string | null
          prerequisite_node_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "node_prerequisites_node_id_fkey"
            columns: ["node_id"]
            isOneToOne: false
            referencedRelation: "career_path_nodes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "node_prerequisites_prerequisite_node_id_fkey"
            columns: ["prerequisite_node_id"]
            isOneToOne: false
            referencedRelation: "career_path_nodes"
            referencedColumns: ["id"]
          },
        ]
      }
      node_skills: {
        Row: {
          id: string
          node_id: string | null
          skill: string
        }
        Insert: {
          id?: string
          node_id?: string | null
          skill: string
        }
        Update: {
          id?: string
          node_id?: string | null
          skill?: string
        }
        Relationships: [
          {
            foreignKeyName: "node_skills_node_id_fkey"
            columns: ["node_id"]
            isOneToOne: false
            referencedRelation: "career_path_nodes"
            referencedColumns: ["id"]
          },
        ]
      }
      simulation_recommended_training: {
        Row: {
          id: string
          simulation_id: string | null
          training_program: string
        }
        Insert: {
          id?: string
          simulation_id?: string | null
          training_program: string
        }
        Update: {
          id?: string
          simulation_id?: string | null
          training_program?: string
        }
        Relationships: [
          {
            foreignKeyName: "simulation_recommended_training_simulation_id_fkey"
            columns: ["simulation_id"]
            isOneToOne: false
            referencedRelation: "user_simulations"
            referencedColumns: ["id"]
          },
        ]
      }
      simulation_required_skills: {
        Row: {
          id: string
          simulation_id: string | null
          skill: string
        }
        Insert: {
          id?: string
          simulation_id?: string | null
          skill: string
        }
        Update: {
          id?: string
          simulation_id?: string | null
          skill?: string
        }
        Relationships: [
          {
            foreignKeyName: "simulation_required_skills_simulation_id_fkey"
            columns: ["simulation_id"]
            isOneToOne: false
            referencedRelation: "user_simulations"
            referencedColumns: ["id"]
          },
        ]
      }
      simulation_selected_nodes: {
        Row: {
          id: string
          node_id: string | null
          simulation_id: string | null
        }
        Insert: {
          id?: string
          node_id?: string | null
          simulation_id?: string | null
        }
        Update: {
          id?: string
          node_id?: string | null
          simulation_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "simulation_selected_nodes_node_id_fkey"
            columns: ["node_id"]
            isOneToOne: false
            referencedRelation: "career_path_nodes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "simulation_selected_nodes_simulation_id_fkey"
            columns: ["simulation_id"]
            isOneToOne: false
            referencedRelation: "user_simulations"
            referencedColumns: ["id"]
          },
        ]
      }
      user_simulations: {
        Row: {
          challenge_level: string
          created_at: string | null
          demand_level: string
          id: string
          path_id: string | null
          potential_salary: number
          time_to_complete: string
          user_id: string | null
        }
        Insert: {
          challenge_level: string
          created_at?: string | null
          demand_level: string
          id?: string
          path_id?: string | null
          potential_salary: number
          time_to_complete: string
          user_id?: string | null
        }
        Update: {
          challenge_level?: string
          created_at?: string | null
          demand_level?: string
          id?: string
          path_id?: string | null
          potential_salary?: number
          time_to_complete?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_simulations_path_id_fkey"
            columns: ["path_id"]
            isOneToOne: false
            referencedRelation: "career_paths"
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
