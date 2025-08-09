import { Database } from "./database.types";

export interface CreateProjectDataType {
  project: ProjectInsertType;
  icon_file?: File;
}

export type ProjectRowType = Database["public"]["Tables"]["projects"]["Row"];
export type ProjectInsertType = Database["public"]["Tables"]["projects"]["Insert"];
export type ProjectUpdateType = Database["public"]["Tables"]["projects"]["Update"];
