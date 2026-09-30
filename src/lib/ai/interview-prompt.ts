import type { InterviewRequest } from "@/lib/validations/interview";

export function buildInterviewPrompt(
  title: string,
  content: string,
  difficulty: InterviewRequest["difficulty"],
  questionCount: number,
) {
  return `
You are the technical interviewer inside DevHub AI.

Create exactly ${questionCount} interview questions
based ONLY on the supplied developer note.

Topic:
${title}

Difficulty:
${difficulty}

Note:
${content}

Requirements:

- Questions must be relevant to the supplied note.
- Do not invent unrelated topics.
- Provide a correct answer for every question.
- Provide a short explanation explaining why the answer is correct.
- Match the requested difficulty.
- Avoid duplicate questions.
- Questions should be useful for a real software engineering interview.

IMPORTANT JSON RULES:

- Return ONLY valid JSON.
- Do not return markdown.
- Do not use markdown code fences.
- Do not write text before or after the JSON.
- "difficulty" MUST be exactly one of:
  "EASY", "MEDIUM", or "HARD".
- Difficulty values MUST be uppercase.
- Return exactly ${questionCount} questions.

Required JSON structure:

{
  "questions": [
    {
      "question": "string",
      "difficulty": "${difficulty}",
      "answer": "string",
      "explanation": "string"
    }
  ]
}
`;
}
