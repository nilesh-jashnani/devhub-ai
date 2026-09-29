import Link from "next/link";

import { RegisterForm } from "@/components/auth/register-form";
import { APP_NAME } from "@/lib/constants";

export default function RegisterPage() {
    return (
        <main className="flex min-h-screen items-center justify-center px-6 py-12">
            <div className="w-full max-w-md">
                <div className="mb-8 text-center">
                    <Link
                        href="/"
                        className="text-2xl font-bold"
                    >
                        {APP_NAME}
                    </Link>

                    <h1 className="mt-6 text-3xl font-bold">
                        Create your account
                    </h1>

                    <p className="mt-2 text-sm text-muted-foreground">
                        Start building your personal developer knowledge base.
                    </p>
                </div>

                <div className="rounded-xl border p-6 shadow-sm">
                    <RegisterForm />
                </div>

                <p className="mt-6 text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="font-medium text-foreground hover:underline"
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </main>
    );
}