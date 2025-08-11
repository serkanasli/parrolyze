import {
  StoreLocalizationRowType,
  StoreLocalizationTableRowType,
} from "@/types/store-localizations";
import { SupportedLanguagesRowType } from "@/types/supported-languages";

export function getLanguageLabel(
  languages: SupportedLanguagesRowType[] = [],
  code: string,
): string {
  const language = languages.find((lang) => lang.code === code);
  return language ? `${language.name_en ?? ""} ${language.flag_emoji ?? ""}`.trim() : "";
}

// Source localizations filter
export function getSourceLocalizations(storeLocalizations: StoreLocalizationRowType[]) {
  return storeLocalizations.filter((loc) => loc.source_language === loc.target_language);
}

// Map source localizations to rows with their translations
export function mapToLocalizationRows(
  storeLocalizations: StoreLocalizationRowType[],
  sourceLocalizations: StoreLocalizationRowType[],
): StoreLocalizationTableRowType[] {
  if (!storeLocalizations.length) return [];

  return sourceLocalizations.map((sourceItem) => {
    const locales = storeLocalizations.filter(
      (loc) =>
        loc.source_language === sourceItem.source_language &&
        loc.target_language !== sourceItem.source_language &&
        loc.project_id === sourceItem.project_id,
    );
    return { source: sourceItem, locales };
  });
}

// Extract unique target languages from localization rows
export function extractUniqueTargetLanguages(localizations: StoreLocalizationTableRowType[]) {
  const langs = new Set<string>();
  localizations.forEach(({ locales }) => locales.forEach((l) => langs.add(l.target_language)));
  return Array.from(langs);
}
