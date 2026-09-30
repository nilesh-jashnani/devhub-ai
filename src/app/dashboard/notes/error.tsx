"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function NotesError({
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
            "Notes error:",
            error
        );
    }, [error]);
    return (
        <div className="mx-auto max-w-xl py-16 text-center">
            <h2 className="text-2xl font-bold">
                Unable to load notes
            </h2>

            <p className="mt-3 text-muted-foreground">
                Something went wrong while
                loading your notes.
            </p>

            <div className="mt-6 flex justify-center gap-3">
                <button
                    type="button"
                    onClick={reset}
                    className="cursor-pointer rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground"
                >
                    Try again
                </button>

                <Link
                    href="/dashboard"
                    className="rounded-md border px-4 py-2 text-sm"
                >
                    Dashboard
                </Link>
            </div>
        </div>
    );
}