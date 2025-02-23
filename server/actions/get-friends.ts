import { createClient } from "../supabase/server";

export async function getFriends(userId: string) {
  try {
    const supabase = await createClient();

    const { data: friends, error } = await supabase
      .from("friends")
      .select("user_id, friend_id, status")
      .or(`user_id.eq.${userId},friend_id.eq.${userId}`)
      .eq("status", "accepted");

    if (error) console.error("Error fetching friends:", error.message);

    return friends ?? [];
  } catch (err) {
    console.error("Error fetching friends:", err);
    return [];
  }
}
