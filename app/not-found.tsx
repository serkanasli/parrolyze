import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-8 text-center">
      <h1 className="text-destructive mb-2 text-5xl font-extrabold tracking-tight">Oops! 404</h1>
      <Image
        src="/images/404-parrot.svg"
        width={200}
        height={200}
        alt="Confused Parrot"
        priority
        className="animate-bounce"
      />

      <p className="text-muted-foreground mb-6 max-w-md text-lg">
        This page has disappeared... or maybe the parrot messed things up again.
      </p>

      <Button asChild variant="outline" size="lg">
        <Link href="/">Back to Home</Link>
      </Button>
    </div>
  );
}
