import Link from "next/link";

function SearchIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="size-6"
            aria-hidden="true"
        >
            <circle
                cx="11"
                cy="11"
                r="6"
            />

            <path d="m16 16 4 4" />
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
            className="size-4"
            aria-hidden="true"
        >
            <path d="M5 12h14" />
            <path d="m15 8 4 4-4 4" />
        </svg>
    );
}

export default function DashboardNotFound() {
    return (
        <main className="mx-auto flex min-h-[65vh] w-full max-w-2xl items-center justify-center px-4 py-12 sm:px-6">
            <div className="w-full rounded-3xl border bg-card p-7 text-center shadow-sm sm:p-10">
                <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <SearchIcon />
                </div>

                <p className="mt-5 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                    404 · Not found
                </p>

                <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                    We couldn&apos;t find
                    that resource
                </h1>

                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
                    It may have been
                    removed, the link may
                    be incorrect, or you
                    may not have access to
                    it.
                </p>

                <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                    <Link
                        href="/dashboard"
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                        Dashboard
                        <ArrowIcon />
                    </Link>

                    <Link
                        href="/dashboard/notes"
                        className="inline-flex h-10 items-center justify-center rounded-xl border bg-background px-4 text-sm font-semibold transition-colors hover:bg-muted"
                    >
                        Browse notes
                    </Link>
                </div>
            </div>
        </main>
    );
}