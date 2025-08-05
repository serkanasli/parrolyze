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
import { LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarImage } from "../ui/avatar";

export default function AccountMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="hover:bg-muted data-[state=open]:bg-blue/10 flex w-full cursor-pointer items-center justify-between rounded-md p-2">
        <div className="flex flex-row items-center gap-2.5">
          <Avatar>
            <AvatarImage
              src="/images/user-pic.jpg"
              alt="user picture"
              className="rounded-full object-cover"
            />
          </Avatar>
          <span className="hidden text-base font-medium lg:flex">Account</span>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64" side="bottom" align="end">
        <DropdownMenuLabel className="flex flex-col text-start">
          <span className="text-base font-medium">Serkan Aslı</span>
          <span className="text-muted-foreground text-xs">email@example.com</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="gap-y-1 py-1">
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href="/account" className="w-full items-center justify-start gap-2">
              <Settings size={20} />
              <span className="text-base font-medium">Account settings</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href="/auth/logout" className="w-full items-center justify-start gap-2">
              <LogOut size={20} className="text-destructive" />
              <span className="text-destructive font-medium">Logout</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
