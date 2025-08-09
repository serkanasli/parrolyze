"use server";

import { uploadProjectIcon } from "@/lib/storage/project-files";
import { createClient } from "@/lib/supabase/server";
import { ProjectInsertType, ProjectRowType } from "@/types/projects";

import { createProject, deleteProject, updateProject } from "../mutations/projects";

export async function createProjectWithIcon(
  data: ProjectInsertType,
  iconFile: File,
): Promise<ProjectRowType> {
  const supabase = await createClient();

  try {
    const project = await createProject(data);

    // 2. Upload icon if provided
    if (iconFile) {
      try {
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError) {
          throw new Error(`Failed to update project with icon: ${authError.message}`);
        }

        const userId = user?.id ?? "";

        console.log("project", project);
        console.log("userId", userId);

        const { url } = await uploadProjectIcon(iconFile, project.id, userId);

        // 3. Update project with icon URL

        const { error: updateError } = await updateProject(project.id, {
          icon_url: url,
          updated_at: new Date().toISOString(),
        });

        if (updateError) {
          throw new Error(`Failed to update project with icon: ${updateError.message}`);
        }

        // Update local project object
        project.icon_url = url;
      } catch (uploadError) {
        // If file upload fails, we could either:
        // 1. Delete the created project (strict)
        // 2. Keep project without icon (lenient)

        // Option 1: Strict - rollback
        await deleteProject(project.id);
        throw uploadError;

        // Option 2: Lenient - keep project, log error
        // console.error('Icon upload failed, project created without icon:', uploadError)
      }
    }

    // 4. Could add more operations here (notifications, analytics, etc.)

    return project;
  } catch (error) {
    // Clean up any uploaded files if something goes wrong
    throw error;
  }
}

export async function updateProjectIconWithUpload(
  projectId: string,
  iconFile: File,
): Promise<string> {
  const supabase = await createClient();

  try {
    if (!projectId) {
      throw new Error("Project ID is required.");
    }

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user?.id) {
      throw new Error(`User auth failed: ${authError?.message}`);
    }

    const userId = user.id;

    const { url } = await uploadProjectIcon(iconFile, projectId, userId);

    const { error: updateError } = await updateProject(projectId, {
      icon_url: url,
      updated_at: new Date().toISOString(),
    });

    if (updateError) {
      throw new Error(`Failed to update icon URL: ${updateError.message}`);
    }

    return url;
  } catch (error) {
    throw error;
  }
}
