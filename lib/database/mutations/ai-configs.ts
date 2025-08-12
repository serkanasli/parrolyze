import { Entities } from "@/lib/enum";
import { createClient } from "@/lib/supabase/server";
import { AIConfigsInsertType, AIConfigsUpdateType } from "@/types/ai-configs";

export async function createAIConfigs(aiConfigs: AIConfigsInsertType) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from(Entities.AIConfigs)
    .insert(aiConfigs)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create aiConfigs: ${error.message}`);
  }

  return data;
}

export async function updateAIConfigs(id: string, updates: AIConfigsUpdateType) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from(Entities.AIConfigs)
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteAIConfigs(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from(Entities.AIConfigs).delete().eq("id", id);

  if (error) throw error;
}

export async function upsertAIConfigs(
  data: AIConfigsInsertType[] | AIConfigsUpdateType,
): Promise<AIConfigsInsertType> {
  const supabase = await createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData?.user) throw new Error("User not authenticated");
  try {
    const userId = userData.user.id;

    const values = { ...data, user_id: userId };
    const { data: upsertedData, error } = await supabase
      .from(Entities.AIConfigs)
      .upsert(values, { onConflict: "id" })
      .select()
      .maybeSingle();

    if (error) throw error;
    return upsertedData;
  } catch (error) {
    const message = (error as Error).message;
    console.log("message", message);
    throw error;
  }
}
