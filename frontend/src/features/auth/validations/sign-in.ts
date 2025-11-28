import { z } from "zod";

export const SignInSchema = z.object({
  email: z.email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type SignInFormValues = z.infer<typeof SignInSchema>;
