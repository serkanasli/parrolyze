"use client";

import { saveStoreLocalizationsFromData } from "@/actions/store-localizations";
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
import { appStoreFormFields } from "@/constants/forms/app-store-form-fields";
import { playStoreFormFields } from "@/constants/forms/play-store-form-fields";
import { withLoadingToast } from "@/lib/toast";
import { useStoreLocalizations } from "@/providers/store-localizations-provider";
import { ComboBoxItem } from "@/types/form";
import { appStoreFormSchema } from "@/validations/app-store-schema";
import { playStoreFormSchema } from "@/validations/play-store-schema";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import z from "zod";

function CreateStoreLocalization() {
  const { platform, project, supportedLanguages } = useStoreLocalizations();

  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [dynamicOptions, setDynamicOptions] = useState<Record<string, ComboBoxItem[]>>({});

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
        () =>
          saveStoreLocalizationsFromData<typeof schema>({
            data: values,
            sourceLanguage: sourceLanguage,
            targetLanguage: sourceLanguage,
            platform: platform!,
            projectId: project?.id || "",
          }),
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
          value: lang.code,
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
