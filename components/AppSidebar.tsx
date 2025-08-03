"use client";

import {
  AppWindow,
  ArrowLeftFromLine, // project ayarları için
  Globe,
  Key,
  LayoutDashboard, // store/application translations için
  Settings,
} from "lucide-react";
import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { AppSidebarGroup } from "./projects/AppSidebarGroup";
import SidebarToggleButton from "./projects/SidebarToggleButton";

// Menu items.
const data = {
  navMain: [
    {
      title: "Overview",
      url: "/projects/wikiup/overview",
      icon: LayoutDashboard,
    },
    {
      title: "Store Localization",
      url: "/projects/wikiup/localization/store",
      icon: Globe,
    },
    {
      title: "App Localization",
      url: "/projects/wikiup/localization/app",
      icon: AppWindow,
    },
  ],
  navSecondary: [
    {
      title: "API Keys",
      url: "/projects/api-keys",
      icon: Key,
    },
    {
      title: "Project Settings",
      url: "/projects/wikiup/settings",
      icon: Settings,
    },
  ],
};

export function AppSidebar() {
  const { state } = useSidebar();

  return (
    <Sidebar
      collapsible="icon"
      className="top-(--header-height) border-0 border-none"
    >
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
        <AppSidebarGroup items={data.navMain} />
      </SidebarContent>
      <SidebarFooter className="md:mb-(--header-height)">
        <AppSidebarGroup items={data.navSecondary} />
        <SidebarToggleButton
          className={cn(
            "md:flex mb-5 mx-2.5 ",
            state === "collapsed" && "cursor-e-resize",
            state === "expanded" && "cursor-w-resize"
          )}
          icon={ArrowLeftFromLine}
          iconClassName={cn(
            "transition-transform duration-500",
            state === "collapsed" && "rotate-180 ",
            state === "expanded" && "rotate-0 "
          )}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
