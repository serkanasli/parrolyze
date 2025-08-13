import { messages } from "@/constants/messages";
import { ActionResult } from "@/types/common";

export const Result = {
  ok<T>(data?: T, message?: string): ActionResult<T> {
    return { success: true, data, message };
  },
  fail<T>(message?: string, code?: string): ActionResult<T> {
    throw message ?? messages.error.generic;
    return { success: false, message: message ?? messages.error.generic, code };
  },
};
