import { SYSTEM_PROMPT } from "@/constants";
import { create } from "zustand";

type AiModelsState = {
  selectedModel: string;
  systemPrompt: string;
  isAIFetching: boolean;
  setSelectedModel: (selectedModel: string) => void;
  setIsAIFetching: (isAIFetching: boolean) => void;
  setSystemPrompt: (systemPrompt: string) => void;
};

export const useAiModelsStore = create<AiModelsState>((set) => ({
  selectedModel: "",
  isAIFetching: false,
  systemPrompt: SYSTEM_PROMPT,
  setSelectedModel: (selectedModel) => set({ selectedModel }),
  setIsAIFetching: (isAIFetching) => set({ isAIFetching }),
  setSystemPrompt: (systemPrompt) => set({ systemPrompt }),
}));
