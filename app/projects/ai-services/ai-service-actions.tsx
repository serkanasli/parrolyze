"use client";
import { deleteAIServices } from "@/actions/ai-services";
import AIServiceManagementDialog from "@/components/ai-services/ai-service-managment-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AIServicesRow } from "@/types/ai-services";
import { Edit2, Ellipsis, Loader2, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface AIServiceActionsProps {
  data: AIServicesRow;
}

export default function AIServiceActions({ data }: AIServiceActionsProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRemoveAIService = async () => {
    try {
      setLoading(true);
      await deleteAIServices(data.id);
      router.refresh();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-44" side="bottom" align="end">
        <DropdownMenuGroup className="gap-y-1 py-1">
          <DropdownMenuItem asChild className="cursor-pointer">
            <AIServiceManagementDialog
              mode="edit"
              data={data}
              trigger={
                <Button variant="ghost" className="w-full justify-start">
                  <Edit2 />
                  Edit
                </Button>
              }
              dialogTitle="Create AI Service"
              dialogDescription="Update the AI service details below and save your changes."
            />
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="cursor-pointer">
            <Button
              onClick={() => handleRemoveAIService()}
              variant="ghost"
              className="w-full justify-start"
            >
              {loading && <Loader2 className="animate-spin" />}
              <Trash size={12} className="text-destructive" />
              <span className="text-destructive font-medium">Delete</span>
            </Button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
