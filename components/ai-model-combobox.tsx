import { fetchAIModels } from "@/actions/open-ai";
import { useAiModelsStore } from "@/store/ai-models-store";
import { AINormalizedModel, AIService } from "@/types/common";
import { ComboBoxItem } from "@/types/form";
import { ChevronDown } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { ComboBox } from "./combobox";
import { Button } from "./ui/button";

export function AIModelCombobox() {
  const { selectedModel, setSelectedModel } = useAiModelsStore();
  const [models, setModels] = useState<AINormalizedModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getAIModels = async () => {
      try {
        setLoading(true);
        const response = await fetchAIModels();
        if (response.success) {
          setModels(response.data);
        }
      } finally {
        setLoading(false);
      }
    };
    getAIModels();
  }, []);

  const modelsOptions: ComboBoxItem[] = useMemo(() => {
    return models.map((model: AINormalizedModel) => ({
      label: model.id,
      value: model.id,
      flag: model.service || "",
    }));
  }, [models]);

  const onValueChange = (value: string) => {
    if (!value) return;
    const currentService = modelsOptions.find((option) => option.value === value)?.flag;
    const service: AIService = currentService as AIService;
    setSelectedModel({ id: value, service: service || null });
  };

  return (
    <ComboBox
      loading={loading}
      searchPlaceholder="Search models"
      placeholder="Search models"
      options={modelsOptions}
      defaultValue={selectedModel.id}
      onValueChange={onValueChange}
      side="bottom"
      align="end"
      className="md:w-80"
      trigger={
        <Button variant="blue">
          <span className="w-12 truncate sm:w-auto">{selectedModel.id || "Select AI model"}</span>
          <ChevronDown />
        </Button>
      }
    />
  );
}
