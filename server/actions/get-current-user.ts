"use server";

import { createClient } from "../supabase/server";

export async function getCurrentUser() {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    return user;
  } catch (err) {
    console.error("Error fetching user:", err);
  }
}
