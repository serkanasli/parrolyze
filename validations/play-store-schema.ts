import { z } from "zod";

export const playStoreFormSchema = z.object({
  source_language: z
    .string({ error: "Source language is required." })
    .min(1, { message: "Please select a source language." }),

  name: z
    .string({ error: "Name is required." })
    .trim()
    .min(1, { message: "Name is required." })
    .max(30, { message: "Name must be at most 30 characters." }),

  short_description: z
    .string({ error: "Short description is required." })
    .trim()
    .min(1, { message: "Short description is required." })
    .max(80, { message: "Short description must be at most 80 characters." }),

  description: z
    .string({ error: "Description is required." })
    .trim()
    .min(1, { message: "Description is required." })
    .max(4000, { message: "Description must be at most 4000 characters." }),
});

export type PlayStoreFormValues = z.infer<typeof playStoreFormSchema>;
