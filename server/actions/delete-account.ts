"use server";

import { createClient } from "../supabase/server";

export async function deleteAccount() {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) throw new Error("User is not logged in");

    const { error: deleteError } = await supabase.auth.admin.deleteUser(
      user.id
    );

    if (deleteError) throw new Error(deleteError.message);

    return { success: "Account successfully deleted" };
  } catch (err) {
    console.error("Account deletion error:", err);
    return { error: "Failed to delete account. Please try again later." };
  }
}
