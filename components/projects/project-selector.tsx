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
import { createClient } from "@/lib/supabase/server";
import { ChevronDown, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ProjectSummary from "./project-summary";

export default async function ProjectSelector() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const projects = await getUserProjects(user?.id ?? "");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="bg-background hover:bg-muted data-[state=open]:bg-blue/10 flex cursor-pointer items-center justify-between gap-x-2.5 rounded-md p-1.5 lg:p-2">
        <ProjectSummary projects={projects} />
        <ChevronDown className="text-muted-foreground" size={18} />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-72" side="bottom" align="start">
        <DropdownMenuLabel className="text-muted-foreground text-xs">
          Your Projects
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="gap-y-1 py-1">
          {projects.map((project) => (
            <DropdownMenuItem asChild key={project.name} className="cursor-pointer">
              <Link
                href={{
                  pathname: `/projects/${project.id}/overview`,
                }}
                className="w-full items-center justify-start gap-2"
              >
                <Image
                  src={project?.icon_url || ""}
                  alt={project.name}
                  width={28}
                  height={28}
                  className="rounded-sm bg-white"
                />
                <span className="text-base font-medium">{project.name}</span>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/projects/new" className="w-full items-center justify-start gap-2">
            <Plus size={20} className="text-green-primary" />
            <span className="text-green-primary font-medium">Create New Project</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
