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

    if (error || !secret_messages) {
      return { message: "No secret message found." };
    }

    return secret_messages;
  } catch (err) {
    console.error("Unexpected error:", err);
    return { message: "An error occurred while fetching the message." };
  }
}
