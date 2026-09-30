import { Suspense } from "react";
import { connection } from "next/server";

import { db } from "@/prisma/db";
import {
    updateNotePublished,
} from "@/actions/admin";

function NotesTableLoading() {
    return (
        <div className="mt-8 overflow-hidden rounded-xl border">
            <div className="space-y-3 p-6">
                {Array.from({
                    length: 5,
                }).map((_, index) => (
                    <div
                        key={index}
                        className="h-12 animate-pulse rounded-md bg-muted"
                    />
                ))}
            </div>
        </div>
    );
}

async function AdminNotesTable() {
    await connection();

    const notes =
        await db.orm.public.Note
            .orderBy((note) =>
                note.createdAt.desc()
            )
            .all();

    if (notes.length === 0) {
        return (
            <div className="mt-8 rounded-xl border p-8 text-center">
                <h2 className="font-semibold">
                    No notes found
                </h2>

                <p className="mt-2 text-sm text-muted-foreground">
                    Notes created by users will
                    appear here.
                </p>
            </div>
        );
    }

    return (
        <div className="mt-8 overflow-x-auto rounded-xl border">
            <table className="w-full text-left text-sm">
                <thead className="border-b bg-muted/40">
                    <tr>
                        <th className="px-4 py-3 font-medium">
                            Title
                        </th>

                        <th className="px-4 py-3 font-medium">
                            Slug
                        </th>

                        <th className="px-4 py-3 font-medium">
                            Author
                        </th>

                        <th className="px-4 py-3 font-medium">
                            Status
                        </th>

                        <th className="px-4 py-3 font-medium">
                            Created
                        </th>

                        <th className="px-4 py-3 font-medium">
                            Action
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {notes.map((note) => (
                        <tr
                            key={note.id}
                            className="border-b last:border-b-0"
                        >
                            <td className="px-4 py-4 font-medium">
                                {note.title}
                            </td>

                            <td className="px-4 py-4 text-muted-foreground">
                                {note.slug}
                            </td>

                            <td className="px-4 py-4 text-muted-foreground">
                                {note.authorId}
                            </td>

                            <td className="px-4 py-4">
                                <span className="rounded-full border px-2.5 py-1 text-xs">
                                    {note.published
                                        ? "Published"
                                        : "Draft"}
                                </span>
                            </td>

                            <td className="px-4 py-4 text-muted-foreground">
                                {new Date(
                                    Number(
                                        note
                                            .createdAt
                                            .epochMilliseconds,
                                    ),
                                ).toLocaleDateString()}
                            </td>

                            <td className="px-4 py-4">
                                <form
                                    action={
                                        updateNotePublished
                                    }
                                >
                                    <input
                                        type="hidden"
                                        name="noteId"
                                        value={
                                            note.id
                                        }
                                    />

                                    <input
                                        type="hidden"
                                        name="published"
                                        value={
                                            note.published
                                                ? "false"
                                                : "true"
                                        }
                                    />

                                    <button
                                        type="submit"
                                        className="rounded-md border px-3 py-2 text-xs font-medium transition-colors hover:bg-muted"
                                    >
                                        {note.published
                                            ? "Unpublish"
                                            : "Publish"}
                                    </button>
                                </form>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default function AdminNotesPage() {
    return (
        <main className="mx-auto max-w-7xl px-6 py-8">
            <div>
                <p className="text-sm font-medium text-muted-foreground">
                    Content Management
                </p>

                <h1 className="mt-1 text-3xl font-bold tracking-tight">
                    Notes
                </h1>

                <p className="mt-2 text-muted-foreground">
                    Review notes and control
                    whether they are publicly
                    published.
                </p>
            </div>

            <Suspense
                fallback={
                    <NotesTableLoading />
                }
            >
                <AdminNotesTable />
            </Suspense>
        </main>
    );
}