"use server";

import { messages } from "@/constants/messages";
import * as dbMutations from "@/lib/database/mutations/ai-services";
import * as dbQueries from "@/lib/database/queries/ai-services";
import { Result } from "@/lib/result";
import { AIServicesInsert, AIServicesRow, AIServicesUpdate } from "@/types/ai-services";
import { ActionResult } from "@/types/common";

const subject = "AI Services";

//queries
export async function getAIServices(): Promise<ActionResult<AIServicesRow[]>> {
  try {
    const response = await dbQueries.getAIServices();
    return Result.ok(response);
  } catch (error) {
    return Result.fail();
  }
}

//mutations
export async function createAIServices(
  aiConfigs: AIServicesInsert,
): Promise<ActionResult<AIServicesRow>> {
  try {
    const response = await dbMutations.createAIServices(aiConfigs);

    return Result.ok(response, messages.success.create(subject));
  } catch (error) {
    return Result.fail();
  }
}

export async function updateAIServices(
  serviceId: string,
  updateData: AIServicesUpdate,
): Promise<ActionResult<AIServicesRow>> {
  try {
    const response = await dbMutations.updateAIServices(serviceId, updateData);

    return Result.ok(response, messages.success.update(subject));
  } catch (error) {
    return Result.fail();
  }
}

export async function deleteAIServices(serviceId: string): Promise<ActionResult> {
  try {
    await dbMutations.deleteAIServices(serviceId);
    return Result.ok();
  } catch (error) {
    return Result.fail();
  }
}

export async function upsertAIServices(
  data: AIServicesInsert[] | AIServicesUpdate,
): Promise<ActionResult> {
  try {
    const response = await dbMutations.upsertAIServices(data);

    return Result.ok(response);
  } catch (error) {
    return Result.fail();
  }
}
