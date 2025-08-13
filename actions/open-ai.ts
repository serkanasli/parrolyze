"use server";
import { AI_MODELS } from "@/constants";
import { Result } from "@/lib/result";
import { ActionResult, AIChatCompletions, AINormalizedModel } from "@/types/common";

import OpenAI from "openai";

export async function fetchOpenAIModels(): Promise<ActionResult<AINormalizedModel[]>> {
  try {
    const results: AINormalizedModel[] = [];

    // OpenAI
    if (AI_MODELS.openai.apiKey) {
      const openaiClient = new OpenAI({ apiKey: AI_MODELS.openai.apiKey });
      const models = await openaiClient.models.list();
      const result: AINormalizedModel[] = models.data.map((m) => ({ service: "openai", id: m.id }));
      results.push(...result);
    }

    // DeepSeek
    if (AI_MODELS.deepseek.apiKey && AI_MODELS.deepseek.baseURL) {
      const deepseekClient = new OpenAI({
        apiKey: AI_MODELS.deepseek.apiKey,
        baseURL: AI_MODELS.deepseek.baseURL,
      });
      const models = await deepseekClient.models.list();
      const result: AINormalizedModel[] = models.data.map((m) => ({
        service: "deepseek",
        id: m.id,
      }));
      results.push(...result);
    }

    // Gemini
    if (AI_MODELS.gemini.apiKey && AI_MODELS.gemini.baseURL) {
      const geminiClient = new OpenAI({
        apiKey: AI_MODELS.gemini.apiKey,
        baseURL: AI_MODELS.gemini.baseURL,
      });
      const models = await geminiClient.models.list();
      const result: AINormalizedModel[] = models.data.map((m) => ({
        service: "gemini",
        id: m.id,
      }));
      results.push(...result);
    }

    // Openrouter
    if (AI_MODELS.openrouter.apiKey && AI_MODELS.openrouter.baseURL) {
      const openrouterClient = new OpenAI({
        apiKey: AI_MODELS.openrouter.apiKey,
        baseURL: AI_MODELS.openrouter.baseURL,
      });
      const models = await openrouterClient.models.list();
      const result: AINormalizedModel[] = models.data.map((m) => ({
        service: "openrouter",
        id: m.id,
      }));
      results.push(...result);
    }

    return Result.ok(results);
  } catch (error) {
    const message = (error as Error).message || "Failed to fetch AI models";
    return Result.fail(message);
  }
}

export async function fetchOpenAIChatCompletions({
  service,
  model,
  messages,
}: AIChatCompletions): Promise<ActionResult<string>> {
  try {
    if (!model) throw new Error("No model selected");

    switch (service) {
      case "openai": {
        const client = new OpenAI({ apiKey: AI_MODELS.openai.apiKey });
        const response = await client.chat.completions.create({ model, messages, stream: false });
        return Result.ok(response.data?.choices?.[0]?.message?.content);
      }

      case "deepseek": {
        const client = new OpenAI({
          apiKey: AI_MODELS.deepseek.apiKey,
          baseURL: AI_MODELS.deepseek.baseURL,
        });
        const response = await client.chat.completions.create({ model, messages, stream: false });
        return Result.ok(response.choices?.[0]?.message?.content);
      }

      case "gemini": {
        const client = new OpenAI({
          apiKey: AI_MODELS.gemini.apiKey,
          baseURL: AI_MODELS.gemini.baseURL,
        });
        const response = await client.chat.completions.create({ model, messages, stream: false });
        return Result.ok(response.choices?.[0]?.message?.content);
      }
      case "openrouter": {
        const client = new OpenAI({
          apiKey: AI_MODELS.openrouter.apiKey,
          baseURL: AI_MODELS.openrouter.baseURL,
        });
        const response = await client.chat.completions.create({ model, messages, stream: false });
        return Result.ok(response.choices?.[0]?.message?.content);
      }

      default:
        throw new Error("Unsupported AI service");
    }
  } catch (error: any) {
    return Result.fail(error.message || "Unknown error");
  }
}
