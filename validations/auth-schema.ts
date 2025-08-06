import { z } from "zod";

export const signUpSchema = z.object({
  email: z
    .string({ error: "Email is required." })
    .trim()
    .toLowerCase()
    .email({ message: "Please enter a valid email address." }),

  password: z
    .string({ error: "Password is required." })
    .min(8, { message: "Password must be at least 8 characters." })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least one special character (e.g. !?<>@#$%).",
    }),
});

export const loginSchema = z.object({
  email: z
    .string({ error: "Email is required." })
    .trim()
    .toLowerCase()
    .email({ message: "Please enter a valid email address." }),

  password: z.string({ error: "Password is required." }).min(1, {
    error: "Password is required.",
  }),
});
