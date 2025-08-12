"use server";
import { Result } from "@/lib/result";
import { ActionResultType, AIMessageType } from "@/types/common";

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

type ChatCompletionsType = {
  model: string;
  messages: AIMessageType[];
};

export async function fetchChatCompletions({
  model,
  messages,
}: ChatCompletionsType): Promise<ActionResultType> {
  try {
    if (!model) throw new Error("No model selected");

    const url = `${process.env.OPENROUTER_BASE_URL}/chat/completions`;
    console.log("url", url);
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages,
      }),
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch models");
    const data = await res.json();

    console.log("fetchChatCompletions data", data);
    return Result.ok(data);
  } catch (error) {
    const message = (error as Error).message || "Unknown error";
    return Result.fail(message);
  }
}
