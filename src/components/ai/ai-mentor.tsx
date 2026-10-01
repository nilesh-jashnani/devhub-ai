"use client";

import { useState } from "react";

import { AIResponse } from "./ai-response";

type Note = {
    id: string;
    title: string;
};

type AIType =
    | "EXPLAIN"
    | "SIMPLE_EXPLANATION"
    | "SUMMARY"
    | "INTERVIEW_QUESTIONS"
    | "FLASHCARDS"
    | "CODE_EXAMPLE"
    | "STUDY_PLAN"
    | "KNOWLEDGE_GAP";

type GenerationHistory = {
    id: string;
    type: AIType;
    response: string;
    noteId: string | null;
    createdAt: number;
};

type AIMentorProps = {
    notes: Note[];
    history: GenerationHistory[];
};

type Action = {
    type: AIType;
    label: string;
    shortLabel: string;
    description: string;
    icon: React.ReactNode;
};

function ExplainIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="size-5"
            aria-hidden="true"
        >
            <circle cx="12" cy="12" r="9" />
            <path d="M9.75 9a2.4 2.4 0 0 1 4.65.8c0 1.8-2.4 2.1-2.4 3.7" />
            <path d="M12 17h.01" />
        </svg>
    );
}

function SimpleIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="size-5"
            aria-hidden="true"
        >
            <path d="M8 9h8" />
            <path d="M8 13h5" />
            <path d="M5 4h14v16H5z" />
        </svg>
    );
}

function SummaryIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="size-5"
            aria-hidden="true"
        >
            <path d="M5 6h14" />
            <path d="M5 10h10" />
            <path d="M5 14h14" />
            <path d="M5 18h7" />
        </svg>
    );
}

function InterviewIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="size-5"
            aria-hidden="true"
        >
            <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H11l-5 4v-4.18A2.5 2.5 0 0 1 4 13.5z" />
            <path d="M9 8h6" />
            <path d="M9 12h4" />
        </svg>
    );
}

function FlashcardIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="size-5"
            aria-hidden="true"
        >
            <rect
                x="5"
                y="5"
                width="14"
                height="14"
                rx="2"
            />
            <path d="M8 9h8" />
            <path d="M8 13h5" />
            <path d="m15 16 1.5 1.5L19 15" />
        </svg>
    );
}

function CodeIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="size-5"
            aria-hidden="true"
        >
            <path d="m8 9-3 3 3 3" />
            <path d="m16 9 3 3-3 3" />
            <path d="m14 5-4 14" />
        </svg>
    );
}

function PlanIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="size-5"
            aria-hidden="true"
        >
            <path d="M7 3v3" />
            <path d="M17 3v3" />
            <rect
                x="4"
                y="5"
                width="16"
                height="16"
                rx="2"
            />
            <path d="M4 10h16" />
            <path d="m8 15 2 2 5-5" />
        </svg>
    );
}

function GapIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="size-5"
            aria-hidden="true"
        >
            <path d="M12 3 3.5 19h17z" />
            <path d="M12 9v4" />
            <path d="M12 16.5h.01" />
        </svg>
    );
}

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

function StreamIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="size-4"
            aria-hidden="true"
        >
            <path d="M4 7h8" />
            <path d="M4 12h16" />
            <path d="M4 17h11" />
            <path d="m16 5 4 2-4 2" />
        </svg>
    );
}

function StopIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-3.5"
            aria-hidden="true"
        >
            <rect
                x="5"
                y="5"
                width="14"
                height="14"
                rx="2"
            />
        </svg>
    );
}

function HistoryIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="size-5"
            aria-hidden="true"
        >
            <path d="M3 12a9 9 0 1 0 3-6.7" />
            <path d="M3 4v5h5" />
            <path d="M12 7v5l3 2" />
        </svg>
    );
}

function NoteIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="size-5"
            aria-hidden="true"
        >
            <path d="M6 3.75h9l3 3v13.5H6z" />
            <path d="M15 3.75v3h3" />
            <path d="M9 11h6" />
            <path d="M9 15h4" />
        </svg>
    );
}

function ArrowIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="size-4"
            aria-hidden="true"
        >
            <path d="M5 12h14" />
            <path d="m15 8 4 4-4 4" />
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

