import { createClient } from "@/lib/supabase/server";
import { ProjectRow } from "@/types/projects";

export async function getUserProjects(): Promise<ProjectRow[]> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("user_id", user?.id)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data ?? [];
}

export async function getProject(projectId: string): Promise<ProjectRow> {
  const supabase = await createClient();

  const { data, error } = await supabase.from("projects").select("*").eq("id", projectId).single();

  if (error) throw error;

  return data;
}
