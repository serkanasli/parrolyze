import EditProject from "@/components/projects/settings/edit-project";
import { getProject } from "@/lib/database/queries/projects";

export default async function Page(props: { params: { projectId: string } }) {
  const { projectId } = await props.params;

  const project = await getProject(projectId);

  return <EditProject project={project!} />;
}
