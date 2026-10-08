"use client";

import { useState } from "react";

type Difficulty =
    | "EASY"
    | "MEDIUM"
    | "HARD";

type NoteOption = {
    id: string;
    title: string;
};

type InterviewQuestion = {
    question: string;
    difficulty: Difficulty;
    answer: string;
    explanation: string;
};

type InterviewResponse = {
    questions: InterviewQuestion[];
};

type InterviewPrepProps = {
    notes: NoteOption[];
};

const difficulties: {
    value: Difficulty;
    label: string;
    description: string;
}[] = [
        {
            value: "EASY",
            label: "Easy",
            description:
                "Foundations and core concepts",
        },
        {
            value: "MEDIUM",
            label: "Medium",
            description:
                "Practical interview depth",
        },
        {
            value: "HARD",
            label: "Hard",
            description:
                "Advanced reasoning and details",
        },
    ];

const questionCounts = [
    5,
    10,
    15,
    20,
];

function SparklesIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="size-4"
            aria-hidden="true"
        >
            <path d="M12 3 13.4 7.6 18 9l-4.6 1.4L12 15l-1.4-4.6L6 9l4.6-1.4z" />
            <path d="m18.5 15 .7 2.3 2.3.7-2.3.7-.7 2.3-.7-2.3-2.3-.7 2.3-.7z" />
        </svg>
    );
}

function ArrowLeftIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="size-4"
            aria-hidden="true"
        >
            <path d="m15 18-6-6 6-6" />
        </svg>
    );
}

function ArrowRightIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="size-4"
            aria-hidden="true"
        >
            <path d="m9 18 6-6-6-6" />
        </svg>
    );
}

function EyeIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="size-4"
            aria-hidden="true"
        >
            <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
            <circle
                cx="12"
                cy="12"
                r="2.5"
            />
        </svg>
    );
}

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

function RefreshIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="size-4"
            aria-hidden="true"
        >
            <path d="M20 6v5h-5" />
            <path d="M4 18v-5h5" />
            <path d="M6.1 9A7 7 0 0 1 18 6l2 5" />
            <path d="M17.9 15A7 7 0 0 1 6 18l-2-5" />
        </svg>
    );
}

