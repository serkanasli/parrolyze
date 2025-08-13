"use client";

import {
  createProjectWithIcon,
  updateProject,
  updateProjectIconWithUpload,
} from "@/actions/projects";
import { STORE_PLATFORM_OPTIONS } from "@/constants";

import { withLoadingToast } from "@/lib/toast";
import { ActionResult, OnSubmitSuccess } from "@/types/common";
import { ComboBoxItem } from "@/types/form";
import { CreateProjectData, ProjectRow, ProjectUpdate } from "@/types/projects";
import { CreateProjectFormValues } from "@/validations/create-project-schema";
import { EditIconFormValues } from "@/validations/edit-icon-schema";
import { EditProjectFormValues } from "@/validations/edit-project-schema";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface UseProjectFormProps {
  userId?: string;
  onSubmitSuccess?: OnSubmitSuccess<ActionResult<ProjectRow>>;
}

export function useProjectForm({ userId, onSubmitSuccess }: UseProjectFormProps) {
  const [formOptions] = useState<Record<string, ComboBoxItem[]>>({
    platforms: STORE_PLATFORM_OPTIONS.map((platform) => ({
      label: platform.label,
      value: platform.value,
    })),
  });

  const onSubmit = async (values: CreateProjectFormValues) => {
    const payload: CreateProjectData = {
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

    const response = await withLoadingToast<ProjectRow>(
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
  const [formOptions] = useState<Record<string, ComboBoxItem[]>>({
    platforms: STORE_PLATFORM_OPTIONS.map((platform) => ({
      label: platform.label,
      value: platform.value,
    })),
  });

  const onSubmit = async (values: EditProjectFormValues) => {
    const payload: ProjectUpdate = {
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
