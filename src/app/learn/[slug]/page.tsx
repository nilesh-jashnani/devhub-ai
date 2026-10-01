import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
    ArrowLeft,
    BookOpen,
    CalendarDays,
    Sparkles,
} from "lucide-react";

import {
    getPublishedNote,
} from "@/lib/data/published-notes";
import { APP_NAME } from "@/lib/constants";

type LearnNotePageProps = {
    params: Promise<{
        slug: string;
    }>;
};

function createDescription(
    content: string,
) {
    const normalized =
        content
            .replace(/\s+/g, " ")
            .trim();

    if (normalized.length <= 160) {
        return normalized;
    }

    return `${normalized.slice(
        0,
        157,
    )}...`;
}

function formatDate(
    epochMilliseconds: bigint | number,
) {
    return new Date(
        Number(epochMilliseconds),
    ).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

export async function generateMetadata({
    params,
}: LearnNotePageProps): Promise<Metadata> {
    const { slug } = await params;

    const note =
        await getPublishedNote(slug);

    if (!note) {
        return {
            title: "Note Not Found",
            robots: {
                index: false,
                follow: false,
            },
        };
    }

    const description =
        createDescription(
            note.content,
        );

    const path = `/learn/${note.slug}`;

    return {
        title: note.title,
        description,

        alternates: {
            canonical: path,
        },

        openGraph: {
            title: note.title,
            description,
            type: "article",
            url: path,
            publishedTime: new Date(
                Number(
                    note.createdAt
                        .epochMilliseconds,
                ),
            ).toISOString(),
            modifiedTime: new Date(
                Number(
                    note.updatedAt
                        .epochMilliseconds,
                ),
            ).toISOString(),
        },

        twitter: {
            card: "summary",
            title: note.title,
            description,
        },
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

    const publishedDate =
        formatDate(
            note.createdAt
                .epochMilliseconds,
        );

    const updatedDate =
        formatDate(
            note.updatedAt
                .epochMilliseconds,
        );

    return (
        <main className="min-h-screen bg-background">
            <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
                <Link
                    href="/learn"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
                >
                    <ArrowLeft
                        className="size-4"
                        aria-hidden="true"
                    />
                    Knowledge library
                </Link>

                <article className="mt-8">
                    <header className="border-b pb-8">
                        <div className="inline-flex items-center gap-2 rounded-full border bg-primary/[0.05] px-3 py-1.5 text-xs font-semibold text-primary">
                            <BookOpen
                                className="size-3.5"
                                aria-hidden="true"
                            />
                            Developer knowledge
                        </div>

                        <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
                            {note.title}
                        </h1>

                        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                            <span className="inline-flex items-center gap-2">
                                <CalendarDays
                                    className="size-4"
                                    aria-hidden="true"
                                />

                                Published{" "}
                                {
                                    publishedDate
                                }
                            </span>

                            {updatedDate !==
                                publishedDate && (
                                    <span>
                                        Updated{" "}
                                        {
                                            updatedDate
                                        }
                                    </span>
                                )}

                            <span className="inline-flex items-center gap-2">
                                <Sparkles
                                    className="size-4 text-primary"
                                    aria-hidden="true"
                                />

                                {APP_NAME}
                            </span>
                        </div>
                    </header>

                    <div className="mt-10 whitespace-pre-wrap text-[1.02rem] leading-8 text-foreground/90">
                        {note.content}
                    </div>

                    <footer className="mt-14 border-t pt-8">
                        <div className="rounded-2xl border bg-muted/20 p-6">
                            <p className="text-sm font-semibold">
                                Continue learning
                            </p>

                            <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                Explore more
                                published developer
                                notes and technical
                                resources in the{" "}
                                {APP_NAME} knowledge
                                library.
                            </p>

                            <Link
                                href="/learn"
                                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                            >
                                <ArrowLeft className="size-4" />
                                Browse all notes
                            </Link>
                        </div>
                    </footer>
                </article>
            </div>
        </main>
    );
}