import Link from "next/link";
import { notFound } from "next/navigation";

import { db } from "@/prisma/db";
import { isUser } from "@/lib/auth-helper";

import { EditNoteForm } from "@/components/notes/edit-note-form";

type EditNotePageProps = {
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
            className="size-5"
            aria-hidden="true"
        >
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4z" />
        </svg>
    );
}

export default async function EditNotePage({
    params,
}: EditNotePageProps) {
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

    return (
        <main className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
            <div className="mb-6">
                <Link
                    href={`/dashboard/notes/${note.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
                >
                    <BackIcon />
                    Back to note
                </Link>
            </div>

            <div className="overflow-hidden rounded-3xl border bg-card shadow-sm">
                <header className="border-b px-6 py-7 sm:px-8">
                    <div className="flex items-start gap-4">
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <EditIcon />
                        </div>

                        <div>
                            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                                Edit note
                            </h1>

                            <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                                Refine your note
                                as your
                                understanding of
                                the topic evolves.
                            </p>
                        </div>
                    </div>
                </header>

                <div className="px-6 py-7 sm:px-8 sm:py-8">
                    <EditNoteForm
                        note={{
                            id: note.id,
                            title: note.title,
                            content:
                                note.content,
                        }}
                    />
                </div>
            </div>
        </main>
    );
}