import { getAIServices } from "@/actions/ai-services";
import AIServiceManagementDialog from "@/components/ai-services/ai-service-managment-dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AIServicesRow } from "@/types/ai-services";
import { Plus } from "lucide-react";
import AIServiceActions from "./ai-service-actions";

export default async function Page() {
  const { data: aiServices } = await getAIServices();

  return (
    <div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col justify-between md:flex-row">
          <h1 className="mb-5 text-xl font-semibold lg:text-2xl">AI Services</h1>
        </div>
        <AIServiceManagementDialog
          mode="create"
          trigger={
            <Button variant="blue">
              <Plus />
              Create AI Service
            </Button>
          }
          dialogTitle="Create AI Service"
          dialogDescription="Add a new AI service by entering its details below."
        />
      </div>
      <Separator />
      <div className="mt-5 max-w-2xl">
        {aiServices &&
          aiServices.map((aiService: AIServicesRow) => {
            const maskedKey = `${aiService.api_key.slice(0, 6)}••••••••••${aiService.api_key.slice(-4)}`;
            return (
              <div
                key={aiService.id}
                className="mt-1 flex flex-row items-center justify-between rounded-sm border p-2.5"
              >
                <div className="flex flex-col gap-y-1">
                  <span className="font-semibold">{aiService.service}</span>
                  {aiService.base_url && (
                    <span className="text-muted-foreground w-24 truncate text-sm md:w-auto">
                      {aiService.base_url}
                    </span>
                  )}
                </div>
                <div className="flex flex-row items-center gap-x-5">
                  <span className="text-muted-foreground w-24 truncate text-sm md:w-auto">
                    {maskedKey}
                  </span>
                  <AIServiceActions data={aiService} />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
