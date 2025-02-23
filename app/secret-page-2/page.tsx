"use server";

import AppLayout from "@/components/ui/app-layout";
import MsgForm from "@/components/ui/msg-form";
import { getCurrentUser } from "@/server/actions/get-current-user";
import { getUserSecretMessage } from "@/server/actions/get-user-secret-message";
import { redirect } from "next/navigation";

export default async function SecretPage2() {
  // Get logged in user
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  // Get secret Message
  const secretMessage = await getUserSecretMessage(user.id);
  const noSecretMessage = secretMessage.message === "No secret message found.";

  return (
    <AppLayout>
      <MsgForm
        mode={noSecretMessage ? "create" : "edit"}
        userId={user.id}
        initialMessage={noSecretMessage ? "" : secretMessage.message}
      />
    </AppLayout>
  );
}
