"use client";

import {
    useEffect,
    useState,
} from "react";

import {
    useRouter,
    useSearchParams,
} from "next/navigation";

function SearchIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="size-4"
            aria-hidden="true"
        >
            <circle
                cx="11"
                cy="11"
                r="7"
            />

            <path d="m20 20-4-4" />
        </svg>
    );
}

function ClearIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="size-4"
            aria-hidden="true"
        >
            <path d="m7 7 10 10" />
            <path d="m17 7-10 10" />
        </svg>
    );
}

export function NoteSearch() {
    const router = useRouter();
    const searchParams =
        useSearchParams();

    const currentQuery =
        searchParams.get("query") ?? "";

    const [value, setValue] =
        useState(currentQuery);

    useEffect(() => {
        setValue(currentQuery);
    }, [currentQuery]);

    useEffect(() => {
        const timeout = window.setTimeout(
            () => {
                const nextQuery =
                    value.trim();

                if (
                    nextQuery ===
                    currentQuery
                ) {
                    return;
                }

                const params =
                    new URLSearchParams(
                        searchParams.toString(),
                    );

                if (nextQuery) {
                    params.set(
                        "query",
                        nextQuery,
                    );
                } else {
                    params.delete(
                        "query",
                    );
                }

                const queryString =
                    params.toString();

                router.replace(
                    queryString
                        ? `/dashboard/notes?${queryString}`
                        : "/dashboard/notes",
                );
            },
            300,
        );

        return () => {
            window.clearTimeout(
                timeout,
            );
        };
    }, [
        value,
        currentQuery,
        router,
        searchParams,
    ]);

    return (
        <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted-foreground">
                <SearchIcon />
            </div>

            <input
                type="search"
                value={value}
                onChange={(event) =>
                    setValue(
                        event.target.value,
                    )
                }
                placeholder="Search your notes..."
                aria-label="Search notes"
                className="h-11 w-full rounded-xl border bg-background py-2 pl-10 pr-10 text-sm shadow-xs outline-none transition-[border-color,box-shadow] placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/20"
            />

            {value && (
                <button
                    type="button"
                    onClick={() =>
                        setValue("")
                    }
                    aria-label="Clear search"
                    className="absolute inset-y-0 right-0 flex cursor-pointer items-center px-3.5 text-muted-foreground transition-colors hover:text-foreground"
                >
                    <ClearIcon />
                </button>
            )}
        </div>
    );
}