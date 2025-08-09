import { messages } from "@/constants/messages";
import { ActionResultType } from "@/types/common";

export const Result = {
  ok<T>(data?: T, message?: string): ActionResultType<T> {
    return { success: true, data, message };
  },
  fail<T>(message?: string, code?: string): ActionResultType<T> {
    throw message ?? messages.error.generic;
    return { success: false, message: message ?? messages.error.generic, code };
  },
};
