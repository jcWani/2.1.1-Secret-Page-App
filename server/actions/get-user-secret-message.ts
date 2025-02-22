"use server";

import { createClient } from "../supabase/server";

export async function getUserSecretMessage(userId: string) {
  try {
    const supabase = await createClient();
    const { data: secret_messages, error } = await supabase
      .from("secret_messages")
      .select("message")
      .eq("user_id", userId)
      .maybeSingle();

    if (error) return null;

    return secret_messages;
  } catch (err) {
    console.error("Unexpected error:", err);
    return null;
  }
}
