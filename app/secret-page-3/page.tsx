"use server";

import AddFriendForm from "@/components/friends/add-friend-form";
import FriendRequests from "@/components/friends/friend-request";
import FriendsList from "@/components/friends/friends-list";
import UserIdDisplay from "@/components/friends/user-id-display";
import AppLayout from "@/components/ui/app-layout";
import getUser from "@/server/actions/get-user";

import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/server/actions/get-current-user";
import { getFriendRequest } from "@/server/actions/get-friend-request";
import { getFriends } from "@/server/actions/get-friends";
import { User } from "@supabase/supabase-js";

export default async function SecretPage3() {
  // Get the logged in user
  const user = await getCurrentUser();
  if (!user) redirect("/auth/login");

  // FRIEND REQUEST
  // Get Friend request
  let data = await getFriendRequest(user.id);
  if (!data || data.length === 0) data = [];

  // Get users that sent a friend request
  const users = (
    await Promise.all(data.map((user) => getUser(user.user_id)))
  ).filter((user): user is User => user !== null);

  // FRIENDS LIST
  // Get friends
  const friendsObj = await getFriends(user.id);

  // Filter friend Ids excluding the logged in user
  const friendIds = friendsObj.map((friend) =>
    friend.user_id === user.id ? friend.friend_id : friend.user_id
  );

  // Get user details for each friend
  const friends = (
    await Promise.all(friendIds.map((id) => getUser(id)))
  ).filter((user): user is User => user !== null);

  return (
    <AppLayout>
      <div className="container mx-auto p-4 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold mb-6">Secret Page 3</h1>
          <UserIdDisplay id={user.id} />
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <AddFriendForm userId={user.id} />
          <FriendRequests currentUserId={user.id} users={users} />
        </div>
        <Suspense fallback={<div>Loading friends...</div>}>
          <FriendsList friends={friends} user={user} />
        </Suspense>
      </div>
    </AppLayout>
  );
}
