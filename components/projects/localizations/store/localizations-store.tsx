import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { STORE_TYPES } from "@/constants";
import { getProjectStoreLocalizations } from "@/lib/database/queries/store-localizations";
import { getSupportedLanguages } from "@/lib/database/queries/supported-languages";
import { cn } from "@/lib/utils";
import { StoreType } from "@/types/common";
import { ProjectRow } from "@/types/projects";
import Image from "next/image";
import Link from "next/link";
import AppStoreView from "./views/app-store-view";
import PlayStoreView from "./views/play-store-view";

type LocalizationStoreProps = {
  project: ProjectRow;
  platform: StoreType;
};

async function LocalizationStore({ project, platform }: LocalizationStoreProps) {
  const storeLocalizations = await getProjectStoreLocalizations(project.id, platform);
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

  return (
    <>
      <div className="flex flex-col gap-x-5 gap-y-3 md:flex-row md:items-center">
        <h1 className="text-xl font-semibold lg:text-2xl">{project?.name || ""}</h1>
        <div className="flex gap-3">{renderStoreButtons()}</div>
      </div>
      <Separator className="my-5" />
      {platform === "app_store" && <AppStoreView />}
      {platform === "play_store" && <PlayStoreView />}
    </>
  );
}

export default LocalizationStore;
