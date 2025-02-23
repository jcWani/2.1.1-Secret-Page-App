"use client";
import { useState } from "react";
import { User } from "@supabase/supabase-js";
import { getUserSecretMessageProtected } from "@/server/actions/get-user-secret-message-protected";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "../ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export default function FriendsList({
  friends,
  user,
}: {
  friends: User[];
  user: User;
}) {
  const [secretMessages, setSecretMessages] = useState<{
    [key: string]: string;
  }>({});
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});

  // Fetch secret message when button is clicked
  const handleFriendsSecretMsg = async (friendId: string) => {
    setLoading((prev) => ({ ...prev, [friendId]: true })); // Show loading state

    const secretMessage = await getUserSecretMessageProtected(
      user.id,
      friendId
    );

    console.log("Secret Message Response:", secretMessage);

    setSecretMessages((prev) => ({
      ...prev,
      [friendId]:
        "message" in secretMessage
          ? secretMessage.message
          : `${secretMessage.error}: ${secretMessage.status}` ||
            "No secret message found.",
    }));

    setLoading((prev) => ({ ...prev, [friendId]: false })); // Hide loading state
  };

  return (
    <Card className="h-[400px] flex flex-col">
      <CardHeader>
        <CardTitle>Friends List - {friends.length}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden">
        <ScrollArea className="h-full">
          {friends.length === 0 ? (
            <p>You haven&apos;t added any friends yet.</p>
          ) : (
            <ul className="divide-y">
              {friends.map((friend) => (
                <li
                  key={friend.id}
                  className="py-3 flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-medium">
                      {friend.user_metadata.username}
                    </h3>
                    <p className="text-sm text-gray-500">{friend.email}</p>
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        onClick={() => handleFriendsSecretMsg(friend.id)}
                        className={cn(
                          loading[friend.id] ? "animate-pulse" : ""
                        )}
                      >
                        View
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          🔐 {friend.user_metadata.username}&apos;s Secret
                          Message
                        </DialogTitle>
                        <DialogDescription>
                          Can only be seen by friends
                        </DialogDescription>
                      </DialogHeader>
                      <div className="mt-4 max-h-[60vh] overflow-y-auto">
                        <p className="p-4 bg-gray-100 border border-gray-300 rounded-lg whitespace-pre-wrap break-words">
                          {loading[friend.id] ? (
                            <Loader2 className="animate-spin place-self-center" />
                          ) : (
                            secretMessages[friend.id]
                          )}
                        </p>
                      </div>
                    </DialogContent>
                  </Dialog>
                </li>
              ))}
            </ul>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
