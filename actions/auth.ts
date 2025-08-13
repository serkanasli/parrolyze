"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import * as dbMutations from "@/lib/database/mutations/auth";

import { Result } from "@/lib/result";
import { AuthFormData } from "@/types/auth";
import { ActionResult } from "@/types/common";
import { getUserProjects } from "./projects";

export async function login(values: AuthFormData) {
  const { error } = await dbMutations.login(values);

  if (error) {
    return { success: false, message: error.message, code: error.code };
  }

  const { success, data: projects } = await getUserProjects();

  let redirectUrl: string;

  if (success && projects && projects?.length > 0) {
    redirectUrl = `/projects/${projects?.[0].id}/overview`;
  } else {
    redirectUrl = "/setup/project";
  }

  revalidatePath(values.redirectTo || redirectUrl, "layout");
  redirect(values.redirectTo || redirectUrl);
}

export async function signUp(values: AuthFormData): Promise<ActionResult> {
  const { error } = await dbMutations.signUp(values);

  if (error) {
    return Result.fail(error.message, error.code);
  }

  return Result.ok();
}

export async function signOut() {
  return await dbMutations.signOut();
}
