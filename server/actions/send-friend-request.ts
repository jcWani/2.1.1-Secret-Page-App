"use server";

import { actionClient } from "@/lib/safe-action";
import { createClient } from "../supabase/server";
import { FriendSchema } from "@/types/friend-schema";

export const sendFriendRequest = actionClient
  .schema(FriendSchema)
  .action(async ({ parsedInput: { id } }) => {
    try {
      const supabase = await createClient();

      // Get the current user
      const {
        data: { user: currentUser },
        error: authError,
      } = await supabase.auth.getUser();

      if (!currentUser) return { error: "User not authenticated!" };

      // Check if the target friend exists
      const {
        data: { user },
        error,
      } = await supabase.auth.admin.getUserById(id);

      if (!user) return { error: "User does not exist!" };

      // Check if a friend request already exists
      const { data: existingRequest, error: checkError } = await supabase
        .from("friends")
        .select("*")
        .or(
          `and(user_id.eq.${currentUser.id},friend_id.eq.${id}),and(user_id.eq.${id},friend_id.eq.${currentUser.id})`
        )
        .maybeSingle();

      if (checkError) {
        console.error("Error checking existing request:", checkError.message);
        return { error: "Error checking friend request" };
      }

      if (existingRequest) return { error: "Friend request already sent!" };

      // Insert a new friend request
      const { data, error: errorFriends } = await supabase
        .from("friends")
        .insert([
          { user_id: currentUser.id, friend_id: user.id, status: "pending" },
        ]);

      if (errorFriends)
        console.error("Error sending friend request:", errorFriends.message);

      return { success: "Friend request sent!" };
    } catch (err) {
      console.error("Send Friend Req error:", err);
    }
  });
