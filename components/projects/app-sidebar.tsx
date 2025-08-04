"use client";

import { ArrowLeftFromLine } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { sidebarItems } from "@/data/sidebar";
import { cn } from "@/lib/utils";
import AppLogo from "../app-logo";
import ThemeSwitcher from "../theme-switcher";
import AppSidebarGroup from "./app-sidebar-group";
import SidebarToggle from "./sidebar-toggle";

// Menu items.

export default function AppSidebar() {
  const { state } = useSidebar();

  return (
    <Sidebar collapsible="icon" className="top-(--header-height) border-0 border-none">
      {/* Sidebar Navigation */}
      <SidebarHeader className="flex md:hidden">
        <AppLogo />
      </SidebarHeader>
      <SidebarContent>
        <AppSidebarGroup items={sidebarItems.navMain} />
      </SidebarContent>
      <SidebarFooter className="md:mb-(--header-height)">
        <AppSidebarGroup items={sidebarItems.navSecondary} />
        <div className="mb-5 flex items-center justify-between pr-5">
          <SidebarToggle
            className={cn(
              "mx-2.5 md:flex",
              state === "collapsed" && "cursor-e-resize",
              state === "expanded" && "cursor-w-resize",
            )}
            icon={ArrowLeftFromLine}
            iconClassName={cn(
              "transition-transform duration-500",
              state === "collapsed" && "rotate-180 ",
              state === "expanded" && "rotate-0 ",
            )}
          />
          <ThemeSwitcher className="flex md:hidden" />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
