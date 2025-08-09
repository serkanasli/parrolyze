import { Database } from "./database.types";

export type ProfileRowType = Database["public"]["Tables"]["profiles"]["Row"];
export type ProfileInsertType = Database["public"]["Tables"]["profiles"]["Insert"];
export type ProfileUpdateType = Database["public"]["Tables"]["profiles"]["Update"];
