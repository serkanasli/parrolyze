import { StoreLocalizationRow, StoreLocalizationTableRow } from "@/types/store-localizations";
import { SupportedLanguagesRow } from "@/types/supported-languages";

export function getLanguageLabel(languages: SupportedLanguagesRow[] | null, code: string): string {
  if (!languages) return "";

  const language = languages.find((lang) => lang.code === code);
  return language ? `${language.name_en ?? ""} ${language.flag_emoji ?? ""}`.trim() : "";
}

// Source localizations filter
export function getSourceLocalizations(storeLocalizations: StoreLocalizationRow[] | null) {
  if (!storeLocalizations) return [];

  return storeLocalizations.filter((loc) => loc.source_language === loc.target_language);
}

// Map source localizations to rows with their translations
export function mapToLocalizationRows(
  storeLocalizations: StoreLocalizationRow[] | null,
  sourceLocalizations: StoreLocalizationRow[],
): StoreLocalizationTableRow[] {
  if (!storeLocalizations) return [];

  return sourceLocalizations.map((sourceItem) => {
    const locales = storeLocalizations.filter(
      (loc) =>
        loc.source_language === sourceItem.source_language &&
        loc.target_language !== sourceItem.source_language &&
        loc.project_id === sourceItem.project_id &&
        loc.field === sourceItem.field,
    );
    return { source: sourceItem, locales };
  });
}

// Extract unique target languages from localization rows
export function extractUniqueTargetLanguages(localizations: StoreLocalizationTableRow[]) {
  const langs = new Set<string>();
  localizations.forEach(({ locales }) => locales.forEach((l) => langs.add(l.target_language)));
  return Array.from(langs);
}
