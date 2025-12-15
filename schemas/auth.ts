import { z } from "zod";

export const authSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.email(),
  password: z.string().min(6).max(20),
});

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6).max(20),
});