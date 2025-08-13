"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface SidebarItem {
  title: string;
  url: string;
  icon?: LucideIcon;
}

interface AppSidebarGroupProps extends React.ComponentPropsWithoutRef<typeof SidebarGroup> {
  items: SidebarItem[];
  hideText?: boolean;
}

export default function AppSidebarGroup({
  items,
  hideText = false,
  ...props
}: AppSidebarGroupProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map(({ title, url, icon: Icon }) => {
            const isActive =
              (mounted && pathname === url) || (url !== "/" && pathname.startsWith(url + "/"));
            return (
              <SidebarMenuItem key={title}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  className={cn(
                    "transition-shadow duration-200",
                    "data-[active=true]:bg-blue/10",
                    "data-[active=true]:shadow-sm",
                    "data-[active=true]:font-semibold",
                  )}
                >
                  <Link href={url} className="flex h-9 items-center gap-2">
                    {Icon && <Icon size={20} className="shrink-0" />}
                    {!hideText && (
                      <span className="text-sm transition-opacity duration-200">{title}</span>
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
