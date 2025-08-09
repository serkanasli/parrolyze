import { Database } from "./database.types";

export type StoreLocalizationRowType = Database["public"]["Tables"]["store_localizations"]["Row"];
export type StoreLocalizationInsertType =
  Database["public"]["Tables"]["store_localizations"]["Insert"];
export type StoreLocalizationUpdateType =
  Database["public"]["Tables"]["store_localizations"]["Update"];
