import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database.types";

type ProjectInsert = Database["public"]["Tables"]["projects"]["Insert"];
type ProjectUpdate = Database["public"]["Tables"]["projects"]["Update"];

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
