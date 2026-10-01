import Link from "next/link";

import { isUser } from "@/lib/auth-helper";
import { db } from "@/prisma/db";

function BookmarkIcon({
    className = "size-5",
}: {
    className?: string;
}) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className={className}
            aria-hidden="true"
        >
            <path d="M6 4.75A1.75 1.75 0 0 1 7.75 3h8.5A1.75 1.75 0 0 1 18 4.75V21l-6-4-6 4z" />
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

export default async function BookmarksPage() {
    const session = await isUser();

    const bookmarks =
        await db.orm.public.Bookmark
            .where({
                userId:
                    session.user.id,
            })
            .orderBy((bookmark) =>
                bookmark.createdAt.desc(),
            )
            .all();

    const notes = await Promise.all(
        bookmarks.map(
            async (bookmark) => {
                const note =
                    await db.orm.public.Note.first(
                        {
                            id: bookmark.noteId,
                            authorId:
                                session.user.id,
                        },
                    );

                if (!note) {
                    return null;
                }

                return {
                    note,
                    bookmarkedAt:
                        bookmark.createdAt,
                };
            },
        ),
    );

    const savedNotes = notes.filter(
        (
            item,
        ): item is NonNullable<
            typeof item
        > => item !== null,
    );

    return (
        <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
            <header className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-primary">
                        <BookmarkIcon />
                        Saved knowledge
                    </div>

                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Bookmarks
                    </h1>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                        Keep important
                        developer concepts
                        close and return to
                        them whenever you
                        want to review.
                    </p>
                </div>

                <Link
                    href="/dashboard/notes"
                    className="inline-flex h-10 shrink-0 items-center justify-center rounded-xl border bg-background px-4 text-sm font-semibold transition-colors hover:bg-muted"
                >
                    Browse notes
                </Link>
            </header>

            <section className="mt-8 rounded-2xl border bg-card p-5 shadow-sm sm:p-6">
                <div className="flex items-center gap-4">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <BookmarkIcon />
                    </div>

                    <div>
                        <p className="text-2xl font-bold tracking-tight">
                            {
                                savedNotes.length
                            }
                        </p>

                        <p className="text-sm text-muted-foreground">
                            {savedNotes.length ===
                                1
                                ? "Saved note"
                                : "Saved notes"}
                        </p>
                    </div>
                </div>
            </section>

            {savedNotes.length === 0 ? (
                <section className="mt-6 rounded-2xl border border-dashed bg-card px-6 py-14 text-center">
                    <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <BookmarkIcon className="size-6" />
                    </div>

                    <h2 className="mt-5 text-lg font-semibold tracking-tight">
                        No bookmarks yet
                    </h2>

                    <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                        Save useful notes
                        while learning and
                        they&apos;ll appear
                        here for quick access
                        later.
                    </p>

                    <Link
                        href="/dashboard/notes"
                        className="mt-6 inline-flex h-10 items-center justify-center rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
                    >
                        Explore your notes
                    </Link>
                </section>
            ) : (
                <section className="mt-8">
                    <div className="mb-4">
                        <h2 className="font-semibold">
                            Saved for later
                        </h2>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Your bookmarked
                            developer notes,
                            newest saves first.
                        </p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {savedNotes.map(
                            ({
                                note,
                                bookmarkedAt,
                            }) => {
                                const savedDate =
                                    new Date(
                                        Number(
                                            bookmarkedAt
                                                .epochMilliseconds,
                                        ),
                                    ).toLocaleDateString(
                                        undefined,
                                        {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        },
                                    );

                                return (
                                    <Link
                                        key={
                                            note.id
                                        }
                                        href={`/dashboard/notes/${note.slug}`}
                                        className="group flex min-h-56 flex-col rounded-2xl border bg-card p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md sm:p-6"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                                <NoteIcon />
                                            </div>

                                            <div className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary">
                                                <ArrowIcon />
                                            </div>
                                        </div>

                                        <h3 className="mt-5 line-clamp-2 text-lg font-semibold tracking-tight transition-colors group-hover:text-primary">
                                            {
                                                note.title
                                            }
                                        </h3>

                                        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-6 text-muted-foreground">
                                            {
                                                note.content
                                            }
                                        </p>

                                        <div className="mt-5 flex items-center justify-between gap-3 border-t pt-4">
                                            <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                                                <BookmarkIcon className="size-3.5" />
                                                Saved{" "}
                                                {
                                                    savedDate
                                                }
                                            </div>

                                            <span className="text-xs font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                                                Open
                                            </span>
                                        </div>
                                    </Link>
                                );
                            },
                        )}
                    </div>
                </section>
            )}
        </main>
    );
}