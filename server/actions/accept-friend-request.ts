"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../supabase/server";

export async function acceptFriendRequest(userId: string, friendId: string) {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("friends")
      .update({ status: "accepted" })
      .match({ user_id: friendId, friend_id: userId, status: "pending" });

    if (error) throw new Error("Error accepting friend request:", error);

    revalidatePath("/protected/secret-page-3");
    return { success: "Friend request accepted" };
  } catch (err) {
    console.error("Error accepting friend request:", err);
    return { error: "Friend to accept friend request" };
  }
}
