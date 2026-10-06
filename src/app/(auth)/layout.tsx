import { redirect } from "next/navigation";
import Link from "next/link";
import {
    Brain
} from "lucide-react";
import { APP_NAME } from "@/lib/constants";

import { auth } from "@/auth";

function LogoIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="size-5"
            aria-hidden="true"
        >
            <path d="M12 3 4.5 6.5v5c0 4.7 3 7.8 7.5 9.5 4.5-1.7 7.5-4.8 7.5-9.5v-5z" />
            <path d="m9 12 2 2 4-4" />
        </svg>
    );
}

function SparklesIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="size-5"
            aria-hidden="true"
        >
            <path d="M12 3 13.4 7.6 18 9l-4.6 1.4L12 15l-1.4-4.6L6 9l4.6-1.4z" />
            <path d="m18.5 15 .7 2.3 2.3.7-2.3.7-.7 2.3-.7-2.3-2.3-.7 2.3-.7z" />
        </svg>
    );
}

function NoteIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="size-5"
            aria-hidden="true"
        >
            <path d="M6 3.75h9l3 3v13.5H6z" />
            <path d="M15 3.75v3h3" />
            <path d="M9 11h6" />
            <path d="M9 15h4" />
        </svg>
    );
}

function InterviewIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="size-5"
            aria-hidden="true"
        >
            <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H11l-5 4v-4.18A2.5 2.5 0 0 1 4 13.5z" />
            <path d="M9 8h6" />
            <path d="M9 12h4" />
        </svg>
    );
}

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

const features = [
    {
        title: "Capture what you learn",
        description:
            "Build a personal vault of developer concepts, notes, and technical knowledge.",
        icon: <NoteIcon />,
    },
    {
        title: "Learn with AI",
        description:
            "Turn your notes into explanations, summaries, examples, and focused study material.",
        icon: <SparklesIcon />,
    },
    {
        title: "Prepare for interviews",
        description:
            "Practice technical questions generated directly from the concepts you are learning.",
        icon: <InterviewIcon />,
    },
];

export default async function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    if (session?.user?.id) {
        redirect("/dashboard");
    }

    return (
        <main className="min-h-screen bg-background">
            <div className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
                <section className="relative hidden overflow-hidden border-r bg-card lg:flex lg:flex-col lg:justify-between lg:p-10 xl:p-14">
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -left-32 -top-32 size-[28rem] rounded-full bg-primary/10 blur-3xl"
                    />

                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -bottom-40 right-0 size-[26rem] rounded-full bg-primary/[0.07] blur-3xl"
                    />

                    <Link
                        href="/"
                        className="relative inline-flex w-fit items-center gap-2.5"
                    >
                        <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                            <LogoIcon />
                        </span>

                        <span className="text-lg font-bold tracking-tight">
                            {APP_NAME}
                        </span>
                    </Link>

                    <div className="relative max-w-xl py-12">
                        <div className="inline-flex items-center gap-2 rounded-full border bg-background/70 px-3 py-1.5 text-xs font-semibold text-primary shadow-sm backdrop-blur">
                            <SparklesIcon />
                            AI-powered developer learning
                        </div>

                        <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight xl:text-5xl xl:leading-[1.1]">
                            Turn what you learn into
                            knowledge you can actually
                            use.
                        </h1>

                        <p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground">
                            Build your knowledge base,
                            strengthen concepts with AI,
                            track your progress, and
                            prepare for technical
                            interviews from one focused
                            workspace.
                        </p>

                        <div className="mt-10 space-y-5">
                            {features.map(
                                (feature) => (
                                    <div
                                        key={
                                            feature.title
                                        }
                                        className="flex gap-4"
                                    >
                                        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border bg-background text-primary shadow-sm">
                                            {
                                                feature.icon
                                            }
                                        </div>

                                        <div>
                                            <h2 className="text-sm font-semibold">
                                                {
                                                    feature.title
                                                }
                                            </h2>

                                            <p className="mt-1 max-w-md text-sm leading-6 text-muted-foreground">
                                                {
                                                    feature.description
                                                }
                                            </p>
                                        </div>
                                    </div>
                                ),
                            )}
                        </div>
                    </div>

                    <p className="relative text-xs font-medium text-muted-foreground">
                        Learn · Practice · Remember
                    </p>
                </section>

                <section className="relative flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 lg:px-10">
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute right-0 top-0 size-64 rounded-full bg-primary/[0.05] blur-3xl lg:hidden"
                    />

                    <div className="relative w-full max-w-md">
                        <Link
                            href="/"
                            className="mb-10 inline-flex items-center gap-2.5 lg:hidden"
                        >
                            <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                                {/* <LogoIcon /> */}
                                <LogoMark />
                            </span>

                            <span className="text-lg font-bold tracking-tight">
                                {APP_NAME}
                            </span>
                        </Link>

                        {children}
                    </div>
                </section>
            </div>
        </main>
    );
}