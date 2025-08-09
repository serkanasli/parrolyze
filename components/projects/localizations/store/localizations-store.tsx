import { getStoreLocalizationsByProject } from "@/actions/store-localizations";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { STORE_TYPES } from "@/constants";
import { getSupportedLanguages } from "@/lib/database/queries/supported-languages";
import { cn } from "@/lib/utils";
import { StoreType } from "@/types/common";
import { ProjectRowType } from "@/types/projects";
import Image from "next/image";
import Link from "next/link";
import AppStoreForm from "./views/forms/app-store-form";
import PlayStoreForm from "./views/forms/play-store-form";
import StoreLocalizationsTable from "./views/store-localizations-table";

type LocalizationStoreProps = {
  project: ProjectRowType;
  platform: StoreType;
};

async function LocalizationStore({ project, platform }: LocalizationStoreProps) {
  const { data: storeLocalizations } = await getStoreLocalizationsByProject(project.id, platform);
  const supportedLanguages = await getSupportedLanguages();

  const renderStoreButtons = () => {
    const storesToShow =
      project.store_type === "both" ? ["app_store", "play_store"] : [project.store_type];

    return storesToShow.map((storeValue) => {
      const store = STORE_TYPES.find((s) => s.value === storeValue);
      if (!store) return null;
      const isActive = platform === storeValue;

      return (
        <Button
          asChild
          key={storeValue}
          variant="outline"
          className={cn({
            "bg-blue/5 hover:bg-blue/10 border-blue dark:bg-blue/5 dark:hover:bg-blue/10 dark:border-blue":
              isActive,
          })}
        >
          <Link href={`/projects/${project.id}/localization/store?platform=${storeValue}`}>
            <Image src={store.icon} width={20} height={20} alt="icon" />
            <span className="font-medium">{store.label}</span>
          </Link>
        </Button>
      );
    });
  };

  const renderContent = () => {
    if (storeLocalizations && storeLocalizations.length > 0) {
      return (
        <StoreLocalizationsTable
          storeLocalizations={storeLocalizations}
          supportedLanguages={supportedLanguages}
          projectId={project.id}
        />
      );
    } else if (platform === "app_store") {
      return <AppStoreForm supportedLanguages={supportedLanguages} projectId={project.id} />;
    } else if (platform === "play_store") {
      return <PlayStoreForm />;
    } else {
      return null;
    }
  };

  return (
    <>
      <div className="flex flex-col gap-x-5 gap-y-3 md:flex-row md:items-center">
        <h1 className="text-xl font-semibold lg:text-2xl">{project?.name || ""}</h1>
        <div className="flex gap-3">{renderStoreButtons()}</div>
      </div>
      <Separator className="my-5" />
      {renderContent()}
    </>
  );
}

export default LocalizationStore;
