import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Helper para verificar se Supabase está configurado
export const isSupabaseConfigured = () => {
  return !!supabaseUrl && !!supabaseAnonKey && supabaseUrl !== '' && supabaseAnonKey !== '';
};

// Cria cliente apenas se as variáveis estiverem configuradas
export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Types para o banco de dados
export type Transaction = {
  id: string;
  user_id: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  category: string;
  date: string;
  created_at: string;
};

export type Card = {
  id: string;
  user_id: string;
  name: string;
  limit: number;
  used: number;
  due_date: number;
  created_at: string;
};

export type Investment = {
  id: string;
  user_id: string;
  name: string;
  type: string;
  amount: number;
  return_rate: number;
  created_at: string;
};

export type User = {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  created_at: string;
};
