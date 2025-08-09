import { getUserProjects } from "@/actions/projects";
import ProjectOverview from "@/components/projects/overview/project-overview";
import { PageProps } from "@/types/common";

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const { projectId } = resolvedParams;

  const { success, data } = await getUserProjects();

  return <ProjectOverview projectId={projectId} projects={data || []} />;
}
