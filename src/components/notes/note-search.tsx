"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function NoteSearch() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentQuery = searchParams.get("query") ?? "";

    function handleSearch(value: string) {
        const params = new URLSearchParams(searchParams.toString());

        if (value.trim()) {
            params.set("query", value);
        } else {
            params.delete("query");
        }

        router.push(`/dashboard/notes?${params.toString()}`);
    }

    return (
        <input
            type="search"
            defaultValue={currentQuery}
            onChange={(event) => handleSearch(event.target.value)}
            placeholder="Search your notes..."
            className="w-full rounded-md border px-3 py-2"
        />
    );
}