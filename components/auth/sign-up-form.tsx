"use client";

import * as z from "zod";

import { useState } from "react";
import { redirect } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { emailSignUp } from "@/server/actions/email-signup";
import { useForm } from "react-hook-form";
import { RegisterSchema } from "@/types/register-schema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthCard } from "@/components/auth/auth-card";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

export default function SignUpForm() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const { execute, status } = useAction(emailSignUp, {
    onSuccess(data) {
      if (data.data?.success) {
        setSuccess(data.data?.success);
        form.reset({
          username: "",
          email: "",
          password: "",
        });
      }
      if (data.data?.error) setError(data.data?.error);
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    execute(values);
  };

  return (
    <AuthCard
      cardTitle="Create an account"
      cardDescription="Sign up now and get started!"
      backButtonHref="/"
      backButtonLabel="Already have an account?"
    >
      <div className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="John Doe"
                        type="text"
                        disabled={status === "executing"}
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
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

              {status !== "executing" && <FormSuccess message={success} />}
              {status !== "executing" && <FormError message={error} />}
            </div>
            <Button
              type="submit"
              className={cn(
                "w-full my-4",
                status === "executing" ? "animate-pulse" : ""
              )}
            >
              Sign Up
            </Button>
          </form>
        </Form>
      </div>
    </AuthCard>
  );
}
