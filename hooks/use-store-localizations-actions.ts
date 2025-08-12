import {
  bulkCreateStoreLocalizations,
  bulkDeleteStoreLocalizations,
} from "@/actions/store-localizations";
import { withLoadingToast } from "@/lib/toast";
import { StoreLocalizationInsertType, StoreLocalizationRowType } from "@/types/store-localizations";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

type Props = {
  sourceLocalizations?: StoreLocalizationRowType[] | null;
  storeLocalizations?: StoreLocalizationRowType[] | null;
};

export default function useStoreLocalizationsActions({
  sourceLocalizations,
  storeLocalizations,
}: Props) {
  const router = useRouter();
  // Handler to add a new locale for all source localizations
  const handleAddStoreLocalizations = useCallback(
    async (targetLanguageCode: string) => {
      if (!sourceLocalizations) return;

      try {
        const newLocales: StoreLocalizationInsertType[] = sourceLocalizations.map((sourceItem) => ({
          project_id: sourceItem.project_id,
          source_text: sourceItem.source_text,
          source_language: sourceItem.source_language,
          translated_text: "",
          target_language: targetLanguageCode,
          field: sourceItem.field,
          platform: sourceItem.platform,
        }));

        const response = await withLoadingToast(
          "Adding new locale...",
          "New locale added successfully!",
          "An error occurred while adding the new locale.",
          null,
          () => bulkCreateStoreLocalizations({ storeLocalizations: newLocales }),
        );

        if (response?.success) {
          router.refresh();
        }
      } catch (error) {
        console.error("Error adding locale:", error);
      }
    },
    [sourceLocalizations, router],
  );

  // Handler to remove a locale by language code
  const handleRemoveStoreLocalizations = useCallback(
    async (langCode: string) => {
      try {
        if (!storeLocalizations) return;
        // Collect all IDs of store localizations to be deleted for the language
        const removeItemIds = storeLocalizations
          .filter((loc) => loc.target_language === langCode)
          .map((loc) => loc.id);

        const response = await withLoadingToast(
          "Deleting locale...",
          "Locale deleted successfully!",
          "An error occurred while deleting the locale.",
          null,
          () => bulkDeleteStoreLocalizations({ ids: removeItemIds }),
        );

        if (response?.success) {
          router.refresh();
        }
      } catch (error) {
        console.error("Error deleting locale:", error);
      }
    },
    [storeLocalizations, router],
  );

  return { handleAddStoreLocalizations, handleRemoveStoreLocalizations };
}
