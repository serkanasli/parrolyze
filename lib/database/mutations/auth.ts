import { createClient } from "@/lib/supabase/server";
import { AuthFormData } from "@/types/auth";

export async function login(values: AuthFormData) {
  const supabase = await createClient();
  return await supabase.auth.signInWithPassword({
    email: values.email,
    password: values.password,
  });
}

export async function signUp(values: AuthFormData) {
  const supabase = await createClient();
  return await supabase.auth.signUp({
    email: values.email,
    password: values.password,
  });
}

export async function signOut() {
  const supabase = await createClient();
  return await supabase.auth.signOut();
}
