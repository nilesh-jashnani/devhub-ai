import Link from "next/link";

import { db } from "@/prisma/db";

type DashboardStatsProps = {
    userId: string;
};

type StatCardProps = {
    title: string;
    value: number;
    description: string;
    href: string;
    icon: React.ReactNode;
};

function NotesIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="size-5"
            aria-hidden="true"
        >
            <path d="M6 3.75h9l3 3v13.5H6z" />
            <path d="M15 3.75v3h3" />
            <path d="M9 11h6" />
            <path d="M9 15h6" />
        </svg>
    );
}

function BookmarkIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="size-5"
            aria-hidden="true"
        >
            <path d="M6.75 4.5A1.5 1.5 0 0 1 8.25 3h7.5a1.5 1.5 0 0 1 1.5 1.5V21L12 17.75 6.75 21z" />
        </svg>
    );
}

function SparklesIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="size-5"
            aria-hidden="true"
        >
            <path d="M12 3 13.4 7.6 18 9l-4.6 1.4L12 15l-1.4-4.6L6 9l4.6-1.4z" />
            <path d="m18.5 15 .7 2.3 2.3.7-2.3.7-.7 2.3-.7-2.3-2.3-.7 2.3-.7z" />
        </svg>
    );
}

function CheckIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="size-5"
            aria-hidden="true"
        >
            <circle
                cx="12"
                cy="12"
                r="9"
            />
            <path d="m8.5 12 2.25 2.25L15.75 9" />
        </svg>
    );
}

function ArrowIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="size-4 transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
        >
            <path d="M5 12h14" />
            <path d="m15 8 4 4-4 4" />
        </svg>
    );
}

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
            (item) => item.completed,
        ).length;

    return (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
                title="Notes"
                value={notes.length}
                description="Knowledge saved"
                href="/dashboard/notes"
                icon={<NotesIcon />}
            />

            <StatCard
                title="Bookmarks"
                value={bookmarks.length}
                description="Saved for later"
                href="/dashboard/bookmarks"
                icon={<BookmarkIcon />}
            />

            <StatCard
                title="AI Generations"
                value={aiGenerations.length}
                description="AI learning sessions"
                href="/dashboard/ai"
                icon={<SparklesIcon />}
            />

            <StatCard
                title="Completed"
                value={completedTopics}
                description="Topics completed"
                href="/dashboard/notes"
                icon={<CheckIcon />}
            />
        </div>
    );
}

function StatCard({
    title,
    value,
    description,
    href,
    icon,
}: StatCardProps) {
    return (
        <Link
            href={href}
            className="group relative overflow-hidden rounded-2xl border bg-card p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md"
        >
            <div className="flex items-start justify-between gap-4">
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    {icon}
                </div>

                <div className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary">
                    <ArrowIcon />
                </div>
            </div>

            <div className="mt-6">
                <div className="text-3xl font-bold tracking-tight">
                    {value}
                </div>

                <div className="mt-1 font-semibold">
                    {title}
                </div>

                <p className="mt-1 text-xs text-muted-foreground">
                    {description}
                </p>
            </div>

            <div
                aria-hidden="true"
                className="absolute -bottom-10 -right-10 size-24 rounded-full bg-primary/5 blur-2xl transition-colors group-hover:bg-primary/10"
            />
        </Link>
    );
}