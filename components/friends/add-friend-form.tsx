"use client";

import type React from "react";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FriendSchema } from "@/types/friend-schema";
import { sendFriendRequest } from "@/server/actions/send-friend-request";
import { useAction } from "next-safe-action/hooks";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Loader2 } from "lucide-react";

export default function AddFriendForm({ userId }: { userId: string }) {
  const form = useForm<z.infer<typeof FriendSchema>>({
    resolver: zodResolver(FriendSchema),
    defaultValues: {
      id: "",
    },
  });

  const { execute, status } = useAction(sendFriendRequest, {
    onSuccess(data) {
      if (data.data?.success) {
        setTimeout(() => toast.success(data?.data?.success), 0);
        form.reset({ id: "" });
      }

      if (data.data?.error) setTimeout(() => toast.error(data.data?.error), 0);
    },
  });

  const onSubmit = (values: z.infer<typeof FriendSchema>) => {
    if (userId === values.id)
      setTimeout(
        () => toast.error("Cannot send a friend request to yourself!"),
        0
      );
    else execute(values);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add a Friend</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div>
              <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User ID</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={status === "executing"}
                        placeholder="00a0a00a-0aa0-0000-a0a0-aaa0a0000a00"
                        type="text"
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="place-self-end mt-8">
              <Button type="submit" disabled={status === "executing"}>
                {status === "executing" && <Loader2 className="animate-spin" />}
                Send Request
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
