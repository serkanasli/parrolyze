"use client";

import { SupportedLanguagesRow } from "@/types/supported-languages";
import AppStoreForm from "./forms/app-store-form";

type AppStoreViewProps = {
  supportedLanguages: SupportedLanguagesRow[];
};

function AppStoreView({ supportedLanguages }: AppStoreViewProps) {
  return <AppStoreForm supportedLanguages={supportedLanguages} />;
}

export default AppStoreView;
