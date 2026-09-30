import { auth } from "@/auth";
import { db } from "@/prisma/db";

import { getAIProvider } from "@/lib/ai";
import { buildInterviewPrompt } from "@/lib/ai/interview-prompt";

import {
  interviewRequestSchema,
  interviewResponseSchema,
} from "@/lib/validations/interview";

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const parsed = interviewRequestSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        {
          error: "Invalid interview request.",
        },
        { status: 400 },
      );
    }

    const { noteId, difficulty, questionCount } = parsed.data;

    const note = await db.orm.public.Note.first({
      id: noteId,
      authorId: session.user.id,
    });

    if (!note) {
      return Response.json(
        {
          error: "Note not found.",
        },
        { status: 404 },
      );
    }

    const prompt = buildInterviewPrompt(
      note.title,
      note.content,
      difficulty,
      questionCount,
    );

    const provider = getAIProvider();

    const rawResponse = await provider.generateText(prompt);

    if (!rawResponse.trim()) {
      return Response.json(
        {
          error: "AI returned an empty response.",
        },
        { status: 502 },
      );
    }

    let json: unknown;

    try {
      json = JSON.parse(rawResponse);
    } catch {
      console.error("Raw interview response:", rawResponse);

      return Response.json(
        {
          error: "AI returned invalid JSON.",
        },
        {
          status: 502,
        },
      );
    }

    console.log("Interview AI JSON:", JSON.stringify(json, null, 2));

    const validated = interviewResponseSchema.safeParse(json);

    if (!validated.success) {
      console.error("Invalid interview AI response:", validated.error);

    return Response.json(
      {
        error: "AI returned an invalid interview structure.",
      },
      {
        status: 502,
      },
    );
    }

    await db.orm.public.AiGeneration.create({
      type: "INTERVIEW_QUESTIONS",
      prompt,
      response: JSON.stringify(validated.data),
      userId: session.user.id,
      noteId: note.id,
    });

    return Response.json(validated.data);
  } catch (error) {
    console.error("Interview generation failed:", error);

    return Response.json(
      {
        error: "Interview generation failed.",
      },
      { status: 500 },
    );
  }
}
