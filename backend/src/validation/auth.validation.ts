import { z } from "zod";

export const nameSchema = z.string().trim().min(1).max(255);
export const emailSchema = z
  .string()
  .trim()
  .email("Invalid email address")
  .min(1)
  .max(255);
export const passwordSchema = z.string().trim().min(1);

export const registerSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
