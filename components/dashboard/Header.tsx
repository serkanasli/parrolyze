import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header>
      <nav className="main flex justify-between items-center py-2.5 h-20 px-2.5">
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={175}
            height={175}
            objectFit="cover"
          />
        </Link>
        <div className="flex gap-2.5 items-center max-md:hidden">
          <Link
            href="https://github.com/serkanasli/parrolyze"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="link">Open Source</Button>
          </Link>
          <Link href="/app">
            <Button variant="outline" size="lg">
              Login
            </Button>
          </Link>
          <Link href="/app">
            <Button variant="default" size="lg">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
