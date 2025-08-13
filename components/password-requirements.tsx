import { cn } from "@/lib/utils";
import { Circle, CircleCheck } from "lucide-react";

interface PasswordRequirementsProps {
  password: string;
}

function PasswordRequirements({ password }: PasswordRequirementsProps) {
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[^a-zA-Z0-9]/.test(password);
  const isValidLength = password.length >= 8;

  const requirements = [
    { condition: hasUppercase, message: "Uppercase letter." },
    { condition: hasLowercase, message: "Lowercase letter." },
    { condition: hasNumber, message: "Number" },
    { condition: hasSpecialChar, message: "Special character (e.g. !?<>@#$%)" },
    { condition: isValidLength, message: "8 characters or more" },
  ];

  return (
    <div className="flex flex-col gap-1">
      {requirements.map((req, index) => (
        <div key={index}>
          <div className="text-muted-foreground flex items-center gap-1 text-sm">
            {req.condition ? <CircleCheck size={16} /> : <Circle size={16} />}
            <span className={cn(req.condition && "text-green-primary")}>{req.message}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PasswordRequirements;
