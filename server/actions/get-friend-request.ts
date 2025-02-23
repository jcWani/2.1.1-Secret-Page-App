import { createClient } from "../supabase/server";

export async function getFriendRequest(userId: string) {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("friends")
      .select("*")
      .eq("friend_id", userId)
      .eq("status", "pending");

    if (error) {
      console.error("Error fetching friends:", error.message);
      return [];
    }

    return data ?? [];
  } catch (err) {
    console.error("Get friend request error: ", err);
  }
}
