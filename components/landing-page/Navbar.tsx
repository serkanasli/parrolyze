import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
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
        <Button variant="default" size="lg" asChild>
          <Link href="/auth/signup">Get Started</Link>
        </Button>
      </div>
    </nav>
  );
}
