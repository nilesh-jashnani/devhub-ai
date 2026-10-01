import Link from "next/link";

import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
    return (
        <div>
            <div>
                <p className="text-sm font-semibold text-primary">
                    Get started
                </p>

                <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                    Create your account
                </h1>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    Start building your personal
                    developer knowledge base and turn
                    what you learn into practical
                    interview preparation.
                </p>
            </div>

            <div className="mt-8 rounded-2xl border bg-card p-5 shadow-sm sm:p-6">
                <RegisterForm />
            </div>

            <p className="mt-6 text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                    href="/login"
                    className="font-semibold text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary"
                >
                    Sign in
                </Link>
            </p>
        </div>
    );
}