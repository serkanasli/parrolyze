"use client";

import DynamicForm from "@/components/form/dynamic-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { editProjectIconFormFields } from "@/constants/forms/edit-project-icon-form-fields";
import { useEditIconForm } from "@/hooks/use-project-form";
import { ProjectRowType } from "@/types/projects";
import { editIconSchema } from "@/validations/edit-icon-schema";
import { Loader2 } from "lucide-react";
import { useState } from "react";

type EditIconFormProps = {
  project: ProjectRowType;
};

const EditIconForm = ({ project }: EditIconFormProps) => {
  const formId = "edit-project-icon-form";
  const [disabled, setDisabled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { onSubmit } = useEditIconForm();

  return (
    <Card className="border-0 shadow-none">
      <CardContent>
        <DynamicForm
          formId={formId}
          schema={editIconSchema}
          onSubmit={onSubmit}
          fields={editProjectIconFormFields}
          isSubmitButtonShow={false}
          defaultValues={{
            id: project.id,
            icon_url: project.icon_url || "",
            icon_file: project.icon_url,
          }}
          onStateChange={({ isLoading, isDirty, isSubmitSuccessful }) => {
            setIsLoading(isLoading);
            setDisabled(!isDirty || isLoading || isSubmitSuccessful);
          }}
        />

        <CardFooter className="mt-5 gap-x-2.5 px-0">
          <Button type="submit" disabled={disabled} variant="blue" form={formId}>
            {isLoading && <Loader2 className="animate-spin" />}
            Save Icon
          </Button>
          <Button type="reset" form={formId} disabled={disabled} variant="outline">
            Cancel
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default EditIconForm;
