import { FormFieldType } from "@/types/form";

export const appStoreFormFields: FormFieldType[] = [
  {
    name: "source_language",
    label: "Source language",
    type: "combobox",
    placeholder: "Select source language",
    optionsKey: "languages",
  },
  {
    name: "name",
    label: "Name",
    maxLength: 30,
    type: "text",
    placeholder: "e.g. My Awesome App",
  },
  {
    name: "subtitle",
    label: "Subtitle",
    maxLength: 30,
    type: "text",
    placeholder: "e.g. Your daily dose of productivity",
  },
  {
    name: "promotional_text",
    label: "Promotional Text",
    maxLength: 170,
    type: "textarea",
    placeholder: "e.g. Enjoy 50% off premium for a limited time!",
  },
  {
    name: "description",
    label: "Description",
    maxLength: 4000,
    type: "textarea",
    placeholder: "e.g. Discover, track, and manage your tasks with ease...",
  },
  {
    name: "keywords",
    label: "Keywords",
    maxLength: 100,
    type: "text",
    placeholder: "e.g. productivity, tasks, planner, schedule",
  },
];
