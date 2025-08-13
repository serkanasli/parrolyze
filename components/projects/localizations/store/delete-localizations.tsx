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
import { Loader2, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface DeleteLocalizationsProps {
  className?: string;
  langCode: string;
  handleRemoveStoreLocalizations: (langCode: string) => Promise<void>;
}

export function DeleteLocalizations({
  className,
  langCode,
  handleRemoveStoreLocalizations,
}: DeleteLocalizationsProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsDeleting(true);
      await handleRemoveStoreLocalizations(langCode);
      setIsOpen(false);
      router.refresh();
    } catch {
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <form onSubmit={handleSubmit} className={className} id="delete-project-form">
        <DialogTrigger asChild>
          <Button type="button" variant="link" className="text-destructive flex items-center gap-1">
            <Trash />
            Delete localizations
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Localizations</DialogTitle>
            <DialogDescription>
              This action will permanently delete all localizations for this project. Are you sure
              you want to proceed?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" disabled={isDeleting}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              variant="destructive"
              type="submit"
              form="delete-project-form"
              disabled={isDeleting}
            >
              {isDeleting && <Loader2 className="animate-spin" />}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
