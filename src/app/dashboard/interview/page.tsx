import { isUser } from "@/lib/auth-helper";
import { db } from "@/prisma/db";
import { InterviewPrep } from "@/components/interview/interview-prep";

function InterviewIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="size-5"
            aria-hidden="true"
        >
            <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H11l-5 4v-4.18A2.5 2.5 0 0 1 4 13.5z" />
            <path d="M9 8h6" />
            <path d="M9 12h4" />
        </svg>
    );
}

export default async function InterviewPage() {
    const session = await isUser();

    const userId = session.user.id;

    const userNotes = await db.orm.public.Note
        .where({
            authorId: userId,
        })
        .orderBy((note) =>
            note.createdAt.desc(),
        )
        .all();

    const noteOptions = userNotes.map(
        (note) => ({
            id: note.id,
            title: note.title,
        }),
    );

    return (
        <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
            <section className="relative overflow-hidden rounded-3xl border bg-card px-6 py-7 shadow-sm sm:px-8 sm:py-9">
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-primary/10 blur-3xl"
                />

                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-24 right-48 size-56 rounded-full bg-primary/5 blur-3xl"
                />

                <div className="relative max-w-3xl">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-background/80 px-3 py-1.5 text-xs font-semibold text-muted-foreground shadow-sm">
                        <InterviewIcon />
                        AI interview practice
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                        Prepare for technical
                        interviews with your own
                        knowledge.
                    </h1>

                    <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                        Turn your developer notes into
                        focused interview questions,
                        reveal answers when you&apos;re
                        ready, and work through concepts
                        one question at a time.
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2">
                        <span className="rounded-full border bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground">
                            {noteOptions.length}{" "}
                            {noteOptions.length === 1
                                ? "note"
                                : "notes"}{" "}
                            available
                        </span>

                        <span className="rounded-full border bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground">
                            Easy · Medium · Hard
                        </span>

                        <span className="rounded-full border bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground">
                            AI generated
                        </span>
                    </div>
                </div>
            </section>

            <section className="mt-8">
                <InterviewPrep
                    notes={noteOptions}
                />
            </section>
        </div>
    );
}