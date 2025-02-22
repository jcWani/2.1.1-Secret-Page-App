import { getUserSecretMessage } from "@/server/actions/get-user-secret-message";
import { getUser } from "@/server/actions/get-user";
import { redirect } from "next/navigation";

import { Eye, EyeOff } from "lucide-react";
import { Button } from "./button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default async function ViewMessageBtn() {
  const user = await getUser();
  if (!user) redirect("/login");

  const secretMessage = await getUserSecretMessage(user.id);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          disabled={secretMessage?.message ? false : true}
        >
          {secretMessage?.message ? (
            <>
              View
              <Eye />
            </>
          ) : (
            <>
              No secret message
              <EyeOff />
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="text-wrap">
        <DialogHeader>
          <DialogTitle>🔒 Your Secret Message</DialogTitle>
          <DialogDescription>Friends can also see this</DialogDescription>
        </DialogHeader>
        <div className="mt-4 max-h-[60vh] overflow-y-auto">
          <p className="p-4 bg-gray-100 border border-gray-300 rounded-lg whitespace-pre-wrap break-words">
            {secretMessage?.message || "No message found"}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
