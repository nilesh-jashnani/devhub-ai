import type { AIRequest } from "@/lib/validations/ai";

export function buildNotePrompt(
  type: AIRequest["type"],
  title: string,
  content: string,
) {
  const instructions = {
    EXPLAIN: `
Explain this developer note clearly.
Cover the core concept, how it works, and important practical details.
Use examples where useful.
`,

    SIMPLE_EXPLANATION: `
Explain this developer note in very simple language.
Assume the reader understands basic programming but is unfamiliar
with this particular concept.
Use a simple analogy if useful.
`,

    SUMMARY: `
Summarize this note.
Extract the most important concepts and practical takeaways.
Keep the summary concise.
`,

    INTERVIEW_QUESTIONS: `
Create interview questions based on this note.
Include a mixture of basic, intermediate, and advanced questions.
Provide answers and short explanations.
`,

    FLASHCARDS: `
Create useful study flashcards from this note.
Format each card as:
Question:
Answer:
`,

    CODE_EXAMPLE: `
Explain the concept using practical code examples.
Prefer simple, production-relevant examples.
Explain the important parts of the code.
`,

    STUDY_PLAN: `
Create a practical study plan based on this topic.
Break it into logical learning steps and practice tasks.
`,

    KNOWLEDGE_GAP: `
Analyze this note and identify concepts a developer should understand
before considering this topic fully understood.
List potential knowledge gaps and explain why they matter.
`,
  };

  return `
You are the AI Mentor inside DevHub AI.

${instructions[type]}

NOTE TITLE:
${title}

NOTE CONTENT:
${content}

Important:
- Stay focused on the supplied note.
- Do not invent facts about the user's experience.
- Prefer practical explanations.
`;
}
