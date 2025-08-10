"use client";

import DynamicForm from "@/components/form/dynamic-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useProjectForm } from "@/hooks/use-project-form";
import { useUser } from "@/hooks/use-user";
import { cn } from "@/lib/utils";
import { ActionResultType, OnSubmitSuccessType } from "@/types/common";
import { ProjectRowType } from "@/types/projects";

import { createProjectSchema } from "@/validations/create-project-schema";
import { createProjectFormFields } from "./create-project-form-fields";

type ProjectFormProps = {
  onSubmitSuccess?: OnSubmitSuccessType<ActionResultType<ProjectRowType>>;
  className?: string;
  cardTitle?: string;
  cardDescription?: string;
};

export default function ProjectForm({
  onSubmitSuccess,
  className,
  cardTitle,
  cardDescription,
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
          submitButtonText="Create Project"
          dynamicOptions={formOptions}
        />
      </CardContent>
    </Card>
  );
}
