import Link from "next/link";
import { Suspense } from "react";

import { isAdmin } from "@/lib/auth-helper";
import { APP_NAME } from "@/lib/constants";

type AdminLayoutProps = {
    children: React.ReactNode;
};

async function AdminAuthBoundary({
    children,
}: AdminLayoutProps) {
    await isAdmin();

    return children;
}

function AdminLoading() {
    return (
        <main className="mx-auto max-w-7xl px-6 py-8">
            <div className="animate-pulse">
                <div className="h-8 w-64 rounded-md bg-muted" />

                <div className="mt-3 h-4 w-96 max-w-full rounded-md bg-muted" />

                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {Array.from({
                        length: 4,
                    }).map((_, index) => (
                        <div
                            key={index}
                            className="h-28 rounded-xl border bg-muted/30"
                        />
                    ))}
                </div>
            </div>
        </main>
    );
}

export default function AdminLayout({
    children,
}: AdminLayoutProps) {
    return (
        <div className="min-h-screen bg-background">
            <header className="border-b">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                    <div>
                        <Link
                            href="/admin"
                            className="text-lg font-bold"
                        >
                            {APP_NAME} Admin
                        </Link>

                        <p className="text-xs text-muted-foreground">
                            Administration
                        </p>
                    </div>

                    <nav className="flex items-center gap-5 text-sm">
                        <Link
                            href="/admin"
                            className="hover:underline"
                        >
                            Overview
                        </Link>

                        <Link
                            href="/admin/users"
                            className="hover:underline"
                        >
                            Users
                        </Link>

                        <Link
                            href="/admin/notes"
                            className="hover:underline"
                        >
                            Notes
                        </Link>

                        <Link
                            href="/admin/ai"
                            className="hover:underline"
                        >
                            AI Usage
                        </Link>

                        <Link
                            href="/dashboard"
                            className="text-muted-foreground hover:text-foreground"
                        >
                            ← Dashboard
                        </Link>
                    </nav>
                </div>
            </header>

            <Suspense fallback={<AdminLoading />}>
                <AdminAuthBoundary>
                    {children}
                </AdminAuthBoundary>
            </Suspense>
        </div>
    );
}