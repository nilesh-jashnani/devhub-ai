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
                <Label htmlFor="name">
                    Name
                </Label>

                <Input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    defaultValue={
                        state.values?.name ?? ""
                    }
                    aria-invalid={
                        Boolean(
                            state.errors?.name,
                        )
                    }
                    aria-describedby={
                        state.errors?.name
                            ? "name-error"
                            : undefined
                    }
                />

                {state.errors?.name?.map(
                    (error) => (
                        <p
                            id="name-error"
                            key={error}
                            className="text-sm text-destructive"
                        >
                            {error}
                        </p>
                    ),
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="email">
                    Email
                </Label>

                <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    defaultValue={
                        state.values?.email ?? ""
                    }
                    aria-invalid={
                        Boolean(
                            state.errors?.email,
                        )
                    }
                    aria-describedby={
                        state.errors?.email
                            ? "register-email-error"
                            : undefined
                    }
                />

                {state.errors?.email?.map(
                    (error) => (
                        <p
                            id="register-email-error"
                            key={error}
                            className="text-sm text-destructive"
                        >
                            {error}
                        </p>
                    ),
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="password">
                    Password
                </Label>

                <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="At least 8 characters"
                    aria-invalid={
                        Boolean(
                            state.errors?.password,
                        )
                    }
                    aria-describedby={
                        state.errors?.password
                            ? "register-password-error"
                            : undefined
                    }
                />

                {state.errors?.password?.map(
                    (error) => (
                        <p
                            id="register-password-error"
                            key={error}
                            className="text-sm text-destructive"
                        >
                            {error}
                        </p>
                    ),
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="confirmPassword">
                    Confirm password
                </Label>

                <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Re-enter your password"
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
                />

                {state.errors
                    ?.confirmPassword
                    ?.map((error) => (
                        <p
                            id="confirm-password-error"
                            key={error}
                            className="text-sm text-destructive"
                        >
                            {error}
                        </p>
                    ))}
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
                className="w-full cursor-pointer"
            >
                {isPending
                    ? "Creating account..."
                    : "Create account"}
            </Button>
        </form>
    );
}