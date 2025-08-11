import ProjectSettings from "@/components/projects/settings/project-settings";
import { getProject } from "@/lib/database/queries/projects";

export default async function Page(props: { params: { projectId: string } }) {
  const { projectId } = await props.params;

  const project = await getProject(projectId);

  return <ProjectSettings project={project!} />;
}
