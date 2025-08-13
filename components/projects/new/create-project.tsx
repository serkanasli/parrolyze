"use client";

import { ActionResult, OnSubmitSuccess } from "@/types/common";
import { ProjectRow } from "@/types/projects";
import { useRouter } from "next/navigation";
import ProjectForm from "./project-form";

export default function CreateProject() {
  const router = useRouter();
  const onSubmitSuccess: OnSubmitSuccess<ActionResult<ProjectRow>> = (response) => {
    if (response.success) {
      router.replace(`/projects/${response.data?.id || ""}/overview`);
      router.refresh();
    }
  };

  return (
    <ProjectForm
      className="mx-0 max-w-lg justify-start"
      onSubmitSuccess={onSubmitSuccess}
      submitButtonText="Create project"
    />
  );
}
