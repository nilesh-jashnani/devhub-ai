import Link from "next/link";
import { Suspense } from "react";
import {
    ArrowRight,
    Bookmark,
    Brain,
    CheckCircle2,
    FileText,
    ShieldCheck,
    TrendingUp,
    Users,
} from "lucide-react";

import { db } from "@/prisma/db";
import { isAdmin } from "@/lib/auth-helper";
import { APP_NAME } from "@/lib/constants";

function AdminDashboardLoading() {
    return (
        <div
            className="mt-8 space-y-8"
            aria-busy="true"
        >
            <span className="sr-only">
                Loading administration statistics...
            </span>

            <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {Array.from({
                    length: 4,
                }).map((_, index) => (
                    <div
                        key={index}
                        className="h-36 animate-pulse rounded-2xl border bg-muted/30"
                    />
                ))}
            </section>

            <section className="grid gap-4 md:grid-cols-3">
                {Array.from({
                    length: 3,
                }).map((_, index) => (
                    <div
                        key={index}
                        className="h-28 animate-pulse rounded-2xl border bg-muted/30"
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
            label: "Total users",
            value: users.length,
            description:
                "Registered accounts",
            href: "/admin/users",
            icon: Users,
        },
        {
            label: "Total notes",
            value: notes.length,
            description:
                "Knowledge entries",
            href: "/admin/notes",
            icon: FileText,
        },
        {
            label: "Bookmarks",
            value: bookmarks.length,
            description:
                "Saved note references",
            href: "/admin/notes",
            icon: Bookmark,
        },
        {
            label: "AI generations",
            value: aiGenerations.length,
            description:
                "Generated responses",
            href: "/admin/ai",
            icon: Brain,
        },
    ];

    const platformStats = [
        {
            label: "Administrators",
            value: adminCount.toString(),
            description:
                "Accounts with admin access",
            icon: ShieldCheck,
        },
        {
            label: "Completed topics",
            value: completedTopics.toString(),
            description:
                "Learning items completed",
            icon: CheckCircle2,
        },
        {
            label: "Average confidence",
            value: `${averageScore}%`,
            description:
                "Across scored progress",
            icon: TrendingUp,
        },
    ];

    return (
        <>
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <div className="inline-flex items-center gap-2 rounded-full border bg-primary/[0.05] px-3 py-1.5 text-xs font-semibold text-primary">
                        <ShieldCheck
                            className="size-3.5"
                            aria-hidden="true"
                        />
                        Platform administration
                    </div>

                    <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                        Admin dashboard
                    </h1>

                    <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                        Monitor platform activity,
                        manage users, review public
                        content, and inspect AI usage
                        across {APP_NAME}.
                    </p>
                </div>

                <div className="rounded-xl border bg-card px-4 py-3 sm:text-right">
                    <p className="text-xs font-medium text-muted-foreground">
                        Signed in as
                    </p>

                    <p className="mt-1 max-w-[260px] truncate text-sm font-semibold">
                        {session.user.email}
                    </p>
                </div>
            </div>

            <section
                aria-label="Platform statistics"
                className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
            >
                {stats.map((stat) => {
                    const Icon =
                        stat.icon;

                    return (
                        <Link
                            key={
                                stat.label
                            }
                            href={stat.href}
                            className="group rounded-2xl border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                    <Icon
                                        className="size-5"
                                        aria-hidden="true"
                                    />
                                </div>

                                <ArrowRight
                                    className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
                                    aria-hidden="true"
                                />
                            </div>

                            <p className="mt-5 text-3xl font-bold tracking-tight">
                                {stat.value}
                            </p>

                            <p className="mt-1 text-sm font-semibold">
                                {stat.label}
                            </p>

                            <p className="mt-1 text-xs text-muted-foreground">
                                {
                                    stat.description
                                }
                            </p>
                        </Link>
                    );
                })}
            </section>

            <section className="mt-8 grid gap-4 md:grid-cols-3">
                {platformStats.map(
                    (stat) => {
                        const Icon =
                            stat.icon;

                        return (
                            <article
                                key={
                                    stat.label
                                }
                                className="rounded-2xl border bg-card p-5"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex size-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                                        <Icon
                                            className="size-4"
                                            aria-hidden="true"
                                        />
                                    </div>

                                    <p className="text-sm font-medium text-muted-foreground">
                                        {
                                            stat.label
                                        }
                                    </p>
                                </div>

                                <p className="mt-4 text-2xl font-bold">
                                    {
                                        stat.value
                                    }
                                </p>

                                <p className="mt-1 text-xs text-muted-foreground">
                                    {
                                        stat.description
                                    }
                                </p>
                            </article>
                        );
                    },
                )}
            </section>

            <section className="mt-10">
                <div>
                    <p className="text-sm font-semibold text-primary">
                        Management
                    </p>

                    <h2 className="mt-1 text-xl font-bold tracking-tight">
                        Administration tools
                    </h2>
                </div>

                <div className="mt-5 grid gap-4 md:grid-cols-3">
                    <Link
                        href="/admin/users"
                        className="group rounded-2xl border bg-card p-6 transition-all hover:border-primary/25 hover:shadow-sm"
                    >
                        <Users className="size-5 text-primary" />

                        <h3 className="mt-4 font-semibold">
                            User management
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                            Review registered
                            accounts and manage
                            administrator roles.
                        </p>

                        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                            Manage users
                            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                        </span>
                    </Link>

                    <Link
                        href="/admin/notes"
                        className="group rounded-2xl border bg-card p-6 transition-all hover:border-primary/25 hover:shadow-sm"
                    >
                        <FileText className="size-5 text-primary" />

                        <h3 className="mt-4 font-semibold">
                            Content management
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                            Review notes and
                            control which content
                            appears publicly.
                        </p>

                        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                            Review notes
                            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                        </span>
                    </Link>

                    <Link
                        href="/admin/ai"
                        className="group rounded-2xl border bg-card p-6 transition-all hover:border-primary/25 hover:shadow-sm"
                    >
                        <Brain className="size-5 text-primary" />

                        <h3 className="mt-4 font-semibold">
                            AI activity
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                            Inspect recent AI
                            generations across the
                            platform.
                        </p>

                        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                            View activity
                            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                        </span>
                    </Link>
                </div>
            </section>
        </>
    );
}

export default function AdminPage() {
    return (
        <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
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