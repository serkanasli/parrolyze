"use server";

import { messages } from "@/constants/messages";
import * as dbMutations from "@/lib/database/mutations/ai-configs";
import * as dbQueries from "@/lib/database/queries/ai-configs";
import { Result } from "@/lib/result";
import { AIConfigsInsert, AIConfigsRow, AIConfigsUpdate } from "@/types/ai-configs";
import { ActionResult } from "@/types/common";

const subject = "AI Config";

//queries
export async function getAIConfigs(): Promise<ActionResult<AIConfigsRow[]>> {
  try {
    const response = await dbQueries.getAIConfigs();
    return Result.ok(response);
  } catch (error) {
    return Result.fail();
  }
}

//mutations
export async function createAIConfigs(
  aiConfigs: AIConfigsInsert,
): Promise<ActionResult<AIConfigsRow>> {
  try {
    const response = await dbMutations.createAIConfigs(aiConfigs);

    return Result.ok(response, messages.success.create(subject));
  } catch (error) {
    return Result.fail();
  }
}

export async function updateAIConfigs(
  configId: string,
  updateData: AIConfigsUpdate,
): Promise<ActionResult<AIConfigsRow>> {
  try {
    const response = await dbMutations.updateAIConfigs(configId, updateData);

    return Result.ok(response, messages.success.update(subject));
  } catch (error) {
    return Result.fail();
  }
}

export async function deleteAIConfigs(configId: string): Promise<ActionResult> {
  try {
    await dbMutations.deleteAIConfigs(configId);
    return Result.ok();
  } catch (error) {
    return Result.fail();
  }
}

export async function upsertAIConfigs(
  data: AIConfigsInsert[] | AIConfigsUpdate,
): Promise<ActionResult> {
  try {
    const response = await dbMutations.upsertAIConfigs(data);

    return Result.ok(response);
  } catch (error) {
    return Result.fail();
  }
}
