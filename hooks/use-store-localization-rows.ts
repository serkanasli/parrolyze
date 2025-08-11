import {
  extractUniqueTargetLanguages,
  getSourceLocalizations,
  mapToLocalizationRows,
} from "@/lib/store-localization-helpers";
import { StoreLocalizationRowType } from "@/types/store-localizations";
import { useMemo } from "react";

type Props = {
  storeLocalizations: StoreLocalizationRowType[];
};

export default function useStoreLocalizationRows({ storeLocalizations }: Props) {
  // Compute source localizations (source=target language)
  const sourceLocalizations = useMemo(
    () => getSourceLocalizations(storeLocalizations),
    [storeLocalizations],
  );

  // Compute localization rows mapping source to locales
  const localizations = useMemo(
    () => mapToLocalizationRows(storeLocalizations, sourceLocalizations),
    [storeLocalizations, sourceLocalizations],
  );

  // Compute unique target languages used in locales
  const uniqueTargetLanguages = useMemo(
    () => extractUniqueTargetLanguages(localizations),
    [localizations],
  );

  return { localizations, sourceLocalizations, uniqueTargetLanguages };
}
