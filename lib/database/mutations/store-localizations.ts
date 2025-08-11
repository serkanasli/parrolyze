import { Entities } from "@/lib/enum";
import { createClient } from "@/lib/supabase/server";
import { StoreLocalizationInsertType } from "@/types/store-localizations";

export async function bulkCreateStoreLocalizations(
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

export async function bulkDeleteStoreLocalizations(ids: string[]): Promise<number> {
  const supabase = await createClient();

  try {
    const { error, count } = await supabase
      .from(Entities.StoreLocalizations)
      .delete()
      .in("id", ids);

    if (error) {
      throw error;
    }

    return count ?? 0;
  } catch (error) {
    throw error;
  }
}
