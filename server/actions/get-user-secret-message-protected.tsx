"use server";

import { createClient } from "../supabase/server";

export async function getUserSecretMessageProtected(
  viewerId: string,
  friendId: string
) {
  try {
    const supabase = await createClient();

    // Check friendship
    const { data: friendship, error: friendshipError } = await supabase
      .from("friends")
      .select("*")
      .or(
        `and(user_id.eq.${viewerId}, friend_id.eq.${friendId}),and(user_id.eq.${friendId}, friend_id.eq.${viewerId})`
      )
      .maybeSingle();

    if (friendshipError || !friendship) {
      return { error: "Unauthorized", status: 401 };
    }

    // Fetch message
    const { data: secret_messages, error } = await supabase
      .from("secret_messages")
      .select("message")
      .eq("user_id", friendId)
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
