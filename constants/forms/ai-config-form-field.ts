import { FormField } from "@/types/form";

export const aiConfigFormFields: FormField[] = [
  {
    name: "system_prompt",
    label: "System Prompt",
    maxLength: 1000,
    type: "textarea",
    placeholder: "e.g. You are a professional mobile app localization expert...",
    props: {
      className: "h-56",
    },
  },
];
