import * as z from "zod";

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Password must be at leat 8 character long",
  }),
  username: z
    .string()
    .min(4, { message: "Please add a name with at least 4 characters" }),
});
