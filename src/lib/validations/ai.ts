import { z } from "zod";

export const aiRequestSchema = z.object({
  noteId: z.string().min(1),
  type: z.enum([
    "EXPLAIN",
    "SIMPLE_EXPLANATION",
    "SUMMARY",
    "INTERVIEW_QUESTIONS",
    "FLASHCARDS",
    "CODE_EXAMPLE",
    "STUDY_PLAN",
    "KNOWLEDGE_GAP",
  ]),
});

export type AIRequest = z.infer<typeof aiRequestSchema>;
