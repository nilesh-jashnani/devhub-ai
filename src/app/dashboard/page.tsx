import Link from "next/link";

import { isUser } from "@/lib/auth-helper";
import { db } from "@/prisma/db";
import { LearningProgress } from "@/components/dashboard/learning-progress";
import { NeedsReview } from "@/components/dashboard/needs-review";

export default async function DashboardPage() {
    const session = await isUser();

    const userId = session.user.id;

    const [
        notes,
        bookmarks,
        aiGenerations,
        recentNotes,
        progress,
    ] = await Promise.all([
        db.orm.public.Note
            .where({
                authorId: userId,
            })
            .all(),

        db.orm.public.Bookmark
            .where({
                userId,
            })
            .all(),

        db.orm.public.AiGeneration
            .where({
                userId,
            })
            .all(),

        db.orm.public.Note
            .where({
                authorId: userId,
            })
            .orderBy((note) =>
                note.createdAt.desc()
            )
            .limit(5)
            .all(),

        db.orm.public.Progress
            .where({
                userId,
            })
            .all(),
    ]);

    const completedTopics = progress.filter(
        (item) => item.completed
    ).length;

    const completionPercentage =
        notes.length === 0
            ? 0
            : Math.round(
                (completedTopics / notes.length) *
                100
            );

    const scores = progress
        .map((item) => item.score)
        .filter(
            (score): score is number =>
                score !== null
        );

    const averageScore =
        scores.length === 0
            ? 0
            : Math.round(
                scores.reduce(
                    (total, score) =>
                        total + score,
                    0
                ) / scores.length
            );

    const progressByNoteId = new Map(
        progress.map((item) => [
            item.noteId,
            item,
        ])
    );

    const needsReview = notes
        .map((note) => ({
            note,
            progress:
                progressByNoteId.get(note.id),
        }))
        .filter(
            ({ progress }) =>
                progress?.score !== null &&
                progress?.score !==
                undefined &&
                progress.score < 60
        )
        .sort(
            (a, b) =>
                (a.progress?.score ?? 0) -
                (b.progress?.score ?? 0)
        );
    return (
        <div className="mx-auto max-w-7xl px-6 py-10">
            <div>
                <h1 className="text-3xl font-bold">
                    Dashboard
                </h1>

                <p className="mt-2 text-muted-foreground">
                    Your developer learning workspace.
                </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <StatCard
                    title="Notes"
                    value={notes.length}
                    href="/dashboard/notes"
                />

                <StatCard
                    title="Bookmarks"
                    value={bookmarks.length}
                    href="/dashboard/bookmarks"
                />

                <StatCard
                    title="AI Generations"
                    value={aiGenerations.length}
                    href="/dashboard/ai"
                />

                <StatCard
                    title="Completed"
                    value={completedTopics}
                    href="/dashboard/notes"
                />
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
                <LearningProgress
                    totalNotes={notes.length}
                    completedTopics={
                        completedTopics
                    }
                    completionPercentage={
                        completionPercentage
                    }
                    averageScore={
                        averageScore
                    }
                />

                <NeedsReview
                    items={needsReview}
                />
            </div>

            <section className="mt-10">
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
                            You haven't created any notes yet.
                        </p>

                        <Link
                            href="/dashboard/notes/new"
                            className="mt-4 inline-block rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground"
                        >
                            Create your first note
                        </Link>
                    </div>
                ) : (
                    <div className="mt-4 space-y-3">
                        {recentNotes.map((note) => (
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
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}

function StatCard({
    title,
    value,
    href,
}: {
    title: string;
    value: number;
    href: string;
}) {
    return (
        <Link
            href={href}
            className="rounded-xl border p-6 transition hover:shadow-sm"
        >
            <p className="text-sm text-muted-foreground">
                {title}
            </p>

            <p className="mt-2 text-3xl font-bold">
                {value}
            </p>
        </Link>
    );
}