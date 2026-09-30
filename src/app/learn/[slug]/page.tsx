import type {
    Metadata,
} from "next";

import Link from "next/link";
import { notFound } from "next/navigation";

import {
    getPublishedNote,
} from "@/lib/data/published-notes";

type LearnNotePageProps = {
    params: Promise<{
        slug: string;
    }>;
};

export async function generateMetadata({
    params,
}: LearnNotePageProps): Promise<Metadata> {
    const { slug } = await params;

    const note =
        await getPublishedNote(slug);

    if (!note) {
        return {
            title: "Note Not Found",
        };
    }

    const description =
        note.content.length > 160
            ? `${note.content.slice(
                0,
                157,
            )}...`
            : note.content;

    return {
        title: note.title,
        description,
    };
}

export default async function LearnNotePage({
    params,
}: LearnNotePageProps) {
    const { slug } = await params;

    const note =
        await getPublishedNote(slug);

    if (!note) {
        notFound();
    }

    return (
        <main className="mx-auto max-w-3xl px-6 py-12">
            <Link
                href="/learn"
                className="text-sm text-muted-foreground hover:text-foreground"
            >
                ← Knowledge Library
            </Link>

            <article className="mt-8">
                <h1 className="text-4xl font-bold tracking-tight">
                    {note.title}
                </h1>

                <p className="mt-3 text-sm text-muted-foreground">
                    Published{" "}
                    {new Date(
                        Number(
                            note
                                .createdAt
                                .epochMilliseconds,
                        ),
                    ).toLocaleDateString()}
                </p>

                <div className="mt-10 whitespace-pre-wrap leading-8">
                    {note.content}
                </div>
            </article>
        </main>
    );
}