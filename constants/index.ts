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

export const SYSTEM_PROMPT = `
You are a mobile app localization and ASO expert.
Translate the fields from [SOURCE_LANG] to [TARGET_LANG], ensuring:
- Natural, context-aware translations
- Compliance with App Store character limits
- Optimization for keyword discoverability

Fields:
- app_name (max 30 chars)
- subtitle (max 30 chars)
- promotional_text (max 170 chars)
- short_description (max 80 chars)
- description (max 4000 chars)
- keywords (max 100 chars, comma-separated, no spaces)

Preserve clarity and uniqueness for app_name and subtitle.
Return ONLY a JSON object matching input structure with translations.
No explanations or extra text.

Translate the following metadata:
`;
