"use server";

import { messages } from "@/constants/messages";
import * as dbMutations from "@/lib/database/mutations/ai-configs";
import * as dbQueries from "@/lib/database/queries/ai-configs";
import { Result } from "@/lib/result";
import { AIConfigsInsertType, AIConfigsRowType, AIConfigsUpdateType } from "@/types/ai-configs";
import { ActionResultType } from "@/types/common";

const subject = "AI Config";

//queries
export async function getAIConfigs(): Promise<ActionResultType<AIConfigsRowType[]>> {
  try {
    const response = await dbQueries.getAIConfigs();
    return Result.ok(response);
  } catch (error) {
    return Result.fail();
  }
}

//mutations
export async function createAIConfigs(
  aiConfigs: AIConfigsInsertType,
): Promise<ActionResultType<AIConfigsRowType>> {
  try {
    const response = await dbMutations.createAIConfigs(aiConfigs);

    return Result.ok(response, messages.success.create(subject));
  } catch (error) {
    return Result.fail();
  }
}

export async function updateAIConfigs(
  configId: string,
  updateData: AIConfigsUpdateType,
): Promise<ActionResultType<AIConfigsRowType>> {
  try {
    const response = await dbMutations.updateAIConfigs(configId, updateData);

    return Result.ok(response, messages.success.update(subject));
  } catch (error) {
    return Result.fail();
  }
}

export async function deleteAIConfigs(configId: string): Promise<ActionResultType> {
  try {
    await dbMutations.deleteAIConfigs(configId);
    return Result.ok();
  } catch (error) {
    return Result.fail();
  }
}

export async function upsertAIConfigs(
  data: AIConfigsInsertType[] | AIConfigsUpdateType,
): Promise<ActionResultType> {
  try {
    const response = await dbMutations.upsertAIConfigs(data);

    return Result.ok(response);
  } catch (error) {
    return Result.fail();
  }
}
