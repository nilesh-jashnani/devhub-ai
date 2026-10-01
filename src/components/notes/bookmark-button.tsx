"use client";

import {
    startTransition,
    useOptimistic,
} from "react";

import { toggleBookmark } from "@/actions/notes";

type BookmarkButtonProps = {
    noteId: string;
    isBookmarked: boolean;
};

function BookmarkIcon({
    filled,
}: {
    filled: boolean;
}) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill={
                filled
                    ? "currentColor"
                    : "none"
            }
            stroke="currentColor"
            strokeWidth="1.8"
            className="size-4"
            aria-hidden="true"
        >
            <path d="M6.75 4.5A1.5 1.5 0 0 1 8.25 3h7.5a1.5 1.5 0 0 1 1.5 1.5V21L12 17.75 6.75 21z" />
        </svg>
    );
}

export function BookmarkButton({
    noteId,
    isBookmarked,
}: BookmarkButtonProps) {
    const [
        optimisticBookmarked,
        setOptimisticBookmarked,
    ] = useOptimistic(isBookmarked);

    async function handleBookmark(
        formData: FormData,
    ) {
        startTransition(() => {
            setOptimisticBookmarked(
                !optimisticBookmarked,
            );
        });

        await toggleBookmark(
            formData,
        );
    }

    return (
        <form action={handleBookmark}>
            <input
                type="hidden"
                name="noteId"
                value={noteId}
            />

            <button
                type="submit"
                aria-pressed={
                    optimisticBookmarked
                }
                className={
                    optimisticBookmarked
                        ? "inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-xl border border-primary/20 bg-primary/10 px-4 text-sm font-semibold text-primary transition-colors hover:bg-primary/15"
                        : "inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-xl border bg-background px-4 text-sm font-semibold transition-colors hover:bg-muted"
                }
            >
                <BookmarkIcon
                    filled={
                        optimisticBookmarked
                    }
                />

                {optimisticBookmarked
                    ? "Bookmarked"
                    : "Bookmark"}
            </button>
        </form>
    );
}