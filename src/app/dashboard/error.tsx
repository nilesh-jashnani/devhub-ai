"use client";

import { APP_NAME } from "@/lib/constants";
import { useEffect } from "react";

export default function DashboardError({
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
            "Dashboard error:",
            error
        );
    }, [error]);

    return (
        <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-6 text-center">
            <h1 className="text-3xl font-bold">
                Something went wrong
            </h1>

            <p className="mt-3 text-muted-foreground">
                We couldn't load this part of
                {APP_NAME}.
            </p>

            {error.digest && (
                <p className="mt-2 text-xs text-muted-foreground">
                    Error reference:{" "}
                    {error.digest}
                </p>
            )}

            <button
                type="button"
                onClick={() => reset()}
                className="mt-6 cursor-pointer rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground"
            >
                Try again
            </button>
        </div>
    );
}