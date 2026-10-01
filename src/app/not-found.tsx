import Link from "next/link";
import {
    ArrowRight,
    Home,
    SearchX,
} from "lucide-react";

import { APP_NAME } from "@/lib/constants";

export default function NotFound() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6">
            <div className="w-full max-w-xl text-center">
                <div className="mx-auto flex size-14 items-center justify-center rounded-2xl border bg-muted/40 text-muted-foreground">
                    <SearchX
                        className="size-6"
                        aria-hidden="true"
                    />
                </div>

                <p className="mt-6 text-sm font-semibold text-primary">
                    404 · {APP_NAME}
                </p>

                <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                    This page doesn&apos;t
                    exist
                </h1>

                <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-muted-foreground sm:text-base">
                    The page may have moved,
                    been removed, or the
                    address may be incorrect.
                </p>

                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                    <Link
                        href="/"
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                        <Home className="size-4" />
                        Go home
                    </Link>

                    <Link
                        href="/learn"
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border bg-background px-4 text-sm font-semibold transition-colors hover:bg-muted"
                    >
                        Browse knowledge
                        <ArrowRight className="size-4" />
                    </Link>
                </div>
            </div>
        </main>
    );
}