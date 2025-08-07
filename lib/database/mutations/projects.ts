import { createClient } from "@/lib/supabase/server";
import { ProjectInsert, ProjectUpdate } from "@/types/projects";

export async function createProject(project: ProjectInsert) {
  const supabase = await createClient();

  const { data, error } = await supabase.from("projects").insert(project).select().single();

  if (error) throw error;
  return data;
}

export async function updateProject(id: string, updates: ProjectUpdate) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("projects")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteProject(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("projects").delete().eq("id", id);

  if (error) throw error;
}
