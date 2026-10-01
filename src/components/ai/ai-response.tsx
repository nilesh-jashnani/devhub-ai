"use client";

import { useState } from "react";
import ReactMarkdown, {
    type Components,
} from "react-markdown";
import remarkGfm from "remark-gfm";
import {
    Prism as SyntaxHighlighter,
} from "react-syntax-highlighter";
import {
    oneDark,
} from "react-syntax-highlighter/dist/esm/styles/prism";

type AIResponseProps = {
    response: string;
};

function CopyIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="size-4"
            aria-hidden="true"
        >
            <rect
                x="8"
                y="8"
                width="11"
                height="11"
                rx="2"
            />
            <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
        </svg>
    );
}

function CheckIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="size-4"
            aria-hidden="true"
        >
            <path d="m5 12 4 4L19 6" />
        </svg>
    );
}

function ExternalLinkIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="ml-1 inline size-3.5"
            aria-hidden="true"
        >
            <path d="M14 5h5v5" />
            <path d="M10 14 19 5" />
            <path d="M19 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" />
        </svg>
    );
}

export function AIResponse({
    response,
}: AIResponseProps) {
    const [copied, setCopied] =
        useState(false);

    async function copyResponse() {
        try {
            await navigator.clipboard.writeText(
                response,
            );

            setCopied(true);

            window.setTimeout(() => {
                setCopied(false);
            }, 2000);
        } catch (error) {
            console.error(
                "Failed to copy AI response:",
                error,
            );
        }
    }

    const components: Components = {
        h1: ({ children }) => (
            <h1 className="mb-4 mt-8 text-2xl font-bold tracking-tight first:mt-0 sm:text-3xl">
                {children}
            </h1>
        ),

        h2: ({ children }) => (
            <h2 className="mb-3 mt-8 border-b pb-2 text-xl font-semibold tracking-tight first:mt-0">
                {children}
            </h2>
        ),

        h3: ({ children }) => (
            <h3 className="mb-2 mt-6 text-lg font-semibold tracking-tight first:mt-0">
                {children}
            </h3>
        ),

        h4: ({ children }) => (
            <h4 className="mb-2 mt-5 font-semibold">
                {children}
            </h4>
        ),

        p: ({ children }) => (
            <p className="mb-4 text-[15px] leading-7 text-foreground/90 last:mb-0 sm:text-base">
                {children}
            </p>
        ),

        strong: ({ children }) => (
            <strong className="font-semibold text-foreground">
                {children}
            </strong>
        ),

        em: ({ children }) => (
            <em className="text-foreground/90">
                {children}
            </em>
        ),

        ul: ({ children }) => (
            <ul className="mb-5 ml-5 list-disc space-y-2.5 text-[15px] marker:text-primary sm:text-base">
                {children}
            </ul>
        ),

        ol: ({ children }) => (
            <ol className="mb-5 ml-5 list-decimal space-y-2.5 text-[15px] marker:font-semibold marker:text-primary sm:text-base">
                {children}
            </ol>
        ),

        li: ({ children }) => (
            <li className="pl-1 leading-7 text-foreground/90">
                {children}
            </li>
        ),

        blockquote: ({ children }) => (
            <blockquote className="my-6 rounded-r-xl border-l-4 border-primary bg-primary/[0.04] px-5 py-4 text-foreground/80">
                {children}
            </blockquote>
        ),

        hr: () => (
            <hr className="my-8 border-border" />
        ),

        code: ({
            className,
            children,
        }) => {
            const match =
                /language-(\w+)/.exec(
                    className || "",
                );

            const code = String(
                children,
            ).replace(/\n$/, "");

            const isBlock =
                Boolean(match) ||
                code.includes("\n");

            if (!isBlock) {
                return (
                    <code className="rounded-md border bg-muted/70 px-1.5 py-0.5 font-mono text-[0.88em] font-medium text-primary">
                        {children}
                    </code>
                );
            }

            return (
                <CodeBlock
                    code={code}
                    language={
                        match?.[1] ??
                        "text"
                    }
                />
            );
        },

        table: ({ children }) => (
            <div className="my-6 overflow-x-auto rounded-xl border">
                <table className="w-full min-w-[560px] border-collapse text-sm">
                    {children}
                </table>
            </div>
        ),

        thead: ({ children }) => (
            <thead className="bg-muted/60">
                {children}
            </thead>
        ),

        tbody: ({ children }) => (
            <tbody className="divide-y">
                {children}
            </tbody>
        ),

        tr: ({ children }) => (
            <tr className="transition-colors hover:bg-muted/20">
                {children}
            </tr>
        ),

        th: ({ children }) => (
            <th className="border-r px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground last:border-r-0">
                {children}
            </th>
        ),

        td: ({ children }) => (
            <td className="border-r px-4 py-3 align-top leading-6 text-foreground/90 last:border-r-0">
                {children}
            </td>
        ),

        a: ({
            href,
            children,
        }) => (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary"
            >
                {children}
                <ExternalLinkIcon />
            </a>
        ),
    };

    if (!response.trim()) {
        return null;
    }

    return (
        <div>
            <div className="mb-6 flex items-center justify-between gap-4 border-b pb-4">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                        Generated response
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                        AI-generated learning
                        material
                    </p>
                </div>

                <button
                    type="button"
                    onClick={
                        copyResponse
                    }
                    aria-label={
                        copied
                            ? "Response copied"
                            : "Copy AI response"
                    }
                    className="inline-flex h-9 cursor-pointer items-center justify-center gap-2 rounded-xl border bg-background px-3 text-xs font-semibold transition-colors hover:bg-muted"
                >
                    {copied ? (
                        <>
                            <CheckIcon />
                            Copied
                        </>
                    ) : (
                        <>
                            <CopyIcon />
                            Copy
                        </>
                    )}
                </button>
            </div>

            <div className="max-w-none">
                <ReactMarkdown
                    remarkPlugins={[
                        remarkGfm,
                    ]}
                    components={
                        components
                    }
                >
                    {response}
                </ReactMarkdown>
            </div>
        </div>
    );
}

