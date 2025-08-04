import { Github } from "lucide-react";
import Link from "next/link";
import AppLogo from "../app-logo";
import ThemeSwitcher from "../theme-switcher";
import { Button } from "../ui/button";
import AccountDropdown from "./account-menu";
import FeedbackDialog from "./feedback-dialog";
import ProjectSelector from "./project-selector";
import SidebarToggle from "./sidebar-toggle";

export default function Navbar() {
  return (
    <nav className="flex items-center h-[--header-height]">
      <AppLogo className="w-3xs p-5 hidden md:flex" />
      <div className="flex-1 flex justify-between items-center mx-2.5">
        {/* Header: Project Selector */}
        <div className="flex items-center gap-2">
          <SidebarToggle />
          <ProjectSelector />
        </div>
        {/* Header: User Account */}
        <div className="flex gap-2.5 items-center">
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
          <AccountDropdown />
        </div>
      </div>
    </nav>
  );
}
