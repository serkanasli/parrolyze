"use client";
import type { Database } from "@/types/database.types";
import Image from "next/image";
import { useParams } from "next/navigation";

type ProjectRow = Database["public"]["Tables"]["projects"]["Row"];

type ProjectSummaryProps = {
  projects: ProjectRow[];
};

export default function ProjectSummary({ projects }: ProjectSummaryProps) {
  const params = useParams();
  const projectId = typeof params?.projectId === "string" ? params.projectId : "";
  const project = projects.find((val) => val.id === projectId);

  if (!project)
    return (
      <div className="flex flex-row items-center gap-2.5">
        <div className="flex flex-col text-start">
          <span className="font-medium">All Project</span>
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
        <span className="font-medium">{project?.name}</span>
        <span className="text-muted-foreground hidden text-xs lg:flex">
          {project.short_description}
        </span>
      </div>
    </div>
  );
}
