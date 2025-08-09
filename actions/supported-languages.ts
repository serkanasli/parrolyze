"use server";

import * as dbQueries from "@/lib/database/queries/supported-languages";
import { Result } from "@/lib/result";
import { ActionResultType } from "@/types/common";
import { SupportedLanguagesRowType } from "@/types/supported-languages";

export async function getSupportedLanguages(): Promise<
  ActionResultType<SupportedLanguagesRowType[]>
> {
  try {
    const response = await dbQueries.getSupportedLanguages();
    return Result.ok(response);
  } catch (error) {
    return Result.fail();
  }
}
