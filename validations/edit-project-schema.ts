import { StoreType } from "@/types/common";
import { z } from "zod";

export const editProjectSchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .min(3, { message: "Project name must be at least 3 characters long." })
    .max(30, { message: "Project name must be at most 30 characters long." }),
  short_description: z
    .string()
    .min(3, { message: "Short description must be at least 3 characters long." })
    .max(30, { message: "Short description must be at most 30 characters long." }),
  store_type: z.custom<StoreType>(),
  play_store_url: z
    .union([
      z.string().url({
        message: "Play store url must be a valid URL",
      }),
      z.literal(""),
    ])
    .transform((val) => (val === "" ? undefined : val))
    .optional(),
  app_store_url: z
    .union([
      z.string().url({
        message: "App store url must be a valid URL",
      }),
      z.literal(""),
    ])
    .transform((val) => (val === "" ? undefined : val))
    .optional(),
});

export type EditProjectFormValues = z.infer<typeof editProjectSchema>;
