"use client";

import { useRouter } from "next/navigation";

export function NoteModalClose() {
    const router = useRouter();

    return (
        <button
            type="button"
            onClick={() => router.back()}
            className="cursor-pointer rounded-md border px-3 py-1.5 text-sm"
        >
            Close
        </button>
    );
}