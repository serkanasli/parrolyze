import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="bg-muted flex min-h-screen flex-col items-center justify-center p-8 text-center">
      <AlertCircle className="text-destructive mb-4 h-16 w-16" />
      <h1 className="text-destructive mb-2 text-3xl font-semibold">Oops! Something went wrong.</h1>
      <p className="text-muted-foreground mb-6 max-w-md">
        Sorry, an unexpected error occurred. Please try again later.
      </p>
      <Button variant="outline">
        <Link href="/">Go Back Home</Link>
      </Button>
    </div>
  );
}
