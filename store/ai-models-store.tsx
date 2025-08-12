import { SYSTEM_PROMPT } from "@/constants";
import { create } from "zustand";

type AiModelsState = {
  selectedModel: string;
  setSelectedModel: (selectedModel: string) => void;
  systemPrompt: string;
  isAIFetching: boolean;
  setIsAIFetching: (isAIFetching: boolean) => void;
};

export const useAiModelsStore = create<AiModelsState>((set) => ({
  selectedModel: "",
  systemPrompt: SYSTEM_PROMPT,
  setSelectedModel: (selectedModel) => set({ selectedModel }),
  isAIFetching: false,
  setIsAIFetching: (isAIFetching) => set({ isAIFetching }),
}));
