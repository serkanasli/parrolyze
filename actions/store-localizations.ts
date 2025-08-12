"use server";

import { ActionResultType, StoreType } from "@/types/common";

import * as dbMutations from "@/lib/database/mutations/store-localizations";
import * as dbQueries from "@/lib/database/queries/store-localizations";
import { Result } from "@/lib/result";
import { StoreLocalizationInsertType, StoreLocalizationRowType } from "@/types/store-localizations";
import z from "zod";

export async function getStoreLocalizationsByProject(
  projectId: string,
  platform: StoreType,
): Promise<ActionResultType<StoreLocalizationRowType[]>> {
  try {
    const response = await dbQueries.getStoreLocalizationsByProject(projectId, platform);

    return Result.ok(response);
  } catch (error) {
    throw Result.fail();
  }
}

type SaveStoreLocalizationsProps<T> = {
  data: z.core.output<T>;
  sourceLanguage: string;
  projectId: string;
  platform: StoreType;
  targetLanguage?: string;
};

export async function saveStoreLocalizationsFromData<T>({
  data,
  sourceLanguage,
  targetLanguage,
  projectId,
  platform,
}: SaveStoreLocalizationsProps<T>): Promise<ActionResultType> {
  try {
    const obj = data as Record<string, string>;
    const entries = Object.entries(obj);

    const mapping: StoreLocalizationInsertType[] = entries.reduce((result, [key, value]) => {
      if (key === "source_language") {
        return result;
      }
      const item: StoreLocalizationInsertType = {
        field: key,
        source_text: value || "",
        source_language: sourceLanguage,
        project_id: projectId,
        platform: platform,
        translated_text: "",
        target_language: targetLanguage || "",
      };

      return [...result, item];
    }, [] as StoreLocalizationInsertType[]);

    await dbMutations.bulkCreateStoreLocalizations(mapping);

    return Result.ok();
  } catch (error) {
    return Result.fail();
  }
}

export async function bulkCreateStoreLocalizations({
  storeLocalizations,
}: {
  storeLocalizations: StoreLocalizationInsertType[];
}): Promise<ActionResultType> {
  try {
    await dbMutations.bulkCreateStoreLocalizations(storeLocalizations);
    return Result.ok();
  } catch (error) {
    return Result.fail();
  }
}

export async function bulkDeleteStoreLocalizations({
  ids,
}: {
  ids: string[];
}): Promise<ActionResultType> {
  try {
    const count = await dbMutations.bulkDeleteStoreLocalizations(ids);
    return Result.ok(count);
  } catch (error) {
    return Result.fail();
  }
}

export async function bulkUpsertStoreLocalizations({
  storeLocalizations,
}: {
  storeLocalizations: StoreLocalizationInsertType[];
}): Promise<ActionResultType> {
  try {
    await dbMutations.bulkUpsertStoreLocalizations(storeLocalizations);
    return Result.ok();
  } catch (error) {
    return Result.fail();
  }
}
