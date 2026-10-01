import Link from "next/link";
import { Suspense } from "react";

import { isUser } from "@/lib/auth-helper";

import { DashboardStats } from "@/components/dashboard/dashboard-stats";
import { ProgressSection } from "@/components/dashboard/progress-section";
import { RecentNotes } from "@/components/dashboard/recent-notes";

import { StatsSkeleton } from "@/components/dashboard/skeletons/stats-skeleton";
import { SectionSkeleton } from "@/components/dashboard/skeletons/section-skeleton";

function PlusIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="size-4"
            aria-hidden="true"
        >
            <path d="M12 5v14" />
            <path d="M5 12h14" />
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
            className="size-4"
            aria-hidden="true"
        >
            <path d="M12 3 13.4 7.6 18 9l-4.6 1.4L12 15l-1.4-4.6L6 9l4.6-1.4z" />
            <path d="m18.5 15 .7 2.3 2.3.7-2.3.7-.7 2.3-.7-2.3-2.3-.7 2.3-.7z" />
        </svg>
    );
}

export default async function DashboardPage() {
    const session = await isUser();

    const userId = session.user.id;

    const displayName =
        session.user.name?.trim() ||
        session.user.email?.split("@")[0] ||
        "Developer";

    const firstName =
        displayName.split(" ")[0];

    return (
        <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
            <section className="relative overflow-hidden rounded-3xl border bg-card px-6 py-7 shadow-sm sm:px-8 sm:py-9">
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full bg-primary/10 blur-3xl"
                />

                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-28 right-48 size-56 rounded-full bg-primary/5 blur-3xl"
                />

                <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div className="max-w-2xl">
                        <div className="mb-3 inline-flex items-center gap-2 rounded-full border bg-background/80 px-3 py-1 text-xs font-semibold text-muted-foreground shadow-sm">
                            <span className="relative flex size-2">
                                <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-30" />
                                <span className="relative inline-flex size-2 rounded-full bg-primary" />
                            </span>

                            Developer workspace
                        </div>

                        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                            Welcome back,{" "}
                            <span className="text-primary">
                                {firstName}
                            </span>
                            .
                        </h1>

                        <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
                            Continue learning, review your
                            knowledge, and use AI to prepare
                            for your next technical interview.
                        </p>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">
                        <a
                            href="/dashboard/notes/new"
                            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                            <PlusIcon />
                            New note
                        </a>

                        <Link
                            href="/dashboard/ai"
                            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border bg-background px-5 text-sm font-semibold shadow-sm transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                            <SparklesIcon />
                            Ask AI Mentor
                        </Link>
                    </div>
                </div>
            </section>

            <section
                className="mt-8"
                aria-labelledby="dashboard-overview"
            >
                <div className="mb-4">
                    <h2
                        id="dashboard-overview"
                        className="text-lg font-semibold tracking-tight"
                    >
                        Overview
                    </h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                        A snapshot of your learning activity.
                    </p>
                </div>

                <Suspense fallback={<StatsSkeleton />}>
                    <DashboardStats
                        userId={userId}
                    />
                </Suspense>
            </section>

            <section
                className="mt-8"
                aria-labelledby="learning-progress"
            >
                <div className="mb-4">
                    <h2
                        id="learning-progress"
                        className="text-lg font-semibold tracking-tight"
                    >
                        Learning progress
                    </h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Track what you have completed and
                        identify concepts that need another
                        review.
                    </p>
                </div>

                <Suspense
                    fallback={
                        <div className="grid gap-5 lg:grid-cols-2">
                            <SectionSkeleton />
                            <SectionSkeleton />
                        </div>
                    }
                >
                    <ProgressSection
                        userId={userId}
                    />
                </Suspense>
            </section>

            <section
                className="mt-8"
                aria-labelledby="recent-notes"
            >
                <div className="mb-4 flex items-end justify-between gap-4">
                    <div>
                        <h2
                            id="recent-notes"
                            className="text-lg font-semibold tracking-tight"
                        >
                            Recent notes
                        </h2>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Jump back into the concepts
                            you&apos;ve been studying.
                        </p>
                    </div>

                    <Link
                        href="/dashboard/notes"
                        className="hidden text-sm font-semibold text-primary transition-colors hover:text-primary/80 sm:inline"
                    >
                        View all notes →
                    </Link>
                </div>

                <Suspense
                    fallback={
                        <SectionSkeleton />
                    }
                >
                    <RecentNotes
                        userId={userId}
                    />
                </Suspense>
            </section>
        </div>
    );
}