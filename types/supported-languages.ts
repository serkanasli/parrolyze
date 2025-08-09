import { Database } from "./database.types";

export type SupportedLanguagesRowType = Database["public"]["Tables"]["supported_languages"]["Row"];
export type SupportedLanguagesInsertType =
  Database["public"]["Tables"]["supported_languages"]["Insert"];
export type SupportedLanguagesUpdateType =
  Database["public"]["Tables"]["supported_languages"]["Update"];
