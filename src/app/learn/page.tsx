import type { Metadata } from "next";
import Link from "next/link";
import {
    ArrowRight,
    BookOpen,
    Library,
    Sparkles,
} from "lucide-react";

import {
    getPublishedNotes,
} from "@/lib/data/published-notes";
import { APP_NAME } from "@/lib/constants";

export const metadata: Metadata = {
    title: "Learn",
    description:
        `Explore published developer notes, technical explanations, and learning resources from ${APP_NAME}.`,
    alternates: {
        canonical: "/learn",
    },
    openGraph: {
        title: `Learn | ${APP_NAME}`,
        description:
            "Explore published developer notes, technical explanations, and learning resources.",
        type: "website",
        url: "/learn",
    },
    twitter: {
        card: "summary",
        title: `Learn | ${APP_NAME}`,
        description:
            "Explore published developer notes, technical explanations, and learning resources.",
    },
};

function formatDate(
    epochMilliseconds: bigint | number,
) {
    return new Date(
        Number(epochMilliseconds),
    ).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

export default async function LearnPage() {
    const notes =
        await getPublishedNotes();

    return (
        <main className="min-h-screen bg-background">
            <section className="border-b bg-muted/20">
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1.5 text-xs font-semibold text-primary shadow-sm">
                            <Library
                                className="size-3.5"
                                aria-hidden="true"
                            />

                            {APP_NAME} Knowledge Library
                        </div>

                        <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
                            Learn from practical
                            developer knowledge.
                        </h1>

                        <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                            Explore published
                            developer notes,
                            explanations, and
                            learning resources
                            designed to make
                            technical concepts
                            easier to understand
                            and revisit.
                        </p>

                        <div className="mt-6 flex flex-wrap items-center gap-3">
                            <div className="inline-flex items-center gap-2 rounded-lg border bg-background px-3 py-2 text-sm text-muted-foreground">
                                <BookOpen className="size-4 text-primary" />

                                {notes.length}{" "}
                                {notes.length === 1
                                    ? "published note"
                                    : "published notes"}
                            </div>

                            <div className="inline-flex items-center gap-2 rounded-lg border bg-background px-3 py-2 text-sm text-muted-foreground">
                                <Sparkles className="size-4 text-primary" />
                                Developer-focused
                                learning
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                {notes.length === 0 ? (
                    <div className="rounded-3xl border bg-card px-6 py-16 text-center shadow-sm">
                        <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                            <BookOpen className="size-6" />
                        </div>

                        <h2 className="mt-5 text-xl font-bold">
                            No published notes yet
                        </h2>

                        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                            Published developer
                            knowledge will appear
                            here as new resources
                            become available.
                        </p>

                        <Link
                            href="/"
                            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                        >
                            Return home
                            <ArrowRight className="size-4" />
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="flex items-end justify-between gap-4">
                            <div>
                                <p className="text-sm font-semibold text-primary">
                                    Knowledge
                                </p>

                                <h2 className="mt-1 text-2xl font-bold tracking-tight">
                                    Latest published
                                    notes
                                </h2>
                            </div>

                            <p className="hidden text-sm text-muted-foreground sm:block">
                                Updated as new
                                knowledge is
                                published
                            </p>
                        </div>

                        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {notes.map(
                                (note) => (
                                    <Link
                                        key={
                                            note.id
                                        }
                                        href={`/learn/${note.slug}`}
                                        className="group flex min-h-64 flex-col rounded-2xl border bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                                <BookOpen
                                                    className="size-5"
                                                    aria-hidden="true"
                                                />
                                            </div>

                                            <ArrowRight
                                                className="size-4 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-primary"
                                                aria-hidden="true"
                                            />
                                        </div>

                                        <h3 className="mt-5 text-lg font-bold leading-7 tracking-tight transition-colors group-hover:text-primary">
                                            {
                                                note.title
                                            }
                                        </h3>

                                        <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
                                            {
                                                note.content
                                            }
                                        </p>

                                        <div className="mt-auto pt-6">
                                            <p className="text-xs font-medium text-muted-foreground">
                                                Published{" "}
                                                {formatDate(
                                                    note
                                                        .createdAt
                                                        .epochMilliseconds,
                                                )}
                                            </p>
                                        </div>
                                    </Link>
                                ),
                            )}
                        </div>
                    </>
                )}
            </section>
        </main>
    );
}