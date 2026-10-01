"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
    ArrowLeft,
    RefreshCw,
    ShieldAlert,
} from "lucide-react";

import { APP_NAME } from "@/lib/constants";

export default function AdminError({
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
            "Admin error:",
            error,
        );
    }, [error]);

    return (
        <main className="mx-auto flex min-h-[65vh] w-full max-w-2xl items-center justify-center px-4 py-12 sm:px-6">
            <div className="w-full rounded-3xl border bg-card p-7 text-center shadow-sm sm:p-10">
                <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
                    <ShieldAlert
                        className="size-6"
                        aria-hidden="true"
                    />
                </div>

                <p className="mt-5 text-sm font-semibold text-destructive">
                    Administration error
                </p>

                <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                    We couldn&apos;t load
                    this admin section
                </h1>

                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
                    {APP_NAME} encountered
                    an unexpected problem
                    while loading
                    administration data.
                    Retry the request or
                    return to your
                    dashboard.
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
                        <RefreshCw
                            className="size-4"
                            aria-hidden="true"
                        />
                        Try again
                    </button>

                    <Link
                        href="/dashboard"
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border bg-background px-4 text-sm font-semibold transition-colors hover:bg-muted"
                    >
                        <ArrowLeft
                            className="size-4"
                            aria-hidden="true"
                        />
                        Dashboard
                    </Link>
                </div>
            </div>
        </main>
    );
}