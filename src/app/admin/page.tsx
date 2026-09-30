import Link from "next/link";
import { Suspense } from "react";

import { db } from "@/prisma/db";
import { isAdmin } from "@/lib/auth-helper";
import { APP_NAME } from "@/lib/constants";

function AdminDashboardLoading() {
    return (
        <div className="mt-8 space-y-8">
            <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {Array.from({
                    length: 4,
                }).map((_, index) => (
                    <div
                        key={index}
                        className="h-28 animate-pulse rounded-xl border bg-muted/30"
                    />
                ))}
            </section>

            <section className="grid gap-6 lg:grid-cols-3">
                {Array.from({
                    length: 3,
                }).map((_, index) => (
                    <div
                        key={index}
                        className="h-28 animate-pulse rounded-xl border bg-muted/30"
                    />
                ))}
            </section>
        </div>
    );
}

async function AdminDashboardContent() {
    const session = await isAdmin();

    const [
        users,
        notes,
        bookmarks,
        progress,
        aiGenerations,
    ] = await Promise.all([
        db.orm.public.User.all(),
        db.orm.public.Note.all(),
        db.orm.public.Bookmark.all(),
        db.orm.public.Progress.all(),
        db.orm.public.AiGeneration.all(),
    ]);

    const completedTopics =
        progress.filter(
            (item) => item.completed,
        ).length;

    const scoredProgress =
        progress.filter(
            (item) =>
                item.score !== null &&
                item.score !== undefined,
        );

    const averageScore =
        scoredProgress.length > 0
            ? Math.round(
                scoredProgress.reduce(
                    (total, item) =>
                        total +
                        (item.score ?? 0),
                    0,
                ) /
                scoredProgress.length,
            )
            : 0;

    const adminCount =
        users.filter(
            (user) =>
                user.role === "ADMIN",
        ).length;

    const stats = [
        {
            label: "Total Users",
            value: users.length,
            href: "/admin/users",
        },
        {
            label: "Total Notes",
            value: notes.length,
            href: "/admin/notes",
        },
        {
            label: "Bookmarks",
            value: bookmarks.length,
            href: "/admin/notes",
        },
        {
            label: "AI Generations",
            value: aiGenerations.length,
            href: "/admin/ai",
        },
    ];

    return (
        <>
            <div className="flex items-start justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold">
                        Admin Dashboard
                    </h1>

                    <p className="mt-2 text-muted-foreground">
                        Platform activity and
                        administration for{" "}
                        {APP_NAME}.
                    </p>
                </div>

                <div className="text-right text-sm">
                    <p className="text-muted-foreground">
                        Signed in as
                    </p>

                    <p className="font-medium">
                        {session.user.email}
                    </p>
                </div>
            </div>

            <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <Link
                        key={stat.label}
                        href={stat.href}
                        className="rounded-xl border p-5 transition-colors hover:bg-muted/50"
                    >
                        <p className="text-sm text-muted-foreground">
                            {stat.label}
                        </p>

                        <p className="mt-2 text-3xl font-bold">
                            {stat.value}
                        </p>
                    </Link>
                ))}
            </section>

            <section className="mt-8 grid gap-6 lg:grid-cols-3">
                <div className="rounded-xl border p-6">
                    <p className="text-sm text-muted-foreground">
                        Administrators
                    </p>

                    <p className="mt-2 text-2xl font-bold">
                        {adminCount}
                    </p>
                </div>

                <div className="rounded-xl border p-6">
                    <p className="text-sm text-muted-foreground">
                        Completed Topics
                    </p>

                    <p className="mt-2 text-2xl font-bold">
                        {completedTopics}
                    </p>
                </div>

                <div className="rounded-xl border p-6">
                    <p className="text-sm text-muted-foreground">
                        Average Confidence
                    </p>

                    <p className="mt-2 text-2xl font-bold">
                        {averageScore}%
                    </p>
                </div>
            </section>

            <section className="mt-10">
                <h2 className="text-xl font-semibold">
                    Administration
                </h2>

                <div className="mt-4 grid gap-4 md:grid-cols-3">
                    <Link
                        href="/admin/users"
                        className="rounded-xl border p-6 transition-colors hover:bg-muted/50"
                    >
                        <h3 className="font-semibold">
                            Users
                        </h3>

                        <p className="mt-2 text-sm text-muted-foreground">
                            View users and manage
                            platform roles.
                        </p>
                    </Link>

                    <Link
                        href="/admin/notes"
                        className="rounded-xl border p-6 transition-colors hover:bg-muted/50"
                    >
                        <h3 className="font-semibold">
                            Content
                        </h3>

                        <p className="mt-2 text-sm text-muted-foreground">
                            Review notes created
                            across the platform.
                        </p>
                    </Link>

                    <Link
                        href="/admin/ai"
                        className="rounded-xl border p-6 transition-colors hover:bg-muted/50"
                    >
                        <h3 className="font-semibold">
                            AI Usage
                        </h3>

                        <p className="mt-2 text-sm text-muted-foreground">
                            Inspect AI generation
                            activity.
                        </p>
                    </Link>
                </div>
            </section>
        </>
    );
}

export default function AdminPage() {
    return (
        <main className="mx-auto max-w-7xl p-8">
            <Suspense
                fallback={
                    <AdminDashboardLoading />
                }
            >
                <AdminDashboardContent />
            </Suspense>
        </main>
    );
}