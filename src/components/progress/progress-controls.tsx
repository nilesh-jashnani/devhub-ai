"use client";

import {
    startTransition,
    useOptimistic,
    useState,
} from "react";

type ProgressControlsProps = {
    noteId: string;
    initialCompleted: boolean;
    initialScore: number | null;
};

type ProgressState = {
    completed: boolean;
    score: number | null;
};

function CheckIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="size-4"
            aria-hidden="true"
        >
            <path d="m5 12 4 4L19 6" />
        </svg>
    );
}

function SaveIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="size-4"
            aria-hidden="true"
        >
            <path d="M5 3h12l2 2v16H5z" />
            <path d="M8 3v6h8V3" />
            <path d="M8 21v-7h8v7" />
        </svg>
    );
}

function LoadingIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            className="size-4 animate-spin"
            aria-hidden="true"
        >
            <circle
                cx="12"
                cy="12"
                r="9"
                stroke="currentColor"
                strokeWidth="3"
                className="opacity-25"
            />

            <path
                d="M21 12a9 9 0 0 0-9-9"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
            />
        </svg>
    );
}

export function ProgressControls({
    noteId,
    initialCompleted,
    initialScore,
}: ProgressControlsProps) {
    const [progress, setProgress] =
        useState<ProgressState>({
            completed:
                initialCompleted,
            score: initialScore,
        });

    const [
        optimisticProgress,
        setOptimisticProgress,
    ] = useOptimistic(progress);

    const [saving, setSaving] =
        useState(false);

    const [message, setMessage] =
        useState("");

    const [error, setError] =
        useState("");

    async function saveProgress(
        nextProgress: ProgressState,
    ) {
        setSaving(true);
        setMessage("");
        setError("");

        try {
            const response =
                await fetch(
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
                                nextProgress.completed,
                            score:
                                nextProgress.score,
                        }),
                    },
                );

            const data =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error ??
                    "Unable to save progress.",
                );
            }

            setProgress(
                nextProgress,
            );

            setMessage(
                "Progress saved.",
            );
        } catch (error) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "Unable to save progress.";

            setError(
                errorMessage,
            );

            throw error;
        } finally {
            setSaving(false);
        }
    }

    function handleCompletedChange() {
        const nextProgress = {
            ...progress,
            completed:
                !optimisticProgress.completed,
        };

        startTransition(
            async () => {
                setOptimisticProgress(
                    nextProgress,
                );

                try {
                    await saveProgress(
                        nextProgress,
                    );
                } catch {
                    // useOptimistic falls back
                    // to the confirmed state.
                }
            },
        );
    }

    function handleScoreChange(
        nextScore: number,
    ) {
        setProgress(
            (current) => ({
                ...current,
                score: nextScore,
            }),
        );

        setMessage("");
    }

    function handleSaveScore() {
        const nextProgress = {
            completed:
                optimisticProgress.completed,
            score: progress.score,
        };

        startTransition(
            async () => {
                setOptimisticProgress(
                    nextProgress,
                );

                try {
                    await saveProgress(
                        nextProgress,
                    );
                } catch {
                    // Server error is
                    // displayed below.
                }
            },
        );
    }

    const score =
        progress.score ?? 0;

    const confidenceLabel =
        score < 40
            ? "Needs practice"
            : score < 70
                ? "Developing"
                : score < 90
                    ? "Confident"
                    : "Strong";

    return (
        <section className="overflow-hidden rounded-2xl border bg-card shadow-sm">
            <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
                <div className="border-b p-5 sm:p-6 lg:border-b-0 lg:border-r">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                        Completion
                    </p>

                    <button
                        type="button"
                        onClick={
                            handleCompletedChange
                        }
                        disabled={saving}
                        aria-pressed={
                            optimisticProgress.completed
                        }
                        className="group mt-4 flex w-full cursor-pointer items-center gap-4 rounded-xl border bg-background p-4 text-left transition-colors hover:bg-muted/50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        <span
                            className={
                                optimisticProgress.completed
                                    ? "flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground"
                                    : "flex size-10 shrink-0 items-center justify-center rounded-xl border bg-muted/30 text-muted-foreground"
                            }
                        >
                            <CheckIcon />
                        </span>

                        <span className="min-w-0">
                            <span className="block text-sm font-semibold">
                                {optimisticProgress.completed
                                    ? "Topic completed"
                                    : "Mark as completed"}
                            </span>

                            <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                                {optimisticProgress.completed
                                    ? "You have marked this topic as learned."
                                    : "Mark this when you feel comfortable with the topic."}
                            </span>
                        </span>
                    </button>
                </div>

                <div className="p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-5">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                                Confidence
                            </p>

                            <h3 className="mt-2 font-semibold">
                                How well do you
                                understand this
                                topic?
                            </h3>
                        </div>

                        <div className="shrink-0 text-right">
                            <div className="text-2xl font-bold tracking-tight text-primary">
                                {score}%
                            </div>

                            <div className="mt-0.5 text-xs font-medium text-muted-foreground">
                                {
                                    confidenceLabel
                                }
                            </div>
                        </div>
                    </div>

                    <div className="mt-7">
                        <input
                            id="score"
                            type="range"
                            min="0"
                            max="100"
                            step="5"
                            value={score}
                            disabled={saving}
                            aria-label="Confidence score"
                            aria-valuetext={`${score}% — ${confidenceLabel}`}
                            onChange={(
                                event,
                            ) =>
                                handleScoreChange(
                                    Number(
                                        event
                                            .target
                                            .value,
                                    ),
                                )
                            }
                            className="w-full cursor-pointer accent-primary disabled:cursor-not-allowed disabled:opacity-50"
                        />

                        <div className="mt-2 flex justify-between text-[11px] font-medium text-muted-foreground">
                            <span>
                                Need practice
                            </span>

                            <span>
                                Developing
                            </span>

                            <span>
                                Strong
                            </span>
                        </div>
                    </div>

                    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div
                            className="min-h-5 text-sm"
                            aria-live="polite"
                        >
                            {message && (
                                <p
                                    role="status"
                                    className="font-medium text-primary"
                                >
                                    {
                                        message
                                    }
                                </p>
                            )}

                            {error && (
                                <p
                                    role="alert"
                                    className="text-destructive"
                                >
                                    {error}
                                </p>
                            )}
                        </div>

                        <button
                            type="button"
                            onClick={
                                handleSaveScore
                            }
                            disabled={saving}
                            className="inline-flex h-10 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {saving ? (
                                <>
                                    <LoadingIcon />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <SaveIcon />
                                    Save progress
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}