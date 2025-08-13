"use client";

import DynamicForm from "@/components/form/dynamic-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createProjectFormFields } from "@/constants/forms/create-project-form-fields";
import { useProjectForm } from "@/hooks/use-project-form";
import { useUser } from "@/hooks/use-user";
import { cn } from "@/lib/utils";
import { ActionResult, OnSubmitSuccess } from "@/types/common";
import { ProjectRow } from "@/types/projects";

import { createProjectSchema } from "@/validations/create-project-schema";

interface ProjectFormProps {
  onSubmitSuccess?: OnSubmitSuccess<ActionResult<ProjectRow>>;
  className?: string;
  cardTitle?: string;
  cardDescription?: string;
  submitButtonText?: string;
}

export default function ProjectForm({
  onSubmitSuccess,
  className,
  cardTitle,
  cardDescription,
  submitButtonText,
}: ProjectFormProps) {
  const { user } = useUser();

  const { onSubmit, formOptions } = useProjectForm({
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
        <DynamicForm
          schema={createProjectSchema}
          fields={createProjectFormFields}
          onSubmit={onSubmit}
          submitButtonText={submitButtonText}
          dynamicOptions={formOptions}
        />
      </CardContent>
    </Card>
  );
}
