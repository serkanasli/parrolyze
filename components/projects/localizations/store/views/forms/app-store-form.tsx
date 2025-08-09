"use client";

import { createStoreLocalizations } from "@/actions/store-localizations";
import { ComboBox } from "@/components/combobox";
import FormFieldItem from "@/components/form/form-field-item";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { withLoadingToast } from "@/lib/toast";
import { cn } from "@/lib/utils";
import { ComboBoxItemType, StoreFieldType } from "@/types/common";
import { SupportedLanguagesRowType } from "@/types/supported-languages";
import { appStoreFormSchema, AppStoreFormValues } from "@/validations/app-store-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const appStoreFormFields: StoreFieldType[] = [
  {
    name: "source_language",
    label: "Source language",
    type: "combobox",
    placeholder: "Select source language",
  },
  {
    name: "name",
    label: "Name",
    maxLength: 30,
    type: "text",
    placeholder: "e.g. My Awesome App",
  },
  {
    name: "subtitle",
    label: "Subtitle",
    maxLength: 30,
    type: "text",
    placeholder: "e.g. Your daily dose of productivity",
  },
  {
    name: "promotional_text",
    label: "Promotional Text",
    maxLength: 170,
    type: "textarea",
    placeholder: "e.g. Enjoy 50% off premium for a limited time!",
  },
  {
    name: "description",
    label: "Description",
    maxLength: 4000,
    type: "textarea",
    placeholder: "e.g. Discover, track, and manage your tasks with ease...",
  },
  {
    name: "keywords",
    label: "Keywords",
    maxLength: 100,
    type: "text",
    placeholder: "e.g. productivity, tasks, planner, schedule",
  },
];

type AppStoreFormProps = {
  supportedLanguages: SupportedLanguagesRowType[];
  projectId: string;
};

function AppStoreForm({ supportedLanguages, projectId }: AppStoreFormProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<AppStoreFormValues>({
    resolver: zodResolver(appStoreFormSchema),
    defaultValues: {
      source_language: "",
      name: "",
      subtitle: "",
      promotional_text: "",
      description: "",
      keywords: "",
    },
  });

  const comboboxItems: ComboBoxItemType[] = supportedLanguages.map((language) => ({
    label: language.name_en,
    value: `${language.code}-${language.name_en}`,
    flag: language?.flag_emoji || "",
  }));

  const onSubmit = async (values: AppStoreFormValues) => {
    try {
      const response = await withLoadingToast(
        "Creating localizations...",
        "Localization created successfully!",
        "An error occurred while creating the localization.",
        setIsLoading,
        () =>
          createStoreLocalizations({
            fields: values,
            sourceLanguage: values.source_language,
            projectId,
            platform: "app_store",
          }),
      );

      if (response?.success) {
        setIsOpen(false);
        router.refresh();
      }
    } catch (error) {}
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogTrigger asChild>
        <Button type="button" variant="blue">
          <Plus />
          New Localization
        </Button>
      </DialogTrigger>

      <DialogContent className="scrollbar h-[calc(100vh-3rem)] overflow-y-auto sm:max-w-lg 2xl:h-auto 2xl:overflow-y-auto">
        <DialogHeader>
          <DialogTitle>New Localization</DialogTitle>
          <DialogDescription>
            Enter the app information for the selected language.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-5">
            {appStoreFormFields.map((item) => (
              <FormField
                key={item.name}
                control={form.control}
                name={item.name as keyof AppStoreFormValues}
                render={({ field, fieldState }) => (
                  <FormFieldItem
                    label={item.label}
                    labelRightComponent={
                      item.maxLength && (
                        <span
                          className={cn(
                            "text-muted-foreground mr-2.5 text-xs",
                            fieldState?.error && "text-destructive",
                          )}
                        >
                          {field.value?.length || 0}/{item.maxLength}
                        </span>
                      )
                    }
                  >
                    {item.type === "text" ? (
                      <Input placeholder={item.placeholder} maxLength={item.maxLength} {...field} />
                    ) : item.type === "textarea" ? (
                      <Textarea
                        {...field}
                        placeholder={item.placeholder}
                        className="h-24"
                        maxLength={item.maxLength}
                      />
                    ) : item.type === "combobox" ? (
                      <ComboBox
                        buttonClassName="w-full"
                        items={comboboxItems}
                        placeholder={item.placeholder}
                        defaultValue={field.value}
                        onValueChange={(val) => field.onChange(val)}
                      />
                    ) : null}
                  </FormFieldItem>
                )}
              />
            ))}

            <DialogFooter className="mt-6">
              <DialogClose asChild>
                <Button disabled={isLoading} variant="outline" type="button">
                  Cancel
                </Button>
              </DialogClose>
              <Button disabled={isLoading} type="submit">
                {isLoading && <Loader2 className="animate-spin" />}
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default AppStoreForm;
