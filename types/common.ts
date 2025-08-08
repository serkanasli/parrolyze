import { FEEDBACK_TYPES, STORE_TYPES } from "@/constants";

export type ActionResult = {
  success: boolean;
  message?: string;
  code?: string;
};

export type PageProps = {
  params: {
    projectId: string;
  };
  searchParams: {
    platform?: "app_store" | "play_store";
  };
};

export type StoreType = (typeof STORE_TYPES)[number]["value"];
export type FeedbackType = (typeof FEEDBACK_TYPES)[number]["value"];

export type ComboBoxItem = {
  value: string;
  label: string;
  flag?: string;
};
