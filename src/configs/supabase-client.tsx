import { createClient } from "@supabase/supabase-js";
import { Database } from "@/schema";

const supabaseUrl: string = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseAnonKey: string = import.meta.env.VITE_SUPABASE_PROJECT_KEY;

export const supabaseClient = createClient<Database>(supabaseUrl, supabaseAnonKey);
