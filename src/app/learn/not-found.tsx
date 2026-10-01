import Link from "next/link";
import {
    ArrowLeft,
    BookOpen,
    SearchX,
} from "lucide-react";

export default function LearnNotFound() {
    return (
        <main className="flex min-h-[70vh] items-center justify-center px-4 py-12 sm:px-6">
            <div className="w-full max-w-xl rounded-3xl border bg-card p-7 text-center shadow-sm sm:p-10">
                <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
                    <SearchX
                        className="size-6"
                        aria-hidden="true"
                    />
                </div>

                <p className="mt-5 text-sm font-semibold text-muted-foreground">
                    404 · Knowledge library
                </p>

                <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                    Note not found
                </h1>

                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
                    This note may not exist,
                    may have moved, or is no
                    longer publicly available.
                </p>

                <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                    <Link
                        href="/learn"
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                        <BookOpen className="size-4" />
                        Browse notes
                    </Link>

                    <Link
                        href="/"
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border bg-background px-4 text-sm font-semibold transition-colors hover:bg-muted"
                    >
                        <ArrowLeft className="size-4" />
                        Home
                    </Link>
                </div>
            </div>
        </main>
    );
}