export default function AdminLoading() {
    return (
        <main
            className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8"
            aria-busy="true"
            aria-live="polite"
        >
            <span className="sr-only">
                Loading administration...
            </span>

            <div>
                <div className="h-7 w-36 animate-pulse rounded-full bg-muted" />

                <div className="mt-4 h-10 w-72 max-w-full animate-pulse rounded-lg bg-muted" />

                <div className="mt-3 h-5 w-full max-w-xl animate-pulse rounded bg-muted" />

                <div className="mt-2 h-5 w-4/5 max-w-lg animate-pulse rounded bg-muted" />
            </div>

            <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {Array.from({
                    length: 4,
                }).map((_, index) => (
                    <div
                        key={index}
                        className="h-36 animate-pulse rounded-2xl border bg-muted/30"
                    />
                ))}
            </section>

            <section className="mt-8 grid gap-4 md:grid-cols-3">
                {Array.from({
                    length: 3,
                }).map((_, index) => (
                    <div
                        key={index}
                        className="h-28 animate-pulse rounded-2xl border bg-muted/30"
                    />
                ))}
            </section>

            <div className="mt-10 h-6 w-44 animate-pulse rounded bg-muted" />

            <section className="mt-5 grid gap-4 md:grid-cols-3">
                {Array.from({
                    length: 3,
                }).map((_, index) => (
                    <div
                        key={index}
                        className="h-40 animate-pulse rounded-2xl border bg-muted/30"
                    />
                ))}
            </section>
        </main>
    );
}