import { createClient } from "@/lib/supabase/server";
import { Database } from "@/types/database.types";

type ProjectRow = Database["public"]["Tables"]["projects"]["Row"];

export async function getUserProjects(userId: string): Promise<ProjectRow[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data ?? [];
}

export async function getProject(projectId: string): Promise<ProjectRow | null> {
  const supabase = await createClient();

  const { data, error } = await supabase.from("projects").select("*").eq("id", projectId).single();

  if (error) throw error;

  return data;
}
