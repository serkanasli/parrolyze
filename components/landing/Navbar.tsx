import AppLogo from "@/components/app-logo";
import ThemeSwitcher from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-2.5 h-20">
      <AppLogo />
      <div className="flex gap-2.5 items-center max-md:hidden">
        <ThemeSwitcher />
        <Button asChild variant="link">
          <Link
            href="https://github.com/serkanasli/parrolyze"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open Source
          </Link>
        </Button>

        <Button variant="outline" size="lg" asChild>
          <Link href="/auth/signin">Login</Link>
        </Button>
        <Button variant="blue" size="lg" asChild>
          <Link href="/auth/signup">Get Started</Link>
        </Button>
      </div>
    </nav>
  );
}
