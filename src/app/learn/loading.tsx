import {
    BookOpen,
} from "lucide-react";

export default function LearnLoading() {
    return (
        <main
            className="min-h-screen bg-background"
            aria-busy="true"
            aria-live="polite"
        >
            <span className="sr-only">
                Loading knowledge library...
            </span>

            <section className="border-b bg-muted/20">
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
                    <div className="max-w-3xl">
                        <div className="flex h-7 w-56 animate-pulse items-center rounded-full bg-muted" />

                        <div className="mt-5 h-12 w-full max-w-2xl animate-pulse rounded-xl bg-muted" />

                        <div className="mt-3 h-12 w-4/5 max-w-xl animate-pulse rounded-xl bg-muted" />

                        <div className="mt-5 h-5 w-full max-w-xl animate-pulse rounded bg-muted" />

                        <div className="mt-2 h-5 w-4/5 max-w-lg animate-pulse rounded bg-muted" />
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="flex items-center gap-2">
                    <BookOpen className="size-4 text-muted-foreground" />

                    <div className="h-5 w-40 animate-pulse rounded bg-muted" />
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {Array.from({
                        length: 6,
                    }).map((_, index) => (
                        <div
                            key={index}
                            className="h-64 animate-pulse rounded-2xl border bg-muted/30"
                        />
                    ))}
                </div>
            </section>
        </main>
    );
}