"use client";

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

type SecretMessage = {
  message: string;
};

type Props = {
  secretMessage: SecretMessage;
};

export default function ViewMessageBtn({ secretMessage }: Props) {
  const noSecretMessage = secretMessage.message === "No secret message found.";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" disabled={noSecretMessage ? true : false}>
          {noSecretMessage ? (
            <>
              No secret message
              <EyeOff />
            </>
          ) : (
            <>
              View
              <Eye />
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
            {secretMessage.message}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
