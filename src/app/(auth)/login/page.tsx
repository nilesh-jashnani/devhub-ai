import Link from "next/link";

import LoginForm from "@/components/auth/login-form";

export default function LoginPage() {
    return (
        <div>
            <div>
                <p className="text-sm font-semibold text-primary">
                    Welcome back
                </p>

                <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                    Sign in to your workspace
                </h1>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    Continue building your knowledge
                    vault and preparing for your next
                    technical interview.
                </p>
            </div>

            <div className="mt-8 rounded-2xl border bg-card p-5 shadow-sm sm:p-6">
                <LoginForm />
            </div>

            <p className="mt-6 text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link
                    href="/register"
                    className="font-semibold text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary"
                >
                    Create an account
                </Link>
            </p>
        </div>
    );
}