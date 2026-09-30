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
            <input
                type="hidden"
                name="noteId"
                value={note.id}
            />

            <div className="space-y-2">
                <Label htmlFor="title">
                    Title
                </Label>

                <Input
                    id="title"
                    name="title"
                    type="text"
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
                            ? "edit-title-error"
                            : undefined
                    }
                />

                {state.errors?.title?.map(
                    (error) => (
                        <p
                            key={error}
                            id="edit-title-error"
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
                    rows={14}
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
                            ? "edit-content-error"
                            : undefined
                    }
                    className="
                        flex min-h-48 w-full
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
                            id="edit-content-error"
                            className="text-sm text-destructive"
                        >
                            {error}
                        </p>
                    ),
                )}
            </div>

            {state.errors?.noteId?.map(
                (error) => (
                    <p
                        key={error}
                        role="alert"
                        className="text-sm text-destructive"
                    >
                        {error}
                    </p>
                ),
            )}

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
                    ? "Saving..."
                    : "Save Changes"}
            </Button>
        </form>
    );
}