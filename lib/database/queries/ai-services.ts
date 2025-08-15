import { Entities } from "@/lib/enum";
import { createClient } from "@/lib/supabase/server";
import { AIServicesRow } from "@/types/ai-services";

export async function getAIServices(): Promise<AIServicesRow[]> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase.from(Entities.AIServices).select().eq("user_id", user?.id);

  if (error) throw error;

  return data as AIServicesRow[];
}
