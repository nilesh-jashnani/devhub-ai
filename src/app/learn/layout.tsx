import Link from "next/link";
import {
    BookOpen,
    LayoutDashboard,
    LogIn,
    Brain
} from "lucide-react";

import { auth } from "@/auth";
import { APP_NAME } from "@/lib/constants";

function LogoMark() {
    return (
        <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <Brain
                className="size-5"
                aria-hidden="true"
            />
        </span>
    );
}

export default async function LearnLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();

    const isLoggedIn = Boolean(
        session?.user?.id,
    );

    return (
        <div className="min-h-screen bg-background">
            <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
                    <div className="flex min-w-0 items-center gap-6">
                        <Link
                            href="/"
                            className="flex shrink-0 items-center gap-2.5"
                        >
                            {/* <div className="flex size-9 items-center justify-center rounded-xl bg-foreground text-sm font-bold text-background">
                                DH
                            </div> */}
                            <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                                <LogoMark />
                            </span>

                            <span className="hidden font-semibold tracking-tight sm:inline">
                                {APP_NAME}
                            </span>
                        </Link>

                        <nav
                            aria-label="Public navigation"
                            className="flex items-center"
                        >
                            <Link
                                href="/learn"
                                className="inline-flex h-9 items-center gap-2 rounded-lg px-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
                            >
                                <BookOpen
                                    className="size-4 text-primary"
                                    aria-hidden="true"
                                />
                                Learn
                            </Link>
                        </nav>
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                        {isLoggedIn ? (
                            <Link
                                href="/dashboard"
                                className="inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-primary px-3.5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
                            >
                                <LayoutDashboard
                                    className="size-4"
                                    aria-hidden="true"
                                />

                                <span className="hidden sm:inline">
                                    Dashboard
                                </span>

                                <span className="sm:hidden">
                                    Dashboard
                                </span>
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="inline-flex h-9 items-center justify-center gap-2 rounded-lg px-3 text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                                >
                                    <LogIn
                                        className="size-4 sm:hidden"
                                        aria-hidden="true"
                                    />

                                    <span className="hidden sm:inline">
                                        Log in
                                    </span>
                                </Link>

                                <Link
                                    href="/register"
                                    className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-3.5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
                                >
                                    Get started
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </header>

            {children}
        </div>
    );
}