"use client";

import FormFieldItem from "@/components/form/form-field-item";
import ImageUpload from "@/components/form/image-upload";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import { useProjectForm } from "@/hooks/use-project-form";
import { useUser } from "@/hooks/use-user";
import { cn } from "@/lib/utils";
import { ActionResultType, OnSubmitSuccessType } from "@/types/common";
import { ProjectRowType } from "@/types/projects";
import { Loader2 } from "lucide-react";

type ProjectFormProps = {
  onSubmitSuccess?: OnSubmitSuccessType<ActionResultType<ProjectRowType>>;
  className?: string;
  cardTitle?: string;
  cardDescription?: string;
  submitButtonText?: string;
  submitButtonClassName?: string;
  submitButtonIcon?: React.ReactNode;
};

export default function ProjectForm({
  onSubmitSuccess,
  className,
  cardTitle,
  cardDescription,
  submitButtonText,
  submitButtonClassName,
  submitButtonIcon,
}: ProjectFormProps) {
  const { user } = useUser();

  const { form, formSubmit, showAppStoreField, showPlayStoreField, isLoading } = useProjectForm({
    userId: user?.id ?? "",
    onSubmitSuccess: onSubmitSuccess,
  });

  return (
    <Card className={cn("border-0 shadow-none md:min-w-md", className)}>
      {(cardTitle || cardDescription) && (
        <CardHeader className="text-center">
          <CardTitle>{cardTitle}</CardTitle>
          <CardDescription>{cardDescription}</CardDescription>
        </CardHeader>
      )}
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(formSubmit)} className="grid gap-6">
            {/*App Icon */}
            <FormField
              control={form.control}
              name="icon_file"
              render={({ field, fieldState }) => (
                <FormFieldItem label="Project Icon">
                  <ImageUpload {...field} invalid={fieldState.invalid} />
                </FormFieldItem>
              )}
            />

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

            <Button
              disabled={isLoading}
              type="submit"
              size="lg"
              variant="default"
              className={cn("w-full", submitButtonClassName)}
            >
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                submitButtonIcon && submitButtonIcon
              )}
              {submitButtonText || "Create my project"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
