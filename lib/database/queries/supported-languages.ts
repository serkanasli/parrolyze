import { createClient } from "@/lib/supabase/server";
import { SupportedLanguagesRowType } from "@/types/supported-languages";

export async function getSupportedLanguages(): Promise<SupportedLanguagesRowType[]> {
  const supabase = await createClient(); // Eğer senin fonksiyon async değilse await gereksiz

  const { data, error } = await supabase.from("supported_languages").select("*");

  if (error) {
    console.error("Failed to fetch supported languages:", error.message);
    throw new Error("Failed to fetch supported languages");
  }

  return data || [];
}
