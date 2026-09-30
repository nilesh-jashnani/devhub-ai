import Link from "next/link";

import { db } from "@/prisma/db";

type DashboardStatsProps = {
    userId: string;
};

export async function DashboardStats({
    userId,
}: DashboardStatsProps) {
    const [
        notes,
        bookmarks,
        aiGenerations,
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

        db.orm.public.Progress
            .where({
                userId,
            })
            .all(),
    ]);

    const completedTopics =
        progress.filter(
            (item) => item.completed
        ).length;

    return (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
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