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
import { useUser } from "@/hooks/use-user";
import { createProjectWithIcon } from "@/lib/database/transactions/projects";
import { cn } from "@/lib/utils";
import { StoreType } from "@/types/common";
import { CreateProjectData } from "@/types/projects";
import { projectNewSchema } from "@/validations/project-new-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function ProjectForm() {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof projectNewSchema>>({
    resolver: zodResolver(projectNewSchema),
    defaultValues: {
      name: "",
      icon_file: undefined,
      short_description: "",
      store_type: "both" as StoreType,
      play_store_url: "",
      app_store_url: "",
    },
    mode: "onChange",
  });

  const storeType = useWatch({
    control: form.control,
    name: "store_type",
  });

  const showAppStoreField = storeType === "both" || storeType === "app_store";
  const showPlayStoreField = storeType === "both" || storeType === "play_store";

  const onSubmit = async (values: z.infer<typeof projectNewSchema>) => {
    const toastId = toast.loading("Creating project...");
    try {
      const payload: CreateProjectData = {
        name: values.name,
        short_description: values.short_description,
        store_type: values.store_type,
        app_store_url: values.app_store_url ?? "",
        play_store_url: values.play_store_url ?? "",
        user_id: user?.id ?? "",
        icon_file: values.icon_file || undefined,
      };
      setIsLoading(true);

      const response = await createProjectWithIcon(payload);
      if (response.project) {
        toast.success("Project created successfully!", { id: toastId });
        router.replace(`/projects/${response.project.id}/overview`);
      }
    } catch (error) {
      console.log("error", error);
      toast.error("An error occurred while creating the project.", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 md:min-w-md">
      <Card className="border-0 shadow-none">
        <CardHeader className="text-center">
          <CardTitle>Create Your First Project</CardTitle>
          <CardDescription>
            Fill in the details below to get started with your mobile app project.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
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

              <Button disabled={isLoading} type="submit" size="lg" variant="default">
                Create my project
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
