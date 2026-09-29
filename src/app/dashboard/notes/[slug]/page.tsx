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

export default async function NotePage({
    params,
}: NotePageProps) {
    const session = await isUser();

    const { slug } = await params;

    const note = await db.orm.public.Note.first({
        slug,
        authorId: session.user.id,
    });

    if (!note) {
        notFound();
    }

    const bookmark = await db.orm.public.Bookmark.first({
        userId: session.user.id,
        noteId: note.id,
    });

    const progress =
        await db.orm.public.Progress.first({
            userId: session.user.id,
            noteId: note.id,
        });

    return (
        <main className="mx-auto max-w-3xl p-8">
            <div className="mb-8 flex items-center justify-between">
                <Link
                    href="/dashboard/notes"
                    className="text-sm text-muted-foreground hover:underline"
                >
                    ← Back to notes
                </Link>

                <div className="flex items-center gap-3 justify-between">
                    <BookmarkButton
                        noteId={note.id}
                        isBookmarked={!!bookmark}
                    />

                    <Link
                        href={`/dashboard/notes/${note.slug}/edit`}
                        className="rounded-md border px-4 py-2 text-sm"
                    >
                        Edit
                    </Link>

                    <form action={deleteNote}>
                        <input
                            type="hidden"
                            name="noteId"
                            value={note.id}
                        />

                        <button
                            type="submit"
                            className="rounded-md border px-4 py-2 text-sm cursor-pointer"
                        >
                            Delete
                        </button>
                    </form>
                </div>
            </div>

            <article>
                <h1 className="text-4xl font-bold">
                    {note.title}
                </h1>

                <p className="mt-3 text-sm text-muted-foreground">
                    Created{" "}
                    {new Date(
                        Number(note.createdAt.epochMilliseconds)
                    ).toLocaleDateString()}
                </p>

                <div className="mt-8 whitespace-pre-wrap leading-7">
                    {note.content}
                </div>

                <div className="mt-10">
                    <ProgressControls
                        noteId={note.id}
                        initialCompleted={
                            progress?.completed ?? false
                        }
                        initialScore={
                            progress?.score ?? null
                        }
                    />
                </div>
            </article>
        </main>
    );
}