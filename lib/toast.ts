import { ActionResultType } from "@/types/common";
import { toast } from "sonner";

export async function withLoadingToast<T = unknown>(
  loading: string,
  success: string,
  error: string,
  setLoading: (v: boolean) => void,
  fn: () => Promise<ActionResultType<T>>,
): Promise<ActionResultType<T> | undefined> {
  const toastId = toast.loading(loading);
  setLoading(true);
  try {
    const response = await fn();
    toast.success(success, { id: toastId });
    return response;
  } catch (err) {
    toast.error(error, { id: toastId });
    console.error(err);
    return undefined;
  } finally {
    setLoading(false);
  }
}
