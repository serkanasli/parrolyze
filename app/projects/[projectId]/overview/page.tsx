import ProjectOverview from "@/components/projects/overview/project-overview";
import { getUserProjects } from "@/lib/database/queries/projects";
import { PageProps } from "@/types/common";

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const { projectId } = resolvedParams;

  const projects = await getUserProjects();

  return <ProjectOverview projectId={projectId} projects={projects} />;
}
