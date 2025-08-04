"use client";
import AppLogo from "@/components/app-logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Loader2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

function Page() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission logic here
    setIsLoading(true);
    // Simulate a login request
    setTimeout(() => {
      router.push("/projects");
      setIsLoading(false);
    }, 1000);
    // After successful login, redirect to the projects
  };
  return (
    <section className="section-wide bg-green-secondary/10 flex h-screen flex-col items-center justify-center px-2.5 md:px-0">
      <AppLogo
        image={{
          width: 200,
          height: 200,
        }}
      />
      <Card className="mt-5 w-full max-w-md border-0">
        <CardHeader>
          <CardTitle className="text-2xl lg:text-3xl">Log in</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} id="login-form">
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="email@example.com" />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/auth/forgot-password"
                    className="text-blue ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input id="password" type="password" placeholder="password" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            form="login-form"
            disabled={isLoading}
            type="submit"
            className="w-full"
            variant="blue"
            size="lg"
          >
            {isLoading && <Loader2Icon className="animate-spin" />}
            Login
          </Button>
          <Button disabled={true} className="ml-auto" asChild variant="link">
            <Link href="/auth/signup">Sign up</Link>
          </Button>
          <Separator className="my-2.5" />
          <Button disabled={isLoading} variant="secondary" className="w-full border" size="lg">
            <Image src="/icons/google.svg" alt="Google Logo" width={20} height={20} />
            Login with Google
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}

export default Page;
