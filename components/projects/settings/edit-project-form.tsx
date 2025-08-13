"use client";

import DynamicForm from "@/components/form/dynamic-form";
import { Card, CardContent } from "@/components/ui/card";
import { useEditProjectForm } from "@/hooks/use-project-form";
import { ProjectRow } from "@/types/projects";

import { editProjectFormFields } from "@/constants/forms/edit-project-form-fields";
import { editProjectSchema } from "@/validations/edit-project-schema";
import { useState } from "react";
import z from "zod";

interface EditProjectFormProps {
  formId: string;
  project: ProjectRow;
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditProjectForm = ({ project, formId, setDisabled, setIsLoading }: EditProjectFormProps) => {
  const { onSubmit, formOptions } = useEditProjectForm();
  const [defaultValues] = useState<z.infer<typeof editProjectSchema>>({
    id: project?.id,
    name: project.name,
    store_type: project.store_type,
    short_description: project.short_description,
    app_store_url: project.app_store_url || "",
    play_store_url: project?.play_store_url || "",
  });

  return (
    <Card className="border-0 shadow-none">
      <CardContent>
        <DynamicForm
          formId={formId}
          schema={editProjectSchema}
          fields={editProjectFormFields}
          isSubmitButtonShow={false}
          dynamicOptions={formOptions}
          onSubmit={onSubmit}
          onStateChange={({ isDirty, isLoading }) => {
            setIsLoading(isLoading);
            setDisabled(!isDirty || isLoading);
          }}
          defaultValues={defaultValues}
        />
      </CardContent>
    </Card>
  );
};

export default EditProjectForm;
