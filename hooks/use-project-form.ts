"use client";

import {
  createProjectWithIcon,
  editProject,
  updateProjectIconWithUpload,
} from "@/lib/database/transactions/projects";
import { withLoadingToast } from "@/lib/toast";
import { StoreType } from "@/types/common";
import { CreateProjectData, OnSubmitSuccessType, ProjectUpdate } from "@/types/projects";
import { createProjectSchema } from "@/validations/create-project-schema";
import { editIconSchema } from "@/validations/edit-icon-schema";
import { editProjectSchema } from "@/validations/edit-project-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

type UseProjectFormProps = {
  userId?: string;
  onSubmitSuccess?: OnSubmitSuccessType;
  initialValues?: ProjectUpdate;
};

type UseEditIconFormProps = {
  onSubmitSuccess?: OnSubmitSuccessType;
  initialValues: {
    id?: string;
    icon_url?: string;
    icon_file?: File | string;
  };
};

export function useProjectForm({ userId, onSubmitSuccess }: UseProjectFormProps) {
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<z.infer<typeof createProjectSchema>>({
    resolver: zodResolver(createProjectSchema),
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

  const storeType = useWatch({ control: form.control, name: "store_type" });

  const formSubmit = async (values: z.infer<typeof createProjectSchema>) => {
    const payload: CreateProjectData = {
      name: values.name,
      short_description: values.short_description,
      store_type: values.store_type,
      app_store_url: values.app_store_url ?? "",
      play_store_url: values.play_store_url ?? "",
      user_id: userId ?? "",
      icon_file: values.icon_file || undefined,
    };

    const response = await withLoadingToast(
      "Creating project...",
      "Project created successfully!",
      "An error occurred while creating the project.",
      setIsLoading,
      () => createProjectWithIcon(payload),
    );

    if (response && onSubmitSuccess) onSubmitSuccess(response);
  };

  return {
    form,
    isLoading,
    formSubmit,
    showAppStoreField: storeType === "both" || storeType === "app_store",
    showPlayStoreField: storeType === "both" || storeType === "play_store",
  };
}

export function useEditProjectForm({ onSubmitSuccess, initialValues }: UseProjectFormProps) {
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<z.infer<typeof editProjectSchema>>({
    resolver: zodResolver(editProjectSchema),
    defaultValues: {
      id: initialValues?.id,
      name: initialValues?.name,
      short_description: initialValues?.short_description,
      store_type: initialValues?.store_type,
      play_store_url: initialValues?.play_store_url ?? "",
      app_store_url: initialValues?.app_store_url ?? "",
    },
    mode: "onChange",
  });

  const storeType = useWatch({ control: form.control, name: "store_type" });

  const formSubmit = async (values: z.infer<typeof editProjectSchema>) => {
    const payload: ProjectUpdate = {
      id: values.id,
      name: values.name,
      short_description: values.short_description,
      store_type: values.store_type,
      app_store_url: values.app_store_url,
      play_store_url: values.play_store_url,
    };

    const response = await withLoadingToast(
      "Updating project...",
      "Project updated successfully!",
      "An error occurred while updating the project.",
      setIsLoading,
      () => editProject(payload),
    );

    if (response && onSubmitSuccess) onSubmitSuccess(response);
  };

  return {
    form,
    isLoading,
    formSubmit,
    showAppStoreField: storeType === "both" || storeType === "app_store",
    showPlayStoreField: storeType === "both" || storeType === "play_store",
  };
}

export function useEditIconForm({ initialValues }: UseEditIconFormProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const form = useForm<z.infer<typeof editIconSchema>>({
    resolver: zodResolver(editIconSchema),
    defaultValues: {
      id: initialValues?.id ?? "",
      icon_url: initialValues?.icon_url,
      icon_file: initialValues?.icon_url,
    },
    mode: "onChange",
  });

  const formSubmit = async (values: z.infer<typeof editIconSchema>) => {
    const response = await withLoadingToast(
      "Updating icon...",
      "Icon updated successfully!",
      "An error occurred while updating the icon.",
      setIsLoading,
      () => updateProjectIconWithUpload(values.id || "", values.icon_file),
    );

    if (response) setIsSuccess(true);
  };

  return { form, isLoading, formSubmit, isSuccess };
}
