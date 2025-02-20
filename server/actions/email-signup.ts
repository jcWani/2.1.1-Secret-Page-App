"use server";

import { RegisterSchema } from "@/types/register-schema";
import { actionClient } from "@/lib/safe-action";
import { createClient } from "../supabase/server";
import { revalidatePath } from "next/cache";

export const emailSignUp = actionClient
  .schema(RegisterSchema)
  .action(async ({ parsedInput: { email, password, username } }) => {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username },
      },
    });

    if (error) return { error: "Sign-up failed" };

    if (data.user) {
      await supabase
        .from("secret_messages")
        .insert([
          { user_id: data.user.id, message: "Your default secret message!" },
        ]);
    }

    revalidatePath("/", "layout");

    return {
      success: "Account successfully created! Confirmation email sent.",
    };
  });
