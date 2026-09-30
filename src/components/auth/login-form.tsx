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

function LoginForm() {
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
                            ? "email-error"
                            : undefined
                    }
                />

                {state.errors?.email?.map(
                    (error) => (
                        <p
                            id="email-error"
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
                    autoComplete="current-password"
                    placeholder="••••••••"
                    aria-invalid={
                        Boolean(
                            state.errors?.password,
                        )
                    }
                    aria-describedby={
                        state.errors?.password
                            ? "password-error"
                            : undefined
                    }
                />

                {state.errors?.password?.map(
                    (error) => (
                        <p
                            id="password-error"
                            key={error}
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
                className="w-full cursor-pointer"
            >
                {isPending
                    ? "Signing in..."
                    : "Sign in"}
            </Button>
        </form>
    );
}

export default LoginForm;