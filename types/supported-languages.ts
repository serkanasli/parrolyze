import { Database } from "./database.types";

export type SupportedLanguagesRow = Database["public"]["Tables"]["supported_languages"]["Row"];
export type SupportedLanguagesInsert =
  Database["public"]["Tables"]["supported_languages"]["Insert"];
export type SupportedLanguagesUpdate =
  Database["public"]["Tables"]["supported_languages"]["Update"];