const actions: Action[] = [
    {
        type: "EXPLAIN",
        label: "Explain",
        shortLabel: "Explanation",
        description:
            "Understand the concept clearly with a structured explanation.",
        icon: <ExplainIcon />,
    },
    {
        type: "SIMPLE_EXPLANATION",
        label: "Explain Simply",
        shortLabel: "Simple explanation",
        description:
            "Break complex ideas down into straightforward language.",
        icon: <SimpleIcon />,
    },
    {
        type: "SUMMARY",
        label: "Summarize",
        shortLabel: "Summary",
        description:
            "Extract the most important ideas and key takeaways.",
        icon: <SummaryIcon />,
    },
    {
        type: "INTERVIEW_QUESTIONS",
        label: "Interview Questions",
        shortLabel: "Interview questions",
        description:
            "Practice technical questions and interview-ready answers.",
        icon: <InterviewIcon />,
    },
    {
        type: "FLASHCARDS",
        label: "Flashcards",
        shortLabel: "Flashcards",
        description:
            "Turn the topic into compact prompts for active recall.",
        icon: <FlashcardIcon />,
    },
    {
        type: "CODE_EXAMPLE",
        label: "Code Example",
        shortLabel: "Code example",
        description:
            "Understand the concept through a practical implementation.",
        icon: <CodeIcon />,
    },
    {
        type: "STUDY_PLAN",
        label: "Study Plan",
        shortLabel: "Study plan",
        description:
            "Create a focused plan for learning the topic effectively.",
        icon: <PlanIcon />,
    },
    {
        type: "KNOWLEDGE_GAP",
        label: "Knowledge Gaps",
        shortLabel: "Knowledge gaps",
        description:
            "Identify related concepts that may need more attention.",
        icon: <GapIcon />,
    },
];

function getAction(
    type: AIType,
) {
    return (
        actions.find(
            (action) =>
                action.type === type,
        ) ?? actions[0]
    );
}

