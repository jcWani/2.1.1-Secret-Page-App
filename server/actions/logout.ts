"use server";

import { createClient } from "../supabase/server";

export async function logout() {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();

    if (error) throw new Error(error.message);

    return { success: "Logged out successfully" };
  } catch (err) {
    console.error("Logout error:", err);
    return { error: "Failed to log out. Please try again." };
  }
}
