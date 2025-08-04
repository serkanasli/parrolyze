"use client";
import AppLogo from "@/components/app-logo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2Icon } from "lucide-react";
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
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex items-center justify-center">
          <AppLogo
            image={{
              width: 200,
              height: 200,
            }}
          />
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Reset your password</CardTitle>
            <CardDescription>
              Enter your email address and we’ll send you a link to reset your password.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} id="login-form">
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="email@example.com" />
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
              Send reset password email
            </Button>
            <Button disabled={isLoading} className="ml-auto" asChild variant="link">
              <Link href="/auth/login">Log in</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default Page;
