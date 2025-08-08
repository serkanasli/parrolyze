import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ProjectRow } from "@/types/projects";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type ProjectOverviewProps = {
  projects: ProjectRow[];
  projectId?: string;
};

function ProjectOverview({ projects, projectId }: ProjectOverviewProps) {
  return (
    <>
      <div className="flex flex-col justify-between md:flex-row">
        <h1 className="mb-5 text-xl font-semibold lg:text-2xl">Overview</h1>
      </div>

      <div className="flex gap-x-2.5">
        <div className="flex flex-row gap-x-2.5">
          <Button
            className={cn(
              projectId === undefined &&
                "bg-blue/5 hover:bg-blue/10 border-blue dark:bg-blue/5 dark:hover:bg-blue/10 dark:border-blue",
            )}
            variant="outline"
            asChild
          >
            <Link href="/projects/overview">All projects</Link>
          </Button>

          {projects.length < 1 && (
            <Link href="/projects/new" className="flex w-full items-center justify-start gap-2">
              <Plus size={20} className="text-green-primary" />
              <span className="text-green-primary font-medium">Create a new project</span>
            </Link>
          )}
        </div>
        {projects?.map((project) => (
          <Button
            asChild
            className={cn(
              project.id === projectId &&
                "bg-blue/5 hover:bg-blue/10 border-blue dark:bg-blue/5 dark:hover:bg-blue/10 dark:border-blue",
            )}
            variant="outline"
            key={project.id}
          >
            <Link href={`/projects/${project.id}/overview`}>
              <Image
                src={project.icon_url || ""}
                width={24}
                height={24}
                alt={project.name + " logo"}
                className="rounded-sm"
              />
              {project.name}
            </Link>
          </Button>
        ))}
      </div>
      <Separator className="my-5" />
    </>
  );
}

export default ProjectOverview;
