import { StatsSkeleton } from "@/components/dashboard/skeletons/stats-skeleton";
import { SectionSkeleton } from "@/components/dashboard/skeletons/section-skeleton";

export default function DashboardLoading() {
    return (
        <main
            className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8"
            aria-busy="true"
            aria-live="polite"
        >
            <span className="sr-only">
                Loading dashboard...
            </span>

            <div className="overflow-hidden rounded-3xl border bg-card p-6 shadow-sm sm:p-8">
                <div className="h-4 w-28 animate-pulse rounded-full bg-muted" />

                <div className="mt-4 h-9 w-full max-w-md animate-pulse rounded-lg bg-muted" />

                <div className="mt-3 h-5 w-full max-w-xl animate-pulse rounded-md bg-muted" />

                <div className="mt-2 h-5 w-4/5 max-w-lg animate-pulse rounded-md bg-muted" />

                <div className="mt-6 flex gap-3">
                    <div className="h-10 w-28 animate-pulse rounded-xl bg-muted" />

                    <div className="h-10 w-28 animate-pulse rounded-xl bg-muted" />
                </div>
            </div>

            <div className="mt-8">
                <StatsSkeleton />
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
                <SectionSkeleton />
                <SectionSkeleton />
            </div>

            <div className="mt-8">
                <SectionSkeleton />
            </div>
        </main>
    );
}