"use client";

import { OnSubmitSuccessType } from "@/types/projects";
import { useRouter } from "next/navigation";
import ProjectForm from "./project-form";

export default function CreateProject() {
  const router = useRouter();
  const onSubmitSuccess: OnSubmitSuccessType = (response) => {
    if (response) {
      router.replace(`/projects/${response.id || ""}/overview`);
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
