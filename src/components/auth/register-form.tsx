"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { registerUser } from "@/actions/auth";

export function RegisterForm() {
    const router = useRouter();

    const [error, setError] = useState("");

    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(formData: FormData) {
        setError("");
        setIsSubmitting(true);

        const result = await registerUser(formData);

        setIsSubmitting(false);

        if (result?.error) {
            setError(result.error);
            return;
        }

        router.push("/login");
    }

    return (
        <form action={handleSubmit} className="space-y-5">
            <div>
                <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium"
                >
                    Name
                </label>

                <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    className="w-full rounded-md border px-3 py-2"
                    placeholder="Your name"
                />
            </div>

            <div>
                <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium"
                >
                    Email
                </label>

                <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="w-full rounded-md border px-3 py-2"
                    placeholder="you@example.com"
                />
            </div>

            <div>
                <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium"
                >
                    Password
                </label>

                <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    minLength={8}
                    autoComplete="new-password"
                    className="w-full rounded-md border px-3 py-2"
                    placeholder="At least 8 characters"
                />
            </div>

            {error && (
                <p className="text-sm text-red-600">
                    {error}
                </p>
            )}

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-md bg-black px-4 py-2 text-sm text-white disabled:opacity-50 cursor-pointer"
            >
                {isSubmitting ? "Creating account..." : "Create account"}
            </button>
        </form>
    );
}