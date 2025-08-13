import { createClient } from "@/lib/supabase/server";
import { StorePlatform } from "@/types/common";
import { StoreLocalizationRow } from "@/types/store-localizations";

export async function getStoreLocalizationsByProject(
  projectId: string,
  platform: StorePlatform,
): Promise<StoreLocalizationRow[]> {
  const supabase = await createClient();

  // Get the authenticated user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    console.error("Failed to retrieve user:", userError.message);
    throw new Error("Unauthorized access.");
  }

  if (!user) {
    throw new Error("No active user session found.");
  }

  const { data, error } = await supabase
    .from("store_localizations")
    .select("*")
    .eq("project_id", projectId)
    .eq("platform", platform)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching store localizations:", error.message);
    throw new Error("Failed to load store localizations.");
  }

  return data ?? [];
}
