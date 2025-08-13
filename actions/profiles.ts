"use server";

import * as dbQueries from "@/lib/database/queries/profiles";
import { Result } from "@/lib/result";
import { ActionResult } from "@/types/common";
import { ProfileRow } from "@/types/profiles";

export async function getUserProfile(): Promise<ActionResult<ProfileRow>> {
  try {
    const response = await dbQueries.getUserProfile();
    return Result.ok(response);
  } catch (error) {
    return Result.fail();
  }
}
