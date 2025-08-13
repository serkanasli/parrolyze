"use client";
import { getAIConfigs, upsertAIConfigs } from "@/actions/ai-configs";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { aiConfigFormFields } from "@/constants/forms/ai-config-form-field";
import { withLoadingToast } from "@/lib/toast";
import { useAiModelsStore } from "@/store/ai-models-store";
import { AIConfigsInsert, AIConfigsRow } from "@/types/ai-configs";
import { aiConfigFormSchema } from "@/validations/ai-config-schema";
import { Edit2, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import DynamicForm from "./form/dynamic-form";

export function AIConfigSheet() {
  const formId = "ai-configs-form";
  const [config, setConfig] = useState<AIConfigsRow>();
  const { systemPrompt, setSystemPrompt } = useAiModelsStore();
  const [disabled, setDisabled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchAIConfigs = async () => {
      const response = await getAIConfigs();
      if (response.success) {
        setConfig(response.data);
      }
    };
    fetchAIConfigs();
  }, []);

  const onSubmit = async (values: AIConfigsInsert) => {
    try {
      const response = await withLoadingToast<AIConfigsRow>(
        "Updating AI configs...",
        "AI Configs updating successfully!",
        "An error occurred while creating the AI configs.",
        null,
        () => upsertAIConfigs(values),
      );
      if (response?.success) {
        setConfig(response.data);
        setSystemPrompt(response?.data?.system_prompt);
      }
    } catch (error) {}
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="blue" className="flex items-center gap-2">
          <span className="w-12 truncate sm:w-auto">System Prompt</span>
          <Edit2 />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>System Prompt Settings</SheetTitle>
          <SheetDescription>
            Use language codes in place of <code>[SOURCE_LANG]</code> and <code>[TARGET_LANG]</code>
            .<br />
            E.g., <code>Translate the following fields from en-US to tr-TR.</code>
          </SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4 py-2">
          <DynamicForm
            formId={formId}
            schema={aiConfigFormSchema}
            fields={aiConfigFormFields}
            onSubmit={onSubmit}
            isSubmitButtonShow={false}
            defaultValues={{
              id: config?.id,
              system_prompt: config?.system_prompt || systemPrompt,
            }}
            onStateChange={({ isLoading, isDirty, isSubmitSuccessful }) => {
              setIsLoading(isLoading);
              setDisabled(!isDirty || isLoading || isSubmitSuccessful);
            }}
          />
        </div>
        <SheetFooter className="mb-5 flex justify-end gap-2">
          <Button disabled={disabled} type="submit" form={formId}>
            {isLoading && <Loader2 className="animate-spin" />}Save Changes
          </Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
