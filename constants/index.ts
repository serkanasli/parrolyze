export const STORE_PLATFORM_OPTIONS = [
  { label: "App Store", value: "app_store", icon: "/icons/apple.svg" },
  { label: "Play Store", value: "play_store", icon: "/icons/google.svg" },
  { label: "Both", value: "both", icon: "" },
] as const;

export const FEEDBACK_OPTIONS = [
  { label: "Bug", value: "bug" },
  { label: "Issue", value: "issue" },
  { label: "Idea", value: "idea" },
] as const;

export const AI_MODELS = {
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
  },
  gemini: {
    baseURL: process.env.GEMINI_BASE_URL,
    apiKey: process.env.GEMINI_API_KEY,
  },
  deepseek: {
    apiKey: process.env.DEEP_SEEK_API_KEY,
    baseURL: process.env.DEEP_SEEK_BASE_URL,
  },
  openrouter: {
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: process.env.OPENROUTER_BASE_URL,
  },
} as const;

export const SYSTEM_PROMPT = `
You are a mobile app localization and ASO expert.
Translate the fields from [SOURCE_LANG] to [TARGET_LANG], ensuring:
- Natural, context-aware translations
- Compliance with App Store character limits
- Optimization for keyword discoverability
- IMPORTANT: Only translate the fields provided in the input. If only some fields (e.g., name) are provided, return a JSON object containing only those fields with their translations. Do NOT add any extra fields or explanations.

**IMPORTANT:**
- app_name or name (max 30 chars)
- subtitle (max 30 chars)
- promotional_text (max 170 chars)
- short_description (max 80 chars)
- description (max 4000 chars)
- keywords (max 100 chars, comma-separated, no spaces)

Preserve clarity and uniqueness for app_name and subtitle.
Return ONLY a JSON object matching input structure with translations.
No explanations or extra text.
`;
