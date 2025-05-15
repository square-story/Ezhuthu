import { z } from "zod";

export const snippetSchema = z.object({
    title: z.string().min(3, "Name must be at least 3 characters long").max(20, "Name must be at most 20 characters long"),
    description: z.string().optional(),
    code: z.string().min(1),
    language: z.string().min(1),
    tags: z.array(z.string()).optional(),
    author: z.string().min(1)
})