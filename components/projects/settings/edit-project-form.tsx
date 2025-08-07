"use client";

import FormFieldItem from "@/components/form/form-field-item";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { STORE_TYPES } from "@/constants";
import { useEditProjectForm } from "@/hooks/use-project-form";
import { cn } from "@/lib/utils";
import { ProjectRow } from "@/types/projects";
import { useEffect } from "react";

type EditProjectFormProps = {
  project: ProjectRow;
  isFormDirty: (isDirty: boolean) => void;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditProjectForm = ({ project, isFormDirty, setIsLoading }: EditProjectFormProps) => {
  const { form, formSubmit, showAppStoreField, showPlayStoreField, isLoading } = useEditProjectForm(
    {
      initialValues: project,
    },
  );

  useEffect(() => {
    isFormDirty(form.formState.isDirty);
  }, [form.formState.isDirty, isFormDirty]);

  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading, setIsLoading]);

  return (
    <Card className="border-0 shadow-none">
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(formSubmit)}
            className="grid gap-6"
            id="edit-project-form"
          >
            {/* Project Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
                <FormFieldItem
                  label="Project Name"
                  labelRightComponent={
                    <span
                      className={cn(
                        "text-muted-foreground mr-2.5 text-xs",
                        fieldState?.error && "text-destructive",
                      )}
                    >
                      {field.value?.length || 0}/30
                    </span>
                  }
                >
                  <Input placeholder="My Awesome App" {...field} />
                </FormFieldItem>
              )}
            />

            {/* Short Description */}
            <FormField
              control={form.control}
              name="short_description"
              render={({ field, fieldState }) => (
                <FormFieldItem
                  label="Short Description"
                  labelRightComponent={
                    <span
                      className={cn(
                        "text-muted-foreground mr-2.5 text-xs",
                        fieldState?.error && "text-destructive",
                      )}
                    >
                      {field.value?.length || 0}/30
                    </span>
                  }
                >
                  <Input placeholder="A social media app" {...field} />
                </FormFieldItem>
              )}
            />

            {/* Store Type */}

            <FormField
              control={form.control}
              name="store_type"
              render={({ field }) => (
                <FormFieldItem label="Which store is your app published on?">
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a store" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Available Stores</SelectLabel>
                        {STORE_TYPES.map((store) => (
                          <SelectItem key={store.value} value={store.value}>
                            {store.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormFieldItem>
              )}
            />

            {/* App Store Url */}
            {showAppStoreField && (
              <FormField
                control={form.control}
                name="app_store_url"
                render={({ field }) => (
                  <FormFieldItem label="App Store">
                    <Input placeholder="Paste Apple App Store URL" {...field} />
                  </FormFieldItem>
                )}
              />
            )}

            {/* Play Store Url */}
            {showPlayStoreField && (
              <FormField
                control={form.control}
                name="play_store_url"
                render={({ field }) => (
                  <FormFieldItem label="Google Play Store">
                    <Input placeholder="Paste your app’s Google Play Store URL here" {...field} />
                  </FormFieldItem>
                )}
              />
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default EditProjectForm;
