"use client";

import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { MessageSchema } from "@/types/message-schema";
import { useAction } from "next-safe-action/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { upsertMessage } from "@/server/actions/upsert-message";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface SecretPageProps {
  mode: "create" | "edit";
  initialMessage: string;
  userId: string;
}

export default function MsgForm({
  mode,
  initialMessage = "",
  userId,
}: SecretPageProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof MessageSchema>>({
    resolver: zodResolver(MessageSchema),
    defaultValues: {
      message: initialMessage,
    },
  });

  useEffect(() => {
    form.reset({ id: userId, message: initialMessage });
  }, [initialMessage, userId, form]);

  const { execute, status } = useAction(upsertMessage, {
    onSuccess(data) {
      if (data.data?.error) setTimeout(() => toast.error(data.data?.error), 0);
      if (data.data?.success) {
        setTimeout(() => toast.success(data?.data?.success), 0);
        setIsSubmitted(true);

        router.push("/secret-page-1");
      }
    },
  });

  function onSubmit(values: z.infer<typeof MessageSchema>) {
    execute({ ...values, id: userId });
  }

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold mb-4">Welcome to Secret Page 2</h1>
      </div>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>
            {mode === "edit" ? "Edit Secret Message" : "Add New Secret Message"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your message</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        id="description"
                        placeholder="Typed your message here..."
                        className={cn(
                          "min-h-[100px]",
                          isSubmitted ? "opacity-50" : ""
                        )}
                        disabled={isSubmitted}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="place-self-end">
                <Button
                  disabled={isSubmitted || status === "executing"}
                  type="submit"
                >
                  {isSubmitted
                    ? "Submitted!"
                    : mode === "edit"
                    ? "Save Changes"
                    : "Create Message"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
