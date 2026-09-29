"use client";

import { useState } from "react";

type Difficulty = "EASY" | "MEDIUM" | "HARD";

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

export function InterviewPrep({
    notes,
}: InterviewPrepProps) {
    const [selectedNoteId, setSelectedNoteId] =
        useState("");

    const [difficulty, setDifficulty] =
        useState<Difficulty>("MEDIUM");

    const [questionCount, setQuestionCount] =
        useState(5);

    const [questions, setQuestions] = useState<
        InterviewQuestion[]
    >([]);

    const [currentIndex, setCurrentIndex] =
        useState(0);

    const [showAnswer, setShowAnswer] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const currentQuestion =
        questions[currentIndex];

    const generateQuestions = async () => {
        if (!selectedNoteId) {
            setError("Please select a note.");
            return;
        }

        setLoading(true);
        setError("");
        setQuestions([]);
        setCurrentIndex(0);
        setShowAnswer(false);

        try {
            const response = await fetch(
                "/api/interview",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify({
                        noteId: selectedNoteId,
                        difficulty,
                        questionCount,
                    }),
                }
            );

            const data =
                (await response.json()) as
                | InterviewResponse
                | { error?: string };

            if (!response.ok) {
                throw new Error(
                    "error" in data && data.error
                        ? data.error
                        : "Failed to generate interview questions."
                );
            }

            if (
                !("questions" in data) ||
                !Array.isArray(data.questions)
            ) {
                throw new Error(
                    "Invalid interview response."
                );
            }

            setQuestions(data.questions);
        } catch (error) {
            console.error(
                "Interview generation failed:",
                error
            );

            setError(
                error instanceof Error
                    ? error.message
                    : "Failed to generate interview questions."
            );
        } finally {
            setLoading(false);
        }
    };

    const nextQuestion = () => {
        if (
            currentIndex <
            questions.length - 1
        ) {
            setCurrentIndex(
                (index) => index + 1
            );
            setShowAnswer(false);
        }
    };

    const previousQuestion = () => {
        if (currentIndex > 0) {
            setCurrentIndex(
                (index) => index - 1
            );
            setShowAnswer(false);
        }
    };

    const resetInterview = () => {
        setQuestions([]);
        setCurrentIndex(0);
        setShowAnswer(false);
        setError("");
    };

    return (
        <div className="space-y-8">

            <div className="rounded-xl border p-6">
                <div className="mb-6">
                    <h2 className="text-xl font-semibold">
                        Interview Configuration
                    </h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Choose a note and configure
                        your AI-generated interview.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    <div className="space-y-2">
                        <label
                            htmlFor="interview-note"
                            className="text-sm font-medium"
                        >
                            Developer Note
                        </label>

                        <select
                            id="interview-note"
                            value={selectedNoteId}
                            onChange={(event) =>
                                setSelectedNoteId(
                                    event.target.value
                                )
                            }
                            disabled={loading}
                            className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                        >
                            <option value="">
                                Select a note
                            </option>

                            {notes.map((note) => (
                                <option
                                    key={note.id}
                                    value={note.id}
                                >
                                    {note.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="interview-difficulty"
                            className="text-sm font-medium"
                        >
                            Difficulty
                        </label>

                        <select
                            id="interview-difficulty"
                            value={difficulty}
                            onChange={(event) =>
                                setDifficulty(
                                    event.target.value as Difficulty
                                )
                            }
                            disabled={loading}
                            className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                        >
                            <option value="EASY">
                                Easy
                            </option>

                            <option value="MEDIUM">
                                Medium
                            </option>

                            <option value="HARD">
                                Hard
                            </option>
                        </select>
                    </div>


                    <div className="space-y-2">
                        <label
                            htmlFor="question-count"
                            className="text-sm font-medium"
                        >
                            Questions
                        </label>

                        <select
                            id="question-count"
                            value={questionCount}
                            onChange={(event) =>
                                setQuestionCount(
                                    Number(
                                        event.target.value
                                    )
                                )
                            }
                            disabled={loading}
                            className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                        >
                            <option value={5}>
                                5 questions
                            </option>

                            <option value={10}>
                                10 questions
                            </option>

                            <option value={15}>
                                15 questions
                            </option>

                            <option value={20}>
                                20 questions
                            </option>
                        </select>
                    </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                    <button
                        type="button"
                        onClick={generateQuestions}
                        disabled={
                            loading ||
                            !selectedNoteId
                        }
                        className="cursor-pointer rounded-md bg-primary px-6 py-3 font-medium text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loading
                            ? "Generating..."
                            : "Generate Interview"}
                    </button>

                    {questions.length > 0 &&
                        !loading && (
                            <button
                                type="button"
                                onClick={
                                    resetInterview
                                }
                                className="cursor-pointer rounded-md border px-6 py-3 font-medium hover:bg-muted"
                            >
                                New Interview
                            </button>
                        )}
                </div>
            </div>

            {error && (
                <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
                    <p className="mb-3 text-sm text-destructive">
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
                        className="cursor-pointer rounded-md border px-3 py-2 text-sm hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Retry
                    </button>
                </div>
            )}

            {loading && (
                <div className="space-y-4 rounded-xl border p-6">
                    <div className="h-4 w-1/4 animate-pulse rounded bg-muted" />

                    <div className="h-6 w-3/4 animate-pulse rounded bg-muted" />

                    <div className="h-4 w-full animate-pulse rounded bg-muted" />

                    <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />

                    <div className="h-10 w-32 animate-pulse rounded bg-muted" />
                </div>
            )}

            {!loading &&
                currentQuestion && (
                    <div className="rounded-xl border p-6">
                        <div className="mb-6 flex items-center justify-between gap-4">
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Question{" "}
                                    {currentIndex + 1}{" "}
                                    of{" "}
                                    {questions.length}
                                </p>

                                <span className="mt-2 inline-block rounded-full border px-3 py-1 text-xs font-medium">
                                    {
                                        currentQuestion.difficulty
                                    }
                                </span>
                            </div>
                        </div>

                        <h2 className="text-xl font-semibold leading-relaxed">
                            {
                                currentQuestion.question
                            }
                        </h2>

                        {!showAnswer ? (
                            <button
                                type="button"
                                onClick={() =>
                                    setShowAnswer(
                                        true
                                    )
                                }
                                className="mt-8 cursor-pointer rounded-md bg-primary px-5 py-2.5 font-medium text-primary-foreground"
                            >
                                Show Answer
                            </button>
                        ) : (
                            <div className="mt-8 space-y-6">
                                <div>
                                    <h3 className="mb-2 font-semibold">
                                        Answer
                                    </h3>

                                    <div className="rounded-lg bg-muted/50 p-4 leading-relaxed">
                                        {
                                            currentQuestion.answer
                                        }
                                    </div>
                                </div>

                                <div>
                                    <h3 className="mb-2 font-semibold">
                                        Explanation
                                    </h3>

                                    <div className="rounded-lg border p-4 leading-relaxed">
                                        {
                                            currentQuestion.explanation
                                        }
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="mt-8 flex flex-wrap justify-between gap-3">
                            <button
                                type="button"
                                onClick={
                                    previousQuestion
                                }
                                disabled={
                                    currentIndex ===
                                    0
                                }
                                className="cursor-pointer rounded-md border px-4 py-2 text-sm hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Previous
                            </button>

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
                                className="cursor-pointer rounded-md border px-4 py-2 text-sm hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Next Question
                            </button>
                        </div>
                    </div>
                )}

            {!loading &&
                !currentQuestion &&
                !error && (
                    <div className="rounded-xl border border-dashed p-10 text-center">
                        <h2 className="text-lg font-semibold">
                            Ready for your interview?
                        </h2>

                        <p className="mt-2 text-sm text-muted-foreground">
                            Select a developer note,
                            choose the difficulty,
                            and generate your
                            questions.
                        </p>
                    </div>
                )}
        </div>
    );
}