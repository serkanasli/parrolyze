"use server";

import { messages } from "@/constants/messages";
import * as dbMutations from "@/lib/database/mutations/projects";
import * as dbQueries from "@/lib/database/queries/projects";
import * as dbTransactions from "@/lib/database/transactions/projects";
import { Result } from "@/lib/result";
import { ActionResult } from "@/types/common";
import { CreateProjectData, ProjectRow, ProjectUpdate } from "@/types/projects";

const subject = "Project";

//queries
export async function getUserProjects(): Promise<ActionResult<ProjectRow[]>> {
  try {
    const response = await dbQueries.getUserProjects();
    return Result.ok(response);
  } catch (error) {
    return Result.fail();
  }
}

export async function getProject(projectId: string): Promise<ActionResult<ProjectRow>> {
  try {
    const response = await dbQueries.getProject(projectId);

    return Result.ok(response);
  } catch (error) {
    return Result.fail();
  }
}

//mutations
export async function updateProject(
  projectId: string,
  updateData: ProjectUpdate,
): Promise<ActionResult<ProjectRow>> {
  try {
    const response = await dbMutations.updateProject(projectId, updateData);

    return Result.ok(response, messages.success.update(subject));
  } catch (error) {
    return Result.fail();
  }
}

export async function deleteProject(projectId: string): Promise<ActionResult> {
  try {
    await dbMutations.deleteProject(projectId);
    return Result.ok();
  } catch (error) {
    return Result.fail();
  }
}

//transactions
export async function updateProjectIconWithUpload(
  projectId: string,
  iconFile: File,
): Promise<ActionResult> {
  try {
    await dbTransactions.updateProjectIconWithUpload(projectId, iconFile);
    return Result.ok(null, messages.success.update(subject));
  } catch (error) {
    return Result.fail();
  }
}

export async function createProjectWithIcon(
  data: CreateProjectData,
): Promise<ActionResult<ProjectRow>> {
  try {
    const response = await dbTransactions.createProjectWithIcon(data.project, data.icon_file!);
    return Result.ok(response, messages.success.create(subject));
  } catch (error) {
    return Result.fail();
  }
}
