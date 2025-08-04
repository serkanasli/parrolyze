"use client";
import AppLogo from "@/components/app-logo";
import { LoginForm } from "@/components/auth/login-form";

function Page() {
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
        <LoginForm mode="login" />
      </div>
    </div>
  );
}

export default Page;
