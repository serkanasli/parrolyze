"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import { getSidebarItems } from "@/data/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { ArrowLeftFromLine } from "lucide-react";
import { useParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import AppLogo from "../app-logo";
import AppSidebarGroup from "./app-sidebar-group";
import SidebarToggle from "./sidebar-toggle";

// Menu items.

export default function AppSidebar() {
  const { state, setOpen } = useSidebar();
  const isMobile = useIsMobile();

  const params = useParams();
  const projectId = typeof params?.projectId === "string" ? params.projectId : "";
  const isMobileViewWithoutProject = isMobile && !projectId;
  const sidebarItems = getSidebarItems(projectId);

  useEffect(() => {
    if (!params.projectId) {
      setOpen(false);
    } else if (state === "expanded" && params.projectId) {
      setOpen(true);
    }
  }, [params, setOpen, state]);

  const shouldShowItem = useCallback(
    (item: { hideIfMobileAndNoProject?: boolean }) => {
      if (item.hideIfMobileAndNoProject && isMobileViewWithoutProject) {
        return false;
      }
      return true;
    },
    [isMobileViewWithoutProject],
  );

  return (
    <Sidebar
      collapsible={projectId ? "icon" : "offcanvas"}
      className="top-(--header-height) border-0 border-none"
    >
      {/* Sidebar Navigation */}
      <SidebarHeader className="bg-surface flex md:hidden">
        <AppLogo href="/projects/overview" />
      </SidebarHeader>
      <SidebarContent className="bg-surface">
        <AppSidebarGroup items={sidebarItems.navMain.filter(shouldShowItem)} />
      </SidebarContent>
      <SidebarFooter className="bg-surface md:mb-(--header-height)">
        <AppSidebarGroup items={sidebarItems.navSecondary.filter(shouldShowItem)} />

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuButton asChild>
                <SidebarToggle
                  className={cn(
                    "max-w-fit md:flex",
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
              </SidebarMenuButton>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}
