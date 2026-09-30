import Link from "next/link";

import {
    getPublishedNotes,
} from "@/lib/data/published-notes";
import { APP_NAME } from "@/lib/constants";

export default async function LearnPage() {
    const notes = await getPublishedNotes();

    return (
        <main className="mx-auto max-w-6xl px-6 py-12">
            <div className="max-w-2xl">
                <p className="text-sm font-medium text-muted-foreground">
                    {APP_NAME} Knowledge Library
                </p>

                <h1 className="mt-2 text-4xl font-bold tracking-tight">
                    Learn
                </h1>

                <p className="mt-3 text-muted-foreground">
                    Published developer notes,
                    explanations, and learning
                    resources from {APP_NAME}.
                </p>
            </div>

            {notes.length === 0 ? (
                <div className="mt-10 rounded-xl border p-8 text-center">
                    <h2 className="font-semibold">
                        No published notes yet
                    </h2>

                    <p className="mt-2 text-sm text-muted-foreground">
                        Published knowledge will
                        appear here.
                    </p>
                </div>
            ) : (
                <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {notes.map((note) => (
                        <Link
                            key={note.id}
                            href={`/learn/${note.slug}`}
                            className="group rounded-xl border p-6 transition-colors hover:bg-muted/40"
                        >
                            <h2 className="text-lg font-semibold group-hover:underline">
                                {note.title}
                            </h2>

                            <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
                                {note.content}
                            </p>

                            <p className="mt-5 text-xs text-muted-foreground">
                                {new Date(
                                    Number(
                                        note
                                            .createdAt
                                            .epochMilliseconds,
                                    ),
                                ).toLocaleDateString()}
                            </p>
                        </Link>
                    ))}
                </div>
            )}
        </main>
    );
}