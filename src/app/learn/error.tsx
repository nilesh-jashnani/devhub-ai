"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
    Home,
    RefreshCw,
    TriangleAlert,
} from "lucide-react";

export default function LearnError({
    error,
    reset,
}: {
    error: Error & {
        digest?: string;
    };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(
            "Knowledge library error:",
            error,
        );
    }, [error]);

    return (
        <main className="flex min-h-[70vh] items-center justify-center px-4 py-12 sm:px-6">
            <div className="w-full max-w-xl rounded-3xl border bg-card p-7 text-center shadow-sm sm:p-10">
                <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
                    <TriangleAlert
                        className="size-6"
                        aria-hidden="true"
                    />
                </div>

                <p className="mt-5 text-sm font-semibold text-destructive">
                    Knowledge library error
                </p>

                <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                    We couldn&apos;t load
                    this content
                </h1>

                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
                    Something unexpected
                    happened while loading
                    the knowledge library.
                    You can retry the request
                    or return to the home
                    page.
                </p>

                {error.digest && (
                    <p className="mt-3 font-mono text-xs text-muted-foreground">
                        Error reference:{" "}
                        {error.digest}
                    </p>
                )}

                <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                    <button
                        type="button"
                        onClick={reset}
                        className="inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                        <RefreshCw className="size-4" />
                        Try again
                    </button>

                    <Link
                        href="/"
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border bg-background px-4 text-sm font-semibold transition-colors hover:bg-muted"
                    >
                        <Home className="size-4" />
                        Home
                    </Link>
                </div>
            </div>
        </main>
    );
}