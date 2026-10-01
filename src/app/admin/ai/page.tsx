import { Suspense } from "react";
import { connection } from "next/server";
import {
    Brain,
    FileText,
    Sparkles,
    User,
} from "lucide-react";

import { db } from "@/prisma/db";
import { APP_NAME } from "@/lib/constants";

function AIUsageLoading() {
    return (
        <div
            className="mt-8 overflow-hidden rounded-2xl border bg-card"
            aria-busy="true"
        >
            <span className="sr-only">
                Loading AI activity...
            </span>

            <div className="space-y-3 p-5">
                {Array.from({
                    length: 7,
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
            <div className="mt-8 rounded-2xl border bg-card p-10 text-center">
                <div className="mx-auto flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Sparkles className="size-5" />
                </div>

                <h2 className="mt-4 font-semibold">
                    No AI activity yet
                </h2>

                <p className="mt-2 text-sm text-muted-foreground">
                    AI generations will
                    appear here as users
                    interact with the AI
                    learning tools.
                </p>
            </div>
        );
    }

    return (
        <div className="mt-8 overflow-hidden rounded-2xl border bg-card shadow-sm">
            <div className="border-b bg-muted/20 px-5 py-3">
                <p className="text-xs text-muted-foreground">
                    Showing up to the 100
                    most recent generations.
                </p>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full min-w-[800px] text-left text-sm">
                    <thead className="border-b bg-muted/30">
                        <tr>
                            <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                Generation type
                            </th>

                            <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                User
                            </th>

                            <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                Source note
                            </th>

                            <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                Created
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {generations.map(
                            (
                                generation,
                            ) => (
                                <tr
                                    key={
                                        generation.id
                                    }
                                    className="border-b transition-colors last:border-0 hover:bg-muted/20"
                                >
                                    <td className="px-5 py-4">
                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                                            <Sparkles className="size-3" />

                                            {
                                                generation.type
                                            }
                                        </span>
                                    </td>

                                    <td className="px-5 py-4">
                                        <div className="flex max-w-[220px] items-center gap-2 text-muted-foreground">
                                            <User className="size-3.5 shrink-0" />

                                            <code className="truncate font-mono text-xs">
                                                {
                                                    generation.userId
                                                }
                                            </code>
                                        </div>
                                    </td>

                                    <td className="px-5 py-4">
                                        {generation.noteId ? (
                                            <div className="flex max-w-[220px] items-center gap-2 text-muted-foreground">
                                                <FileText className="size-3.5 shrink-0" />

                                                <code className="truncate font-mono text-xs">
                                                    {
                                                        generation.noteId
                                                    }
                                                </code>
                                            </div>
                                        ) : (
                                            <span className="text-muted-foreground">
                                                —
                                            </span>
                                        )}
                                    </td>

                                    <td className="px-5 py-4 whitespace-nowrap text-muted-foreground">
                                        {new Date(
                                            Number(
                                                generation
                                                    .createdAt
                                                    .epochMilliseconds,
                                            ),
                                        ).toLocaleString(
                                            undefined,
                                            {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                                hour: "numeric",
                                                minute: "2-digit",
                                            },
                                        )}
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

export default function AdminAIPage() {
    return (
        <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
            <div>
                <div className="inline-flex items-center gap-2 rounded-full border bg-primary/[0.05] px-3 py-1.5 text-xs font-semibold text-primary">
                    <Brain className="size-3.5" />
                    AI observability
                </div>

                <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                    AI usage
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                    Inspect recent AI
                    generation activity
                    across {APP_NAME} and
                    understand how the
                    platform&apos;s AI
                    features are being used.
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