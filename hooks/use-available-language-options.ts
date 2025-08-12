import { ComboBoxItemType } from "@/types/form";
import { StoreLocalizationRowType } from "@/types/store-localizations";
import { SupportedLanguagesRowType } from "@/types/supported-languages";
import { useMemo } from "react";

type Props = {
  supportedLanguages?: SupportedLanguagesRowType[] | null;
  storeLocalizations?: StoreLocalizationRowType[] | null;
};

export default function useAvailableLanguageOptions({
  storeLocalizations,
  supportedLanguages,
}: Props) {
  // Collect all used languages (both source and target)
  const usedLanguages = useMemo(() => {
    const langs = new Set<string>();

    if (!storeLocalizations) return;

    storeLocalizations.forEach(({ source_language, target_language }) => {
      langs.add(source_language);
      langs.add(target_language);
    });
    return langs;
  }, [storeLocalizations]);

  // Prepare language options for ComboBox excluding used languages
  const languageOptions: ComboBoxItemType[] = useMemo(() => {
    if (!supportedLanguages || !usedLanguages) return [];

    return supportedLanguages
      .filter((lang) => !usedLanguages.has(lang.code))
      .map((lang) => ({
        label: lang.name_en,
        value: lang.code,
        flag: lang.flag_emoji || "",
      }));
  }, [supportedLanguages, usedLanguages]);

  return { languageOptions };
}