type CodeBlockProps = {
    code: string;
    language: string;
};

function CodeBlock({
    code,
    language,
}: CodeBlockProps) {
    const [copied, setCopied] =
        useState(false);

    async function copyCode() {
        try {
            await navigator.clipboard.writeText(
                code,
            );

            setCopied(true);

            window.setTimeout(() => {
                setCopied(false);
            }, 2000);
        } catch (error) {
            console.error(
                "Failed to copy code:",
                error,
            );
        }
    }

    const displayLanguage =
        language === "text"
            ? "Code"
            : language;

    return (
        <div className="my-6 overflow-hidden rounded-2xl border border-white/10 bg-[#282c34] shadow-sm">
            <div className="flex h-11 items-center justify-between border-b border-white/10 bg-black/20 px-4">
                <div className="flex items-center gap-3">
                    <div
                        className="flex gap-1.5"
                        aria-hidden="true"
                    >
                        <span className="size-2.5 rounded-full bg-white/20" />
                        <span className="size-2.5 rounded-full bg-white/20" />
                        <span className="size-2.5 rounded-full bg-white/20" />
                    </div>

                    <span className="font-mono text-[11px] font-medium uppercase tracking-wider text-white/60">
                        {displayLanguage}
                    </span>
                </div>

                <button
                    type="button"
                    onClick={copyCode}
                    aria-label={
                        copied
                            ? "Code copied"
                            : "Copy code"
                    }
                    className="inline-flex h-7 cursor-pointer items-center gap-1.5 rounded-lg px-2 text-xs font-medium text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                >
                    {copied ? (
                        <>
                            <CheckIcon />
                            Copied
                        </>
                    ) : (
                        <>
                            <CopyIcon />
                            Copy
                        </>
                    )}
                </button>
            </div>

            <div className="overflow-x-auto">
                <SyntaxHighlighter
                    language={
                        language
                    }
                    style={oneDark}
                    PreTag="div"
                    customStyle={{
                        margin: 0,
                        padding:
                            "1.25rem",
                        borderRadius: 0,
                        background:
                            "transparent",
                        fontSize:
                            "0.875rem",
                        lineHeight:
                            "1.7",
                    }}
                    codeTagProps={{
                        style: {
                            fontFamily:
                                "var(--font-jetbrains-mono), monospace",
                        },
                    }}
                >
                    {code}
                </SyntaxHighlighter>
            </div>
        </div>
    );
}