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
import Image from "next/image";
import Link from "next/link";

export default function AccountDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center justify-between p-2 w-full hover:bg-muted rounded-md cursor-pointer data-[state=open]:bg-blue/10">
        <div className="flex flex-row gap-2.5 items-center">
          <Image
            src="/images/user-pic.jpg"
            alt="user picture"
            width={24}
            height={24}
            className="rounded-full bg-secondary/10 w-8 h-8 object-cover"
          />
          <span className="text-base font-medium">Account</span>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64 mx-2.5" side="bottom">
        <DropdownMenuLabel className="flex flex-col text-start">
          <span className="text-base font-medium">Serkan Aslı</span>
          <span className="text-xs text-muted-foreground">
            email@example.com
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="py-1 gap-y-1">
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link
              href="/dashboard/account"
              className="w-full justify-start gap-2 items-center"
            >
              <Settings size={20} />
              <span className="font-medium text-base">Account settings</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link
              href="/auth/signin"
              className="w-full justify-start gap-2 items-center"
            >
              <LogOut size={20} className="text-destructive" />
              <span className="font-medium text-destructive">Logout</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
