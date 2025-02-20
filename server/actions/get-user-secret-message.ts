"use server";

import { createClient } from "../supabase/server";

export async function getUserSecretMessage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated" };

  const { data: secretMessage, error } = await supabase
    .from("secret_messages")
    .select("message")
    .eq("user_id", user.id)
    .single();

  if (error) return { error: "No secret message found" };

  return { secretMessage: secretMessage.message };
}
