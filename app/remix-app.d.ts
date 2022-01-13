import { SupabaseClient } from '@supabase/supabase-js';

export type SupabaseScript = {
  createClient: (supabaseUrl: string, supabaseKey: string) => SupabaseClient;
};

declare global {
  interface Window {
    supabase?: SupabaseScript;
  }
}

type Nullable<T> = T | null;
