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
import { ChevronDown, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ProjectSelector() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex bg-background items-center justify-between p-1.5 md:p-2 hover:bg-muted rounded-md cursor-pointer data-[state=open]:bg-blue/10 gap-x-2.5">
        <div className="flex flex-row gap-2.5 items-center">
          <Image
            src="/projects/locyst.svg"
            alt="Project logo"
            width={24}
            height={24}
            className="rounded-sm bg-secondary/10 w-6 h-6 md:w-8 md:h-8"
          />
          <div className="flex flex-col text-start">
            <span className="font-medium">Locyst</span>
            <span className="text-xs text-muted-foreground hidden md:flex">
              Save location & get directions
            </span>
          </div>
        </div>
        <ChevronDown className="text-muted-foreground" size={18} />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-60" side="bottom">
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          Your Projects
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="py-1 gap-y-1">
          {[
            {
              name: "WikiUp",
              description: "Explore & Learn",
              href: "/projects/wikiup/overview",
              icon: "/projects/wikiup.svg",
            },
            {
              name: "Locyst",
              description: "Save & Navigate",
              href: "/projects/locyst/overview",
              icon: "/projects/locyst.svg",
            },
          ].map((project) => (
            <DropdownMenuItem
              asChild
              key={project.name}
              className="cursor-pointer"
            >
              <Link
                href={project.href}
                className="w-full justify-start gap-2 items-center"
              >
                <Image
                  src={project.icon}
                  alt={project.name}
                  width={24}
                  height={24}
                  className="border rounded-sm"
                />
                <span className="font-medium text-base">{project.name}</span>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link
            href="/projects/new"
            className="w-full justify-start gap-2 items-center"
          >
            <Plus size={20} className="text-green-primary" />
            <span className="font-medium text-green-primary">
              Create New Project
            </span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
