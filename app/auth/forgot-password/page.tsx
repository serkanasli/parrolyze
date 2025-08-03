"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
    <section className="section-wide flex flex-col items-center justify-center h-screen bg-green-secondary/10 px-2.5 md:px-0">
      <Link href={"/"}>
        <Image
          src={"/logo.svg"}
          alt="Logo"
          width={250}
          height={100}
          className="mb-5"
        />
      </Link>
      <Card className="w-full max-w-md mt-5 border-0">
        <CardHeader>
          <CardTitle className="text-2xl lg:text-3xl">Reset password</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} id="login-form">
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                />
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
          <Button
            disabled={isLoading}
            className="ml-auto"
            asChild
            variant="link"
          >
            <Link href="/auth/signin">Log in</Link>
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}

export default Page;
