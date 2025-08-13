/* eslint-disable @typescript-eslint/no-explicit-any */
import { FEEDBACK_OPTIONS, STORE_PLATFORM_OPTIONS } from "@/constants";

export interface ActionResult<T = unknown> {
  success: boolean;
  message?: string;
  code?: string;
  data?: T | any;
}

export type OnSubmitSuccess<T = unknown> = (response: T) => void;

export interface PageProps {
  params: {
    projectId: string;
  };
  searchParams: {
    platform?: "app_store" | "play_store";
  };
}

export interface AIChatMessage {
  role: "user" | "system";
  content: string;
}

export type StorePlatform = (typeof STORE_PLATFORM_OPTIONS)[number]["value"];
export type Feedback = (typeof FEEDBACK_OPTIONS)[number]["value"];
export type Side = "top" | "right" | "bottom" | "left" | undefined;
export type Align = "start" | "center" | "end" | undefined;
export type ButtonVariant =
  | "default"
  | "link"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "blue"
  | "green"
  | null
  | undefined;

export type ButtonSize = "default" | "sm" | "lg" | "icon" | null | undefined;
