import { Suspense } from "react";
import { connection } from "next/server";

import { db } from "@/prisma/db";
import { APP_NAME } from "@/lib/constants";

function AIUsageLoading() {
    return (
        <div className="mt-8 overflow-hidden rounded-xl border">
            <div className="space-y-3 p-6">
                {Array.from({
                    length: 6,
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

async function AIUsageContent() {
    await connection();

    const generations =
        await db.orm.public.AiGeneration
            .orderBy((generation) =>
                generation.createdAt.desc(),
            )
            .limit(100)
            .all();

    if (generations.length === 0) {
        return (
            <div className="mt-8 rounded-xl border p-8 text-center text-muted-foreground">
                No AI generations found.
            </div>
        );
    }

    return (
        <div className="mt-8 overflow-x-auto rounded-xl border">
            <table className="w-full text-sm">
                <thead className="border-b bg-muted/40">
                    <tr>
                        <th className="px-4 py-3 text-left font-medium">
                            Type
                        </th>

                        <th className="px-4 py-3 text-left font-medium">
                            User
                        </th>

                        <th className="px-4 py-3 text-left font-medium">
                            Note
                        </th>

                        <th className="px-4 py-3 text-left font-medium">
                            Created
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {generations.map(
                        (generation) => (
                            <tr
                                key={
                                    generation.id
                                }
                                className="border-b last:border-b-0"
                            >
                                <td className="px-4 py-4">
                                    <span className="rounded-full border px-2.5 py-1 text-xs font-medium">
                                        {
                                            generation.type
                                        }
                                    </span>
                                </td>

                                <td className="px-4 py-4 font-mono text-xs text-muted-foreground">
                                    {
                                        generation.userId
                                    }
                                </td>

                                <td className="px-4 py-4 font-mono text-xs text-muted-foreground">
                                    {generation.noteId ??
                                        "—"}
                                </td>

                                <td className="px-4 py-4 text-muted-foreground">
                                    {new Date(
                                        Number(
                                            generation
                                                .createdAt
                                                .epochMilliseconds,
                                        ),
                                    ).toLocaleString()}
                                </td>
                            </tr>
                        ),
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default function AdminAIPage() {
    return (
        <main className="mx-auto max-w-7xl p-8">
            <div>
                <h1 className="text-3xl font-bold">
                    AI Usage
                </h1>

                <p className="mt-2 text-muted-foreground">
                    Recent AI generation activity
                    across {APP_NAME}.
                </p>
            </div>

            <Suspense
                fallback={
                    <AIUsageLoading />
                }
            >
                <AIUsageContent />
            </Suspense>
        </main>
    );
}