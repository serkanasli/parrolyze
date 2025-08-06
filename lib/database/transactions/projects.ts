import { uploadProjectIcon } from "@/lib/storage/project-files";
import { createClient } from "@/lib/supabase/client";

import type { Database } from "@/types/database.types";
import { CreateProjectData } from "@/types/projects";

type ProjectInsert = Database["public"]["Tables"]["projects"]["Insert"];

export interface CreateProjectResult {
  project: Database["public"]["Tables"]["projects"]["Row"];
  iconUrl?: string;
}

export async function createProjectWithIcon(data: CreateProjectData): Promise<CreateProjectResult> {
  const supabase = await createClient();

  try {
    // 1. First create project without icon
    const projectData: ProjectInsert = {
      name: data.name,
      short_description: data.short_description,
      store_type: data.store_type,
      app_store_url: data.app_store_url,
      play_store_url: data.play_store_url,
      user_id: data.user_id,
      icon_url: null, // Will be updated after file upload
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data: project, error: projectError } = await supabase
      .from("projects")
      .insert(projectData)
      .select()
      .single();

    if (projectError) {
      throw new Error(`Failed to create project: ${projectError.message}`);
    }

    let iconUrl: string | undefined;

    // 2. Upload icon if provided
    if (data.icon_file) {
      try {
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError) {
          throw new Error(`Failed to update project with icon: ${authError.message}`);
        }

        const userId = user?.id ?? "";

        const { url } = await uploadProjectIcon(data.icon_file, project.id, userId);
        iconUrl = url;

        // 3. Update project with icon URL
        const { error: updateError } = await supabase
          .from("projects")
          .update({
            icon_url: url,
            updated_at: new Date().toISOString(),
          })
          .eq("id", project.id);

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
        await supabase.from("projects").delete().eq("id", project.id);
        throw uploadError;

        // Option 2: Lenient - keep project, log error
        // console.error('Icon upload failed, project created without icon:', uploadError)
      }
    }

    // 4. Could add more operations here (notifications, analytics, etc.)

    return {
      project: {
        ...project,
        icon_url: iconUrl || null,
      },
      iconUrl,
    };
  } catch (error) {
    // Clean up any uploaded files if something goes wrong
    throw error;
  }
}
