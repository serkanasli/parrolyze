import { ActionResult } from "@/types/common";
import { toast } from "sonner";

export async function withLoadingToast<T = unknown>(
  loading: string,
  success: string,
  error: string,
  setLoading: ((v: boolean) => void) | null = null, // null da kabul edilir
  fn: () => Promise<ActionResult<T>>,
): Promise<ActionResult<T> | undefined> {
  const toastId = toast.loading(loading);

  if (setLoading) setLoading(true);

  try {
    const response = await fn();
    toast.success(success, { id: toastId });
    return response;
  } catch (err) {
    toast.error(error, { id: toastId });
    console.error(err);
    return undefined;
  } finally {
    if (setLoading) setLoading(false);
  }
}
