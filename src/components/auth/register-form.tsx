"use client";

import { useActionState } from "react";

import {
    registerUser,
    type RegisterActionState,
} from "@/actions/auth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState: RegisterActionState = {
    errors: {},
    values: {},
    message: "",
};

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
                strokeWidth="2"
                className="opacity-25"
            />

            <path
                d="M21 12a9 9 0 0 0-9-9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
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

export function RegisterForm() {
    const [
        state,
        formAction,
        isPending,
    ] = useActionState(
        registerUser,
        initialState,
    );

    return (
        <form
            action={formAction}
            className="space-y-5"
            noValidate
        >
            <div className="space-y-2">
                <Label
                    htmlFor="name"
                    className="text-sm font-semibold"
                >
                    Name
                </Label>

                <Input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    defaultValue={
                        state.values?.name ??
                        ""
                    }
                    disabled={isPending}
                    aria-invalid={
                        Boolean(
                            state.errors
                                ?.name,
                        )
                    }
                    aria-describedby={
                        state.errors?.name
                            ? "register-name-error"
                            : undefined
                    }
                    className="h-11 rounded-xl"
                />

                {state.errors?.name && (
                    <div
                        id="register-name-error"
                        className="space-y-1"
                    >
                        {state.errors.name.map(
                            (error) => (
                                <p
                                    key={
                                        error
                                    }
                                    className="text-xs font-medium text-destructive"
                                >
                                    {
                                        error
                                    }
                                </p>
                            ),
                        )}
                    </div>
                )}
            </div>

            <div className="space-y-2">
                <Label
                    htmlFor="email"
                    className="text-sm font-semibold"
                >
                    Email address
                </Label>

                <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    placeholder="you@example.com"
                    defaultValue={
                        state.values?.email ??
                        ""
                    }
                    disabled={isPending}
                    aria-invalid={
                        Boolean(
                            state.errors
                                ?.email,
                        )
                    }
                    aria-describedby={
                        state.errors?.email
                            ? "register-email-error"
                            : undefined
                    }
                    className="h-11 rounded-xl"
                />

                {state.errors?.email && (
                    <div
                        id="register-email-error"
                        className="space-y-1"
                    >
                        {state.errors.email.map(
                            (error) => (
                                <p
                                    key={
                                        error
                                    }
                                    className="text-xs font-medium text-destructive"
                                >
                                    {
                                        error
                                    }
                                </p>
                            ),
                        )}
                    </div>
                )}
            </div>

            <div className="space-y-2">
                <div className="flex items-center justify-between gap-4">
                    <Label
                        htmlFor="password"
                        className="text-sm font-semibold"
                    >
                        Password
                    </Label>

                    <span className="text-xs text-muted-foreground">
                        Minimum 8 characters
                    </span>
                </div>

                <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Create a password"
                    disabled={isPending}
                    aria-invalid={
                        Boolean(
                            state.errors
                                ?.password,
                        )
                    }
                    aria-describedby={
                        state.errors
                            ?.password
                            ? "register-password-error"
                            : "password-help"
                    }
                    className="h-11 rounded-xl"
                />

                <p
                    id="password-help"
                    className={
                        state.errors
                            ?.password
                            ? "sr-only"
                            : "text-xs leading-5 text-muted-foreground"
                    }
                >
                    Use at least 8
                    characters.
                </p>

                {state.errors?.password && (
                    <div
                        id="register-password-error"
                        className="space-y-1"
                    >
                        {state.errors.password.map(
                            (error) => (
                                <p
                                    key={
                                        error
                                    }
                                    className="text-xs font-medium text-destructive"
                                >
                                    {
                                        error
                                    }
                                </p>
                            ),
                        )}
                    </div>
                )}
            </div>

            <div className="space-y-2">
                <Label
                    htmlFor="confirmPassword"
                    className="text-sm font-semibold"
                >
                    Confirm password
                </Label>

                <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Re-enter your password"
                    disabled={isPending}
                    aria-invalid={
                        Boolean(
                            state.errors
                                ?.confirmPassword,
                        )
                    }
                    aria-describedby={
                        state.errors
                            ?.confirmPassword
                            ? "confirm-password-error"
                            : undefined
                    }
                    className="h-11 rounded-xl"
                />

                {state.errors
                    ?.confirmPassword && (
                        <div
                            id="confirm-password-error"
                            className="space-y-1"
                        >
                            {state.errors.confirmPassword.map(
                                (error) => (
                                    <p
                                        key={
                                            error
                                        }
                                        className="text-xs font-medium text-destructive"
                                    >
                                        {
                                            error
                                        }
                                    </p>
                                ),
                            )}
                        </div>
                    )}
            </div>

            {state.message && (
                <div
                    role="alert"
                    aria-live="polite"
                    className="rounded-xl border border-destructive/30 bg-destructive/[0.06] px-4 py-3"
                >
                    <p className="text-sm font-medium text-destructive">
                        {state.message}
                    </p>
                </div>
            )}

            <Button
                type="submit"
                disabled={isPending}
                className="h-11 w-full cursor-pointer rounded-xl font-semibold"
            >
                {isPending ? (
                    <>
                        <LoadingIcon />
                        Creating
                        account...
                    </>
                ) : (
                    <>
                        Create account
                        <ArrowIcon />
                    </>
                )}
            </Button>
        </form>
    );
}