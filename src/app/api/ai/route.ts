import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { db } from "@/prisma/db";
import { getAIProvider } from "@/lib/ai";
import { buildNotePrompt } from "@/lib/ai/prompts";
import { aiRequestSchema } from "@/lib/validations/ai";

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    const body = await request.json();

    const result = aiRequestSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: "Invalid AI request.",
        },
        {
          status: 400,
        },
      );
    }

    const { noteId, type } = result.data;

    const note = await db.orm.public.Note.first({
      id: noteId,
      authorId: session.user.id,
    });

    if (!note) {
      return NextResponse.json(
        {
          error: "Note not found.",
        },
        {
          status: 404,
        },
      );
    }

    const prompt = buildNotePrompt(type, note.title, note.content);

    const provider = getAIProvider();

    const response = await provider.generateText(prompt);

    if (!response) {
      return NextResponse.json(
        {
          error: "AI returned an empty response.",
        },
        {
          status: 502,
        },
      );
    }

    await db.orm.public.AiGeneration.create({
      type,
      prompt,
      response,
      userId: session.user.id,
      noteId: note.id,
    });

    return NextResponse.json({
      response,
    });
  } catch (error) {
    console.error("AI generation failed:", error);

    return NextResponse.json(
      {
        error: "AI generation failed.",
      },
      {
        status: 500,
      },
    );
  }
}
