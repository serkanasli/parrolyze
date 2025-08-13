"use server";
import { Result } from "@/lib/result";
import { ActionResult, AIChatMessage } from "@/types/common";

export async function fetchModels() {
  const res = await fetch(`${process.env.OPENROUTER_BASE_URL}/models`, {
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch models");
  const data = await res.json();
  return data.data;
}

interface ChatCompletions {
  model: string;
  messages: AIChatMessage[];
}

export async function fetchChatCompletions({
  model,
  messages,
}: ChatCompletions): Promise<ActionResult> {
  try {
    if (!model) throw new Error("No model selected");

    const url = `${process.env.OPENROUTER_BASE_URL}/chat/completions`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ model, messages }),
      cache: "force-cache",
    });

    if (!res.ok) {
      const errorBody = await res.text();

      let errorMessage = `Request failed with status ${res.status}`;
      try {
        const parsed = JSON.parse(errorBody);
        errorMessage = parsed?.error?.message || parsed?.message || errorMessage;
      } catch {
        errorMessage = errorBody || errorMessage;
      }
      throw new Error(errorMessage);
    }

    const data = await res.json();
    return Result.ok(data);
  } catch (error) {
    const message = (error as Error).message || "Unknown error";
    return Result.fail(message);
  }
}
