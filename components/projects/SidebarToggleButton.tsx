"use client";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { LucideIcon, Menu } from "lucide-react";
import type { ComponentProps } from "react";

type ButtonVariant =
  | "outline"
  | "ghost"
  | "default"
  | "destructive"
  | "link"
  | "secondary"
  | "blue"; // Eğer shadcn'de "blue" tanımlıysa

interface SidebarToggleButtonProps
  extends Omit<ComponentProps<typeof Button>, "children"> {
  icon?: LucideIcon;
  iconClassName?: string;
  variant?: ButtonVariant;
}

export default function SidebarToggleButton({
  icon: Icon,
  className,
  iconClassName,
  variant = "outline",
  ...props
}: SidebarToggleButtonProps) {
  const { toggleSidebar } = useSidebar();

  const IconToRender = Icon ?? Menu;

  return (
    <Button
      variant={variant}
      size="icon"
      className={cn("flex md:hidden", className)}
      onClick={toggleSidebar}
      {...props}
    >
      <IconToRender
        size={20}
        className={cn("text-muted-foreground", iconClassName)}
      />
    </Button>
  );
}
