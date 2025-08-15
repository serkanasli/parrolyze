import { getStoreLocalizationsByProject } from "@/actions/store-localizations";
import { getSupportedLanguages } from "@/actions/supported-languages";
import LocalizationStore from "@/components/projects/localizations/store/localizations-store";
import { getProject } from "@/lib/database/queries/projects";
import { StoreLocalizationsProvider } from "@/providers/store-localizations-provider";
import { PageProps, StorePlatform } from "@/types/common";
import { redirect } from "next/navigation";

const VALID_PLATFORMS: StorePlatform[] = ["app_store", "play_store"];

export default async function Page({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const { projectId } = resolvedParams;
  const platform = resolvedSearchParams?.platform;

  const project = await getProject(projectId);

  const isValidPlatform = VALID_PLATFORMS.includes(platform as StorePlatform);

  if (!platform || !isValidPlatform) {
    const defaultPlatform: StorePlatform =
      project?.store_type === "both" ? "app_store" : (project?.store_type as StorePlatform);

    redirect(`/projects/${projectId}/localization/store?platform=${defaultPlatform}`);
  }

  const { data: storeLocalizations } = await getStoreLocalizationsByProject(project.id, platform);
  const { data: supportedLanguages } = await getSupportedLanguages();

  return (
    <StoreLocalizationsProvider
      project={project}
      platform={platform}
      storeLocalizations={storeLocalizations}
      supportedLanguages={supportedLanguages}
    >
      <LocalizationStore />
    </StoreLocalizationsProvider>
  );
}
