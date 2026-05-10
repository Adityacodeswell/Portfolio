/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabaseServiceKey = import.meta.env.VITE_SUPABASE_SERVICE_KEY || '';

// Public client — for reading images and content on the portfolio
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin client — for writing (used only in AdminPage.tsx)
// Fallback to anon key if service key is missing during dev
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey || supabaseAnonKey);
