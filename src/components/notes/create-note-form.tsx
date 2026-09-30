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
        if (state.values?.title !== undefined) {
            setTitle(state.values.title);
        }

        if (state.values?.content !== undefined) {
            setContent(state.values.content);
        }
    }, [
        state.values?.title,
        state.values?.content,
    ]);

    return (
        <form
            action={formAction}
            className="space-y-6"
            noValidate
        >
            <div className="space-y-2">
                <Label htmlFor="title">
                    Title
                </Label>

                <Input
                    id="title"
                    name="title"
                    type="text"
                    placeholder="e.g. React Server Components"
                    value={title}
                    onChange={(event) =>
                        setTitle(
                            event.target.value,
                        )
                    }
                    aria-invalid={
                        Boolean(
                            state.errors?.title,
                        )
                    }
                    aria-describedby={
                        state.errors?.title
                            ? "title-error"
                            : undefined
                    }
                />

                {state.errors?.title?.map(
                    (error) => (
                        <p
                            key={error}
                            id="title-error"
                            className="text-sm text-destructive"
                        >
                            {error}
                        </p>
                    ),
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="content">
                    Content
                </Label>

                <textarea
                    id="content"
                    name="content"
                    rows={12}
                    placeholder="Write your knowledge here..."
                    value={content}
                    onChange={(event) =>
                        setContent(
                            event.target.value,
                        )
                    }
                    aria-invalid={
                        Boolean(
                            state.errors?.content,
                        )
                    }
                    aria-describedby={
                        state.errors?.content
                            ? "content-error"
                            : undefined
                    }
                    className="
                        flex min-h-40 w-full
                        rounded-md border
                        bg-transparent
                        px-3 py-2
                        text-sm
                        shadow-xs
                        outline-none
                        transition-[color,box-shadow]
                        placeholder:text-muted-foreground
                        focus-visible:border-ring
                        focus-visible:ring-[3px]
                        focus-visible:ring-ring/50
                        aria-invalid:border-destructive
                        aria-invalid:ring-destructive/20
                    "
                />

                {state.errors?.content?.map(
                    (error) => (
                        <p
                            key={error}
                            id="content-error"
                            className="text-sm text-destructive"
                        >
                            {error}
                        </p>
                    ),
                )}
            </div>

            {state.message && (
                <p
                    role="alert"
                    className="text-sm text-destructive"
                >
                    {state.message}
                </p>
            )}

            <Button
                type="submit"
                disabled={isPending}
                className="cursor-pointer"
            >
                {isPending
                    ? "Creating..."
                    : "Create Note"}
            </Button>
        </form>
    );
}