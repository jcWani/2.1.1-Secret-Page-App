"use client";

import { User } from "@supabase/supabase-js";
import { acceptFriendRequest } from "@/server/actions/accept-friend-request";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { toast } from "sonner";

export default function FriendRequests({
  currentUserId,
  users,
}: {
  currentUserId: string;
  users: User[];
}) {
  const handleAcceptReq = async (userId: string, friendId: string) => {
    const { success, error } = await acceptFriendRequest(userId, friendId);

    if (success) setTimeout(() => toast.success(success), 0);
    if (error) setTimeout(() => toast.error(error), 0);
  };

  return (
    <Card className="max-h-60 flex flex-col">
      <CardHeader>
        <CardTitle>Friend Requests - {users.length}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden">
        <ScrollArea className="h-full">
          {!users || users.length === 0 ? (
            <p>No pending friend requests</p>
          ) : (
            <ul className="space-y-4">
              {users.map((user) => (
                <li key={user.id} className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-semibold">
                      {user.user_metadata.username}
                    </span>
                    <span className="italic">{user.user_metadata.email}</span>
                  </div>

                  <Button
                    size="sm"
                    onClick={() => handleAcceptReq(currentUserId, user.id)}
                  >
                    Accept
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
