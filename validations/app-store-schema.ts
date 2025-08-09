import { z } from "zod";

export const appStoreFormSchema = z.object({
  source_language: z
    .string({ error: "Source language is required." })
    .min(1, { message: "Please select a source language." }),

  name: z
    .string({ error: "Name is required." })
    .trim()
    .min(1, { message: "Name is required." })
    .max(30, { message: "Name must be at most 30 characters." }),

  subtitle: z
    .string({ error: "Subtitle is required." })
    .trim()
    .min(1, { message: "Subtitle is required." })
    .max(30, { message: "Subtitle must be at most 30 characters." }),

  promotional_text: z
    .string({ error: "Promotional text is required." })
    .trim()
    .min(1, { message: "Promotional text is required." })
    .max(170, { message: "Promotional text must be at most 170 characters." }),

  description: z
    .string({ error: "Description is required." })
    .trim()
    .min(1, { message: "Description is required." })
    .max(4000, { message: "Description must be at most 4000 characters." }),

  keywords: z
    .string({ error: "Keywords are required." })
    .trim()
    .min(1, { message: "Keywords are required." })
    .max(100, { message: "Keywords must be at most 100 characters." }),
});

export type AppStoreFormValues = z.infer<typeof appStoreFormSchema>;
