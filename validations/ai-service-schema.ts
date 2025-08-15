import { z } from "zod";

export const aiServiceFormSchema = z.object({
  id: z.string().optional(),
  service: z
    .string({ error: "AI Service is required." })
    .min(1, { message: "Enter the AI service name (e.g. openai, gemini)." }),

  base_url: z.url({ error: "Base URL must be a valid URL format." }).trim().optional(),

  api_key: z
    .string({ error: "API Key is required." })
    .trim()
    .min(1, { message: "Enter a valid API key." }),
});

export type AIServiceFormValues = z.infer<typeof aiServiceFormSchema>;
