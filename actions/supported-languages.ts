"use server";

import * as dbQueries from "@/lib/database/queries/supported-languages";
import { Result } from "@/lib/result";
import { ActionResult } from "@/types/common";
import { SupportedLanguagesRow } from "@/types/supported-languages";

export async function getSupportedLanguages(): Promise<ActionResult<SupportedLanguagesRow[]>> {
  try {
    const response = await dbQueries.getSupportedLanguages();
    return Result.ok(response);
  } catch (error) {
    return Result.fail();
  }
}
