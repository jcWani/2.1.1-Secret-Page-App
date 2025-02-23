"use server";

import DeleteAccountBtn from "@/components/auth/delete-account-btn";
import ViewMessageBtn from "@/components/ui/view-msg-btn";

import { redirect } from "next/navigation";
import { getUserSecretMessage } from "@/server/actions/get-user-secret-message";
import { getCurrentUser } from "@/server/actions/get-current-user";

import { Card, CardContent } from "@/components/ui/card";

export default async function SecretPage1() {
  // Get Logged in user
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  // Get Secret Message
  const secretMessage = await getUserSecretMessage(user.id);

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold mb-4">Welcome to Secret Page One</h1>
      </div>

      <Card className="w-full max-w-lg">
        <CardContent className="space-y-4 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Secret Message</h3>
              <p className="text-sm text-muted-foreground">
                Access your own secret message
              </p>
            </div>
            <ViewMessageBtn secretMessage={secretMessage} />
          </div>

          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="font-medium">Delete account</h3>
              <p className="text-sm text-muted-foreground">
                Permanently remove your account. This action cannot be undone.
              </p>
            </div>
            <DeleteAccountBtn />
          </div>
        </CardContent>
      </Card>
    </>
  );
}
