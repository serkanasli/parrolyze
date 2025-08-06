import { CheckCircle2Icon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type SignupSuccessAlertProps = {
  className?: string;
};

export function SignupSuccessAlert({ className }: SignupSuccessAlertProps) {
  return (
    <Alert className={className}>
      <CheckCircle2Icon className="h-6 w-6 text-green-600" />
      <AlertTitle>Check your email to confirm</AlertTitle>
      <AlertDescription>
        You&apos;ve successfully signed up to Parrolyze. Please check your email to confirm your
        account before you start exploring. The confirmation link expires in 10 minutes.
      </AlertDescription>
    </Alert>
  );
}
