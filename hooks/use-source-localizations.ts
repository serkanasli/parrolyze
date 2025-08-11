import { StoreLocalizationRowType } from "@/types/store-localizations";
import { useMemo } from "react";

type Props = {
  storeLocalizations: StoreLocalizationRowType[];
};

export default function useSourceLocalizations({ storeLocalizations }: Props) {
  const sourceLocalizations = useMemo(
    () => storeLocalizations.filter((loc) => loc.source_language === loc.target_language),
    [storeLocalizations],
  );

  return sourceLocalizations;
}
