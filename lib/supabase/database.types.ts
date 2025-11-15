export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5";
  };
  public: {
    Tables: {
      activities: {
        Row: {
          activity_type: string;
          created_at: string | null;
          id: string;
          metadata: Json | null;
          target_id: string | null;
          user_id: string;
        };
        Insert: {
          activity_type: string;
          created_at?: string | null;
          id?: string;
          metadata?: Json | null;
          target_id?: string | null;
          user_id: string;
        };
        Update: {
          activity_type?: string;
          created_at?: string | null;
          id?: string;
          metadata?: Json | null;
          target_id?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "activities_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      comments: {
        Row: {
          content: string;
          created_at: string | null;
          id: string;
          likes_count: number | null;
          parent_id: string | null;
          savoir_id: string;
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          content: string;
          created_at?: string | null;
          id?: string;
          likes_count?: number | null;
          parent_id?: string | null;
          savoir_id: string;
          updated_at?: string | null;
          user_id: string;
        };
        Update: {
          content?: string;
          created_at?: string | null;
          id?: string;
          likes_count?: number | null;
          parent_id?: string | null;
          savoir_id?: string;
          updated_at?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "comments_parent_id_fkey";
            columns: ["parent_id"];
            isOneToOne: false;
            referencedRelation: "comments";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "comments_savoir_id_fkey";
            columns: ["savoir_id"];
            isOneToOne: false;
            referencedRelation: "savoirs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "comments_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      favorites: {
        Row: {
          created_at: string | null;
          id: string;
          savoir_id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          savoir_id: string;
          user_id: string;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          savoir_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "favorites_savoir_id_fkey";
            columns: ["savoir_id"];
            isOneToOne: false;
            referencedRelation: "savoirs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "favorites_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      follows: {
        Row: {
          created_at: string | null;
          follower_id: string;
          following_id: string;
          id: string;
        };
        Insert: {
          created_at?: string | null;
          follower_id: string;
          following_id: string;
          id?: string;
        };
        Update: {
          created_at?: string | null;
          follower_id?: string;
          following_id?: string;
          id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "follows_follower_id_fkey";
            columns: ["follower_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "follows_following_id_fkey";
            columns: ["following_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          badges: Json | null;
          bio: string | null;
          created_at: string | null;
          full_name: string;
          id: string;
          region: string | null;
          reputation_score: number | null;
          updated_at: string | null;
          username: string;
          website: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          badges?: Json | null;
          bio?: string | null;
          created_at?: string | null;
          full_name: string;
          id: string;
          region?: string | null;
          reputation_score?: number | null;
          updated_at?: string | null;
          username: string;
          website?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          badges?: Json | null;
          bio?: string | null;
          created_at?: string | null;
          full_name?: string;
          id?: string;
          region?: string | null;
          reputation_score?: number | null;
          updated_at?: string | null;
          username?: string;
          website?: string | null;
        };
        Relationships: [];
      };
      reactions: {
        Row: {
          created_at: string | null;
          emoji: string;
          id: string;
          savoir_id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string | null;
          emoji: string;
          id?: string;
          savoir_id: string;
          user_id: string;
        };
        Update: {
          created_at?: string | null;
          emoji?: string;
          id?: string;
          savoir_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "reactions_savoir_id_fkey";
            columns: ["savoir_id"];
            isOneToOne: false;
            referencedRelation: "savoirs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "reactions_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      savoirs: {
        Row: {
          approval_rate: number | null;
          category: string;
          comments_count: number | null;
          content: string;
          contributor_id: string;
          created_at: string | null;
          era: string;
          excerpt: string;
          id: string;
          images: string[] | null;
          published: boolean | null;
          region: string | null;
          slug: string;
          tags: string[] | null;
          title: string;
          updated_at: string | null;
          views_count: number | null;
          votes_count: number | null;
        };
        Insert: {
          approval_rate?: number | null;
          category: string;
          comments_count?: number | null;
          content: string;
          contributor_id: string;
          created_at?: string | null;
          era: string;
          excerpt: string;
          id?: string;
          images?: string[] | null;
          published?: boolean | null;
          region?: string | null;
          slug: string;
          tags?: string[] | null;
          title: string;
          updated_at?: string | null;
          views_count?: number | null;
          votes_count?: number | null;
        };
        Update: {
          approval_rate?: number | null;
          category?: string;
          comments_count?: number | null;
          content?: string;
          contributor_id?: string;
          created_at?: string | null;
          era?: string;
          excerpt?: string;
          id?: string;
          images?: string[] | null;
          published?: boolean | null;
          region?: string | null;
          slug?: string;
          tags?: string[] | null;
          title?: string;
          updated_at?: string | null;
          views_count?: number | null;
          votes_count?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "savoirs_contributor_id_fkey";
            columns: ["contributor_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      votes: {
        Row: {
          created_at: string | null;
          id: string;
          savoir_id: string;
          user_id: string;
          vote_type: number;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          savoir_id: string;
          user_id: string;
          vote_type: number;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          savoir_id?: string;
          user_id?: string;
          vote_type?: number;
        };
        Relationships: [
          {
            foreignKeyName: "votes_savoir_id_fkey";
            columns: ["savoir_id"];
            isOneToOne: false;
            referencedRelation: "savoirs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "votes_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_followers_count: { Args: { user_uuid: string }; Returns: number };
      get_following_count: { Args: { user_uuid: string }; Returns: number };
      get_user_savoirs_count: { Args: { user_uuid: string }; Returns: number };
      get_user_total_votes: { Args: { user_uuid: string }; Returns: number };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  "public"
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
      DefaultSchema["Views"])
  ? (DefaultSchema["Tables"] &
      DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
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
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
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
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never
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
    : never = never
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
