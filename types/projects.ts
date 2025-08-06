import { StoreType } from "./common";

export interface CreateProjectData {
  name: string;
  short_description: string;
  store_type: StoreType;
  app_store_url: string;
  play_store_url: string;
  user_id: string;
  icon_file?: File;
}
