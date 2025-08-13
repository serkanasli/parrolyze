"use server";

import { ActionResult, StorePlatform } from "@/types/common";

import * as dbMutations from "@/lib/database/mutations/store-localizations";
import * as dbQueries from "@/lib/database/queries/store-localizations";
import { Result } from "@/lib/result";
import { StoreLocalizationInsert, StoreLocalizationRow } from "@/types/store-localizations";
import z from "zod";

export async function getStoreLocalizationsByProject(
  projectId: string,
  platform: StorePlatform,
): Promise<ActionResult<StoreLocalizationRow[]>> {
  try {
    const response = await dbQueries.getStoreLocalizationsByProject(projectId, platform);

    return Result.ok(response);
  } catch (error) {
    throw Result.fail();
  }
}

interface SaveStoreLocalizationsParams<T> {
  data: z.core.output<T>;
  sourceLanguage: string;
  projectId: string;
  platform: StorePlatform;
  targetLanguage?: string;
}

export async function saveStoreLocalizationsFromData<T>({
  data,
  sourceLanguage,
  targetLanguage,
  projectId,
  platform,
}: SaveStoreLocalizationsParams<T>): Promise<ActionResult> {
  try {
    const obj = data as Record<string, string>;
    const entries = Object.entries(obj);

    const mapping: StoreLocalizationInsert[] = entries.reduce((result, [key, value]) => {
      if (key === "source_language") {
        return result;
      }
      const item: StoreLocalizationInsert = {
        field: key,
        source_text: value || "",
        source_language: sourceLanguage,
        project_id: projectId,
        platform: platform,
        translated_text: "",
        target_language: targetLanguage || "",
      };

      return [...result, item];
    }, [] as StoreLocalizationInsert[]);

    await dbMutations.bulkCreateStoreLocalizations(mapping);

    return Result.ok();
  } catch (error) {
    return Result.fail();
  }
}

export async function bulkCreateStoreLocalizations({
  storeLocalizations,
}: {
  storeLocalizations: StoreLocalizationInsert[];
}): Promise<ActionResult> {
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
}): Promise<ActionResult> {
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
  storeLocalizations: StoreLocalizationInsert[] | StoreLocalizationInsert;
}): Promise<ActionResult> {
  try {
    await dbMutations.bulkUpsertStoreLocalizations(storeLocalizations);
    return Result.ok();
  } catch (error) {
    return Result.fail();
  }
}