export function InterviewPrep({
    notes,
}: InterviewPrepProps) {
    const [
        selectedNoteId,
        setSelectedNoteId,
    ] = useState("");

    const [
        difficulty,
        setDifficulty,
    ] =
        useState<Difficulty>("MEDIUM");

    const [
        questionCount,
        setQuestionCount,
    ] = useState(5);

    const [
        questions,
        setQuestions,
    ] = useState<
        InterviewQuestion[]
    >([]);

    const [
        currentIndex,
        setCurrentIndex,
    ] = useState(0);

    const [
        showAnswer,
        setShowAnswer,
    ] = useState(false);

    const [
        loading,
        setLoading,
    ] = useState(false);

    const [
        error,
        setError,
    ] = useState("");

    const currentQuestion =
        questions[currentIndex];

    const selectedNote =
        notes.find(
            (note) =>
                note.id ===
                selectedNoteId,
        );

    const progressPercentage =
        questions.length === 0
            ? 0
            : ((currentIndex + 1) /
                questions.length) *
            100;

    async function generateQuestions() {
        if (!selectedNoteId) {
            setError(
                "Please select a note.",
            );
            return;
        }

        setLoading(true);
        setError("");
        setQuestions([]);
        setCurrentIndex(0);
        setShowAnswer(false);

        try {
            const response =
                await fetch(
                    "/api/interview",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type":
                                "application/json",
                        },
                        body: JSON.stringify(
                            {
                                noteId:
                                    selectedNoteId,
                                difficulty,
                                questionCount,
                            },
                        ),
                    },
                );

            const data =
                (await response.json()) as
                | InterviewResponse
                | {
                    error?: string;
                };

            if (!response.ok) {
                throw new Error(
                    "error" in data &&
                        data.error
                        ? data.error
                        : "Failed to generate interview questions.",
                );
            }

            if (
                !(
                    "questions" in
                    data
                ) ||
                !Array.isArray(
                    data.questions,
                )
            ) {
                throw new Error(
                    "Invalid interview response.",
                );
            }

            setQuestions(
                data.questions,
            );
        } catch (error) {
            console.error(
                "Interview generation failed:",
                error,
            );

            setError(
                error instanceof Error
                    ? error.message
                    : "Failed to generate interview questions.",
            );
        } finally {
            setLoading(false);
        }
    }

    function nextQuestion() {
        if (
            currentIndex <
            questions.length - 1
        ) {
            setCurrentIndex(
                (index) =>
                    index + 1,
            );
            setShowAnswer(false);
        }
    }

    function previousQuestion() {
        if (currentIndex > 0) {
            setCurrentIndex(
                (index) =>
                    index - 1,
            );
            setShowAnswer(false);
        }
    }

    function resetInterview() {
        setQuestions([]);
        setCurrentIndex(0);
        setShowAnswer(false);
        setError("");
    }

    if (notes.length === 0) {
        return (
            <div className="rounded-2xl border border-dashed bg-card px-6 py-14 text-center shadow-sm">
                <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <SparklesIcon />
                </div>

                <h2 className="mt-5 text-lg font-semibold tracking-tight">
                    Create a note first
                </h2>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                    Interview Prep uses
                    your developer notes as
                    context for generating
                    relevant technical
                    questions.
                </p>

                <a
                    href="/dashboard/notes/new"
                    className="mt-6 inline-flex h-10 items-center justify-center rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors cursor-pointer hover:bg-primary/90"
                >
                    Create your first note
                </a>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <section className="overflow-hidden rounded-2xl border bg-card shadow-sm">
                <div className="border-b px-5 py-5 sm:px-6">
                    <div className="flex items-start gap-3">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <SparklesIcon />
                        </div>

                        <div>
                            <h2 className="font-semibold tracking-tight">
                                Configure
                                interview
                            </h2>

                            <p className="mt-1 text-sm leading-6 text-muted-foreground">
                                Choose what
                                you want to
                                practice and
                                let AI build
                                your session.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="space-y-7 p-5 sm:p-6">
                    <div className="space-y-2">
                        <label
                            htmlFor="interview-note"
                            className="text-sm font-semibold"
                        >
                            Source note
                        </label>

                        <p className="text-xs text-muted-foreground">
                            Questions will
                            be generated
                            from this note.
                        </p>

                        <select
                            id="interview-note"
                            value={
                                selectedNoteId
                            }
                            onChange={(
                                event,
                            ) => {
                                setSelectedNoteId(
                                    event
                                        .target
                                        .value,
                                );
                                setError(
                                    "",
                                );
                            }}
                            disabled={
                                loading
                            }
                            className="h-11 w-full rounded-xl border bg-background px-3 text-sm outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            <option value="">
                                Select a
                                developer
                                note
                            </option>

                            {notes.map(
                                (note) => (
                                    <option
                                        key={
                                            note.id
                                        }
                                        value={
                                            note.id
                                        }
                                    >
                                        {
                                            note.title
                                        }
                                    </option>
                                ),
                            )}
                        </select>
                    </div>

                    <fieldset>
                        <legend className="text-sm font-semibold">
                            Difficulty
                        </legend>

                        <p className="mt-1 text-xs text-muted-foreground">
                            Choose how deep
                            the interview
                            should go.
                        </p>

                        <div className="mt-3 grid gap-3 md:grid-cols-3">
                            {difficulties.map(
                                (
                                    option,
                                ) => {
                                    const selected =
                                        difficulty ===
                                        option.value;

                                    return (
                                        <button
                                            key={
                                                option.value
                                            }
                                            type="button"
                                            disabled={
                                                loading
                                            }
                                            aria-pressed={
                                                selected
                                            }
                                            onClick={() =>
                                                setDifficulty(
                                                    option.value,
                                                )
                                            }
                                            className={`cursor-pointer rounded-xl border p-4 text-left transition-all disabled:cursor-not-allowed disabled:opacity-60 ${selected
                                                    ? "border-primary bg-primary/[0.06] ring-1 ring-primary/20"
                                                    : "bg-background hover:border-primary/30 hover:bg-muted/40"
                                                }`}
                                        >
                                            <div className="flex items-center justify-between gap-3">
                                                <span className="text-sm font-semibold">
                                                    {
                                                        option.label
                                                    }
                                                </span>

                                                <span
                                                    className={`flex size-5 items-center justify-center rounded-full border ${selected
                                                            ? "border-primary bg-primary text-primary-foreground"
                                                            : "text-transparent"
                                                        }`}
                                                >
                                                    <CheckIcon />
                                                </span>
                                            </div>

                                            <p className="mt-2 text-xs leading-5 text-muted-foreground">
                                                {
                                                    option.description
                                                }
                                            </p>
                                        </button>
                                    );
                                },
                            )}
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend className="text-sm font-semibold">
                            Number of
                            questions
                        </legend>

                        <p className="mt-1 text-xs text-muted-foreground">
                            Pick a shorter
                            practice round
                            or a longer
                            session.
                        </p>

                        <div className="mt-3 flex flex-wrap gap-2">
                            {questionCounts.map(
                                (count) => {
                                    const selected =
                                        questionCount ===
                                        count;

                                    return (
                                        <button
                                            key={
                                                count
                                            }
                                            type="button"
                                            disabled={
                                                loading
                                            }
                                            aria-pressed={
                                                selected
                                            }
                                            onClick={() =>
                                                setQuestionCount(
                                                    count,
                                                )
                                            }
                                            className={`h-10 min-w-16 cursor-pointer rounded-xl border px-4 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${selected
                                                    ? "border-primary bg-primary text-primary-foreground"
                                                    : "bg-background hover:bg-muted"
                                                }`}
                                        >
                                            {
                                                count
                                            }
                                        </button>
                                    );
                                },
                            )}
                        </div>
                    </fieldset>

                    <div className="flex flex-col gap-3 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
                        <div className="text-xs leading-5 text-muted-foreground">
                            {selectedNote ? (
                                <>
                                    Ready to
                                    generate{" "}
                                    <span className="font-semibold text-foreground">
                                        {
                                            questionCount
                                        }{" "}
                                        {
                                            difficulty.toLowerCase()
                                        }
                                    </span>{" "}
                                    questions
                                    from{" "}
                                    <span className="font-semibold text-foreground">
                                        {
                                            selectedNote.title
                                        }
                                    </span>
                                    .
                                </>
                            ) : (
                                "Select a note to begin your interview."
                            )}
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {questions.length >
                                0 &&
                                !loading && (
                                    <button
                                        type="button"
                                        onClick={
                                            resetInterview
                                        }
                                        className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl border bg-background px-4 text-sm font-semibold transition-colors hover:bg-muted"
                                    >
                                        <RefreshIcon />
                                        New
                                        interview
                                    </button>
                                )}

                            <button
                                type="button"
                                onClick={
                                    generateQuestions
                                }
                                disabled={
                                    loading ||
                                    !selectedNoteId
                                }
                                className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <SparklesIcon />

                                {loading
                                    ? "Generating..."
                                    : "Generate interview"}
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {error && (
                <div
                    role="alert"
                    className="rounded-2xl border border-destructive/30 bg-destructive/[0.06] p-5"
                >
                    <p className="text-sm font-semibold text-destructive">
                        Interview
                        generation
                        failed
                    </p>

                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        {error}
                    </p>

                    <button
                        type="button"
                        onClick={
                            generateQuestions
                        }
                        disabled={
                            loading ||
                            !selectedNoteId
                        }
                        className="mt-4 inline-flex h-9 cursor-pointer items-center justify-center rounded-lg border bg-background px-3 text-sm font-semibold transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Retry
                    </button>
                </div>
            )}

            {loading && (
                <InterviewSkeleton />
            )}

            {!loading &&
                currentQuestion && (
                    <section className="overflow-hidden rounded-2xl border bg-card shadow-sm">
                        <div className="border-b px-5 py-5 sm:px-7">
                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                                        Interview
                                        session
                                    </p>

                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Question{" "}
                                        {currentIndex +
                                            1}{" "}
                                        of{" "}
                                        {
                                            questions.length
                                        }
                                    </p>
                                </div>

                                <DifficultyBadge
                                    difficulty={
                                        currentQuestion.difficulty
                                    }
                                />
                            </div>

                            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-muted">
                                <div
                                    className="h-full rounded-full bg-primary transition-all duration-300"
                                    style={{
                                        width: `${progressPercentage}%`,
                                    }}
                                />
                            </div>
                        </div>

                        <div className="p-5 sm:p-7">
                            <div className="max-w-4xl">
                                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                                    Question
                                </p>

                                <h2 className="mt-3 text-xl font-semibold leading-8 tracking-tight sm:text-2xl sm:leading-9">
                                    {
                                        currentQuestion.question
                                    }
                                </h2>
                            </div>

                            {!showAnswer ? (
                                <div className="mt-8 rounded-2xl border border-dashed bg-muted/20 p-5 sm:p-6">
                                    <p className="text-sm font-semibold">
                                        Think
                                        through
                                        your
                                        answer
                                        first.
                                    </p>

                                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                                        Explain
                                        the
                                        concept
                                        as if
                                        you were
                                        speaking
                                        to an
                                        interviewer,
                                        then
                                        compare
                                        your
                                        answer.
                                    </p>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowAnswer(
                                                true,
                                            )
                                        }
                                        className="mt-5 inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                                    >
                                        <EyeIcon />
                                        Reveal
                                        answer
                                    </button>
                                </div>
                            ) : (
                                <div className="mt-8 space-y-5">
                                    <div className="rounded-2xl border bg-primary/[0.035] p-5 sm:p-6">
                                        <div className="flex items-center gap-2">
                                            <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                                <CheckIcon />
                                            </div>

                                            <h3 className="font-semibold">
                                                Suggested
                                                answer
                                            </h3>
                                        </div>

                                        <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-foreground/90 sm:text-base">
                                            {
                                                currentQuestion.answer
                                            }
                                        </p>
                                    </div>

                                    <div className="rounded-2xl border p-5 sm:p-6">
                                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                                            Why
                                            this
                                            answer
                                            works
                                        </p>

                                        <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-foreground/90 sm:text-base">
                                            {
                                                currentQuestion.explanation
                                            }
                                        </p>
                                    </div>
                                </div>
                            )}

                            <div className="mt-8 flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
                                <button
                                    type="button"
                                    onClick={
                                        previousQuestion
                                    }
                                    disabled={
                                        currentIndex ===
                                        0
                                    }
                                    className="inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-xl border bg-background px-4 text-sm font-semibold transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    <ArrowLeftIcon />
                                    Previous
                                </button>

                                <div className="text-center text-xs font-medium text-muted-foreground">
                                    {currentIndex +
                                        1}{" "}
                                    /{" "}
                                    {
                                        questions.length
                                    }
                                </div>

                                <button
                                    type="button"
                                    onClick={
                                        nextQuestion
                                    }
                                    disabled={
                                        currentIndex ===
                                        questions.length -
                                        1
                                    }
                                    className="inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-xl border bg-background px-4 text-sm font-semibold transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    Next
                                    question
                                    <ArrowRightIcon />
                                </button>
                            </div>
                        </div>
                    </section>
                )}

            {!loading &&
                !currentQuestion &&
                !error && (
                    <section className="rounded-2xl border border-dashed bg-card/50 px-6 py-12 text-center">
                        <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                            <SparklesIcon />
                        </div>

                        <h2 className="mt-5 text-lg font-semibold tracking-tight">
                            Ready for your
                            interview?
                        </h2>

                        <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-muted-foreground">
                            Select one of
                            your developer
                            notes, choose
                            the difficulty
                            and session
                            length, then
                            generate your
                            practice
                            questions.
                        </p>
                    </section>
                )}
        </div>
    );
}

