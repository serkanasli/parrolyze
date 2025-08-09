import { ActionResultType } from "@/types/common";

export function mapSupabaseAuthError(result?: ActionResultType): string {
  switch (result?.code) {
    case "invalid_credentials":
      return "Invalid login credentials";
    case "email_not_confirmed":
      return "Please confirm your email address before logging in.";
    default:
      return result?.message || "Something went wrong. Please try again.";
  }
}
