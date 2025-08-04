import AppLogo from "@/components/app-logo";
import ThemeSwitcher from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import Link from "next/link";
import { NavMenu } from "../nav-menu";

export default function Navbar() {
  return (
    <header className="flex h-20 items-center justify-between p-2.5">
      <AppLogo />
      <NavMenu />
      <nav className="hidden h-20 items-center gap-2.5 sm:flex">
        <ThemeSwitcher />
        <Button asChild variant="outline" className="border-border">
          <Link
            href="https://github.com/serkanasli/parrolyze"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github />
            Github
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/auth/login">Login</Link>
        </Button>
        <Button variant="blue" asChild>
          <Link href="/auth/signup">Get Started</Link>
        </Button>
      </nav>
    </header>
  );
}
