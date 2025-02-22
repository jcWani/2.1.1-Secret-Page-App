import * as z from "zod";

export const MessageSchema = z.object({
  id: z.string(),
  message: z
    .string()
    .min(10, { message: "Please add atleast 10 characters for your message" }),
});
