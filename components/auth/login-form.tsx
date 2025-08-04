"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { GoogleAuthButton } from "./google-auth-button";

const formModes = {
  login: {
    title: "Welcome back",
    description: "Sign in with your Google account or email and password to access your dashboard.",
    buttonText: "Log in",
    googleButtonText: "Continue with Google",
    haveAccountText: "Don't have an account?",
    haveAccountLink: "/auth/signup",
    haveAccountLinkText: "Sign up",
  },
  signup: {
    title: "Create your account",
    description: "Sign up with your Google account or email to get started.",
    buttonText: "Sign up",
    googleButtonText: "Sign up with Google",
    haveAccountText: "Already have an account?",
    haveAccountLink: "/auth/login",
    haveAccountLinkText: "Log in",
  },
};

interface LoginFormProps {
  className?: string;
  mode: "login" | "signup";
}

export function LoginForm({ className, mode }: LoginFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isLogin = mode === "login";
  const {
    title,
    description,
    buttonText,
    googleButtonText,
    haveAccountLink,
    haveAccountText,
    haveAccountLinkText,
  } = formModes[mode];

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission logic here
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Simulate a successful login/signup
      router.push("/projects");
      console.log("Form submitted successfully");
    }, 1000);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-6">
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <GoogleAuthButton disabled={isLoading} text={googleButtonText} />
              </div>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">OR</span>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="email@example.com" />
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    {isLogin && (
                      <Link
                        href="/auth/forgot-password"
                        className="ml-auto text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </Link>
                    )}
                  </div>
                  <Input id="password" name="password" placeholder="password" type="password" />
                </div>
                <Button
                  disabled={isLoading}
                  type="submit"
                  className="w-full"
                  size="lg"
                  variant="blue"
                >
                  {isLoading && <Loader2Icon className="animate-spin" />}
                  {buttonText}
                </Button>
              </div>
              <div className="text-center text-sm">
                {haveAccountText}{" "}
                <Link href={haveAccountLink} className="underline underline-offset-4">
                  {haveAccountLinkText}
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <Link href="#">Terms of Service</Link> and{" "}
        <Link href="#">Privacy Policy</Link>.
      </div>
    </div>
  );
}
