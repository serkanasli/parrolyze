"use server";

import * as dbQueries from "@/lib/database/queries/profiles";
import { Result } from "@/lib/result";
import { ActionResultType } from "@/types/common";
import { ProfileRowType } from "@/types/profiles";

export async function getUserProfile(): Promise<ActionResultType<ProfileRowType>> {
  try {
    const response = await dbQueries.getUserProfile();
    return Result.ok(response);
  } catch (error) {
    return Result.fail();
  }
}
