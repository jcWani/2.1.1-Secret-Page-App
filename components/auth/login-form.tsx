"use client";

import * as z from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { LoginSchema } from "@/types/login-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { useAction } from "next-safe-action/hooks";
import { emailSignIn } from "@/server/actions/email-signin";
import { FormError } from "./form-error";
import { AuthCard } from "./auth-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const LoginForm = () => {
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { execute, status } = useAction(emailSignIn, {
    onSuccess(data) {
      if (data.data?.error) setError(data.data?.error);
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    execute(values);
  };

  return (
    <AuthCard
      cardTitle="Welcome back!"
      cardDescription="Login to see the secret"
      backButtonHref="/auth/sign-up"
      backButtonLabel="Create a new account"
    >
      <div className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={status === "executing"}
                        placeholder="dummy@gmail.com"
                        type="email"
                        autoComplete="email"
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={status === "executing"}
                        placeholder="**********"
                        type="password"
                        autoComplete="current-password"
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />

              {status !== "executing" && <FormError message={error} />}
            </div>
            <Button
              type="submit"
              className={cn(
                "w-full my-4",
                status === "executing" ? "animate-pulse" : ""
              )}
            >
              Sign in
            </Button>
          </form>
        </Form>
      </div>
    </AuthCard>
  );
};
