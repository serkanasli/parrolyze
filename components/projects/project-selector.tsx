import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getUserProjects } from "@/lib/database/queries/projects";
import { ChevronDown, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ProjectSummary from "./project-summary";

export default async function ProjectSelector() {
  const projects = await getUserProjects();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="bg-surface-primary hover:bg-muted data-[state=open]:bg-blue/10 flex cursor-pointer items-center justify-between gap-x-2.5 rounded-md p-1.5 lg:p-2 dark:border">
        <ProjectSummary projects={projects} />
        <ChevronDown className="text-muted-foreground" size={18} />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-72" side="bottom" align="start">
        <DropdownMenuLabel className="text-muted-foreground text-xs">
          Your Projects
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href="/projects/new" className="w-full items-center justify-start gap-2">
              <Plus size={20} className="text-green-primary" />
              <span className="text-green-primary font-medium">Create a new project</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        {projects.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuGroup className="gap-y-1 py-1">
              {projects.map((project, index) => (
                <DropdownMenuItem
                  asChild
                  key={`${project.name}_${index}`}
                  className="cursor-pointer"
                >
                  <Link
                    href={{
                      pathname: `/projects/${project.id}/overview`,
                    }}
                    className="w-full items-center justify-start gap-2"
                  >
                    <Image
                      src={project?.icon_url || ""}
                      alt={project.name}
                      width={20}
                      height={20}
                      className="rounded-sm bg-white"
                    />
                    <span className="text-sm font-medium">{project.name}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
