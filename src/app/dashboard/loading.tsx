import { StatsSkeleton } from "@/components/dashboard/skeletons/stats-skeleton";
import { SectionSkeleton } from "@/components/dashboard/skeletons/section-skeleton";

export default function DashboardLoading() {
    return (
        <div className="mx-auto max-w-7xl px-6 py-10">
            <div>
                <div className="h-9 w-48 animate-pulse rounded bg-muted" />

                <div className="mt-3 h-5 w-72 max-w-full animate-pulse rounded bg-muted" />
            </div>

            <div className="mt-8">
                <StatsSkeleton />
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
                <SectionSkeleton />
                <SectionSkeleton />
            </div>

            <div className="mt-10">
                <SectionSkeleton />
            </div>
        </div>
    );
}