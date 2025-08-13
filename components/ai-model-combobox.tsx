/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAiModelsStore } from "@/store/ai-models-store";
import { ComboBoxItem } from "@/types/form";
import { ChevronDown } from "lucide-react";
import { ComboBox } from "./combobox";
import { Button } from "./ui/button";

export function AIModelCombobox({ models }: { models: any[] }) {
  const { selectedModel, setSelectedModel } = useAiModelsStore();

  const modelsOptions: ComboBoxItem[] = (models || []).map((model: any) => ({
    label: model.name,
    value: model.id,
  }));

  const onValueChange = (value: string) => {
    if (!value) return;
    setSelectedModel(value);
  };

  return (
    <ComboBox
      searchPlaceholder="Search models"
      placeholder="Search models"
      options={modelsOptions}
      defaultValue={selectedModel}
      onValueChange={onValueChange}
      side="bottom"
      align="end"
      trigger={
        <Button variant="blue">
          {selectedModel || "Select AI model"}
          <ChevronDown />
        </Button>
      }
    />
  );
}
