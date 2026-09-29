"use client";

import { useState } from "react";

import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function LoginForm() {
    const [error, setError] = useState("");

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setError("");

        const formData = new FormData(event.currentTarget);

        const result = await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
            redirect: false,
        });

        if (result?.error) {
            setError("Invalid email or password.");
            return;
        }

        window.location.href = "/dashboard";
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>

                <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="password">Password</Label>

                <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    required
                />
            </div>

            {error && (
                <p className="text-sm text-destructive">
                    {error}
                </p>
            )}

            <Button type="submit" className="w-full cursor-pointer">
                Sign in
            </Button>
        </form>
    );
}

export default LoginForm;