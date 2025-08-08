"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { AuthFormData } from "@/types/auth";
import { ActionResult } from "@/types/common";
import { getUserProjects } from "../queries/projects";

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

  const projects = await getUserProjects();

  let redirectUrl: string;
  if (projects.length < 1) {
    redirectUrl = "/setup/project";
  } else {
    redirectUrl = `/projects/${projects[0].id}/overview`;
  }

  revalidatePath(values.redirectTo || redirectUrl, "layout");
  redirect(values.redirectTo || redirectUrl);
}

/**
 * Signs up a new user with Supabase Auth.
 * Returns `{ error: string }` if failed, otherwise redirects to /projects.
 */

export async function signUp(values: AuthFormData): Promise<ActionResult> {
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

export async function signOut() {
  const supabase = await createClient();
  return await supabase.auth.signOut();
}
