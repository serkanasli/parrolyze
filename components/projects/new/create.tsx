"use client";

import { CreateProjectResult } from "@/lib/database/transactions/projects";
import { useRouter } from "next/navigation";
import ProjectForm from "./project-form";

export default function CreateProject() {
  const router = useRouter();
  const onSubmitSuccess = (response: CreateProjectResult) => {
    if (response.project) {
      router.replace(`/projects/${response.project.id}/overview`);
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
