import { Button } from "@/components/ui/button";
import { StoreLocalizationRowType } from "@/types/store-localizations";
import { Sparkles } from "lucide-react";

interface AITranslateButton {
  langCode?: string;
  storeLocalizations?: StoreLocalizationRowType[];
  locale?: StoreLocalizationRowType;
  size?: "default" | "sm" | "lg" | "icon" | null | undefined;
  variant?:
    | "default"
    | "link"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "blue"
    | null
    | undefined;
}

export function AITranslateButton({
  className,
  langCode,
  size = "sm",
  variant,
  storeLocalizations,
  locale,
}: AITranslateButton & React.ComponentProps<"button">) {
  const handleAiTranslateColumn = () => {
    console.log("handleAitranslate", langCode);
  };

  return (
    <Button size={size} variant={variant} className={className} onClick={handleAiTranslateColumn}>
      <Sparkles size={12} />
    </Button>
  );
}
