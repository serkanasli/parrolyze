import { fetchModels } from "@/actions/open-router";
import { getStoreLocalizationsByProject } from "@/actions/store-localizations";
import { getSupportedLanguages } from "@/actions/supported-languages";
import LocalizationStore from "@/components/projects/localizations/store/localizations-store";
import { getProject } from "@/lib/database/queries/projects";
import { StoreLocalizationsProvider } from "@/providers/store-localizations-provider";
import { PageProps, StoreType } from "@/types/common";
import { redirect } from "next/navigation";

const VALID_PLATFORMS: StoreType[] = ["app_store", "play_store"];

export default async function Page({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const { projectId } = resolvedParams;
  const platform = resolvedSearchParams?.platform;

  const project = await getProject(projectId);

  const isValidPlatform = VALID_PLATFORMS.includes(platform as StoreType);

  if (!platform || !isValidPlatform) {
    const defaultPlatform: StoreType =
      project?.store_type === "both" ? "app_store" : (project?.store_type as StoreType);

    redirect(`/projects/${projectId}/localization/store?platform=${defaultPlatform}`);
  }

  const { data: storeLocalizations } = await getStoreLocalizationsByProject(project.id, platform);
  const { data: supportedLanguages } = await getSupportedLanguages();

  //open-router ai models
  const aiModels = await fetchModels();

  return (
    <StoreLocalizationsProvider
      project={project}
      platform={platform}
      storeLocalizations={storeLocalizations}
      supportedLanguages={supportedLanguages}
      aiModels={aiModels}
    >
      <LocalizationStore />
    </StoreLocalizationsProvider>
  );
}
