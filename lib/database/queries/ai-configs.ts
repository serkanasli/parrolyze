import { Entities } from "@/lib/enum";
import { createClient } from "@/lib/supabase/server";
import { AIConfigsRowType } from "@/types/ai-configs";

export async function getAIConfigs(): Promise<AIConfigsRowType> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from(Entities.AIConfigs)
    .select()
    .eq("user_id", user?.id)
    .limit(1)
    .maybeSingle();

  if (error) throw error;

  return data as AIConfigsRowType;
}
