import { auth } from "@/auth";
import { db } from "@/prisma/db";
import { getAIProvider } from "@/lib/ai";
import { buildNotePrompt } from "@/lib/ai/prompts";
import { aiRequestSchema } from "@/lib/validations/ai";

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return new Response("Unauthorized", {
        status: 401,
      });
    }

    const body = await request.json();

    const result = aiRequestSchema.safeParse(body);

    if (!result.success) {
      return new Response("Invalid AI request.", {
        status: 400,
      });
    }

    const { noteId, type } = result.data;

    const note = await db.orm.public.Note.first({
      id: noteId,
      authorId: session.user.id,
    });

    if (!note) {
      return new Response("Note not found.", {
        status: 404,
      });
    }

    const prompt = buildNotePrompt(type, note.title, note.content);

    const provider = getAIProvider();

    const chunks = await provider.streamText(prompt);

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        let accumulatedResponse = "";

        try {
          for await (const chunk of chunks) {
            accumulatedResponse += chunk;

            controller.enqueue(encoder.encode(chunk));
          }

          if (accumulatedResponse.trim()) {
            await db.orm.public.AiGeneration.create({
              type,
              prompt,
              response: accumulatedResponse,
              userId: session.user.id,
              noteId: note.id,
            });
          }

          controller.close();
        } catch (error) {
          console.error("AI provider streaming error:", error);

          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (error) {
    console.error("AI stream route failed:", error);

    return new Response("AI streaming failed.", {
      status: 500,
    });
  }
}
