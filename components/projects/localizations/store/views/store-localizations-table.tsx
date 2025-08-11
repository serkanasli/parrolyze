"use client";

import { ComboBox } from "@/components/combobox";
import { CopyButton } from "@/components/CopyButton";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";

import useAvailableLanguageOptions from "@/hooks/use-available-language-options";
import useStoreLocalizationRows from "@/hooks/use-store-localization-rows";
import useStoreLocalizationsActions from "@/hooks/use-store-localizations-actions";
import { getLanguageLabel } from "@/lib/store-localization-helpers";
import { StoreLocalizationRowType } from "@/types/store-localizations";
import { SupportedLanguagesRowType } from "@/types/supported-languages";
import { ChevronDown, Plus, Trash } from "lucide-react";
import { AITranslateButton } from "../ai-translate-button";

type StoreLocalizationsTableProps = {
  storeLocalizations: StoreLocalizationRowType[];
  supportedLanguages: SupportedLanguagesRowType[];
};

function StoreLocalizationsTable({
  storeLocalizations,
  supportedLanguages,
}: StoreLocalizationsTableProps) {
  const { localizations, sourceLocalizations, uniqueTargetLanguages } = useStoreLocalizationRows({
    storeLocalizations,
  });

  const { languageOptions } = useAvailableLanguageOptions({
    storeLocalizations,
    supportedLanguages,
  });

  const { handleAddStoreLocalizations, handleRemoveStoreLocalizations } =
    useStoreLocalizationsActions({
      sourceLocalizations,
      storeLocalizations,
    });

  // Get a source language code example (from the first source localization)
  const sourceLanguage = sourceLocalizations[0]?.target_language ?? "";

  return (
    <div className="flex flex-col gap-y-5">
      {/* Locale Add ComboBox */}
      <div className="ml-auto">
        <ComboBox
          align="end"
          options={languageOptions}
          onValueChange={handleAddStoreLocalizations}
          trigger={
            <Button variant="outline" className="flex items-center gap-1">
              <Plus />
              Add locale
              <ChevronDown />
            </Button>
          }
        />
      </div>

      {/* Localizations Table */}
      <div className="overflow-auto">
        <Table>
          <TableHeader className="h-14">
            <TableRow className="hover:bg-transparent">
              <TableHead className="bg-green-primary/5 min-w-[160px] border font-semibold">
                FIELDS
              </TableHead>
              <TableHead className="bg-blue/5 min-w-[320px] border font-semibold">
                {`${getLanguageLabel(supportedLanguages, sourceLanguage)} (Source)`}
              </TableHead>

              {/* Dynamic target language columns */}
              {uniqueTargetLanguages.map((lang) => (
                <TableHead
                  key={lang}
                  className="min-w-[320px] border font-semibold whitespace-nowrap"
                >
                  <div className="flex items-center justify-between gap-x-1">
                    {getLanguageLabel(supportedLanguages, lang)}

                    <div className="flex items-center gap-1">
                      {/* AI Translate and Delete buttons */}
                      <AITranslateButton
                        langCode={lang}
                        storeLocalizations={storeLocalizations}
                        variant="blue"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveStoreLocalizations(lang)}
                      >
                        <Trash className="text-destructive" />
                      </Button>
                    </div>
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {/* Rows for each source localization */}
            {localizations.map(({ source, locales }) => (
              <TableRow key={source.id} className="min-h-[96px] hover:bg-transparent">
                <TableCell className="bg-green-primary/5 border font-semibold capitalize">
                  {source.field.replaceAll("_", " ")}
                </TableCell>

                <TableCell className="bg-blue/5 border p-2 whitespace-pre-wrap">
                  {source.source_text}
                </TableCell>

                {/* Cells for each translation */}
                {uniqueTargetLanguages.map((lang) => {
                  const locale = locales.find((l) => l.target_language === lang);
                  return (
                    <TableCell key={lang} className="gap-y-1 border whitespace-pre-wrap">
                      <div className="flex h-full w-full flex-col">
                        <Textarea
                          defaultValue={locale?.translated_text || ""}
                          className="min-h-[96px]"
                        />
                        <div className="flex justify-between p-1">
                          <div className="flex gap-2">
                            <AITranslateButton
                              locale={locale}
                              variant="ghost"
                              className="text-blue hover:text-blue"
                            />
                            <CopyButton text={locale?.translated_text || ""} />
                          </div>
                          <span className="text-muted-foreground text-sm font-medium">
                            {locale?.translated_text.length ?? 0} chars
                          </span>
                        </div>
                      </div>
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default StoreLocalizationsTable;
