export const STORE_TYPES = [
  { label: "App Store", value: "app_store", icon: "/icons/apple.svg" },
  { label: "Play Store", value: "play_store", icon: "/icons/google.svg" },
  { label: "Both", value: "both", icon: "" },
] as const;

export const FEEDBACK_TYPES = [
  { label: "Bug", value: "bug" },
  { label: "Issue", value: "issue" },
  { label: "Idea", value: "idea" },
] as const;
