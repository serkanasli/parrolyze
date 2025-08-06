import ProjectForm from "@/components/projects/new/project-form";
import Image from "next/image";

export default function Page() {
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
      <ProjectForm />
    </div>
  );
}
