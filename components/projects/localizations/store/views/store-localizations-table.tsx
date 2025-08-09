"use client";

import { StoreLocalizationRowType } from "@/types/store-localizations";
import { SupportedLanguagesRowType } from "@/types/supported-languages";

type StoreLocalizationsTableProps = {
  storeLocalizations: StoreLocalizationRowType[];
  supportedLanguages: SupportedLanguagesRowType[];
  projectId: string;
};

function StoreLocalizationsTable({
  storeLocalizations,
  supportedLanguages,
  projectId,
}: StoreLocalizationsTableProps) {
  return <div>Table</div>;
}

export default StoreLocalizationsTable;
