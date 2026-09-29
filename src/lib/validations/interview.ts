import { z } from "zod";

export const interviewDifficultySchema = z.preprocess(
  (value) => {
    if (typeof value === "string") {
      return value.trim().toUpperCase();
    }

    return value;
  },
  z.enum(["EASY", "MEDIUM", "HARD"]),
);

export const interviewRequestSchema = z.object({
  noteId: z.string().min(1),

  difficulty: interviewDifficultySchema,

  questionCount: z.number().int().min(1).max(20),
});

export const interviewQuestionSchema = z.object({
  question: z.string().min(1),

  difficulty: interviewDifficultySchema,

  answer: z.string().min(1),

  explanation: z.string().min(1),
});

export const interviewResponseSchema = z.object({
  questions: z.array(interviewQuestionSchema).min(1).max(20),
});

export type InterviewRequest = z.infer<typeof interviewRequestSchema>;

export type InterviewResponse = z.infer<typeof interviewResponseSchema>;
