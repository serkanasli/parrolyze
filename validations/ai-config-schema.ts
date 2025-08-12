import { z } from "zod";

export const aiConfigFormSchema = z.object({
  id: z.string().optional(),
  system_prompt: z
    .string({ error: "System prompt is required." })
    .trim()
    .max(5000, { message: "System prompt must be at most 5000 characters." })
    .optional(),
});

export type AIConfigFormValues = z.infer<typeof aiConfigFormSchema>;
