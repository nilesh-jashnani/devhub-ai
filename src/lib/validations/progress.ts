import { z } from "zod";

export const progressSchema = z.object({
  noteId: z.string().trim().min(1, "Note ID is required."),

  completed: z.boolean(),

  score: z
    .number()
    .min(0, "Score cannot be below 0.")
    .max(100, "Score cannot exceed 100.")
    .nullable()
    .optional(),
});

export type ProgressInput = z.infer<typeof progressSchema>;
