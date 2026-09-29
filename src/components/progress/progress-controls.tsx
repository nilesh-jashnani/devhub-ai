"use client";

import { useState } from "react";

type ProgressControlsProps = {
    noteId: string;
    initialCompleted: boolean;
    initialScore: number | null;
};

export function ProgressControls({
    noteId,
    initialCompleted,
    initialScore,
}: ProgressControlsProps) {
    const [completed, setCompleted] =
        useState(initialCompleted);

    const [score, setScore] =
        useState<number | null>(
            initialScore
        );

    const [saving, setSaving] =
        useState(false);

    const [message, setMessage] =
        useState("");

    const [error, setError] =
        useState("");

    async function saveProgress(
        nextCompleted: boolean,
        nextScore: number | null
    ) {
        setSaving(true);
        setMessage("");
        setError("");

        try {
            const response = await fetch(
                "/api/progress",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",
                    },

                    body: JSON.stringify({
                        noteId,
                        completed:
                            nextCompleted,
                        score: nextScore,
                    }),
                }
            );

            const data =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error ??
                    "Unable to save progress."
                );
            }

            setMessage(
                "Progress saved successfully."
            );
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Unable to save progress."
            );
        } finally {
            setSaving(false);
        }
    }

    async function handleCompletedChange() {
        const previousCompleted =
            completed;

        const nextCompleted =
            !completed;

        /*
         * Optimistic UI update.
         */
        setCompleted(nextCompleted);

        try {
            await saveProgress(
                nextCompleted,
                score
            );
        } catch {
            setCompleted(
                previousCompleted
            );
        }
    }

    async function handleSaveScore() {
        await saveProgress(
            completed,
            score
        );
    }

    return (
        <section className="rounded-xl border p-6">
            <div>
                <h2 className="text-lg font-semibold">
                    Learning Progress
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                    Track how confident you are
                    with this topic.
                </p>
            </div>

            <div className="mt-6">
                <label className="flex cursor-pointer items-center gap-3">
                    <input
                        type="checkbox"
                        checked={
                            completed
                        }
                        disabled={saving}
                        onChange={
                            handleCompletedChange
                        }
                        className="h-4 w-4"
                    />

                    <span className="text-sm font-medium">
                        Mark this topic as
                        completed
                    </span>
                </label>
            </div>

            <div className="mt-6">
                <div className="mb-2 flex items-center justify-between">
                    <label
                        htmlFor="score"
                        className="text-sm font-medium"
                    >
                        Understanding score
                    </label>

                    <span className="text-sm font-semibold">
                        {score ?? 0}%
                    </span>
                </div>

                <input
                    id="score"
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={score ?? 0}
                    disabled={saving}
                    onChange={(event) =>
                        setScore(
                            Number(
                                event.target
                                    .value
                            )
                        )
                    }
                    className="w-full cursor-pointer"
                />

                <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                    <span>Need practice</span>
                    <span>Confident</span>
                </div>

                <button
                    type="button"
                    onClick={
                        handleSaveScore
                    }
                    disabled={saving}
                    className="mt-4 cursor-pointer rounded-md border px-4 py-2 text-sm hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {saving
                        ? "Saving..."
                        : "Save progress"}
                </button>
            </div>

            {message && (
                <p className="mt-4 text-sm text-green-600">
                    {message}
                </p>
            )}

            {error && (
                <p className="mt-4 text-sm text-destructive">
                    {error}
                </p>
            )}
        </section>
    );
}