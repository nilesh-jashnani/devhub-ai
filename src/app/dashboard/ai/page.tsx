import { isUser } from "@/lib/auth-helper";
import { db } from "@/prisma/db";
import { AIMentor } from "@/components/ai/ai-mentor";

function SparklesIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="size-5"
            aria-hidden="true"
        >
            <path d="M12 3 13.4 7.6 18 9l-4.6 1.4L12 15l-1.4-4.6L6 9l4.6-1.4z" />
            <path d="m18.5 15 .7 2.3 2.3.7-2.3.7-.7 2.3-.7-2.3-2.3-.7 2.3-.7z" />
        </svg>
    );
}

function NoteIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="size-4"
            aria-hidden="true"
        >
            <path d="M6 3.75h9l3 3v13.5H6z" />
            <path d="M15 3.75v3h3" />
            <path d="M9 11h6" />
            <path d="M9 15h4" />
        </svg>
    );
}

function HistoryIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="size-4"
            aria-hidden="true"
        >
            <path d="M3 12a9 9 0 1 0 3-6.7" />
            <path d="M3 4v5h5" />
            <path d="M12 7v5l3 2" />
        </svg>
    );
}

export default async function AIPage() {
    const session = await isUser();

    const [notes, generations] =
        await Promise.all([
            db.orm.public.Note
                .where({
                    authorId:
                        session.user.id,
                })
                .orderBy((note) =>
                    note.updatedAt.desc(),
                )
                .all(),

            db.orm.public.AiGeneration
                .where({
                    userId:
                        session.user.id,
                })
                .orderBy((generation) =>
                    generation.createdAt.desc(),
                )
                .limit(20)
                .all(),
        ]);

    const noteOptions = notes.map(
        (note) => ({
            id: note.id,
            title: note.title,
        }),
    );

    const generationHistory =
        generations.map(
            (generation) => ({
                id: generation.id,
                type: generation.type,
                response:
                    generation.response,
                noteId:
                    generation.noteId,
                createdAt: Number(
                    generation.createdAt
                        .epochMilliseconds,
                ),
            }),
        );

    return (
        <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
            <section className="relative overflow-hidden rounded-3xl border bg-card px-6 py-7 shadow-sm sm:px-8 sm:py-9">
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full bg-primary/10 blur-3xl"
                />

                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-32 right-52 size-64 rounded-full bg-primary/5 blur-3xl"
                />

                <div className="relative flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-3xl">
                        <div className="mb-3 inline-flex items-center gap-2 rounded-full border bg-background/80 px-3 py-1.5 text-xs font-semibold text-primary shadow-sm">
                            <SparklesIcon />
                            AI-powered learning
                        </div>

                        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                            AI Mentor
                        </h1>

                        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
                            Transform your own
                            developer notes into
                            clearer explanations,
                            interview questions,
                            flashcards, and
                            practical learning
                            material.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 sm:w-auto">
                        <div className="min-w-36 rounded-2xl border bg-background/80 p-4 shadow-sm backdrop-blur">
                            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                                <NoteIcon />
                                Knowledge base
                            </div>

                            <div className="mt-2 text-2xl font-bold tracking-tight">
                                {notes.length}
                            </div>

                            <p className="mt-0.5 text-xs text-muted-foreground">
                                {notes.length === 1
                                    ? "note available"
                                    : "notes available"}
                            </p>
                        </div>

                        <div className="min-w-36 rounded-2xl border bg-background/80 p-4 shadow-sm backdrop-blur">
                            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                                <HistoryIcon />
                                Recent activity
                            </div>

                            <div className="mt-2 text-2xl font-bold tracking-tight">
                                {
                                    generations.length
                                }
                            </div>

                            <p className="mt-0.5 text-xs text-muted-foreground">
                                {generations.length ===
                                    1
                                    ? "generation loaded"
                                    : "generations loaded"}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section
                className="mt-8"
                aria-labelledby="ai-workspace-heading"
            >
                <div className="mb-5">
                    <h2
                        id="ai-workspace-heading"
                        className="text-lg font-semibold tracking-tight"
                    >
                        Learning workspace
                    </h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Choose a note and
                        decide how you want
                        the AI mentor to help
                        you learn it.
                    </p>
                </div>

                <AIMentor
                    notes={noteOptions}
                    history={
                        generationHistory
                    }
                />
            </section>
        </main>
    );
}