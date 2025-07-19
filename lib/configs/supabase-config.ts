import { createClient } from "@supabase/supabase-js";
import type { Database } from "../../database.types";

// Create a single supabase client for interacting with your database
export const supabase = createClient<Database>(
  "https://swyudkkcforaqvtxkvfl.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3eXVka2tjZm9yYXF2dHhrdmZsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1Mjc3MTE5NywiZXhwIjoyMDY4MzQ3MTk3fQ.FutWg4ZzSirOlfBdrcc7tlTwja8VwvrWlgV7Eb8Nxio",
);
