import { Entities } from "@/lib/enum";
import { createClient } from "@/lib/supabase/server";
import { AIServicesInsert, AIServicesUpdate } from "@/types/ai-services";

export async function createAIServices(aiConfigs: AIServicesInsert) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from(Entities.AIServices)
    .insert(aiConfigs)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create aiConfigs: ${error.message}`);
  }

  return data;
}

export async function updateAIServices(id: string, updates: AIServicesUpdate) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from(Entities.AIServices)
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteAIServices(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from(Entities.AIServices).delete().eq("id", id);

  if (error) throw error;
}

export async function upsertAIServices(
  data: AIServicesInsert[] | AIServicesUpdate,
): Promise<AIServicesInsert> {
  const supabase = await createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData?.user) throw new Error("User not authenticated");
  try {
    const userId = userData.user.id;

    const values = { ...data, user_id: userId };
    const { data: upsertedData, error } = await supabase
      .from(Entities.AIServices)
      .upsert(values, { onConflict: "id" })
      .select()
      .maybeSingle();

    if (error) throw error;
    return upsertedData;
  } catch (error) {
    throw error;
  }
}
