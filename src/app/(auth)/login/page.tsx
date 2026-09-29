import Link from "next/link";

import LoginForm from "@/components/auth/login-form";

export default function LoginPage() {
    return (
        <main className="flex min-h-screen items-center justify-center px-6">
            <div className="w-full max-w-md space-y-8">
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold">Welcome back</h1>

                    <p className="text-muted-foreground">
                        Sign in to continue to DevHub AI.
                    </p>
                </div>

                <LoginForm />

                <p className="text-center text-sm text-muted-foreground">
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/register"
                        className="font-medium text-foreground underline"
                    >
                        Create one
                    </Link>
                </p>
            </div>
        </main>
    );
}