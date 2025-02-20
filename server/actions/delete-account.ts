"use server";

import { createClient } from "../supabase/server";

export async function deleteAccount() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("User is not login");

  const { data, error } = await supabase.auth.admin.deleteUser(user.id);
  if (error) throw new Error(error.message);
}