export function AIMentor({
    notes,
    history,
}: AIMentorProps) {
    const [
        selectedNoteId,
        setSelectedNoteId,
    ] = useState(
        notes[0]?.id ?? "",
    );

    const [
        selectedType,
        setSelectedType,
    ] =
        useState<AIType>(
            "EXPLAIN",
        );

    const [response, setResponse] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const [
        abortController,
        setAbortController,
    ] =
        useState<AbortController | null>(
            null,
        );

    const selectedNote =
        notes.find(
            (note) =>
                note.id ===
                selectedNoteId,
        );

    const selectedAction =
        getAction(selectedType);

    async function generateAIResponse() {
        if (!selectedNoteId) {
            setError(
                "Please select a note.",
            );
            return;
        }

        setLoading(true);
        setError("");
        setResponse("");

        try {
            const result =
                await fetch(
                    "/api/ai",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json",
                        },

                        body: JSON.stringify({
                            noteId:
                                selectedNoteId,
                            type: selectedType,
                        }),
                    },
                );

            const data =
                await result.json();

            if (!result.ok) {
                throw new Error(
                    data.error ??
                    "Failed to generate AI response.",
                );
            }

            setResponse(
                data.response ?? "",
            );
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Something went wrong.",
            );
        } finally {
            setLoading(false);
        }
    }

    async function generateStreamingResponse() {
        if (!selectedNoteId) {
            setError(
                "Please select a note.",
            );
            return;
        }

        setLoading(true);
        setError("");
        setResponse("");

        const controller =
            new AbortController();

        setAbortController(
            controller,
        );

        try {
            const result =
                await fetch(
                    "/api/ai/stream",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json",
                        },

                        body: JSON.stringify({
                            noteId:
                                selectedNoteId,
                            type: selectedType,
                        }),

                        signal:
                            controller.signal,
                    },
                );

            if (!result.ok) {
                const message =
                    await result.text();

                throw new Error(
                    message ||
                    `AI streaming failed (${result.status}).`,
                );
            }

            if (!result.body) {
                throw new Error(
                    "The server did not return a streaming response.",
                );
            }

            const reader =
                result.body.getReader();

            const decoder =
                new TextDecoder();

            let accumulated = "";

            while (true) {
                const {
                    value,
                    done,
                } =
                    await reader.read();

                if (done) {
                    break;
                }

                const chunk =
                    decoder.decode(
                        value,
                        {
                            stream: true,
                        },
                    );

                accumulated +=
                    chunk;

                setResponse(
                    accumulated,
                );
            }

            const finalChunk =
                decoder.decode();

            if (finalChunk) {
                accumulated +=
                    finalChunk;

                setResponse(
                    accumulated,
                );
            }
        } catch (error) {
            if (
                error instanceof
                DOMException &&
                error.name ===
                "AbortError"
            ) {
                return;
            }

            console.error(
                "Streaming request failed:",
                error,
            );

            setError(
                error instanceof Error
                    ? error.message
                    : "AI streaming failed.",
            );
        } finally {
            setLoading(false);
            setAbortController(null);
        }
    }

    if (notes.length === 0) {
        return (
            <div className="rounded-3xl border border-dashed bg-card px-6 py-16 text-center shadow-sm">
                <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <NoteIcon />
                </div>

                <h2 className="mt-5 text-xl font-semibold tracking-tight">
                    Create a note first
                </h2>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                    AI Mentor uses your own
                    notes as learning context.
                    Add a developer note and
                    come back here to generate
                    explanations, interview
                    questions, flashcards, and
                    more.
                </p>

                <a
                    href="/dashboard/notes/new"
                    className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
                >
                    Create a note
                    <ArrowIcon />
                </a>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <section className="overflow-hidden rounded-3xl border bg-card shadow-sm">
                <div className="grid xl:grid-cols-[320px_minmax(0,1fr)]">
                    <aside className="border-b bg-muted/20 p-5 sm:p-6 xl:border-b-0 xl:border-r">
                        <div className="flex items-center gap-3">
                            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <NoteIcon />
                            </div>

                            <div>
                                <h2 className="text-sm font-semibold">
                                    Source note
                                </h2>

                                <p className="text-xs text-muted-foreground">
                                    AI learning
                                    context
                                </p>
                            </div>
                        </div>

                        <label
                            htmlFor="note"
                            className="mt-6 block text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground"
                        >
                            Select note
                        </label>

                        <select
                            id="note"
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
                                setResponse(
                                    "",
                                );
                                setError("");
                            }}
                            disabled={
                                loading
                            }
                            className="mt-2 h-11 w-full rounded-xl border bg-background px-3 text-sm font-medium shadow-xs outline-none transition-[border-color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-60"
                        >
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

                        <div className="mt-5 rounded-xl border bg-background p-4">
                            <p className="text-xs font-medium text-muted-foreground">
                                Currently
                                learning
                            </p>

                            <p className="mt-1.5 line-clamp-2 text-sm font-semibold">
                                {selectedNote
                                    ?.title ??
                                    "Select a note"}
                            </p>
                        </div>

                        <div className="mt-6 border-t pt-5">
                            <p className="text-xs leading-5 text-muted-foreground">
                                AI Mentor uses
                                the selected note
                                as its source
                                context. Switch
                                notes anytime
                                before generating
                                a response.
                            </p>
                        </div>
                    </aside>

                    <div className="p-5 sm:p-6 lg:p-7">
                        <div>
                            <div className="flex items-center gap-2">
                                <SparklesIcon />

                                <h2 className="text-lg font-semibold tracking-tight">
                                    How should AI
                                    help?
                                </h2>
                            </div>

                            <p className="mt-1.5 text-sm text-muted-foreground">
                                Choose the
                                learning format
                                that best matches
                                what you need
                                right now.
                            </p>
                        </div>

                        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                            {actions.map(
                                (action) => {
                                    const selected =
                                        selectedType ===
                                        action.type;

                                    return (
                                        <button
                                            key={
                                                action.type
                                            }
                                            type="button"
                                            onClick={() => {
                                                setSelectedType(
                                                    action.type,
                                                );
                                                setResponse(
                                                    "",
                                                );
                                                setError(
                                                    "",
                                                );
                                            }}
                                            aria-pressed={
                                                selected
                                            }
                                            disabled={
                                                loading
                                            }
                                            className={
                                                selected
                                                    ? "group relative cursor-pointer rounded-2xl border border-primary/30 bg-primary/[0.07] p-4 text-left shadow-sm transition-all"
                                                    : "group relative cursor-pointer rounded-2xl border bg-background p-4 text-left transition-all hover:-translate-y-0.5 hover:border-primary/20 hover:bg-muted/30 hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-50"
                                            }
                                        >
                                            <div
                                                className={
                                                    selected
                                                        ? "flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground"
                                                        : "flex size-9 items-center justify-center rounded-xl bg-muted text-muted-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary"
                                                }
                                            >
                                                {
                                                    action.icon
                                                }
                                            </div>

                                            <div className="mt-4 font-semibold">
                                                {
                                                    action.label
                                                }
                                            </div>

                                            <div className="mt-1.5 text-xs leading-5 text-muted-foreground">
                                                {
                                                    action.description
                                                }
                                            </div>

                                            {selected && (
                                                <span className="absolute right-3 top-3 size-2 rounded-full bg-primary" />
                                            )}
                                        </button>
                                    );
                                },
                            )}
                        </div>

                        <div className="mt-7 rounded-2xl border bg-muted/20 p-4 sm:p-5">
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                <div className="min-w-0">
                                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                                        Ready to
                                        generate
                                    </p>

                                    <p className="mt-1 truncate text-sm font-semibold">
                                        {
                                            selectedAction.shortLabel
                                        }{" "}
                                        for{" "}
                                        <span className="text-primary">
                                            {
                                                selectedNote
                                                    ?.title
                                            }
                                        </span>
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {!loading && (
                                        <>
                                            <button
                                                type="button"
                                                onClick={
                                                    generateStreamingResponse
                                                }
                                                disabled={
                                                    !selectedNoteId
                                                }
                                                className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                <StreamIcon />
                                                Generate
                                            </button>

                                            <button
                                                type="button"
                                                onClick={
                                                    generateAIResponse
                                                }
                                                disabled={
                                                    !selectedNoteId
                                                }
                                                className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl border bg-background px-4 text-sm font-semibold transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                                                title="Wait for the complete response instead of streaming it"
                                            >
                                                <SparklesIcon />
                                                Generate
                                                once
                                            </button>
                                        </>
                                    )}

                                    {loading &&
                                        abortController && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    abortController.abort()
                                                }
                                                className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl border border-destructive/25 bg-destructive/5 px-5 text-sm font-semibold text-destructive transition-colors hover:bg-destructive/10"
                                            >
                                                <StopIcon />
                                                Stop
                                                generating
                                            </button>
                                        )}

                                    {loading &&
                                        !abortController && (
                                            <div className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground opacity-80">
                                                <LoadingIcon />
                                                Generating...
                                            </div>
                                        )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {(loading ||
                response ||
                error) && (
                    <section
                        aria-labelledby="ai-response-heading"
                        aria-live="polite"
                    >
                        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <div className="flex items-center gap-2">
                                    <SparklesIcon />

                                    <h2
                                        id="ai-response-heading"
                                        className="text-lg font-semibold tracking-tight"
                                    >
                                        AI response
                                    </h2>
                                </div>

                                <p className="mt-1 text-sm text-muted-foreground">
                                    {
                                        selectedAction.shortLabel
                                    }{" "}
                                    based on your
                                    selected note.
                                </p>
                            </div>

                            {response &&
                                !loading && (
                                    <button
                                        type="button"
                                        onClick={
                                            generateStreamingResponse
                                        }
                                        className="inline-flex h-9 cursor-pointer items-center justify-center gap-2 self-start rounded-xl border bg-background px-3 text-xs font-semibold transition-colors hover:bg-muted sm:self-auto"
                                    >
                                        <StreamIcon />
                                        Regenerate
                                    </button>
                                )}
                        </div>

                        {loading &&
                            !response && (
                                <div className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
                                    <div className="mb-6 flex items-center gap-3">
                                        <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                            <LoadingIcon />
                                        </div>

                                        <div>
                                            <div className="h-3 w-32 animate-pulse rounded bg-muted" />
                                            <div className="mt-2 h-2.5 w-20 animate-pulse rounded bg-muted" />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="h-3.5 w-3/4 animate-pulse rounded bg-muted" />
                                        <div className="h-3.5 w-full animate-pulse rounded bg-muted" />
                                        <div className="h-3.5 w-11/12 animate-pulse rounded bg-muted" />
                                        <div className="h-3.5 w-5/6 animate-pulse rounded bg-muted" />
                                        <div className="h-3.5 w-2/3 animate-pulse rounded bg-muted" />
                                    </div>
                                </div>
                            )}

                        {response && (
                            <div className="relative overflow-hidden rounded-2xl border bg-card shadow-sm">
                                {loading && (
                                    <div className="flex items-center gap-2 border-b bg-primary/[0.04] px-5 py-3 text-xs font-semibold text-primary sm:px-7">
                                        <span className="relative flex size-2">
                                            <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-40" />
                                            <span className="relative inline-flex size-2 rounded-full bg-primary" />
                                        </span>

                                        AI is
                                        generating...
                                    </div>
                                )}

                                <div className="p-5 sm:p-7 lg:p-8">
                                    <AIResponse
                                        response={
                                            response
                                        }
                                    />
                                </div>
                            </div>
                        )}

                        {error && (
                            <div className="rounded-2xl border border-destructive/25 bg-destructive/5 p-5">
                                <div className="flex items-start gap-3">
                                    <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
                                        <GapIcon />
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <h3 className="text-sm font-semibold text-destructive">
                                            Generation
                                            failed
                                        </h3>

                                        <p
                                            role="alert"
                                            className="mt-1 text-sm leading-6 text-destructive/90"
                                        >
                                            {error}
                                        </p>

                                        <div className="mt-4 flex flex-wrap gap-2">
                                            <button
                                                type="button"
                                                onClick={
                                                    generateStreamingResponse
                                                }
                                                disabled={
                                                    loading ||
                                                    !selectedNoteId
                                                }
                                                className="inline-flex h-9 cursor-pointer items-center justify-center gap-2 rounded-xl border bg-background px-3 text-sm font-semibold transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                <StreamIcon />
                                                Retry
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setError(
                                                        "",
                                                    )
                                                }
                                                disabled={
                                                    loading
                                                }
                                                className="inline-flex h-9 cursor-pointer items-center justify-center rounded-xl px-3 text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-50"
                                            >
                                                Dismiss
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </section>
                )}

            {history.length > 0 && (
                <section
                    aria-labelledby="ai-history-heading"
                    className="pt-2"
                >
                    <div className="mb-5 flex items-end justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-2">
                                <HistoryIcon />

                                <h2
                                    id="ai-history-heading"
                                    className="text-lg font-semibold tracking-tight"
                                >
                                    Recent
                                    generations
                                </h2>
                            </div>

                            <p className="mt-1 text-sm text-muted-foreground">
                                Your latest AI
                                Mentor learning
                                sessions.
                            </p>
                        </div>

                        <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
                            {history.length}{" "}
                            recent
                        </span>
                    </div>

                    <div className="grid gap-3 lg:grid-cols-2">
                        {history.map(
                            (
                                generation,
                            ) => {
                                const action =
                                    getAction(
                                        generation.type,
                                    );

                                const sourceNote =
                                    notes.find(
                                        (
                                            note,
                                        ) =>
                                            note.id ===
                                            generation.noteId,
                                    );

                                return (
                                    <article
                                        key={
                                            generation.id
                                        }
                                        className="group rounded-2xl border bg-card p-5 shadow-sm transition-all hover:border-primary/20 hover:shadow-md"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex min-w-0 items-center gap-3">
                                                <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                                    {
                                                        action.icon
                                                    }
                                                </div>

                                                <div className="min-w-0">
                                                    <h3 className="truncate text-sm font-semibold">
                                                        {
                                                            action.shortLabel
                                                        }
                                                    </h3>

                                                    <p className="mt-0.5 truncate text-xs text-muted-foreground">
                                                        {sourceNote
                                                            ? sourceNote.title
                                                            : "Previous note"}
                                                    </p>
                                                </div>
                                            </div>

                                            <time
                                                dateTime={new Date(
                                                    generation.createdAt,
                                                ).toISOString()}
                                                className="shrink-0 text-[11px] font-medium text-muted-foreground"
                                            >
                                                {new Date(
                                                    generation.createdAt,
                                                ).toLocaleDateString()}
                                            </time>
                                        </div>

                                        <p className="mt-4 line-clamp-4 whitespace-pre-wrap text-sm leading-6 text-muted-foreground">
                                            {
                                                generation.response
                                            }
                                        </p>
                                    </article>
                                );
                            },
                        )}
                    </div>
                </section>
            )}
        </div>
    );
}