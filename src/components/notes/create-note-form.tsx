"use client";

import {
    useActionState,
    useEffect,
    useState,
} from "react";

import {
    createNote,
    type NoteActionState,
} from "@/actions/notes";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState: NoteActionState = {
    errors: {},
    values: {},
    message: "",
};

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

export function CreateNoteForm() {
    const [
        state,
        formAction,
        isPending,
    ] = useActionState(
        createNote,
        initialState,
    );

    const [title, setTitle] =
        useState("");

    const [content, setContent] =
        useState("");

    useEffect(() => {
        if (
            state.values?.title !==
            undefined
        ) {
            setTitle(
                state.values.title,
            );
        }

        if (
            state.values?.content !==
            undefined
        ) {
            setContent(
                state.values.content,
            );
        }
    }, [
        state.values?.title,
        state.values?.content,
    ]);

    const titleLength =
        title.length;

    const contentLength =
        content.length;

    return (
        <form
            action={formAction}
            className="space-y-7"
            noValidate
        >
            <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-4">
                    <Label
                        htmlFor="title"
                        className="font-semibold"
                    >
                        Title
                    </Label>

                    <span className="text-xs text-muted-foreground">
                        {titleLength}/200
                    </span>
                </div>

                <Input
                    id="title"
                    name="title"
                    type="text"
                    maxLength={200}
                    placeholder="e.g. React Server Components"
                    value={title}
                    disabled={isPending}
                    onChange={(event) =>
                        setTitle(
                            event.target
                                .value,
                        )
                    }
                    aria-invalid={Boolean(
                        state.errors?.title,
                    )}
                    aria-describedby={
                        state.errors?.title
                            ? "title-error"
                            : "title-help"
                    }
                    className="h-11 rounded-xl"
                />

                {state.errors?.title ? (
                    <div
                        id="title-error"
                        role="alert"
                        className="space-y-1"
                    >
                        {state.errors.title.map(
                            (error) => (
                                <p
                                    key={
                                        error
                                    }
                                    className="text-sm text-destructive"
                                >
                                    {
                                        error
                                    }
                                </p>
                            ),
                        )}
                    </div>
                ) : (
                    <p
                        id="title-help"
                        className="text-xs text-muted-foreground"
                    >
                        Use a clear,
                        searchable name for
                        the concept.
                    </p>
                )}
            </div>

            <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-4">
                    <Label
                        htmlFor="content"
                        className="font-semibold"
                    >
                        Content
                    </Label>

                    <span className="text-xs text-muted-foreground">
                        {contentLength.toLocaleString()}{" "}
                        characters
                    </span>
                </div>

                <textarea
                    id="content"
                    name="content"
                    rows={15}
                    maxLength={100000}
                    placeholder="Write your explanation, examples, interview notes, code concepts, or anything you want to remember..."
                    value={content}
                    disabled={isPending}
                    onChange={(event) =>
                        setContent(
                            event.target
                                .value,
                        )
                    }
                    aria-invalid={Boolean(
                        state.errors?.content,
                    )}
                    aria-describedby={
                        state.errors?.content
                            ? "content-error"
                            : "content-help"
                    }
                    className="flex min-h-72 w-full resize-y rounded-xl border bg-background px-4 py-3 text-sm leading-7 shadow-xs outline-none transition-[border-color,box-shadow] placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-60 aria-invalid:border-destructive aria-invalid:ring-destructive/20"
                />

                {state.errors?.content ? (
                    <div
                        id="content-error"
                        role="alert"
                        className="space-y-1"
                    >
                        {state.errors.content.map(
                            (error) => (
                                <p
                                    key={
                                        error
                                    }
                                    className="text-sm text-destructive"
                                >
                                    {
                                        error
                                    }
                                </p>
                            ),
                        )}
                    </div>
                ) : (
                    <p
                        id="content-help"
                        className="text-xs text-muted-foreground"
                    >
                        Plain text is
                        supported. Structure
                        the explanation in the
                        way that helps you
                        learn best.
                    </p>
                )}
            </div>

            {state.message && (
                <div
                    role="alert"
                    className="rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive"
                >
                    {state.message}
                </div>
            )}

            <div className="flex items-center justify-end border-t pt-6">
                <Button
                    type="submit"
                    disabled={isPending}
                    className="h-11 min-w-36 cursor-pointer rounded-xl px-5"
                >
                    {isPending ? (
                        <>
                            <LoadingIcon />
                            Creating...
                        </>
                    ) : (
                        <>
                            <SaveIcon />
                            Create note
                        </>
                    )}
                </Button>
            </div>
        </form>
    );
}