import Link from "next/link";
import { notFound } from "next/navigation";

import { db } from "@/prisma/db";
import { isUser } from "@/lib/auth-helper";
import { NoteModalClose } from "@/components/notes/note-modal-close";

type NoteModalPageProps = {
    params: Promise<{
        slug: string;
    }>;
};

export default async function NoteModalPage({
    params,
}: NoteModalPageProps) {
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-background p-6 shadow-xl">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <p className="text-sm text-muted-foreground">
                            Note Preview
                        </p>

                        <h2 className="mt-1 text-2xl font-bold">
                            {note.title}
                        </h2>
                    </div>

                    <NoteModalClose />
                </div>

                <div className="mt-6 whitespace-pre-wrap leading-7">
                    {note.content}
                </div>

                <div className="mt-8 border-t pt-4">
                    <a
                        href={`/dashboard/notes/${note.slug}`}
                        className="inline-flex rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground"
                    >
                        Open full note
                    </a>
                </div>
            </div>
        </div>
    );
}