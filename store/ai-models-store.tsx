import { SYSTEM_PROMPT } from "@/constants";
import { AINormalizedModel } from "@/types/common";
import { create } from "zustand";

type AiModelsState = {
  selectedModel: AINormalizedModel;
  systemPrompt: string;
  isAIFetching: boolean;
  setSelectedModel: (selectedModel: AINormalizedModel) => void;
  setIsAIFetching: (isAIFetching: boolean) => void;
  setSystemPrompt: (systemPrompt: string) => void;
};

export const useAiModelsStore = create<AiModelsState>((set) => ({
  selectedModel: { id: "", service: undefined },
  isAIFetching: false,
  systemPrompt: SYSTEM_PROMPT,
  setSelectedModel: (selectedModel) => set((prev) => ({ ...prev, selectedModel })),
  setIsAIFetching: (isAIFetching) => set({ isAIFetching }),
  setSystemPrompt: (systemPrompt) => set({ systemPrompt }),
}));
