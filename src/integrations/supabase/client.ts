// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://mdwnifhxkqpnohkmqjkh.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1kd25pZmh4a3Fwbm9oa21xamtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDExNzg2ODEsImV4cCI6MjA1Njc1NDY4MX0.oScD9c7PHE9dVBF3YAS0CipZ3FKO9tEVIiAvUG6zF7c";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);