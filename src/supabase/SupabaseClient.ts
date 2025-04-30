import { createClient } from "@supabase/supabase-js";
import { SupabaseClient } from "@supabase/supabase-js";

const projectUrl = import.meta.env.VITE_SUPABASE_URL;
const projectKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!projectUrl || !projectKey) {
    throw new Error("Project URL or key is not defined");
}

const supabase: SupabaseClient = createClient(projectUrl, projectKey);

export default supabase;