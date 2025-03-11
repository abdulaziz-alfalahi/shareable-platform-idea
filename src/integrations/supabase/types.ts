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
      admin_action_logs: {
        Row: {
          action_details: Json
          action_type: string
          admin_id: string
          created_at: string
          id: string
          ip_address: string | null
        }
        Insert: {
          action_details: Json
          action_type: string
          admin_id: string
          created_at?: string
          id?: string
          ip_address?: string | null
        }
        Update: {
          action_details?: Json
          action_type?: string
          admin_id?: string
          created_at?: string
          id?: string
          ip_address?: string | null
        }
        Relationships: []
      }
      assessments: {
        Row: {
          assessed_by: string | null
          assessment_date: string
          created_at: string
          feedback: string | null
          id: string
          score: number | null
          service_id: string
          user_id: string
        }
        Insert: {
          assessed_by?: string | null
          assessment_date?: string
          created_at?: string
          feedback?: string | null
          id?: string
          score?: number | null
          service_id: string
          user_id: string
        }
        Update: {
          assessed_by?: string | null
          assessment_date?: string
          created_at?: string
          feedback?: string | null
          id?: string
          score?: number | null
          service_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "assessments_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
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
      job_applications: {
        Row: {
          applicant_id: string
          created_at: string
          id: string
          job_id: string
          status: string
          updated_at: string
        }
        Insert: {
          applicant_id: string
          created_at?: string
          id?: string
          job_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          applicant_id?: string
          created_at?: string
          id?: string
          job_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "job_postings"
            referencedColumns: ["id"]
          },
        ]
      }
      job_postings: {
        Row: {
          company: string
          created_at: string
          description: string | null
          id: string
          job_type: string | null
          location: string | null
          posted_by: string
          requirements: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          company: string
          created_at?: string
          description?: string | null
          id?: string
          job_type?: string | null
          location?: string | null
          posted_by: string
          requirements?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          company?: string
          created_at?: string
          description?: string | null
          id?: string
          job_type?: string | null
          location?: string | null
          posted_by?: string
          requirements?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      mentorships: {
        Row: {
          created_at: string
          id: string
          mentee_id: string
          mentor_id: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          mentee_id: string
          mentor_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          mentee_id?: string
          mentor_id?: string
          status?: string
          updated_at?: string
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
      passport_stamps: {
        Row: {
          category: string
          created_at: string
          date_earned: string
          description: string | null
          featured: boolean | null
          icon_name: string | null
          id: string
          level: string
          title: string
          user_id: string
        }
        Insert: {
          category: string
          created_at?: string
          date_earned?: string
          description?: string | null
          featured?: boolean | null
          icon_name?: string | null
          id?: string
          level: string
          title: string
          user_id: string
        }
        Update: {
          category?: string
          created_at?: string
          date_earned?: string
          description?: string | null
          featured?: boolean | null
          icon_name?: string | null
          id?: string
          level?: string
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          access_level: Database["public"]["Enums"]["access_level"]
          bio: string | null
          created_at: string
          email: string
          id: string
          linked_user_id: string | null
          name: string
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
        }
        Insert: {
          access_level?: Database["public"]["Enums"]["access_level"]
          bio?: string | null
          created_at?: string
          email: string
          id: string
          linked_user_id?: string | null
          name: string
          role: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Update: {
          access_level?: Database["public"]["Enums"]["access_level"]
          bio?: string | null
          created_at?: string
          email?: string
          id?: string
          linked_user_id?: string | null
          name?: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Relationships: []
      }
      retirement_plans: {
        Row: {
          created_at: string
          current_age: number
          current_salary: number
          current_savings: number
          id: string
          investment_style: string
          monthly_savings: number
          post_retirement_work: boolean
          retirement_age: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_age: number
          current_salary: number
          current_savings: number
          id?: string
          investment_style: string
          monthly_savings: number
          post_retirement_work?: boolean
          retirement_age: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_age?: number
          current_salary?: number
          current_savings?: number
          id?: string
          investment_style?: string
          monthly_savings?: number
          post_retirement_work?: boolean
          retirement_age?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      retirement_simulations: {
        Row: {
          created_at: string
          id: string
          income_adequacy_percentage: number
          monthly_retirement_income: number
          plan_id: string
          savings_at_retirement: number
        }
        Insert: {
          created_at?: string
          id?: string
          income_adequacy_percentage: number
          monthly_retirement_income: number
          plan_id: string
          savings_at_retirement: number
        }
        Update: {
          created_at?: string
          id?: string
          income_adequacy_percentage?: number
          monthly_retirement_income?: number
          plan_id?: string
          savings_at_retirement?: number
        }
        Relationships: [
          {
            foreignKeyName: "retirement_simulations_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "retirement_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      service_assignments: {
        Row: {
          assigned_by: string | null
          created_at: string
          feedback: string | null
          id: string
          service_id: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          assigned_by?: string | null
          created_at?: string
          feedback?: string | null
          id?: string
          service_id: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          assigned_by?: string | null
          created_at?: string
          feedback?: string | null
          id?: string
          service_id?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "service_assignments_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          created_at: string
          description: string | null
          duration: string | null
          id: string
          name: string
          provider_id: string | null
          type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          duration?: string | null
          id?: string
          name: string
          provider_id?: string | null
          type: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          duration?: string | null
          id?: string
          name?: string
          provider_id?: string | null
          type?: string
          updated_at?: string
        }
        Relationships: []
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
      student_records: {
        Row: {
          additional_notes: string | null
          created_at: string | null
          date_of_birth: string | null
          email: string | null
          grade: string | null
          id: string
          national_id: string
          school: string | null
          student_id: string
          student_name: string
          subjects: Json | null
          updated_at: string | null
        }
        Insert: {
          additional_notes?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          email?: string | null
          grade?: string | null
          id?: string
          national_id: string
          school?: string | null
          student_id: string
          student_name: string
          subjects?: Json | null
          updated_at?: string | null
        }
        Update: {
          additional_notes?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          email?: string | null
          grade?: string | null
          id?: string
          national_id?: string
          school?: string | null
          student_id?: string
          student_name?: string
          subjects?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_permissions: {
        Row: {
          created_at: string
          id: string
          permission_type: string
          target_user_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          permission_type: string
          target_user_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          permission_type?: string
          target_user_id?: string
          user_id?: string
        }
        Relationships: []
      }
      user_progress: {
        Row: {
          created_at: string
          id: string
          progress_percentage: number
          service_id: string | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          progress_percentage?: number
          service_id?: string | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          progress_percentage?: number
          service_id?: string | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_progress_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
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
      get_user_role: {
        Args: {
          user_id: string
        }
        Returns: Database["public"]["Enums"]["user_role"]
      }
    }
    Enums: {
      access_level: "read_only" | "edit" | "admin"
      user_role:
        | "school_student"
        | "university_student"
        | "parent"
        | "internship_coordinator"
        | "advisor"
        | "coach"
        | "recruiter"
        | "training_center_rep"
        | "assessment_center_rep"
        | "command_control_agent"
        | "administrator"
        | "leadership"
        | "jobseeker"
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
