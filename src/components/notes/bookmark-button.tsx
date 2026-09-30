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

        await toggleBookmark(formData);
    }

    return (
        <form action={handleBookmark}>
            <input type="hidden" name="noteId" value={noteId} />

            <button
                type="submit"
                className="rounded-md border px-4 py-2 text-sm cursor-pointer"
                aria-pressed={
                    optimisticBookmarked
                }
            >
                {optimisticBookmarked ? "Bookmarked" : "Bookmark"}
            </button>
        </form>
    );
}