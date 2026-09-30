import { APP_NAME } from "@/lib/constants";
import Link from "next/link";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="flex min-h-screen items-center justify-center bg-muted/30 px-6">
            <div className="w-full max-w-md">
                <div className="mb-8 mt-8 text-center">
                    <Link
                        href="/"
                        className="text-2xl font-bold"
                    >
                        {APP_NAME}
                    </Link>

                    <p className="mt-2 text-sm text-muted-foreground">
                        Your AI-powered developer learning workspace.
                    </p>
                </div>

                {children}
            </div>
        </main>
    );
}