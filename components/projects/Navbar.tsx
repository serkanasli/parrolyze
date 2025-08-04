import AppLogo from "@/components/app-logo";
import ThemeSwitcher from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import Link from "next/link";
import AccountMenu from "./account-menu";
import FeedbackDialog from "./feedback-dialog";
import ProjectSelector from "./project-selector";
import SidebarToggle from "./sidebar-toggle";

export default function Navbar() {
  return (
    <nav className="flex h-(--header-height) items-center">
      <AppLogo className="hidden w-3xs p-5 md:flex" />
      <div className="mx-2.5 flex flex-1 items-center justify-between">
        {/* Header: Project Selector */}
        <div className="flex items-center gap-2">
          <SidebarToggle />
          <ProjectSelector />
        </div>
        {/* Header: User Account */}
        <div className="flex items-center gap-2.5">
          <ThemeSwitcher />
          <Button asChild variant="outline" className="hidden md:flex">
            <Link
              href="https://github.com/serkanasli/parrolyze"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github />
              Github
            </Link>
          </Button>
          <FeedbackDialog />
          <AccountMenu />
        </div>
      </div>
    </nav>
  );
}
