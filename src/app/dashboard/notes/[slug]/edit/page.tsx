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

                <p className="mt-2 text-muted-foreground">
                    Update your saved knowledge.
                </p>
            </div>

            <EditNoteForm
                note={{
                    id: note.id,
                    title: note.title,
                    content: note.content,
                }}
            />
        </main>
    );
}