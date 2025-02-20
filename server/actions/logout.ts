"use server";

import { createClient } from "../supabase/server";

export async function logout() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}
