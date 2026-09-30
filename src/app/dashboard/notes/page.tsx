import Link from "next/link";

import { db } from "@/prisma/db";
import { isUser } from "@/lib/auth-helper";
import { NoteSearch } from "@/components/notes/note-search";
import { or } from "@prisma/orm-postgres/orm-client";

type NotesPageProps = {
    searchParams: Promise<{
        query?: string;
    }>;
};

export default async function NotesPage({
    searchParams,
}: NotesPageProps) {
    const session = await isUser();

    const { query } = await searchParams;
    const search = query?.trim() ?? "";

    let notesQuery = db.orm.public.Note.where({
        authorId: session.user.id,
    });

    if (search) {
        notesQuery = notesQuery.where((note) =>
            or(
                note.title.ilike(`%${search}%`),
                note.content.ilike(`%${search}%`)
            )
        );
    }

    const notes = await notesQuery.orderBy((note) => note.createdAt.desc()).all();

    return (
        <main className="mx-auto max-w-5xl p-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">My Notes</h1>

                    <p className="mt-2 text-muted-foreground">
                        Your developer knowledge base.
                    </p>
                </div>

                <a
                    href="/dashboard/notes/new"
                    className="rounded-md bg-black px-4 py-2 text-sm text-white"
                >
                    New Note
                </a>
            </div>

            <div className="mt-6">
                <NoteSearch />
            </div>

            {notes.length === 0 ? (
                <div className="mt-8 rounded-lg border p-10 text-center">
                    <h2 className="text-lg font-semibold">
                        {search ? "No matching notes" : "No notes yet"}
                    </h2>

                    <p className="mt-2 text-sm text-muted-foreground">
                        {search
                            ? `No notes matched for "${search}".`
                            : "Create your first note to start building your knowledge base."}
                    </p>

                    {!search && (<a
                        href="/dashboard/notes/new"
                        className="mt-4 inline-block rounded-md border px-4 py-2 text-sm"
                    >
                        Create your first note
                    </a>)}
                </div>
            ) : (
                <div className="mt-8 grid gap-4 md:grid-cols-2">
                    {notes.map((note) => (
                        <Link
                            key={note.id}
                            href={`/dashboard/notes/${note.slug}`}
                            className="rounded-lg border p-5 transition hover:shadow-sm"
                        >
                            <h2 className="font-semibold">
                                {note.title}
                            </h2>

                            <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                                {note.content}
                            </p>

                            <p className="mt-4 text-xs text-muted-foreground">
                                {
                                    new Date(
                                        Number(note.createdAt.epochMilliseconds)
                                    ).toLocaleDateString()
                                }
                            </p>
                        </Link>
                    ))}
                </div>
            )}
        </main>
    );
}