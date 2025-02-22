import AppLayout from "@/components/ui/app-layout";
import MsgForm from "@/components/ui/msg-form";
import { getUser } from "@/server/actions/get-user";
import { getUserSecretMessage } from "@/server/actions/get-user-secret-message";
import { redirect } from "next/navigation";

export default async function SecretPage2() {
  const user = await getUser();
  if (!user) redirect("/login");

  const secretMessage = await getUserSecretMessage(user.id);

  return (
    <AppLayout>
      <MsgForm
        mode={secretMessage ? "edit" : "create"}
        userId={user.id}
        initialMessage={secretMessage?.message || ""}
      />
    </AppLayout>
  );
}
