import { toggleBookmark } from "@/actions/notes";

type BookmarkButtonProps = {
    noteId: string;
    isBookmarked: boolean;
};

export function BookmarkButton({
    noteId,
    isBookmarked,
}: BookmarkButtonProps) {
    return (
        <form action={toggleBookmark}>
            <input type="hidden" name="noteId" value={noteId} />

            <button
                type="submit"
                className="rounded-md border px-4 py-2 text-sm cursor-pointer"
            >
                {isBookmarked ? "Bookmarked" : "Bookmark"}
            </button>
        </form>
    );
}