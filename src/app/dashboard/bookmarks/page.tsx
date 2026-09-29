import Link from "next/link";

import { isUser } from "@/lib/auth-helper";
import { db } from "@/prisma/db";

export default async function BookmarksPage() {
    const session = await isUser();

    const bookmarks = await db.orm.public.Bookmark
        .where({
            userId: session.user.id,
        })
        .all();

    const notes = await Promise.all(
        bookmarks.map(async (bookmark) => {
            const note = await db.orm.public.Note.first({
                id: bookmark.noteId,
            });

            return note;
        })
    );

    const savedNotes = notes.filter(Boolean);

    return (
        <main className="mx-auto max-w-5xl p-8">
            <h1 className="text-3xl font-bold">
                Bookmarks
            </h1>

            <p className="mt-2 text-muted-foreground">
                Notes you saved for later.
            </p>

            {savedNotes.length === 0 ? (
                <div className="mt-8 rounded-lg border p-10 text-center">
                    <h2 className="font-semibold">
                        No bookmarks yet
                    </h2>

                    <p className="mt-2 text-sm text-muted-foreground">
                        Bookmark useful notes and they'll appear here.
                    </p>
                </div>
            ) : (
                <div className="mt-8 grid gap-4 md:grid-cols-2">
                    {savedNotes.map((note) =>
                        note ? (
                            <Link
                                key={note.id}
                                href={`/dashboard/notes/${note.slug}`}
                                className="rounded-lg border p-5 hover:shadow-sm"
                            >
                                <h2 className="font-semibold">
                                    {note.title}
                                </h2>

                                <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                                    {note.content}
                                </p>
                            </Link>
                        ) : null
                    )}
                </div>
            )}
        </main>
    );
}