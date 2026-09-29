import { isUser } from "@/lib/auth-helper";
import { db } from "@/prisma/db";
import { AIMentor } from "@/components/ai/ai-mentor";

export default async function AIPage() {
    const session = await isUser();

    const [notes, generations] = await Promise.all([
        db.orm.public.Note
            .where({ authorId: session.user.id })
            .orderBy((note) => note.updatedAt.desc())
            .all(),

        db.orm.public.AiGeneration
            .where({ userId: session.user.id })
            .orderBy((generation) => generation.createdAt.desc())
            .limit(20)
            .all(),
    ]);

    const noteOptions = notes.map((note) => ({
        id: note.id,
        title: note.title,
    }));

    const generationHistory = generations.map((generation) => ({
        id: generation.id,
        type: generation.type,
        response: generation.response,
        noteId: generation.noteId,
        createdAt: Number(generation.createdAt.epochMilliseconds),
    }));

    return (
        <div className="mx-auto max-w-6xl px-6 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">
                    AI Mentor
                </h1>

                <p className="mt-2 text-muted-foreground">
                    Turn your developer notes into explanations, interview
                    questions, flashcards, and practical learning material.
                </p>
            </div>

            <AIMentor notes={noteOptions} history={generationHistory} />
        </div>
    );
}