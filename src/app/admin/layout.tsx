import Link from "next/link";
import { Suspense } from "react";
import {
    ArrowLeft,
    Brain,
    FileText,
    LayoutDashboard,
    ShieldCheck,
    Users,
} from "lucide-react";

import { isAdmin } from "@/lib/auth-helper";
import { APP_NAME } from "@/lib/constants";

type AdminLayoutProps = {
    children: React.ReactNode;
};

const navigation = [
    {
        href: "/admin",
        label: "Overview",
        icon: LayoutDashboard,
    },
    {
        href: "/admin/users",
        label: "Users",
        icon: Users,
    },
    {
        href: "/admin/notes",
        label: "Notes",
        icon: FileText,
    },
    {
        href: "/admin/ai",
        label: "AI Usage",
        icon: Brain,
    },
];

async function AdminAuthBoundary({
    children,
}: AdminLayoutProps) {
    await isAdmin();

    return children;
}

function AdminAuthLoading() {
    return (
        <main
            className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
            aria-busy="true"
        >
            <span className="sr-only">
                Verifying administrator access...
            </span>

            <div className="animate-pulse">
                <div className="h-4 w-32 rounded bg-muted" />

                <div className="mt-4 h-9 w-72 max-w-full rounded-lg bg-muted" />

                <div className="mt-3 h-5 w-96 max-w-full rounded bg-muted" />

                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {Array.from({
                        length: 4,
                    }).map((_, index) => (
                        <div
                            key={index}
                            className="h-32 rounded-2xl border bg-muted/30"
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
            <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur-xl">
                <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
                    <div className="flex items-center justify-between gap-4">
                        <Link
                            href="/admin"
                            className="flex items-center gap-3"
                        >
                            <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                                <ShieldCheck
                                    className="size-5"
                                    aria-hidden="true"
                                />
                            </span>

                            <span>
                                <span className="block text-sm font-bold tracking-tight">
                                    {APP_NAME}
                                </span>

                                <span className="block text-xs text-muted-foreground">
                                    Administration
                                </span>
                            </span>
                        </Link>

                        <Link
                            href="/dashboard"
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground lg:hidden"
                        >
                            <ArrowLeft className="size-3.5" />
                            Dashboard
                        </Link>
                    </div>

                    <div className="flex items-center gap-3 overflow-x-auto">
                        <nav
                            aria-label="Admin navigation"
                            className="flex min-w-max items-center gap-1 rounded-xl border bg-muted/20 p-1"
                        >
                            {navigation.map(
                                (item) => {
                                    const Icon =
                                        item.icon;

                                    return (
                                        <Link
                                            key={
                                                item.href
                                            }
                                            href={
                                                item.href
                                            }
                                            className="inline-flex h-9 items-center gap-2 rounded-lg px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-background hover:text-foreground hover:shadow-sm"
                                        >
                                            <Icon
                                                className="size-4"
                                                aria-hidden="true"
                                            />

                                            {
                                                item.label
                                            }
                                        </Link>
                                    );
                                },
                            )}
                        </nav>

                        <Link
                            href="/dashboard"
                            className="hidden min-w-max items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground lg:inline-flex"
                        >
                            <ArrowLeft
                                className="size-4"
                                aria-hidden="true"
                            />
                            Dashboard
                        </Link>
                    </div>
                </div>
            </header>

            <Suspense
                fallback={<AdminAuthLoading />}
            >
                <AdminAuthBoundary>
                    {children}
                </AdminAuthBoundary>
            </Suspense>
        </div>
    );
}