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

const actions: {
    type: AIType;
    label: string;
    description: string;
}[] = [
        {
            type: "EXPLAIN",
            label: "Explain",
            description: "Understand the concept clearly.",
        },
        {
            type: "SIMPLE_EXPLANATION",
            label: "Explain Simply",
            description: "Break the concept down into simple language.",
        },
        {
            type: "SUMMARY",
            label: "Summarize",
            description: "Get the important points quickly.",
        },
        {
            type: "INTERVIEW_QUESTIONS",
            label: "Interview Questions",
            description: "Generate interview questions and answers.",
        },
        {
            type: "FLASHCARDS",
            label: "Flashcards",
            description: "Create study flashcards.",
        },
        {
            type: "CODE_EXAMPLE",
            label: "Code Example",
            description: "Learn through practical code.",
        },
        {
            type: "STUDY_PLAN",
            label: "Study Plan",
            description: "Create a practical learning plan.",
        },
        {
            type: "KNOWLEDGE_GAP",
            label: "Knowledge Gaps",
            description: "Find concepts you may need to learn.",
        },
    ];

export function AIMentor({ notes, history }: AIMentorProps) {
    const [selectedNoteId, setSelectedNoteId] = useState(
        notes[0]?.id ?? ""
    );

    const [selectedType, setSelectedType] = useState<AIType>("EXPLAIN");

    const [response, setResponse] = useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [abortController, setAbortController] = useState<AbortController | null>(null);

    async function generateAIResponse() {
        if (!selectedNoteId) {
            setError("Please select a note.");
            return;
        }

        setLoading(true);
        setError("");
        setResponse("");

        try {
            const result = await fetch("/api/ai", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    noteId: selectedNoteId,
                    type: selectedType,
                }),
            });

            const data = await result.json();

            if (!result.ok) {
                throw new Error(
                    data.error ?? "Failed to generate AI response."
                );
            }

            setResponse(data.response ?? "");
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Something went wrong."
            );
        } finally {
            setLoading(false);
        }
    }

    const generateStreamingResponse = async () => {
        if (!selectedNoteId) {
            setError("Please select a note.");
            return;
        }

        setLoading(true);
        setError("");
        setResponse("");

        const controller = new AbortController();
        setAbortController(controller);

        try {
            const response = await fetch("/api/ai/stream", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    noteId: selectedNoteId,
                    type: selectedType,
                }),
                signal: controller.signal,
            });

            if (!response.ok) {
                const message = await response.text();

                throw new Error(
                    message ||
                    `AI streaming failed (${response.status}).`
                );
            }

            if (!response.body) {
                throw new Error(
                    "The server did not return a streaming response."
                );
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            let accumulated = "";

            while (true) {
                const { value, done } = await reader.read();

                if (done) {
                    break;
                }

                const chunk = decoder.decode(value, {
                    stream: true,
                });

                accumulated += chunk;

                setResponse(accumulated);
            }

            const finalChunk = decoder.decode();

            if (finalChunk) {
                accumulated += finalChunk;
                setResponse(accumulated);
            }
        } catch (error) {
            if (
                error instanceof DOMException &&
                error.name === "AbortError"
            ) {
                return;
            }

            console.error(
                "Streaming request failed:",
                error
            );

            setError(
                error instanceof Error
                    ? error.message
                    : "AI streaming failed."
            );
        } finally {
            setLoading(false);
            setAbortController(null);
        }
    };

    if (notes.length === 0) {
        return (
            <div className="rounded-xl border p-8 text-center">
                <h2 className="text-xl font-semibold">
                    Create a note first
                </h2>

                <p className="mt-2 text-muted-foreground">
                    AI Mentor uses your notes as the source for its responses.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Note selector */}

            <div className="rounded-xl border p-6">
                <label
                    htmlFor="note"
                    className="mb-2 block text-sm font-medium"
                >
                    Select a note
                </label>

                <select
                    id="note"
                    value={selectedNoteId}
                    onChange={(event) =>
                        setSelectedNoteId(event.target.value)
                    }
                    className="w-full rounded-md border bg-background px-3 py-2"
                    disabled={loading}
                >
                    {notes.map((note) => (
                        <option key={note.id} value={note.id}>
                            {note.title}
                        </option>
                    ))}
                </select>
            </div>

            {/* AI actions */}

            <div>
                <h2 className="mb-4 text-xl font-semibold">
                    What do you want AI to do?
                </h2>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {actions.map((action) => {
                        const selected = selectedType === action.type;

                        return (
                            <button
                                key={action.type}
                                type="button"
                                onClick={() => setSelectedType(action.type)}
                                className={`rounded-xl border p-4 text-left transition ${selected
                                    ? "border-primary bg-primary/5"
                                    : "hover:bg-muted"
                                    } disabled:cursor-not-allowed disabled:opacity-50`}
                                disabled={loading}
                            >
                                <div className="font-semibold">
                                    {action.label}
                                </div>

                                <div className="mt-1 text-sm text-muted-foreground">
                                    {action.description}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Generate */}
            <div className="flex flex-wrap gap-3">
                <button
                    type="button"
                    onClick={generateAIResponse}
                    disabled={loading}
                    className="cursor-pointer rounded-md bg-primary px-6 py-3 font-medium text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {loading ? "Generating..." : "Generate with AI"}
                </button>

                <button
                    type="button"
                    onClick={generateStreamingResponse}
                    disabled={loading || !selectedNoteId}
                    className="cursor-pointer rounded-md border px-6 py-3 font-medium disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {loading
                        ? "Generating..."
                        : "Generate with Streaming"}
                </button>

                {loading && abortController && (
                    <button
                        type="button"
                        onClick={() => abortController.abort()}
                        className="cursor-pointer rounded-md border border-destructive px-6 py-3 font-medium text-destructive hover:bg-destructive/10"
                    >
                        Stop generating
                    </button>
                )}
            </div>

            {/* Response */}

            {loading && !response && (
                <div className="space-y-3 rounded-lg border p-6">
                    <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
                    <div className="h-4 w-full animate-pulse rounded bg-muted" />
                    <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
                    <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
                </div>
            )}

            {response && (
                <div className="rounded-xl border p-6">
                    <AIResponse response={response} />
                </div>
            )}

            {response && !loading && (
                <button
                    type="button"
                    onClick={generateStreamingResponse}
                    className="rounded-md border px-4 py-2 text-sm cursor-pointer hover:bg-muted"
                >
                    Regenerate
                </button>
            )}

            {/* Error */}

            {error && (
                <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
                    <p className="mb-3 text-sm text-destructive">
                        {error}
                    </p>

                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={generateStreamingResponse}
                            disabled={loading || !selectedNoteId}
                            className="cursor-pointer rounded-md border px-3 py-2 text-sm hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Retry
                        </button>

                        <button
                            type="button"
                            onClick={() => setError("")}
                            disabled={loading}
                            className="cursor-pointer rounded-md border px-3 py-2 text-sm hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Dismiss
                        </button>
                    </div>
                </div>
            )}

            {history.length > 0 && (
                <section className="space-y-4">
                    <div>
                        <h2 className="text-xl font-semibold">
                            Recent AI Generations
                        </h2>

                        <p className="text-sm text-muted-foreground">
                            Your previous AI Mentor sessions.
                        </p>
                    </div>

                    <div className="space-y-3">
                        {history.map((generation) => (
                            <div
                                key={generation.id}
                                className="rounded-xl border p-5"
                            >
                                <div className="mb-3 flex items-center justify-between gap-4">
                                    <div>
                                        <span className="font-medium">
                                            {generation.type.replaceAll("_", " ")}
                                        </span>
                                    </div>

                                    <time className="text-xs text-muted-foreground">
                                        {new Date(
                                            generation.createdAt
                                        ).toLocaleString()}
                                    </time>
                                </div>

                                <p className="line-clamp-4 whitespace-pre-wrap text-sm leading-6 text-muted-foreground">
                                    {generation.response}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}