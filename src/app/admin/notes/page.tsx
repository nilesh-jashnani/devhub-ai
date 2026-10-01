import { Suspense } from "react";
import { connection } from "next/server";
import {
    Eye,
    EyeOff,
    FileText,
} from "lucide-react";

import { db } from "@/prisma/db";
import { updateNotePublished } from "@/actions/admin";

function NotesTableLoading() {
    return (
        <div
            className="mt-8 overflow-hidden rounded-2xl border bg-card"
            aria-busy="true"
        >
            <span className="sr-only">
                Loading notes...
            </span>

            <div className="space-y-3 p-5">
                {Array.from({
                    length: 6,
                }).map((_, index) => (
                    <div
                        key={index}
                        className="h-14 animate-pulse rounded-xl bg-muted"
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
                note.createdAt.desc(),
            )
            .all();

    if (notes.length === 0) {
        return (
            <div className="mt-8 rounded-2xl border bg-card p-10 text-center">
                <div className="mx-auto flex size-11 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                    <FileText className="size-5" />
                </div>

                <h2 className="mt-4 font-semibold">
                    No notes found
                </h2>

                <p className="mt-2 text-sm text-muted-foreground">
                    Notes created by users
                    will appear here.
                </p>
            </div>
        );
    }

    return (
        <div className="mt-8 overflow-hidden rounded-2xl border bg-card shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full min-w-[980px] text-left text-sm">
                    <thead className="border-b bg-muted/30">
                        <tr>
                            <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                Note
                            </th>

                            <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                Slug
                            </th>

                            <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                Author
                            </th>

                            <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                Status
                            </th>

                            <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                Created
                            </th>

                            <th className="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                Action
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {notes.map(
                            (note) => (
                                <tr
                                    key={
                                        note.id
                                    }
                                    className="border-b transition-colors last:border-0 hover:bg-muted/20"
                                >
                                    <td className="max-w-[260px] px-5 py-4">
                                        <p className="truncate font-semibold">
                                            {
                                                note.title
                                            }
                                        </p>
                                    </td>

                                    <td className="max-w-[220px] px-5 py-4">
                                        <code className="block truncate font-mono text-xs text-muted-foreground">
                                            {
                                                note.slug
                                            }
                                        </code>
                                    </td>

                                    <td className="max-w-[180px] px-5 py-4">
                                        <code className="block truncate font-mono text-xs text-muted-foreground">
                                            {
                                                note.authorId
                                            }
                                        </code>
                                    </td>

                                    <td className="px-5 py-4">
                                        <span
                                            className={
                                                note.published
                                                    ? "inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary"
                                                    : "inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground"
                                            }
                                        >
                                            {note.published ? (
                                                <Eye className="size-3" />
                                            ) : (
                                                <EyeOff className="size-3" />
                                            )}

                                            {note.published
                                                ? "Published"
                                                : "Draft"}
                                        </span>
                                    </td>

                                    <td className="px-5 py-4 text-muted-foreground">
                                        {new Date(
                                            Number(
                                                note
                                                    .createdAt
                                                    .epochMilliseconds,
                                            ),
                                        ).toLocaleDateString(
                                            undefined,
                                            {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                            },
                                        )}
                                    </td>

                                    <td className="px-5 py-4 text-right">
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
                                                className="inline-flex cursor-pointer items-center gap-2 rounded-lg border bg-background px-3 py-2 text-xs font-semibold transition-colors hover:bg-muted"
                                            >
                                                {note.published ? (
                                                    <EyeOff className="size-3.5" />
                                                ) : (
                                                    <Eye className="size-3.5" />
                                                )}

                                                {note.published
                                                    ? "Unpublish"
                                                    : "Publish"}
                                            </button>
                                        </form>
                                    </td>
                                </tr>
                            ),
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default function AdminNotesPage() {
    return (
        <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
            <div>
                <div className="inline-flex items-center gap-2 rounded-full border bg-primary/[0.05] px-3 py-1.5 text-xs font-semibold text-primary">
                    <FileText className="size-3.5" />
                    Content management
                </div>

                <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                    Notes
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                    Review knowledge
                    created across the
                    platform and control
                    whether notes are
                    publicly available.
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