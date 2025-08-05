"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { login, signup } from "@/app/auth/login/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { mapSupabaseAuthError } from "@/lib/supabase/errors";
import { cn } from "@/lib/utils";
import { loginSchema, signUpSchema } from "@/validations/auth-schema";
import { Loader2Icon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import Divider from "../divider";
import PasswordRequirements from "../password-requirements";
import TermsNotice from "../terms-notice";
import { GoogleAuthButton } from "./google-auth-button";
import { SignupSuccessAlert } from "./signup-success-alert";

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

interface AuthFormProps {
  className?: string;
  mode: "login" | "signup";
}

export default function AuthForm({ className, mode }: AuthFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState<boolean>(false);
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const isLogin = mode === "login";
  const searchParams = useSearchParams();

  const {
    title,
    description,
    buttonText,
    googleButtonText,
    haveAccountText,
    haveAccountLink,
    haveAccountLinkText,
  } = formModes[mode];

  const formSchema = isLogin ? loginSchema : signUpSchema;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    const redirectTo = searchParams.get("redirect_to") || undefined;

    const formData = {
      ...values,
      redirectTo,
    };

    if (isLogin) {
      const response = await login(formData);
      if (!response.success) {
        const message = mapSupabaseAuthError(response);
        toast.error(message);
      }
    } else if (mode === "signup") {
      const response = await signup(formData);
      if (!response.success) {
        const message = mapSupabaseAuthError(response);
        toast.error(message);
      } else {
        setEmailSent(true);
      }
    }

    setIsLoading(false);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
              {/* Google Auth */}
              <div className="flex flex-col gap-4">
                <GoogleAuthButton disabled={isLoading} text={googleButtonText} />
              </div>

              {/* Divider */}
              <Divider text="OR" />
              {emailSent ? (
                <SignupSuccessAlert />
              ) : (
                <>
                  {/* Email Field */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="email@example.com" {...field} disabled={isLoading} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Password Field */}
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between">
                          <FormLabel>Password</FormLabel>
                          {isLogin && (
                            <Link
                              href="/auth/forgot-password"
                              className="text-blue text-sm underline-offset-4 hover:underline"
                            >
                              Forgot your password?
                            </Link>
                          )}
                        </div>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="password"
                            {...field}
                            disabled={isLoading}
                            onFocus={() => setIsPasswordFocused(true)}
                          />
                        </FormControl>
                        <FormMessage />
                        {!isLogin && isPasswordFocused && (
                          <PasswordRequirements password={form.watch("password")} />
                        )}
                      </FormItem>
                    )}
                  />

                  {/* Submit Button */}
                  <Button
                    disabled={isLoading}
                    type="submit"
                    className="w-full"
                    size="lg"
                    variant="blue"
                  >
                    {isLoading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
                    {buttonText}
                  </Button>
                </>
              )}

              {/* Footer Link */}
              <div className="text-center text-sm">
                {haveAccountText}{" "}
                <Link href={haveAccountLink} className="underline underline-offset-4">
                  {haveAccountLinkText}
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Terms */}
      <TermsNotice />
    </div>
  );
}
