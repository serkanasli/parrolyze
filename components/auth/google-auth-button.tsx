import { Button } from "@/components/ui/button";
import Image from "next/image";

type GoogleAuthButtonProps = {
  text?: string;
  disabled?: boolean;
};

export function GoogleAuthButton({
  text = "Continue with Google",
  disabled,
}: GoogleAuthButtonProps) {
  const handleGoogleSignIn = () => {
    // Handle Google sign-in logic here
    console.log("Google sign-in clicked");
  };

  return (
    <Button
      disabled={disabled}
      onClick={handleGoogleSignIn}
      type="button"
      variant="outline"
      className="w-full"
      size="lg"
    >
      <Image src="/icons/google.svg" alt="Google Logo" width={20} height={20} />
      {text}
    </Button>
  );
}
