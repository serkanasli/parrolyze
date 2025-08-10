import { FEEDBACK_TYPES, STORE_TYPES } from "@/constants";

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
