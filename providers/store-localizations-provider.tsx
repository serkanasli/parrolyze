"use client";
import { StorePlatform } from "@/types/common";
import { ProjectRow } from "@/types/projects";
import { StoreLocalizationRow } from "@/types/store-localizations";
import { SupportedLanguagesRow } from "@/types/supported-languages";
import { createContext, ReactNode, useContext } from "react";

// Context tipini doğru belirtelim
type StoreLocalizationsContextType = {
  project: ProjectRow | null;
  platform: StorePlatform | null;
  storeLocalizations: StoreLocalizationRow[] | null;
  supportedLanguages: SupportedLanguagesRow[] | null;
  aiModels: object[];
};

const StoreLocalizationsContext = createContext<StoreLocalizationsContextType>({
  project: null,
  platform: null,
  storeLocalizations: [],
  supportedLanguages: [],
  aiModels: [],
});

type StoreLocalizationsProviderProps = {
  project: ProjectRow;
  platform: StorePlatform;
  storeLocalizations: StoreLocalizationRow[] | undefined;
  supportedLanguages: SupportedLanguagesRow[] | undefined;
  aiModels: object[];
  children: ReactNode;
};

export function StoreLocalizationsProvider({
  project,
  platform,
  storeLocalizations = [],
  supportedLanguages = [],
  aiModels,
  children,
}: StoreLocalizationsProviderProps) {
  return (
    <StoreLocalizationsContext.Provider
      value={{ project, platform, storeLocalizations, supportedLanguages, aiModels }}
    >
      {children}
    </StoreLocalizationsContext.Provider>
  );
}

export function useStoreLocalizations() {
  const context = useContext(StoreLocalizationsContext);
  if (!context) {
    throw new Error("useStoreLocalizations must be used within a StoreLocalizationsProvider");
  }
  return context;
}
