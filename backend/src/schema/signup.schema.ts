import { HttpResponse } from "@/constants/response-message.constant";
import { z } from "zod";
export const signupSchema = z
  .object({
    email: z.string().email(HttpResponse.INVALID_EMAIL),
    name: z
      .string()
      .min(3, "Name must be at least 3 characters long")
      .max(20, "Name must be at most 20 characters long")
      .regex(/^[A-Za-z]+(?: [A-Za-z]+)?$/, "Name must contain only alphabets and a single space between words"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")

      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one digit")
      .regex(
        /[^a-zA-Z0-9]/,
        "Password must contain at least one special character"
      ),
  })
  .strict();

