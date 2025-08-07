"use client";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function MobileNavMenu() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="flex sm:hidden">
      <button className="mr-2.5" onClick={() => setIsOpen((prev) => !prev)}>
        {!isOpen ? <Menu className="h-9 w-9" /> : <X className="h-9 w-9" />}
      </button>
      {isOpen && (
        <div className="bg-surface absolute top-(--header-height) right-0 mt-2 h-[calc(100vh-var(--header-height))] w-full rounded-md">
          <nav className="flex flex-col items-start gap-2.5 py-4">
            <Button asChild variant="link" size="lg">
              <Link href="/auth/login">
                <span className="text-xl font-semibold">Login</span>
              </Link>
            </Button>
            <Button asChild variant="link" size="lg" className="w-full justify-between">
              <Link href="/auth/signup" className="flex w-full items-center justify-between">
                <span className="text-xl font-semibold">Get Started</span>
              </Link>
            </Button>
            <Button asChild variant="link" size="lg" className="w-full justify-between">
              <Link
                href="https://github.com/serkanasli/parrolyze"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-xl font-semibold">Github</span>
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </div>
  );
}
