import { fetchChatCompletions } from "@/actions/open-router";
import { bulkUpsertStoreLocalizations } from "@/actions/store-localizations";
import { Button } from "@/components/ui/button";
import { createMessages, processAIResponse } from "@/lib/ai";
import { Result } from "@/lib/result";
import { withLoadingToast } from "@/lib/toast";
import { cn } from "@/lib/utils";
import { useAiModelsStore } from "@/store/ai-models-store";
import { ActionResultType, ButtonSizeType, ButtonVariantType } from "@/types/common";
import { StoreLocalizationRowType } from "@/types/store-localizations";
import { Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { toast } from "sonner";

interface AITranslateButtonProps {
  langCode?: string;
  storeLocalizations?: StoreLocalizationRowType[] | null;
  locale?: StoreLocalizationRowType;
  size?: ButtonSizeType;
  variant?: ButtonVariantType;
  translateScope: "column" | "cell";
  className?: string;
}

export function AITranslateButton({
  className,
  langCode,
  size = "sm",
  variant,
  translateScope,
  storeLocalizations,
  locale,
  ...buttonProps
}: AITranslateButtonProps & Omit<React.ComponentProps<"button">, keyof AITranslateButtonProps>) {
  const { selectedModel, isAIFetching, systemPrompt, setIsAIFetching } = useAiModelsStore();
  const router = useRouter();

  // Executes the translation process using the AI model and updates store localizations
  const runTranslation = useCallback(
    async (
      sourceTexts: Record<string, string>,
      sourceLang: string,
      targetLang: string,
      updateFn: (parsed: Record<string, string>) => StoreLocalizationRowType[],
    ): Promise<ActionResultType> => {
      try {
        const messages = createMessages({
          sourceText: sourceTexts,
          sourceLang,
          targetLang,
          systemPrompt,
        });

        const response = await fetchChatCompletions({
          model: selectedModel,
          messages,
        });

        const parsed = await processAIResponse(response);
        if (!parsed) return Result.fail();

        await bulkUpsertStoreLocalizations({
          storeLocalizations: updateFn(parsed),
        });

        return Result.ok();
      } catch (error) {
        const message = (error as Error).message || "Unknown error";
        toast.error(message);
        return Result.fail(message);
      }
    },
    [selectedModel, systemPrompt],
  );

  // Translates all fields in a given column for a specific language
  const translateColumn = useCallback(async (): Promise<ActionResultType> => {
    if (!storeLocalizations || !langCode) {
      return Result.fail("Missing storeLocalizations or langCode");
    }

    const localizations = storeLocalizations.filter((loc) => loc.target_language === langCode);

    if (!localizations.length) {
      toast.info("No localizations found for the selected language");
      return Result.fail();
    }

    const { source_language: sourceLang, target_language: targetLang } = localizations[0];

    const sourceTextsByField = localizations.reduce<Record<string, string>>((acc, loc) => {
      acc[loc.field] = loc.source_text;
      return acc;
    }, {});

    return runTranslation(sourceTextsByField, sourceLang, targetLang, (parsed) =>
      localizations.map((loc) => ({
        ...loc,
        translated_text: parsed[loc.field] || loc.translated_text,
      })),
    );
  }, [storeLocalizations, langCode, runTranslation]);

  // Translates a single cell using AI, saves result, and refreshes the page
  const translateCell = useCallback(async (): Promise<ActionResultType> => {
    if (!locale?.source_language || !locale?.target_language || !locale?.field) {
      return Result.fail("Missing required locale data for cell translation");
    }

    const { source_language: sourceLang, target_language: targetLang, field } = locale;

    return runTranslation({ [field]: locale.source_text }, sourceLang, targetLang, (parsed) => [
      {
        ...locale,
        translated_text: parsed[field] || locale.translated_text,
      },
    ]);
  }, [locale, runTranslation]);

  // Handles the click event, triggers the appropriate translation action, and updates UI state
  const handleTranslate = useCallback(async (): Promise<void> => {
    if (!selectedModel) {
      toast.info("Please select an AI model");
      return;
    }

    const loadingMessage = "Translation in progress...";
    const successMessage = "Translation completed successfully!";
    const errorMessage = "Translation failed. Please try again.";

    setIsAIFetching(true);

    try {
      const action = translateScope === "column" ? translateColumn : translateCell;

      await withLoadingToast(loadingMessage, successMessage, errorMessage, null, action);

      router.refresh();
    } catch (error) {
      console.error("AI translate error:", error);
      toast.error(errorMessage);
    } finally {
      setIsAIFetching(false);
    }
  }, [selectedModel, translateScope, translateColumn, translateCell, router, setIsAIFetching]);

  return (
    <Button
      disabled={isAIFetching}
      size={size}
      variant={variant}
      className={className}
      onClick={handleTranslate}
      {...buttonProps}
    >
      <Sparkles size={12} className={cn(isAIFetching && "animate-pulse")} aria-hidden="true" />
    </Button>
  );
}
