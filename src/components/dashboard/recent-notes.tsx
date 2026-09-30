import Link from "next/link";

import { db } from "@/prisma/db";

type RecentNotesProps = {
    userId: string;
};

export async function RecentNotes({
    userId,
}: RecentNotesProps) {
    const recentNotes =
        await db.orm.public.Note
            .where({
                authorId: userId,
            })
            .orderBy((note) =>
                note.createdAt.desc()
            )
            .limit(5)
            .all();

    return (
        <section>
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                    Recent Notes
                </h2>

                <Link
                    href="/dashboard/notes"
                    className="text-sm hover:underline"
                >
                    View all
                </Link>
            </div>

            {recentNotes.length === 0 ? (
                <div className="mt-4 rounded-lg border p-8 text-center">
                    <p className="text-muted-foreground">
                        You haven't created any
                        notes yet.
                    </p>

                    <a
                        href="/dashboard/notes/new"
                        className="mt-4 inline-block rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground"
                    >
                        Create your first note
                    </a>
                </div>
            ) : (
                <div className="mt-4 space-y-3">
                    {recentNotes.map(
                        (note) => (
                            <Link
                                key={note.id}
                                href={`/dashboard/notes/${note.slug}`}
                                className="block rounded-lg border p-5 transition hover:shadow-sm"
                            >
                                <h3 className="font-semibold">
                                    {note.title}
                                </h3>

                                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                                    {note.content}
                                </p>
                            </Link>
                        )
                    )}
                </div>
            )}
        </section>
    );
}