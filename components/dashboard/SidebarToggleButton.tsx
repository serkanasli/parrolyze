"use client";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { Menu } from "lucide-react";

export default function SidebarToggleButton() {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      variant="outline"
      size="icon"
      className="md:hidden"
      onClick={toggleSidebar}
    >
      <Menu size={20} className="text-muted-foreground" />
    </Button>
  );
}
