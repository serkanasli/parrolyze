"use server";

import { ActionResultType, StoreType } from "@/types/common";

import * as dbQueries from "@/lib/database/queries/store-localizations";
import { Result } from "@/lib/result";
import { StoreLocalizationRowType } from "@/types/store-localizations";

export async function getStoreLocalizationsByProject(
  projectId: string,
  platform: StoreType,
): Promise<ActionResultType<StoreLocalizationRowType[]>> {
  try {
    const response = await dbQueries.getStoreLocalizationsByProject(projectId, platform);

    return Result.ok(response);
  } catch (error) {
    return Result.fail();
  }
}
