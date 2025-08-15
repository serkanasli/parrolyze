"use server";
import { Result } from "@/lib/result";
import { ActionResult, AIChatCompletions, AINormalizedModel } from "@/types/common";

import OpenAI from "openai";
import { getAIServices } from "./ai-services";

export async function fetchAIModels(): Promise<ActionResult<AINormalizedModel[]>> {
  try {
    const results: AINormalizedModel[] = [];

    const aiServicesResult = await getAIServices();
    if (!aiServicesResult.success) {
      return Result.fail("Failed to fetch AI services");
    }
    const aiServices = aiServicesResult.data;

    for (const service of aiServices) {
      if (!service.api_key) continue;

      const client = new OpenAI({
        apiKey: service.api_key,
        baseURL: service.base_url || undefined,
      });

      const models = await client.models.list();
      const normalized: AINormalizedModel[] = models.data.map((m) => ({
        service: service.service,
        id: m.id,
      }));

      results.push(...normalized);
    }

    return Result.ok(results);
  } catch (error) {
    const message = (error as Error).message || "Failed to fetch AI models";
    return Result.fail(message);
  }
}

export async function fetchAIChatCompletions({
  service,
  model,
  messages,
}: AIChatCompletions): Promise<ActionResult<string>> {
  try {
    if (!model) throw new Error("No model selected");

    const aiServicesResult = await getAIServices();
    if (!aiServicesResult.success) {
      throw new Error("Failed to fetch AI services");
    }

    const aiServices = aiServicesResult.data;
    const selectedService = aiServices.find((s) => s.service === service);
    if (!selectedService || !selectedService.api_key) {
      throw new Error(`API key not found for service: ${service}`);
    }

    const client = new OpenAI({
      apiKey: selectedService.api_key,
      baseURL: selectedService.base_url || undefined,
    });

    const response = await client.chat.completions.create({
      model,
      messages,
      stream: false,
    });

    return Result.ok(response?.choices?.[0]?.message?.content || "");
  } catch (error: any) {
    return Result.fail(error.message || "Unknown error");
  }
}
