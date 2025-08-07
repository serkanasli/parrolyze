"use client";
import { ProjectRow } from "@/types/projects";
import { LayoutGrid } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";

type ProjectSummaryProps = {
  projects: ProjectRow[];
};

export default function ProjectSummary({ projects }: ProjectSummaryProps) {
  const params = useParams();
  const projectId = typeof params?.projectId === "string" ? params.projectId : "";
  const project = projects.find((val) => val.id === projectId);

  if (!project)
    return (
      <div className="flex h-8 flex-row items-center gap-1.5">
        <LayoutGrid className="bg-secondary text-primary h-5 w-5 rounded-sm p-1 lg:h-7 lg:w-7" />
        <div className="flex flex-col text-start">
          <span className="text-sm font-semibold">All Project</span>
        </div>
      </div>
    );

  return (
    <div className="flex flex-row items-center gap-2.5">
      <Image
        src={project.icon_url || ""}
        alt={project.name}
        width={24}
        height={24}
        className="bg-secondary/10 h-6 w-6 rounded-sm lg:h-8 lg:w-8"
      />
      <div className="flex flex-col text-start">
        <span className="max-w-32 truncate text-sm font-semibold md:max-w-24 lg:max-w-fit">
          {project?.name}
        </span>
        <span className="text-muted-foreground hidden text-xs font-normal lg:flex">
          {project.short_description}
        </span>
      </div>
    </div>
  );
}
