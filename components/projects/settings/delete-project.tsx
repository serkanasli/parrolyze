"use client";

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { deleteProject } from "@/lib/database/transactions/projects";
import { Loader2, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

type DeleteProjectProps = {
  projectName: string;
  projectId: string;
  className?: string;
};

export function DeleteProject({ projectName, projectId, className }: DeleteProjectProps) {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const isMatch = inputValue.trim() === projectName;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const toastId = toast.loading("Deleting project");
    try {
      if (!isMatch) return;
      setIsDeleting(true);
      await deleteProject(projectId);
      toast.success("Project deleted successfully!", { id: toastId });
      router.push("/projects/overview");
    } catch {
      const errorMessage = "An error occurred while deleting the project.";
      toast.error(errorMessage, { id: toastId });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog>
      <form onSubmit={handleSubmit} className={className} id="delete-project-form">
        <DialogTrigger asChild>
          <Button type="button" variant="link" className="text-destructive flex items-center gap-1">
            <Trash />
            Delete project
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Project</DialogTitle>
            <DialogDescription>
              To confirm deletion, please type the project name <strong>{projectName}</strong>{" "}
              below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="confirm-name">Project Name</Label>
              <Input
                id="confirm-name"
                name="confirm-name"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type project name to confirm"
                autoComplete="off"
                disabled={isDeleting}
              />
            </div>
          </div>
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
              disabled={!isMatch || isDeleting}
            >
              {isDeleting && <Loader2 className="animate-spin" />}
              Delete Project
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
