/* eslint-disable @typescript-eslint/no-explicit-any */
import { FEEDBACK_TYPES, STORE_TYPES } from "@/constants";

export type ActionResultType<T = unknown> = {
  success: boolean;
  message?: string;
  code?: string;
  data?: T | any;
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

export type SideType = "top" | "right" | "bottom" | "left" | undefined;
export type AlignType = "start" | "center" | "end" | undefined;
export type ButtonVariantType =
  | "default"
  | "link"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "blue"
  | null
  | undefined;

export type ButtonSizeType = "default" | "sm" | "lg" | "icon" | null | undefined;

export type AIMessageType = {
  role: "user" | "system";
  content: string;
};
