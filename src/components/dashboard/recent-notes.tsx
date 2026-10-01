import Link from "next/link";

import { db } from "@/prisma/db";

type RecentNotesProps = {
    userId: string;
};

function NoteIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="size-5"
            aria-hidden="true"
        >
            <path d="M6 3.75h9l3 3v13.5H6z" />
            <path d="M15 3.75v3h3" />
            <path d="M9 11h6" />
            <path d="M9 15h4" />
        </svg>
    );
}

function ArrowIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="size-4 transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
        >
            <path d="M5 12h14" />
            <path d="m15 8 4 4-4 4" />
        </svg>
    );
}

function PlusIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="size-4"
            aria-hidden="true"
        >
            <path d="M12 5v14" />
            <path d="M5 12h14" />
        </svg>
    );
}

export async function RecentNotes({
    userId,
}: RecentNotesProps) {
    const recentNotes =
        await db.orm.public.Note
            .where({
                authorId: userId,
            })
            .orderBy((note) =>
                note.createdAt.desc(),
            )
            .limit(5)
            .all();

    if (recentNotes.length === 0) {
        return (
            <div className="rounded-2xl border border-dashed bg-card px-6 py-12 text-center">
                <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <NoteIcon />
                </div>

                <h3 className="mt-4 font-semibold">
                    Your knowledge base is
                    empty
                </h3>

                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
                    Create your first note to
                    start building your
                    developer knowledge base.
                </p>

                <a
                    href="/dashboard/notes/new"
                    className="mt-5 inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
                >
                    <PlusIcon />
                    Create your first note
                </a>
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
            <div className="divide-y">
                {recentNotes.map(
                    (note, index) => (
                        <Link
                            key={note.id}
                            href={`/dashboard/notes/${note.slug}`}
                            className="group flex items-start gap-4 p-5 transition-colors hover:bg-muted/50 sm:p-6"
                        >
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border bg-background text-muted-foreground transition-colors group-hover:border-primary/20 group-hover:bg-primary/10 group-hover:text-primary">
                                <NoteIcon />
                            </div>

                            <div className="min-w-0 flex-1">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="min-w-0">
                                        <h3 className="truncate font-semibold transition-colors group-hover:text-primary">
                                            {
                                                note.title
                                            }
                                        </h3>

                                        <p className="mt-1.5 line-clamp-2 max-w-3xl text-sm leading-6 text-muted-foreground">
                                            {
                                                note.content
                                            }
                                        </p>
                                    </div>

                                    <div className="mt-1 hidden shrink-0 items-center gap-2 sm:flex">
                                        <span className="text-xs text-muted-foreground">
                                            #
                                            {index +
                                                1}
                                        </span>

                                        <span className="text-muted-foreground transition-colors group-hover:text-primary">
                                            <ArrowIcon />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ),
                )}
            </div>

            <div className="border-t bg-muted/20 px-5 py-3 sm:px-6">
                <Link
                    href="/dashboard/notes"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
                >
                    Browse your knowledge base
                    <ArrowIcon />
                </Link>
            </div>
        </div>
    );
}