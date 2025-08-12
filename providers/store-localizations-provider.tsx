"use client";
import { StoreType } from "@/types/common";
import { ProjectRowType } from "@/types/projects";
import { StoreLocalizationRowType } from "@/types/store-localizations";
import { SupportedLanguagesRowType } from "@/types/supported-languages";
import { createContext, ReactNode, useContext } from "react";

// Context tipini doğru belirtelim
type StoreLocalizationsContextType = {
  project: ProjectRowType | null;
  platform: StoreType | null;
  storeLocalizations: StoreLocalizationRowType[] | null;
  supportedLanguages: SupportedLanguagesRowType[] | null;
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
  project: ProjectRowType;
  platform: StoreType;
  storeLocalizations: StoreLocalizationRowType[] | undefined;
  supportedLanguages: SupportedLanguagesRowType[] | undefined;
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
