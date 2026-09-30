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

export const updateNoteSchema = noteSchema.extend({
  noteId: z.string().trim().min(1, "Note ID is required."),
});

export const noteIdSchema = z.object({
  noteId: z.string().trim().min(1, "Note ID is required."),
});

export type UpdateNoteInput = z.infer<typeof updateNoteSchema>;