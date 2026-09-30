export function StatsSkeleton() {
    return (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {Array.from({
                length: 4,
            }).map((_, index) => (
                <div
                    key={index}
                    className="rounded-xl border p-6"
                >
                    <div className="h-4 w-24 animate-pulse rounded bg-muted" />

                    <div className="mt-4 h-8 w-16 animate-pulse rounded bg-muted" />
                </div>
            ))}
        </div>
    );
}