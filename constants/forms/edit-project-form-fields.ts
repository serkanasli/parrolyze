import { FormFieldType } from "@/types/form";

export const editProjectFormFields: FormFieldType[] = [
  {
    name: "name",
    label: "Project Name",
    maxLength: 30,
    type: "text",
    placeholder: "e.g. My Awesome App",
  },
  {
    name: "short_description",
    label: "Short Description",
    maxLength: 30,
    type: "text",
    placeholder: "e.g. Your daily dose of productivity",
  },
  {
    name: "store_type",
    label: "Which store is your app published on?",
    placeholder: "Select a store",
    defaultValue: "both",
    selectLabel: "Available Stores",
    type: "select",
    optionsKey: "platforms",
  },
  {
    name: "app_store_url",
    label: "App Store",
    type: "text",
    placeholder: "Paste Apple App Store URL",
    showIf: {
      field: "store_type",
      equals: "app_store|both",
    },
  },
  {
    name: "play_store_url",
    label: "App Store",
    type: "text",
    placeholder: "Paste your app’s Google Play Store URL here",
    showIf: {
      field: "store_type",
      equals: "play_store|both",
    },
  },
];
