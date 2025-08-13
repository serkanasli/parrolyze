import { Database } from "./database.types";

export interface CreateProjectData {
  project: ProjectInsert;
  icon_file?: File;
}

export type ProjectRow = Database["public"]["Tables"]["projects"]["Row"];
export type ProjectInsert = Database["public"]["Tables"]["projects"]["Insert"];
export type ProjectUpdate = Database["public"]["Tables"]["projects"]["Update"];
