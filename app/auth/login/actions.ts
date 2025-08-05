"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { AuthFormData } from "@/types/auth";
import { ActionResult } from "@/types/common";

/**
 * Logs in a user with Supabase Auth.
 * Returns `{ error: string }` if failed, otherwise redirects to /projects.
 */
export async function login(values: AuthFormData): Promise<ActionResult> {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: values.email,
    password: values.password,
  });

  if (error) {
    return { success: false, message: error.message, code: error.code };
  }

  revalidatePath(values.redirectTo || "/projects", "layout");
  redirect(values.redirectTo || "/projects");
}

/**
 * Signs up a new user with Supabase Auth.
 * Returns `{ error: string }` if failed, otherwise redirects to /projects.
 */

export async function signup(values: AuthFormData): Promise<ActionResult> {
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email: values.email,
    password: values.password,
  });

  if (error) {
    return { success: false, message: error.message, code: error.code };
  }

  return { success: true };
}
