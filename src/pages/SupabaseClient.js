import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://ypoubhaujgmpxrzhbwpt.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlwb3ViaGF1amdtcHhyemhid3B0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxNTIyNjAsImV4cCI6MjA3OTcyODI2MH0.2M441mifIeF54HmMHryX3jAyhp2UxQ3b8n4K3htsJ2E";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

