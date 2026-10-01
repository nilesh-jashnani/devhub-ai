import Link from "next/link";
import { notFound } from "next/navigation";

import { db } from "@/prisma/db";
import { deleteNote } from "@/actions/notes";
import { isUser } from "@/lib/auth-helper";
import { BookmarkButton } from "@/components/notes/bookmark-button";
import { ProgressControls } from "@/components/progress/progress-controls";

type NotePageProps = {
    params: Promise<{
        slug: string;
    }>;
};

function BackIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="size-4"
            aria-hidden="true"
        >
            <path d="M19 12H5" />
            <path d="m9 16-4-4 4-4" />
        </svg>
    );
}

function EditIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="size-4"
            aria-hidden="true"
        >
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4z" />
        </svg>
    );
}

function TrashIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="size-4"
            aria-hidden="true"
        >
            <path d="M4 7h16" />
            <path d="M9 7V4h6v3" />
            <path d="M7 7l1 13h8l1-13" />
            <path d="M10 11v5" />
            <path d="M14 11v5" />
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

export default async function NotePage({
    params,
}: NotePageProps) {
    const session = await isUser();

    const { slug } = await params;

    const note =
        await db.orm.public.Note.first({
            slug,
            authorId:
                session.user.id,
        });

    if (!note) {
        notFound();
    }

    const [bookmark, progress] =
        await Promise.all([
            db.orm.public.Bookmark.first({
                userId:
                    session.user.id,
                noteId: note.id,
            }),

            db.orm.public.Progress.first({
                userId:
                    session.user.id,
                noteId: note.id,
            }),
        ]);

    const createdDate = new Date(
        Number(
            note.createdAt
                .epochMilliseconds,
        ),
    ).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
            <div className="mb-6">
                <Link
                    href="/dashboard/notes"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
                >
                    <BackIcon />
                    Back to notes
                </Link>
            </div>

            <article className="overflow-hidden rounded-3xl border bg-card shadow-sm">
                <header className="border-b px-6 py-7 sm:px-8 sm:py-9">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                        <div className="max-w-3xl">
                            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
                                <NoteIcon />
                                Developer note
                            </div>

                            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                                {note.title}
                            </h1>

                            <p className="mt-3 text-sm text-muted-foreground">
                                Created{" "}
                                {createdDate}
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            <BookmarkButton
                                noteId={
                                    note.id
                                }
                                isBookmarked={
                                    !!bookmark
                                }
                            />

                            <Link
                                href={`/dashboard/notes/${note.slug}/edit`}
                                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border bg-background px-4 text-sm font-semibold transition-colors hover:bg-muted"
                            >
                                <EditIcon />
                                Edit
                            </Link>

                            <form
                                action={
                                    deleteNote
                                }
                            >
                                <input
                                    type="hidden"
                                    name="noteId"
                                    value={
                                        note.id
                                    }
                                />

                                <button
                                    type="submit"
                                    className="inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-xl border border-destructive/20 bg-destructive/5 px-4 text-sm font-semibold text-destructive transition-colors hover:bg-destructive/10"
                                >
                                    <TrashIcon />
                                    Delete
                                </button>
                            </form>
                        </div>
                    </div>
                </header>

                <div className="px-6 py-8 sm:px-8 sm:py-10">
                    <div className="whitespace-pre-wrap text-[15px] leading-8 text-foreground/90 sm:text-base">
                        {note.content}
                    </div>
                </div>
            </article>

            <section className="mt-6">
                <div className="mb-4">
                    <h2 className="text-lg font-semibold tracking-tight">
                        Learning status
                    </h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Track your confidence
                        and whether you&apos;ve
                        completed this topic.
                    </p>
                </div>

                <ProgressControls
                    noteId={note.id}
                    initialCompleted={
                        progress?.completed ??
                        false
                    }
                    initialScore={
                        progress?.score ??
                        null
                    }
                />
            </section>
        </main>
    );
}