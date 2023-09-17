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
      item: {
        Row: {
          base_unit: string
          code: string
          created_at: string
          id: number
          name: string
          price: number
          status: string
          updated_at: string | null
        }
        Insert: {
          base_unit?: string
          code?: string
          created_at?: string
          id?: number
          name?: string
          price: number
          status?: string
          updated_at?: string | null
        }
        Update: {
          base_unit?: string
          code?: string
          created_at?: string
          id?: number
          name?: string
          price?: number
          status?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      product: {
        Row: {
          code: string
          created_at: string
          description: string | null
          id: number
          max_length: number | null
          min_length: number | null
          name: string
          short_description: string | null
          status: string
          updated_at: string | null
        }
        Insert: {
          code?: string
          created_at?: string
          description?: string | null
          id?: number
          max_length?: number | null
          min_length?: number | null
          name?: string
          short_description?: string | null
          status?: string
          updated_at?: string | null
        }
        Update: {
          code?: string
          created_at?: string
          description?: string | null
          id?: number
          max_length?: number | null
          min_length?: number | null
          name?: string
          short_description?: string | null
          status?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      product_configuration: {
        Row: {
          created_at: string
          description: string | null
          id: number
          is_optional: boolean
          product_fk: number
          type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          is_optional: boolean
          product_fk: number
          type?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          is_optional?: boolean
          product_fk?: number
          type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_configuration_product_fk_fkey"
            columns: ["product_fk"]
            referencedRelation: "product"
            referencedColumns: ["id"]
          }
        ]
      }
      product_configuration_option: {
        Row: {
          configuration_fk: number
          description: string | null
          id: number
          item_fk: number
          quantity: number
          rounding: string
          unit: string
        }
        Insert: {
          configuration_fk: number
          description?: string | null
          id?: number
          item_fk: number
          quantity: number
          rounding?: string
          unit?: string
        }
        Update: {
          configuration_fk?: number
          description?: string | null
          id?: number
          item_fk?: number
          quantity?: number
          rounding?: string
          unit?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_configuration_option_configuration_fk_fkey"
            columns: ["configuration_fk"]
            referencedRelation: "product_configuration"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_configuration_option_item_fk_fkey"
            columns: ["item_fk"]
            referencedRelation: "item"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      quote: {
        Row: {
          client_address: string | null
          client_email: string | null
          client_name: string
          client_phone: string | null
          code: string
          created_at: string
          id: number
          memo: string | null
          product_length: number
          quote_date: string
          updated_at: string | null
        }
        Insert: {
          client_address?: string | null
          client_email?: string | null
          client_name?: string
          client_phone?: string | null
          code?: string
          created_at?: string
          id?: number
          memo?: string | null
          product_length: number
          quote_date: string
          updated_at?: string | null
        }
        Update: {
          client_address?: string | null
          client_email?: string | null
          client_name?: string
          client_phone?: string | null
          code?: string
          created_at?: string
          id?: number
          memo?: string | null
          product_length?: number
          quote_date?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      quote_detail: {
        Row: {
          configuration_fk: number
          created_at: string
          id: number
          memo: string | null
          quantity: number
          quoteFk: number
          unit_price: number
          updated_at: string | null
        }
        Insert: {
          configuration_fk: number
          created_at?: string
          id?: number
          memo?: string | null
          quantity: number
          quoteFk: number
          unit_price: number
          updated_at?: string | null
        }
        Update: {
          configuration_fk?: number
          created_at?: string
          id?: number
          memo?: string | null
          quantity?: number
          quoteFk?: number
          unit_price?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quote_detail_configuration_fk_fkey"
            columns: ["configuration_fk"]
            referencedRelation: "product_configuration"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quote_detail_quoteFk_fkey"
            columns: ["quoteFk"]
            referencedRelation: "quote"
            referencedColumns: ["id"]
          }
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

