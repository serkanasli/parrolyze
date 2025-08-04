"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface SidebarItem {
  title: string;
  url: string;
  icon?: LucideIcon;
}

interface AppSidebarGroupProps extends React.ComponentPropsWithoutRef<typeof SidebarGroup> {
  items: SidebarItem[];
  hideText?: boolean; // icon-only
}

export default function AppSidebarGroup({
  items,
  hideText = false,
  ...props
}: AppSidebarGroupProps) {
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map(({ title, url, icon: Icon }) => (
            <SidebarMenuItem key={title}>
              <SidebarMenuButton asChild>
                <Link href={url} className="flex h-12 items-center">
                  {Icon && <Icon size={24} className="shrink-0" />}
                  {!hideText && <span className="text-base font-medium">{title}</span>}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
