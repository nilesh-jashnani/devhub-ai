import { Temporal } from "temporal-polyfill";
import { auth } from "@/auth";
import { db } from "@/prisma/db";
import { progressSchema } from "@/lib/validations/progress";

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return Response.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    const body = await request.json();

    const parsed = progressSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        {
          error: "Invalid progress data.",
        },
        {
          status: 400,
        },
      );
    }

    const { noteId, completed, score } = parsed.data;

    const note = await db.orm.public.Note.first({
      id: noteId,
      authorId: session.user.id,
    });

    if (!note) {
      return Response.json(
        {
          error: "Note not found.",
        },
        {
          status: 404,
        },
      );
    }

    const existingProgress = await db.orm.public.Progress.first({
      userId: session.user.id,
      noteId,
    });

    const now = Temporal.Now.instant();

    if (existingProgress) {
      await db.orm.public.Progress.where({
        id: existingProgress.id,

        userId: session.user.id,
      }).update({
        completed,
        score: score ?? null,
        lastViewedAt: now,
      });
    } else {
      await db.orm.public.Progress.create({
        userId: session.user.id,
        noteId,
        completed,
        score: score ?? null,
        lastViewedAt: now,
      });
    }

    return Response.json({
      success: true,

      progress: {
        completed,
        score: score ?? null,
        lastViewedAt: now.toString(),
      },
    });
  } catch (error) {
    console.error("Progress update failed:", error);

    return Response.json(
      {
        error: "Unable to save progress.",
      },
      {
        status: 500,
      },
    );
  }
}
