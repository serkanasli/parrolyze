import { FormField } from "@/types/form";

export const aiServiceFormFields: FormField[] = [
  {
    name: "service",
    label: "AI Service",
    type: "text",
    placeholder: "e.g. openai, gemini, deepseek, openrouter",
  },
  {
    name: "base_url",
    label: "Base URL",
    type: "text",
    placeholder: "e.g. https://api.openai.com/v1",
  },
  {
    name: "api_key",
    label: "API Key",
    type: "text",
    placeholder: "e.g. sk-xxxxxxxxxxxxxxxxxxxx",
  },
];
