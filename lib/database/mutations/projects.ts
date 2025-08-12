import { Entities } from "@/lib/enum";
import { createClient } from "@/lib/supabase/server";
import { ProjectInsertType, ProjectUpdateType } from "@/types/projects";

export async function createProject(project: ProjectInsertType) {
  const supabase = await createClient();

  const { data, error } = await supabase.from(Entities.Projects).insert(project).select().single();

  if (error) {
    throw new Error(`Failed to create project: ${error.message}`);
  }

  return data;
}

export async function updateProject(id: string, updates: ProjectUpdateType) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from(Entities.Projects)
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteProject(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from(Entities.Projects).delete().eq("id", id);

  if (error) throw error;
}
