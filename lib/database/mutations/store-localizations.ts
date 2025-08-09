import { Entities } from "@/lib/enum";
import { createClient } from "@/lib/supabase/server";
import { StoreLocalizationInsertType } from "@/types/store-localizations";

export async function createStoreLocalizations(
  data: StoreLocalizationInsertType[],
): Promise<StoreLocalizationInsertType[]> {
  const supabase = await createClient();

  try {
    const { data: insertedData, error } = await supabase
      .from(Entities.StoreLocalizations)
      .insert(data)
      .select();

    if (error) {
      throw error;
    }

    return insertedData ?? [];
  } catch (error) {
    throw error;
  }
}
