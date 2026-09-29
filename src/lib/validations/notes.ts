import { z } from "zod";

export const noteSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required.")
    .max(200, "Title must be 200 characters or less."),

  content: z
    .string()
    .trim()
    .min(1, "Content is required.")
    .max(100000, "Content is too long."),
});

export type NoteInput = z.infer<typeof noteSchema>;
