export function SectionSkeleton() {
    return (
        <div className="rounded-xl border p-6">
            <div className="h-6 w-40 animate-pulse rounded bg-muted" />

            <div className="mt-3 h-4 w-64 max-w-full animate-pulse rounded bg-muted" />

            <div className="mt-8 space-y-3">
                <div className="h-12 animate-pulse rounded bg-muted" />
                <div className="h-12 animate-pulse rounded bg-muted" />
                <div className="h-12 animate-pulse rounded bg-muted" />
            </div>
        </div>
    );
}