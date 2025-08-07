"use client";

import FormFieldItem from "@/components/form/form-field-item";
import ImageUpload from "@/components/form/image-upload";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Form, FormField } from "@/components/ui/form";
import { useEditIconForm } from "@/hooks/use-project-form";
import { ProjectRow } from "@/types/projects";
import { Loader2 } from "lucide-react";

type EEditIconFormProps = {
  project: ProjectRow;
};

const EditIconForm = ({ project }: EEditIconFormProps) => {
  const { form, formSubmit, isLoading, isSuccess } = useEditIconForm({
    initialValues: {
      id: project?.id || "",
      icon_url: project?.icon_url || "",
      icon_file: project.icon_url || "",
    },
  });

  const onCancel = () => {
    form.reset();
  };

  const disabled = !form.formState.isDirty || isLoading || isSuccess;

  return (
    <Card className="border-0 shadow-none">
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(formSubmit)} className="grid gap-6" id="edit-icon-form">
            {/*App Icon */}
            <FormField
              control={form.control}
              name="icon_file"
              render={({ field, fieldState }) => (
                <FormFieldItem label="Project Icon">
                  <ImageUpload {...field} invalid={fieldState.invalid} hideDeleteButton />
                </FormFieldItem>
              )}
            />
          </form>
        </Form>
        <CardFooter className="mt-5 gap-x-2.5 px-0">
          <Button type="submit" disabled={disabled} variant="blue" form="edit-icon-form">
            {isLoading && <Loader2 className="animate-spin" />}
            Save Icon
          </Button>
          <Button onClick={() => onCancel()} disabled={disabled} variant="outline">
            Cancel
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default EditIconForm;
