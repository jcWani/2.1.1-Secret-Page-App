"use server";

import { actionClient } from "@/lib/safe-action";
import { LoginSchema } from "@/types/login-schema";
import { createClient } from "../supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export const emailSignIn = actionClient
  .schema(LoginSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) return { error: "Incorrect credentials" };

    if (error) {
      redirect("/error");
    }

    revalidatePath("/", "layout");
    redirect("/");
  });
