"use client";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { ButtonVariant } from "@/types/common";
import { LucideIcon, Menu } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";

interface SidebarToggleProps extends Omit<ComponentPropsWithoutRef<typeof Button>, "children"> {
  icon?: LucideIcon;
  iconClassName?: string;
  variant?: ButtonVariant;
}

export default function SidebarToggle({
  icon: Icon,
  className,
  iconClassName,
  variant = "outline",
  ...props
}: SidebarToggleProps) {
  const { toggleSidebar } = useSidebar();

  const IconToRender = Icon ?? Menu;

  return (
    <Button
      type="button"
      variant={variant}
      size="icon"
      className={cn("flex md:hidden", className)}
      onClick={toggleSidebar}
      {...props}
    >
      <IconToRender size={20} className={cn("text-muted-foreground", iconClassName)} />
    </Button>
  );
}