function DifficultyBadge({
    difficulty,
}: {
    difficulty: Difficulty;
}) {
    const label =
        difficulty.charAt(0) +
        difficulty
            .slice(1)
            .toLowerCase();

    return (
        <span className="inline-flex items-center rounded-full border bg-background px-3 py-1 text-xs font-semibold">
            {label}
        </span>
    );
}

function InterviewSkeleton() {
    return (
        <div
            className="overflow-hidden rounded-2xl border bg-card shadow-sm"
            aria-live="polite"
            aria-busy="true"
        >
            <div className="border-b px-6 py-5">
                <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <div className="h-3 w-24 animate-pulse rounded bg-muted" />
                        <div className="h-4 w-32 animate-pulse rounded bg-muted" />
                    </div>

                    <div className="h-7 w-20 animate-pulse rounded-full bg-muted" />
                </div>

                <div className="mt-4 h-1.5 w-full animate-pulse rounded-full bg-muted" />
            </div>

            <div className="p-6 sm:p-7">
                <div className="h-3 w-20 animate-pulse rounded bg-muted" />

                <div className="mt-4 space-y-3">
                    <div className="h-6 w-full animate-pulse rounded bg-muted" />
                    <div className="h-6 w-4/5 animate-pulse rounded bg-muted" />
                </div>

                <div className="mt-8 rounded-2xl border border-dashed p-6">
                    <div className="h-4 w-40 animate-pulse rounded bg-muted" />
                    <div className="mt-3 h-4 w-full animate-pulse rounded bg-muted" />
                    <div className="mt-2 h-4 w-3/4 animate-pulse rounded bg-muted" />
                    <div className="mt-5 h-10 w-36 animate-pulse rounded-xl bg-muted" />
                </div>
            </div>
        </div>
    );
}