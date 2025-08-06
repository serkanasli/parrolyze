import { PageProps } from "@/types/common";

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const { projectId } = resolvedParams;

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold">Localization/store for Project ID: {projectId}</h1>
    </div>
  );
}
