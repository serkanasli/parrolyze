import { toast } from "sonner";

export async function withLoadingToast<T>(
  loading: string,
  success: string,
  error: string,
  setLoading: (v: boolean) => void,
  fn: () => Promise<T>,
): Promise<T | undefined> {
  const toastId = toast.loading(loading);
  setLoading(true);
  try {
    const result = await fn();
    toast.success(success, { id: toastId });
    return result;
  } catch (err) {
    toast.error(error, { id: toastId });
    console.error(err);
  } finally {
    setLoading(false);
  }
}
