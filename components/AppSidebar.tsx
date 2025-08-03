import { House, Languages, Settings2Icon } from "lucide-react";
import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";

// Menu items.
const items = [
  {
    title: "Overview",
    url: "/dashboard/overview",
    icon: House,
  },
  {
    title: "Translations",
    url: "/dashboard/translations",
    icon: Languages,
  },
  {
    title: "Project Settings",
    url: "/dashboard/projects/wikiup/settings",
    icon: Settings2Icon,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="top-(--header-height) border-0 border-none">
      {/* Sidebar Navigation */}
      <SidebarHeader className="flex md:hidden">
        <Link href="/" className="flex items-center p-2.5">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={175}
            height={175}
            objectFit="cover"
          />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className="flex items-center h-10 gap-2.5"
                    >
                      <div className="w-5 h-5">
                        <item.icon size={20} />
                      </div>
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
