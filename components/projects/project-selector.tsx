"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { projects } from "@/data/projects";
import { ChevronDown, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ProjectSelector() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="bg-background hover:bg-muted data-[state=open]:bg-blue/10 flex cursor-pointer items-center justify-between gap-x-2.5 rounded-md p-1.5 md:p-2">
        <div className="flex flex-row items-center gap-2.5">
          <Image
            src="/projects/locyst.svg"
            alt="Project logo"
            width={24}
            height={24}
            className="bg-secondary/10 h-6 w-6 rounded-sm md:h-8 md:w-8"
          />
          <div className="flex flex-col text-start">
            <span className="font-medium">Locyst</span>
            <span className="text-muted-foreground hidden text-xs md:flex">
              Save location & get directions
            </span>
          </div>
        </div>
        <ChevronDown className="text-muted-foreground" size={18} />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-60" side="bottom" align="start">
        <DropdownMenuLabel className="text-muted-foreground text-xs">
          Your Projects
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="gap-y-1 py-1">
          {projects.map((project) => (
            <DropdownMenuItem asChild key={project.name} className="cursor-pointer">
              <Link href={project.href} className="w-full items-center justify-start gap-2">
                <Image
                  src={project.icon}
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
