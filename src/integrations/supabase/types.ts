export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

type Table<Row, Insert = Partial<Row>, Update = Partial<Row>> = {
  Row: Row;
  Insert: Insert;
  Update: Update;
  Relationships: [];
};

type Timestamped = {
  created_at: string;
  updated_at: string;
};

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "13.0.5";
  };
  public: {
    Tables: {
      profiles: Table<
        Timestamped & {
          id: string;
          full_name: string | null;
          phone: string | null;
        },
        {
          id: string;
          full_name?: string | null;
          phone?: string | null;
          created_at?: string;
          updated_at?: string;
        }
      >;
      roles: Table<
        {
          id: string;
          user_id: string;
          role: "admin" | "staff";
          created_at: string;
        },
        {
          id?: string;
          user_id: string;
          role: "admin" | "staff";
          created_at?: string;
        }
      >;
      vehicles: Table<
        Timestamped & {
          id: string;
          stock_number: string;
          slug: string;
          title: string;
          make: string;
          model: string;
          year: number;
          vehicle_type: string;
          status: "available" | "pending" | "sold" | "draft";
          price: number;
          monthly_payment: number | null;
          down_payment: number | null;
          lease_term_months: number | null;
          mileage: number;
          location: string;
          vin: string | null;
          exterior_color: string | null;
          interior_color: string | null;
          transmission: string | null;
          fuel_type: string | null;
          drivetrain: string | null;
          image_url: string | null;
          description: string | null;
          features: string[] | null;
          history_report: Json | null;
          is_featured: boolean | null;
        }
      >;
      vehicle_media: Table<
        {
          id: string;
          vehicle_id: string;
          url: string;
          alt_text: string | null;
          sort_order: number;
          created_at: string;
        }
      >;
      leads: Table<
        Timestamped & {
          id: string;
          source: string;
          lead_type: string;
          status: "new" | "contacted" | "qualified" | "won" | "lost";
          first_name: string;
          last_name: string | null;
          email: string;
          phone: string | null;
          subject: string | null;
          vehicle_id: string | null;
          vehicle_interest: string | null;
          message: string | null;
          priority: "low" | "normal" | "high" | "urgent";
          metadata: Json;
        },
        {
          id?: string;
          source?: string;
          lead_type: string;
          status?: "new" | "contacted" | "qualified" | "won" | "lost";
          first_name: string;
          last_name?: string | null;
          email: string;
          phone?: string | null;
          subject?: string | null;
          vehicle_id?: string | null;
          vehicle_interest?: string | null;
          message?: string | null;
          priority?: "low" | "normal" | "high" | "urgent";
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
        }
      >;
      finance_applications: Table<
        Timestamped & {
          id: string;
          status: "new" | "reviewing" | "approved" | "declined" | "closed";
          first_name: string;
          last_name: string | null;
          email: string;
          phone: string | null;
          vehicle_price: number;
          down_payment: number;
          loan_term_months: number;
          interest_rate: number;
          requested_vehicle: string | null;
          metadata: Json;
        },
        {
          id?: string;
          status?: "new" | "reviewing" | "approved" | "declined" | "closed";
          first_name: string;
          last_name?: string | null;
          email: string;
          phone?: string | null;
          vehicle_price: number;
          down_payment: number;
          loan_term_months: number;
          interest_rate: number;
          requested_vehicle?: string | null;
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
        }
      >;
      sell_submissions: Table<
        Timestamped & {
          id: string;
          status: "new" | "reviewing" | "listed" | "rejected" | "closed";
          make: string;
          model: string;
          year: number;
          mileage: number;
          vin: string | null;
          exterior_color: string | null;
          interior_color: string | null;
          transmission: string | null;
          description: string | null;
          listing_type: "fixed_price" | "auction";
          asking_price: number;
          location: string;
          seller_name: string;
          seller_email: string;
          seller_phone: string | null;
          metadata: Json;
        },
        {
          id?: string;
          status?: "new" | "reviewing" | "listed" | "rejected" | "closed";
          make: string;
          model: string;
          year: number;
          mileage: number;
          vin?: string | null;
          exterior_color?: string | null;
          interior_color?: string | null;
          transmission?: string | null;
          description?: string | null;
          listing_type?: "fixed_price" | "auction";
          asking_price: number;
          location: string;
          seller_name: string;
          seller_email: string;
          seller_phone?: string | null;
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
        }
      >;
      appointments: Table<
        Timestamped & {
          id: string;
          status: "requested" | "confirmed" | "completed" | "cancelled";
          first_name: string;
          last_name: string | null;
          email: string;
          phone: string | null;
          requested_time: string | null;
          appointment_type: string;
          notes: string | null;
        },
        {
          id?: string;
          status?: "requested" | "confirmed" | "completed" | "cancelled";
          first_name: string;
          last_name?: string | null;
          email: string;
          phone?: string | null;
          requested_time?: string | null;
          appointment_type: string;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        }
      >;
      conversations: Table<
        Timestamped & {
          id: string;
          session_id: string;
          source: string;
          status: "active" | "needs_human" | "closed";
          intent: string | null;
          priority: string;
        }
      >;
      messages: Table<
        {
          id: string;
          conversation_id: string;
          role: "user" | "assistant" | "system";
          content: string;
          created_at: string;
        }
      >;
      tickets: Table<
        Timestamped & {
          id: string;
          ticket_number: string;
          subject: string;
          description: string | null;
          status: "new" | "open" | "in_progress" | "resolved" | "closed";
          priority: "low" | "normal" | "medium" | "high" | "urgent";
          type: string;
          lead_id: string | null;
        }
      >;
      audit_logs: Table<
        {
          id: string;
          actor_id: string | null;
          action: string;
          entity_type: string;
          entity_id: string | null;
          metadata: Json;
          created_at: string;
        }
      >;
    };
    Views: Record<string, never>;
    Functions: {
      is_staff: {
        Args: Record<string, never>;
        Returns: boolean;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;
type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"] | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {},
  },
} as const;
