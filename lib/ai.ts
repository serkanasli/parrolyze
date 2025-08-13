import { ActionResult, AIChatMessage } from "@/types/common";

export function cleanAIResponse(text: string) {
  // Remove markdown code fences (```json ... ```)
  const noCodeFence = text.replace(/```json|```/g, "").trim();
  return noCodeFence;
}

export function createMessages({
  sourceText,
  sourceLang,
  targetLang,
  systemPrompt,
}: {
  sourceText: Record<string, string>;
  sourceLang: string;
  targetLang: string;
  systemPrompt: string;
}): AIChatMessage[] {
  const messages: AIChatMessage[] = [];

  if (systemPrompt) {
    const systemContent = systemPrompt
      .replace("[SOURCE_LANG]", sourceLang)
      .replace("[TARGET_LANG]", targetLang)
      .trim();

    messages.push({
      role: "system",
      content: systemContent,
    });
  }

  messages.push({
    role: "user",
    content: JSON.stringify(sourceText).trim(),
  });

  return messages;
}

export function processAIResponse(response: ActionResult): Promise<Record<string, string> | null> {
  if (!response?.success) {
    throw new Error(response.message || "AI translation failed");
  }

  const raw = response.data?.choices?.[0]?.message?.content;
  if (!raw) {
    throw new Error("Empty AI response");
  }

  const cleaned = cleanAIResponse(raw);
  return JSON.parse(cleaned);
}
