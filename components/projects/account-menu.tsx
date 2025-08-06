import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getUserProfile } from "@/lib/database/queries/profiles";
import { createClient } from "@/lib/supabase/server";
import { LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarImage } from "../ui/avatar";

export default async function AccountMenu() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const profile = await getUserProfile(user?.id || "");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="hover:bg-muted data-[state=open]:bg-blue/10 flex w-full cursor-pointer items-center justify-between rounded-md p-2">
        <div className="flex flex-row items-center gap-2.5">
          <Avatar>
            <AvatarImage
              src={profile?.avatar_url || undefined}
              alt="user picture"
              className="rounded-full object-cover"
            />
          </Avatar>
          <span className="hidden text-base font-medium lg:flex">{profile?.name || "Account"}</span>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64" side="bottom" align="end">
        <DropdownMenuLabel className="flex flex-col text-start">
          <span className="text-base font-medium">{profile?.name || "Account"}</span>
          <span className="text-muted-foreground text-xs">{profile?.email}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="gap-y-1 py-1">
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href="/settings/account" className="w-full items-center justify-start gap-2">
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
