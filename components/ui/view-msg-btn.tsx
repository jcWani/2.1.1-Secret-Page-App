import { Eye } from "lucide-react";
import { Button } from "./button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getUserSecretMessage } from "@/server/actions/get-user-secret-message";

export default async function ViewMessageBtn() {
  const { secretMessage, error } = await getUserSecretMessage();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          View
          <Eye />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>🔒 Your Secret Message</DialogTitle>
          <DialogDescription>Friends can also see this</DialogDescription>
        </DialogHeader>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <p className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded-lg">
            {secretMessage}
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
