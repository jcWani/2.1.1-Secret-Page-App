"use server";

import { actionClient } from "@/lib/safe-action";
import { createClient } from "../supabase/server";

import { MessageSchema } from "@/types/message-schema";

export const upsertMessage = actionClient
  .schema(MessageSchema)
  .action(async ({ parsedInput: { id, message } }) => {
    try {
      const supabase = await createClient();

      // Check if the user already has a message
      const { data: currentSecretMsg, error: selectError } = await supabase
        .from("secret_messages")
        .select("id")
        .eq("user_id", id)
        .single();

      if (currentSecretMsg) {
        // If Message exists, update it
        const { error: updateError } = await supabase
          .from("secret_messages")
          .update({ message })
          .eq("user_id", id);

        if (updateError) return { error: "Failed to edit message" };

        return { success: "Message updated successfully" };
      } else {
        // If NO message, insert one
        const { error: insertError } = await supabase
          .from("secret_messages")
          .insert([{ user_id: id, message }]);

        if (insertError) return { error: "Failed to add message" };

        return { success: "Message created successfully" };
      }
    } catch (error) {
      console.error("Error handling message:", error);
      return { error: "Failed to process the message" };
    }
  });
