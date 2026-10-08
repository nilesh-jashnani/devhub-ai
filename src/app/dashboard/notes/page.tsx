import Link from "next/link";

import { or } from "@prisma/orm-postgres/orm-client";

import { db } from "@/prisma/db";
import { isUser } from "@/lib/auth-helper";
import { NoteSearch } from "@/components/notes/note-search";

type NotesPageProps = {
    searchParams: Promise<{
        query?: string;
    }>;
};

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

function SearchIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="size-5"
            aria-hidden="true"
        >
            <circle
                cx="11"
                cy="11"
                r="7"
            />
            <path d="m20 20-4-4" />
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

export default async function NotesPage({
    searchParams,
}: NotesPageProps) {
    const session = await isUser();

    const { query } = await searchParams;
    const search = query?.trim() ?? "";

    let notesQuery =
        db.orm.public.Note.where({
            authorId: session.user.id,
        });

    if (search) {
        notesQuery = notesQuery.where(
            (note) =>
                or(
                    note.title.ilike(
                        `%${search}%`,
                    ),
                    note.content.ilike(
                        `%${search}%`,
                    ),
                ),
        );
    }

    const notes = await notesQuery
        .orderBy((note) =>
            note.createdAt.desc(),
        )
        .all();

    return (
        <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
            <header className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-primary">
                        <NoteIcon />
                        Knowledge base
                    </div>

                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        My notes
                    </h1>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                        Capture concepts,
                        explanations, and ideas
                        you want to learn,
                        remember, or revisit.
                    </p>
                </div>

                <a
                    href="/dashboard/notes/new"
                    className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                    <PlusIcon />
                    New note
                </a>
            </header>

            <section className="mt-8 rounded-2xl border bg-card p-4 shadow-sm sm:p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <SearchIcon />
                        </div>

                        <div>
                            <h2 className="text-sm font-semibold">
                                Search notes
                            </h2>

                            <p className="text-xs text-muted-foreground">
                                Search titles
                                and content
                            </p>
                        </div>
                    </div>

                    <div className="w-full sm:max-w-md">
                        <NoteSearch />
                    </div>
                </div>
            </section>

            <div className="mt-7 flex items-center justify-between gap-4">
                <div>
                    <h2 className="font-semibold">
                        {search
                            ? "Search results"
                            : "All notes"}
                    </h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                        {notes.length}{" "}
                        {notes.length === 1
                            ? "note"
                            : "notes"}
                        {search
                            ? ` matching "${search}"`
                            : " in your knowledge base"}
                    </p>
                </div>

                {search && (
                    <Link
                        href="/dashboard/notes"
                        className="text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                    >
                        Clear search
                    </Link>
                )}
            </div>

            {notes.length === 0 ? (
                <div className="mt-5 rounded-2xl border border-dashed bg-card px-6 py-14 text-center">
                    <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        {search ? (
                            <SearchIcon />
                        ) : (
                            <NoteIcon />
                        )}
                    </div>

                    <h2 className="mt-4 text-lg font-semibold">
                        {search
                            ? "No matching notes"
                            : "Start your knowledge base"}
                    </h2>

                    <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                        {search
                            ? `We couldn't find any notes matching "${search}". Try another search or return to all notes.`
                            : "Create your first note and start building a searchable collection of concepts you want to master."}
                    </p>

                    <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
                        {search ? (
                            <Link
                                href="/dashboard/notes"
                                className="inline-flex h-10 items-center justify-center rounded-xl border bg-background px-4 text-sm font-semibold transition-colors hover:bg-muted"
                            >
                                View all notes
                            </Link>
                        ) : (
                            <a
                                href="/dashboard/notes/new"
                                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors cursor-pointer hover:bg-primary/90"
                            >
                                <PlusIcon />
                                Create your
                                first note
                            </a>
                        )}
                    </div>
                </div>
            ) : (
                <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {notes.map((note) => (
                        <Link
                            key={note.id}
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

                            <h2 className="mt-5 line-clamp-2 text-lg font-semibold tracking-tight transition-colors group-hover:text-primary">
                                {note.title}
                            </h2>

                            <p className="mt-2 line-clamp-3 flex-1 text-sm leading-6 text-muted-foreground">
                                {note.content}
                            </p>

                            <div className="mt-5 border-t pt-4">
                                <p className="text-xs font-medium text-muted-foreground">
                                    Created{" "}
                                    {new Date(
                                        Number(
                                            note
                                                .createdAt
                                                .epochMilliseconds,
                                        ),
                                    ).toLocaleDateString()}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </main>
    );
}