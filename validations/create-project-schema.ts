import { StorePlatform } from "@/types/common";
import { z } from "zod";

const MAX_FILE_SIZE = 1024 * 1024; // 1MB in bytes
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const createProjectSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Project name must be at least 3 characters long." })
    .max(30, { message: "Project name must be at most 30 characters long." }),
  icon_file: z
    .any()
    .refine((file) => file != null, "Project icon is required")
    .refine((file) => {
      if (!file) return true;
      if (typeof window === "undefined") return true; // SSR check
      return file instanceof File && ACCEPTED_IMAGE_TYPES.includes(file.type);
    }, "Invalid file. choose either JPEG or PNG image")
    .refine((file) => {
      if (!file) return true;
      if (typeof window === "undefined") return true; // SSR check
      return file instanceof File && file.size <= MAX_FILE_SIZE;
    }, "Max file size allowed is 1MB."),
  short_description: z
    .string()
    .min(3, { message: "Short description must be at least 3 characters long." })
    .max(30, { message: "Short description must be at most 30 characters long." }),
  store_type: z.custom<StorePlatform>(),
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

export type CreateProjectFormValues = z.infer<typeof createProjectSchema>;
