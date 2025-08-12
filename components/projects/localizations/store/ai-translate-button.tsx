import { fetchChatCompletions } from "@/actions/open-router";
import { bulkUpsertStoreLocalizations } from "@/actions/store-localizations";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAiModelsStore } from "@/store/ai-models-store";
import { AIMessageType, ButtonSizeType, ButtonVariantType } from "@/types/common";
import { StoreLocalizationRowType } from "@/types/store-localizations";
import { Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface AITranslateButton {
  langCode?: string;
  storeLocalizations?: StoreLocalizationRowType[] | null;
  locale?: StoreLocalizationRowType;
  size?: ButtonSizeType;
  variant?: ButtonVariantType;
  translateScope: "column" | "cell";
}

export function AITranslateButton({
  className,
  langCode,
  size = "sm",
  variant,
  translateScope,
  storeLocalizations,
  locale,
}: AITranslateButton & React.ComponentProps<"button">) {
  const { selectedModel, isAIFetching, systemPrompt, setIsAIFetching } = useAiModelsStore();
  const router = useRouter();
  const handleAiTranslateColumn = async () => {
    if (!selectedModel) {
      toast.info("Please select an AI model");
      return;
    }

    try {
      setIsAIFetching(true);

      if (translateScope === "column") {
        if (!storeLocalizations) return;

        const localizations = storeLocalizations.filter((loc) => loc.target_language === langCode);

        if (!localizations.length) return;

        const sourceLang = localizations[0].source_language;
        const targetLang = localizations[0].target_language;

        const sourceTextsByField = localizations.reduce(
          (result, currentValue) => {
            result[currentValue.field] = currentValue.source_text;
            return result;
          },
          {} as Record<string, string>,
        );

        const content = JSON.stringify(sourceTextsByField).trim();

        const systemContent = systemPrompt
          .replace("[SOURCE_LANG]", sourceLang)
          .replace("[TARGET_LANG]", targetLang)
          .trim();

        const messages: AIMessageType[] = [
          {
            role: "system",
            content: systemContent,
          },
          {
            role: "user",
            content: content,
          },
        ];

        const response = await fetchChatCompletions({
          model: selectedModel,
          messages,
        });

        if (response.success) {
          const { data } = response;

          const raw = data?.choices?.[0]?.message?.content;
          const cleaned = cleanAIResponse(raw);
          const parsed = JSON.parse(cleaned);

          const updatedLocalizations = localizations.map((loc) => {
            const translated = parsed[loc.field];
            return translated ? { ...loc, translated_text: translated } : loc;
          });

          await bulkUpsertStoreLocalizations({
            storeLocalizations: updatedLocalizations,
          });
          router.refresh();
        }
      } else if (translateScope === "cell") {
        // cell
      } else return;
    } catch (error) {
      console.error("AI translate error:", error);
    } finally {
      setIsAIFetching(false);
    }
  };

  return (
    <Button
      disabled={isAIFetching}
      size={size}
      variant={variant}
      className={className}
      onClick={handleAiTranslateColumn}
    >
      <Sparkles size={12} className={cn(isAIFetching && "animate-pulse")} />
    </Button>
  );
}

function cleanAIResponse(text: string) {
  // Remove markdown code fences (```json ... ```)
  const noCodeFence = text.replace(/```json|```/g, "").trim();
  return noCodeFence;
}
