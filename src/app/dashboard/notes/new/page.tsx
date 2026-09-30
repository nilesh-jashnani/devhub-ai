import Link from "next/link";

import { CreateNoteForm } from "@/components/notes/create-note-form";

export default function NewNotePage() {
    return (
        <main className="mx-auto max-w-3xl p-8">
            <div className="mb-8">
                <Link
                    href="/dashboard/notes"
                    className="text-sm text-muted-foreground hover:underline"
                >
                    ← Back to notes
                </Link>

                <h1 className="mt-4 text-3xl font-bold">
                    Create Note
                </h1>

                <p className="mt-2 text-muted-foreground">
                    Save something you want to learn,
                    remember, or practice.
                </p>
            </div>

            <CreateNoteForm />
        </main>
    );
}