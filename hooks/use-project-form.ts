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
import { EditIconFormValues } from "@/validations/edit-icon-schema";
import { EditProjectFormValues } from "@/validations/edit-project-schema";
import { useRouter } from "next/navigation";
import { useState } from "react";

type UseProjectFormProps = {
  userId?: string;
  onSubmitSuccess?: OnSubmitSuccessType<ActionResultType<ProjectRowType>>;
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

export function useEditProjectForm() {
  const router = useRouter();
  const [formOptions] = useState<Record<string, ComboBoxItemType[]>>({
    platforms: STORE_TYPES.map((platform) => ({
      label: platform.label,
      value: platform.value,
    })),
  });

  const onSubmit = async (values: EditProjectFormValues) => {
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
      null,
      () => updateProject(values.id || "", payload),
    );
    router.refresh();
  };

  return {
    formOptions,
    onSubmit,
  };
}

export function useEditIconForm() {
  const router = useRouter();
  const onSubmit = async (values: EditIconFormValues) => {
    await withLoadingToast(
      "Updating icon...",
      "Icon updated successfully!",
      "An error occurred while updating the icon.",
      null,
      () => updateProjectIconWithUpload(values.id || "", values.icon_file),
    );

    router.refresh();
  };

  return { onSubmit };
}
