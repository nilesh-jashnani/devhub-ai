"use client";

import { useActionState } from "react";

import {
    loginUser,
    type LoginActionState,
} from "@/actions/auth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState: LoginActionState = {
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

export default function LoginForm() {
    const [
        state,
        formAction,
        isPending,
    ] = useActionState(
        loginUser,
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
                            ? "login-email-error"
                            : undefined
                    }
                    className="h-11 rounded-xl"
                />

                {state.errors?.email && (
                    <div
                        id="login-email-error"
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
                <Label
                    htmlFor="password"
                    className="text-sm font-semibold"
                >
                    Password
                </Label>

                <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Enter your password"
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
                            ? "login-password-error"
                            : undefined
                    }
                    className="h-11 rounded-xl"
                />

                {state.errors?.password && (
                    <div
                        id="login-password-error"
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
                        Signing in...
                    </>
                ) : (
                    <>
                        Sign in
                        <ArrowIcon />
                    </>
                )}
            </Button>

            <p className="text-center text-xs leading-5 text-muted-foreground">
                Sign in to access your
                notes, bookmarks, progress,
                AI mentor, and interview
                preparation.
            </p>
        </form>
    );
}