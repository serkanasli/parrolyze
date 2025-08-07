import { z } from "zod";

const MAX_FILE_SIZE = 1024 * 1024; // 1MB in bytes
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const editIconSchema = z.object({
  id: z.string().optional(),
  icon_url: z.string().optional(),
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
});
