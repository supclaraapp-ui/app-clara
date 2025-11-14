import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Helper para verificar se Supabase está configurado
export const isSupabaseConfigured = () => {
  return !!supabaseUrl && !!supabaseAnonKey && supabaseUrl !== '' && supabaseAnonKey !== '';
};

// Mock client para quando Supabase não estiver configurado
const createMockClient = () => ({
  auth: {
    signInWithPassword: async () => ({ 
      data: { user: null, session: null }, 
      error: { message: 'Supabase não configurado' } 
    }),
    signUp: async () => ({ 
      data: { user: null, session: null }, 
      error: { message: 'Supabase não configurado' } 
    }),
    signOut: async () => ({ error: null }),
    getSession: async () => ({ data: { session: null }, error: null }),
    getUser: async () => ({ data: { user: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
  },
  from: () => ({
    select: () => ({ data: [], error: null }),
    insert: () => ({ data: null, error: null }),
    update: () => ({ data: null, error: null }),
    delete: () => ({ data: null, error: null }),
  }),
});

// Cria cliente real se configurado, mock se não
export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createMockClient() as any;

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
