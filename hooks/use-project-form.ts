"use client";

import {
  createProjectWithIcon,
  updateProject,
  updateProjectIconWithUpload,
} from "@/actions/projects";
import { STORE_TYPES } from "@/constants";

import { withLoadingToast } from "@/lib/toast";
import { ActionResultType, OnSubmitSuccessType } from "@/types/common";
import { ComboBoxItemType } from "@/types/form";
import { CreateProjectDataType, ProjectRowType, ProjectUpdateType } from "@/types/projects";
import { CreateProjectFormValues } from "@/validations/create-project-schema";
import { EditIconFormValues, editIconSchema } from "@/validations/edit-icon-schema";
import { EditProjectFormValues, editProjectSchema } from "@/validations/edit-project-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm, useWatch } from "react-hook-form";

type UseProjectFormProps = {
  userId?: string;
  onSubmitSuccess?: OnSubmitSuccessType<ActionResultType<ProjectRowType>>;
  initialValues?: ProjectUpdateType;
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
  const [formOptions] = useState<Record<string, ComboBoxItemType[]>>({
    platforms: STORE_TYPES.map((platform) => ({
      label: platform.label,
      value: platform.value,
    })),
  });

  const onSubmit = async (values: CreateProjectFormValues) => {
    const payload: CreateProjectDataType = {
      project: {
        name: values.name,
        short_description: values.short_description,
        store_type: values.store_type,
        app_store_url: values.app_store_url ?? "",
        play_store_url: values.play_store_url ?? "",
        user_id: userId ?? "",
      },
      icon_file: values.icon_file || undefined,
    };

    const response = await withLoadingToast<ProjectRowType>(
      "Creating project...",
      "Project created successfully!",
      "An error occurred while creating the project.",
      null,
      () => createProjectWithIcon(payload),
    );

    if (response?.success && onSubmitSuccess) onSubmitSuccess(response);
  };

  return {
    onSubmit,
    formOptions,
  };
}

export function useEditProjectForm({ initialValues }: UseProjectFormProps) {
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<EditProjectFormValues>({
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

  const formSubmit = async (values: EditProjectFormValues) => {
    const payload: ProjectUpdateType = {
      id: values.id,
      name: values.name,
      short_description: values.short_description,
      store_type: values.store_type,
      app_store_url: values.app_store_url,
      play_store_url: values.play_store_url,
    };

    await withLoadingToast(
      "Updating project...",
      "Project updated successfully!",
      "An error occurred while updating the project.",
      setIsLoading,
      () => updateProject(values.id || "", payload),
    );
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

  const form = useForm<EditIconFormValues>({
    resolver: zodResolver(editIconSchema),
    defaultValues: {
      id: initialValues?.id ?? "",
      icon_url: initialValues?.icon_url,
      icon_file: initialValues?.icon_url,
    },
    mode: "onChange",
  });

  const formSubmit = async (values: EditIconFormValues) => {
    const response = await withLoadingToast(
      "Updating icon...",
      "Icon updated successfully!",
      "An error occurred while updating the icon.",
      setIsLoading,
      () => updateProjectIconWithUpload(values.id || "", values.icon_file),
    );

    if (response?.success) setIsSuccess(true);
  };

  return { form, isLoading, formSubmit, isSuccess };
}
