import { delay } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = async (text: string) => {
    if (!text) return;
    setCopied(true);
    navigator.clipboard.writeText(text);
    await delay(2000);
    setCopied(false);
  };

  return (
    <Button disabled={copied} variant="ghost" className="h-7 w-7" onClick={() => handleCopy(text)}>
      {copied ? (
        <Check size={12} className="text-green-primary" />
      ) : (
        <Copy size={12} className="text-green-primary" />
      )}
    </Button>
  );
}
