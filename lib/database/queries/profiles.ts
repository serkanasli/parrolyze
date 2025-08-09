import { createClient } from "@/lib/supabase/server";
import { ProfileRowType } from "@/types/profiles";

export async function getUserProfile(): Promise<ProfileRowType> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase.from("profiles").select().eq("id", user?.id).single();

  if (error) throw error;

  return data as ProfileRowType;
}
