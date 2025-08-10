import { FormFieldType } from "@/types/common";

export const playStoreFormFields: FormFieldType[] = [
  {
    name: "source_language",
    label: "Source language",
    type: "combobox",
    placeholder: "Select source language",
    optionsKey: "languages",
  },
  {
    name: "name",
    label: "App Name",
    maxLength: 30,
    type: "text",
    placeholder: "e.g. My Awesome App",
  },
  {
    name: "short_description",
    label: "Short description",
    maxLength: 80,
    type: "text",
    placeholder: "e.g. A brief summary of your app",
  },
  {
    name: "description",
    label: "Description",
    maxLength: 4000,
    type: "textarea",
    placeholder: "e.g. Discover, track, and manage your tasks with ease...",
  },
];
