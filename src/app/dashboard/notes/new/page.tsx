import Link from "next/link";

import { CreateNoteForm } from "@/components/notes/create-note-form";

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

export default function NewNotePage() {
    return (
        <main className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
            <div className="mb-6">
                <Link
                    href="/dashboard/notes"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
                >
                    <BackIcon />
                    Back to notes
                </Link>
            </div>

            <div className="overflow-hidden rounded-3xl border bg-card shadow-sm">
                <header className="border-b px-6 py-7 sm:px-8">
                    <div className="flex items-start gap-4">
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <NoteIcon />
                        </div>

                        <div>
                            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                                Create a note
                            </h1>

                            <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                                Capture something
                                you want to learn,
                                remember, practice,
                                or discuss with your
                                AI mentor.
                            </p>
                        </div>
                    </div>
                </header>

                <div className="px-6 py-7 sm:px-8 sm:py-8">
                    <CreateNoteForm />
                </div>
            </div>
        </main>
    );
}