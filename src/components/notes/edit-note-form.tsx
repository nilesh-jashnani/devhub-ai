"use client";

import {
    useActionState,
    useEffect,
    useState,
} from "react";

import {
    updateNote,
    type NoteActionState,
} from "@/actions/notes";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type EditNoteFormProps = {
    note: {
        id: string;
        title: string;
        content: string;
    };
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

export function EditNoteForm({
    note,
}: EditNoteFormProps) {
    const initialState: NoteActionState = {
        errors: {},

        values: {
            title: note.title,
            content: note.content,
        },

        message: "",
    };

    const [
        state,
        formAction,
        isPending,
    ] = useActionState(
        updateNote,
        initialState,
    );

    const [title, setTitle] =
        useState(note.title);

    const [content, setContent] =
        useState(note.content);

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

    const hasChanges =
        title !== note.title ||
        content !== note.content;

    return (
        <form
            action={formAction}
            className="space-y-7"
            noValidate
        >
            <input
                type="hidden"
                name="noteId"
                value={note.id}
            />

            <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-4">
                    <Label
                        htmlFor="title"
                        className="font-semibold"
                    >
                        Title
                    </Label>

                    <span className="text-xs text-muted-foreground">
                        {title.length}/200
                    </span>
                </div>

                <Input
                    id="title"
                    name="title"
                    type="text"
                    maxLength={200}
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
                            ? "edit-title-error"
                            : "edit-title-help"
                    }
                    className="h-11 rounded-xl"
                />

                {state.errors?.title ? (
                    <div
                        id="edit-title-error"
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
                        id="edit-title-help"
                        className="text-xs text-muted-foreground"
                    >
                        Keep the title
                        concise and easy to
                        search.
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
                        {content.length.toLocaleString()}{" "}
                        characters
                    </span>
                </div>

                <textarea
                    id="content"
                    name="content"
                    rows={15}
                    maxLength={100000}
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
                            ? "edit-content-error"
                            : "edit-content-help"
                    }
                    className="flex min-h-72 w-full resize-y rounded-xl border bg-background px-4 py-3 text-sm leading-7 shadow-xs outline-none transition-[border-color,box-shadow] placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-60 aria-invalid:border-destructive aria-invalid:ring-destructive/20"
                />

                {state.errors?.content ? (
                    <div
                        id="edit-content-error"
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
                        id="edit-content-help"
                        className="text-xs text-muted-foreground"
                    >
                        Update this note as
                        your understanding
                        evolves.
                    </p>
                )}
            </div>

            {state.errors?.noteId?.map(
                (error) => (
                    <div
                        key={error}
                        role="alert"
                        className="rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive"
                    >
                        {error}
                    </div>
                ),
            )}

            {state.message && (
                <div
                    role="alert"
                    className="rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive"
                >
                    {state.message}
                </div>
            )}

            <div className="flex flex-col gap-3 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-muted-foreground">
                    {hasChanges
                        ? "You have unsaved changes."
                        : "No unsaved changes."}
                </p>

                <Button
                    type="submit"
                    disabled={
                        isPending ||
                        !hasChanges
                    }
                    className="h-11 cursor-pointer rounded-xl px-5"
                >
                    {isPending ? (
                        <>
                            <LoadingIcon />
                            Saving...
                        </>
                    ) : (
                        <>
                            <SaveIcon />
                            Save changes
                        </>
                    )}
                </Button>
            </div>
        </form>
    );
}