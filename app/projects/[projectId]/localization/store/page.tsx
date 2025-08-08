import LocalizationStore from "@/components/projects/localizations/store/localizations-store";
import { getProject } from "@/lib/database/queries/projects";
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

  return <LocalizationStore project={project!} platform={platform!} />;
}
