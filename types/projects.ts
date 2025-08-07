import { StoreType } from "./common";
import { Database } from "./database.types";

export interface CreateProjectData {
  name: string;
  short_description: string;
  store_type: StoreType;
  app_store_url: string;
  play_store_url: string;
  user_id: string;
  icon_file?: File;
}

export type ProjectRow = Database["public"]["Tables"]["projects"]["Row"];
export type ProjectInsert = Database["public"]["Tables"]["projects"]["Insert"];
export type ProjectUpdate = Database["public"]["Tables"]["projects"]["Update"];

export type OnSubmitSuccessType = (response: ProjectInsert | ProjectUpdate) => void;
