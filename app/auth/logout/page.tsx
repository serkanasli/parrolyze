"use client";

import { signOut } from "@/actions/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    async function logout() {
      await signOut();
      router.replace("/auth/login");
    }
    logout();
  }, [router]);

  return (
    <Card className="w-full max-w-md shadow-md">
      <CardHeader className="space-y-2 text-center">
        <CardTitle className="text-2xl">Logging out...</CardTitle>
        <CardDescription>You are being securely logged out. Please wait a moment.</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center py-6">
        <Loader2 className="text-primary h-10 w-10 animate-spin" />
      </CardContent>
    </Card>
  );
}
