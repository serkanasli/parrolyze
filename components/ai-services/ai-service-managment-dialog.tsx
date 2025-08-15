"use client";
import { upsertAIServices } from "@/actions/ai-services";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { aiServiceFormFields } from "@/constants/forms/ai-service-form-field";
import { withLoadingToast } from "@/lib/toast";
import { AIServicesUpdate } from "@/types/ai-services";
import { FormAction } from "@/types/form";
import { aiServiceFormSchema } from "@/validations/ai-service-schema";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import DynamicForm from "../form/dynamic-form";

interface AIServiceManagementDialogProps {
  trigger: ReactNode;
  dialogTitle: string;
  dialogDescription: string;
  mode: FormAction;
  data?: AIServicesUpdate;
}

export default function AIServiceManagementDialog({
  trigger,
  dialogTitle,
  dialogDescription,
  mode,
  data,
}: AIServiceManagementDialogProps) {
  const formId = "create-ai-service-form";
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const loadingToasMessages =
    mode === "create"
      ? {
          loading: "Creating AI service...",
          success: "AI service created successfully!",
          error: "An error occurred while creating the AI service.",
        }
      : {
          loading: "Updating AI service...",
          success: "AI service updated successfully!",
          error: "An error occurred while updating the AI service.",
        };

  const onSubmit = async (values: AIServicesUpdate) => {
    try {
      await withLoadingToast(
        loadingToasMessages.loading,
        loadingToasMessages.success,
        loadingToasMessages.error,
        setLoading,
        () => upsertAIServices(values),
      );
      setOpen(false);
      router.refresh();
    } catch (error) {}
  };
  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>
        <DynamicForm
          formId={formId}
          isSubmitButtonShow={false}
          onSubmit={onSubmit}
          schema={aiServiceFormSchema}
          fields={aiServiceFormFields}
          defaultValues={
            mode === "edit"
              ? {
                  id: data?.id,
                  api_key: data?.api_key || "",
                  base_url: data?.base_url || "",
                  service: data?.service || "",
                }
              : undefined
          }
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button disabled={loading} type="submit" form={formId}>
            {loading && <Loader2 className="animate-spin" />}
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
