"use client";
import ProjectForm from "@/components/projects/new/project-form";
import { ActionResultType, OnSubmitSuccessType } from "@/types/common";
import { ProjectRowType } from "@/types/projects";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const onSubmitSuccess: OnSubmitSuccessType<ActionResultType<ProjectRowType>> = (response) => {
    if (response.success) {
      router.replace(`/projects/${response.data?.id}/overview`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-5">
      <div className="flex flex-col items-center justify-center gap-y-2.5">
        <div className="flex h-14 w-14 items-center justify-center rounded-md p-2.5">
          <Image src="/images/parrot.svg" width={50} height={50} alt="logo" />
        </div>
        <div className="flex flex-col items-center justify-center gap-y-1">
          <h1 className="flex items-center gap-x-2.5 text-3xl font-semibold">
            Congratulations! 🎉
          </h1>
          <p className="text-muted-foreground text-lg">
            Welcome to your Parrolyze! Let&apos;s set up your first project.
          </p>
        </div>
      </div>
      <p className="text-muted-foreground text-base">This will only take a minute to complete</p>
      <ProjectForm
        onSubmitSuccess={onSubmitSuccess}
        cardDescription="Fill in the details below to get started with your mobile app project."
        cardTitle="Create Your First Project"
      />
    </div>
  );
}
