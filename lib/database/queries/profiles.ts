import { createClient } from "@/lib/supabase/server";
import { Database } from "@/types/database.types";

type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];

export async function getUserProfile(userId: string): Promise<ProfileRow> {
  const supabase = await createClient();

  const { data, error } = await supabase.from("profiles").select().eq("id", userId).single();

  if (error) throw error;

  return data as ProfileRow;
}
