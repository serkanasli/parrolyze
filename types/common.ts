import { FEEDBACK_TYPES, STORE_TYPES } from "@/constants";
import { AppStoreFormValues } from "@/validations/app-store-schema";

export type ActionResultType<T = unknown> = {
  success: boolean;
  message?: string;
  code?: string;
  data?: T;
};

export type OnSubmitSuccessType<T = unknown> = (response: T) => void;

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

export type ComboBoxItemType = {
  value: string;
  label: string;
  flag?: string;
};

export type StoreFieldType = {
  name: keyof AppStoreFormValues;
  label: string;
  maxLength?: number;
  type: "textarea" | "text" | "combobox";
  placeholder: string;
};
