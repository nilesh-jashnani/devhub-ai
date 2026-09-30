import { Suspense } from "react";

import { isUser } from "@/lib/auth-helper";

import { DashboardStats } from "@/components/dashboard/dashboard-stats";
import { ProgressSection } from "@/components/dashboard/progress-section";
import { RecentNotes } from "@/components/dashboard/recent-notes";

import { StatsSkeleton } from "@/components/dashboard/skeletons/stats-skeleton";
import { SectionSkeleton } from "@/components/dashboard/skeletons/section-skeleton";

export default async function DashboardPage() {
    const session = await isUser();

    const userId = session.user.id;

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

            <div className="mt-8">
                <Suspense
                    fallback={
                        <StatsSkeleton />
                    }
                >
                    <DashboardStats
                        userId={userId}
                    />
                </Suspense>
            </div>

            <div className="mt-8">
                <Suspense
                    fallback={
                        <div className="grid gap-6 lg:grid-cols-2">
                            <SectionSkeleton />
                            <SectionSkeleton />
                        </div>
                    }
                >
                    <ProgressSection
                        userId={userId}
                    />
                </Suspense>
            </div>

            <div className="mt-10">
                <Suspense
                    fallback={
                        <SectionSkeleton />
                    }
                >
                    <RecentNotes
                        userId={userId}
                    />
                </Suspense>
            </div>
        </div>
    );
}