import Link from "next/link";
import { notFound } from "next/navigation";

import { db } from "@/prisma/db";
import { updateNote } from "@/actions/notes";
import { isUser } from "@/lib/auth-helper";

type EditNotePageProps = {
    params: Promise<{
        slug: string;
    }>;
};

export default async function EditNotePage({
    params,
}: EditNotePageProps) {
    const session = await isUser();

    const { slug } = await params;

    const note = await db.orm.public.Note.first({
        slug,
        authorId: session.user.id,
    });

    if (!note) {
        notFound();
    }

    return (
        <main className="mx-auto max-w-3xl p-8">
            <div className="mb-8">
                <Link
                    href={`/dashboard/notes/${note.slug}`}
                    className="text-sm text-muted-foreground hover:underline"
                >
                    ← Back to note
                </Link>

                <h1 className="mt-4 text-3xl font-bold">
                    Edit Note
                </h1>
            </div>

            <form action={updateNote} className="space-y-6">
                <input
                    type="hidden"
                    name="noteId"
                    value={note.id}
                />

                <div>
                    <label
                        htmlFor="title"
                        className="mb-2 block text-sm font-medium"
                    >
                        Title
                    </label>

                    <input
                        id="title"
                        name="title"
                        defaultValue={note.title}
                        required
                        className="w-full rounded-md border px-3 py-2"
                    />
                </div>

                <div>
                    <label
                        htmlFor="content"
                        className="mb-2 block text-sm font-medium"
                    >
                        Content
                    </label>

                    <textarea
                        id="content"
                        name="content"
                        defaultValue={note.content}
                        required
                        rows={14}
                        className="w-full rounded-md border px-3 py-2"
                    />
                </div>

                <button
                    type="submit"
                    className="rounded-md bg-black px-4 py-2 text-white cursor-pointer"
                >
                    Save Changes
                </button>
            </form>
        </main>
    );
}