"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ProjectRow } from "@/types/projects";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { DeleteProject } from "./delete-project";
import IconEditForm from "./edit-icon-form";
import EditProjectForm from "./edit-project-form";

type EditProjectPros = {
  project: ProjectRow;
};

export default function EditProject({ project }: EditProjectPros) {
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isFormDirty = (value: boolean) => {
    setIsDirty(value);
  };

  return (
    <>
      <div className="flex flex-col justify-between md:flex-row">
        <h1 className="mb-5 text-xl font-semibold lg:text-2xl">Project settings</h1>
        <div className="mr-auto flex flex-row-reverse gap-y-2 md:mr-0 md:flex-row md:gap-x-2.5">
          <DeleteProject projectName={project?.name} projectId={project.id} />
          <Button disabled={!isDirty || isLoading} type="submit" form="edit-project-form">
            {isLoading && <Loader2 className="animate-spin" />}
            Save changes
          </Button>
        </div>
      </div>
      <Separator className="mb-5" />
      <div className="grid grid-cols-12 gap-4">
        <div className="order-2 col-span-12 lg:order-1 lg:col-span-6">
          <IconEditForm project={project} />
        </div>
        <div className="order-1 col-span-12 lg:order-2 lg:col-span-6">
          <EditProjectForm
            project={project}
            isFormDirty={isFormDirty}
            setIsLoading={setIsLoading}
          />
        </div>
      </div>
    </>
  );
}
