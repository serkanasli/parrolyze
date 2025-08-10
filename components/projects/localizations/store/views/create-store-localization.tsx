"use client";

import { createStoreLocalizations } from "@/actions/store-localizations";
import DynamicForm from "@/components/form/dynamic-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { withLoadingToast } from "@/lib/toast";
import { StoreType } from "@/types/common";
import { ComboBoxItemType } from "@/types/form";
import { SupportedLanguagesRowType } from "@/types/supported-languages";
import { appStoreFormSchema } from "@/validations/app-store-schema";
import { playStoreFormSchema } from "@/validations/play-store-schema";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import z from "zod";
import { appStoreFormFields } from "./config/app-store-fields";
import { playStoreFormFields } from "./config/play-store-fields";

type CreateStoreLocalizationProps = {
  supportedLanguages: SupportedLanguagesRowType[];
  platform: StoreType;
  projectId: string;
};

function CreateStoreLocalization({
  supportedLanguages,
  platform,
  projectId,
}: CreateStoreLocalizationProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [dynamicOptions, setDynamicOptions] = useState<Record<string, ComboBoxItemType[]>>({});

  const schema = platform === "app_store" ? appStoreFormSchema : playStoreFormSchema;
  const fields = platform === "app_store" ? appStoreFormFields : playStoreFormFields;

  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      const sourceLanguage = values?.source_language;

      const response = await withLoadingToast(
        "Creating localizations...",
        "Localization created successfully!",
        "An error occurred while creating the localization.",
        null,
        () => createStoreLocalizations<typeof schema>(values, sourceLanguage, projectId, platform),
      );

      if (response?.success) {
        setIsOpen(false);
        router.refresh();
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (supportedLanguages && supportedLanguages.length > 0) {
      setDynamicOptions({
        languages: supportedLanguages.map((lang) => ({
          label: lang.name_en,
          value: `${lang.code}-${lang.name_en}`,
          flag: lang.flag_emoji || "",
        })),
      });
    }
  }, [supportedLanguages]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogTrigger asChild>
        <Button type="button" variant="blue">
          <Plus />
          New Localization
        </Button>
      </DialogTrigger>
      <DialogContent className="scrollbar max-h-[calc(100vh-3rem)] overflow-y-auto sm:max-w-lg 2xl:h-auto 2xl:overflow-y-auto">
        <DialogHeader>
          <DialogTitle>New Localization</DialogTitle>
          <DialogDescription>
            Enter the app information for the selected language.
          </DialogDescription>
        </DialogHeader>

        <DynamicForm
          schema={schema}
          fields={fields}
          onSubmit={onSubmit}
          dynamicOptions={dynamicOptions}
        />
      </DialogContent>
    </Dialog>
  );
}

export default CreateStoreLocalization;
