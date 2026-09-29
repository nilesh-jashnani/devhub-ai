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

export function AIResponse({
    response,
}: AIResponseProps) {
    const [copied, setCopied] = useState(false);

    const copyResponse = async () => {
        try {
            await navigator.clipboard.writeText(response);

            setCopied(true);

            window.setTimeout(() => {
                setCopied(false);
            }, 2000);
        } catch (error) {
            console.error(
                "Failed to copy AI response:",
                error
            );
        }
    };

    const components: Components = {
        h1: ({ children }) => (
            <h1 className="mb-4 mt-6 text-2xl font-bold">
                {children}
            </h1>
        ),

        h2: ({ children }) => (
            <h2 className="mb-3 mt-6 text-xl font-semibold">
                {children}
            </h2>
        ),

        h3: ({ children }) => (
            <h3 className="mb-2 mt-5 text-lg font-semibold">
                {children}
            </h3>
        ),

        p: ({ children }) => (
            <p className="mb-4 leading-7">
                {children}
            </p>
        ),

        ul: ({ children }) => (
            <ul className="mb-4 ml-6 list-disc space-y-2">
                {children}
            </ul>
        ),

        ol: ({ children }) => (
            <ol className="mb-4 ml-6 list-decimal space-y-2">
                {children}
            </ol>
        ),

        li: ({ children }) => (
            <li className="leading-7">
                {children}
            </li>
        ),

        blockquote: ({ children }) => (
            <blockquote className="my-4 border-l-4 pl-4 italic">
                {children}
            </blockquote>
        ),

        code: ({
            className,
            children,
        }) => {
            const match =
                /language-(\w+)/.exec(
                    className || ""
                );

            const code = String(children).replace(
                /\n$/,
                ""
            );

            const isBlock =
                Boolean(match) ||
                code.includes("\n");

            if (!isBlock) {
                return (
                    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
                        {children}
                    </code>
                );
            }

            return (
                <CodeBlock
                    code={code}
                    language={match?.[1] ?? "text"}
                />
            );
        },

        table: ({ children }) => (
            <div className="my-4 overflow-x-auto">
                <table className="w-full border-collapse border">
                    {children}
                </table>
            </div>
        ),

        th: ({ children }) => (
            <th className="border px-3 py-2 text-left font-semibold">
                {children}
            </th>
        ),

        td: ({ children }) => (
            <td className="border px-3 py-2">
                {children}
            </td>
        ),

        a: ({ href, children }) => (
            <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="underline"
            >
                {children}
            </a>
        ),
    };

    if (!response.trim()) {
        return null;
    }

    return (
        <div className="relative">
            <div className="mb-4 flex justify-end">
                <button
                    type="button"
                    onClick={copyResponse}
                    className="rounded-md border px-3 py-1.5 text-sm cursor-pointer hover:bg-muted"
                >
                    {copied
                        ? "Copied!"
                        : "Copy response"}
                </button>
            </div>

            <div className="prose max-w-none dark:prose-invert">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={components}
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

    const copyCode = async () => {
        try {
            await navigator.clipboard.writeText(code);

            setCopied(true);

            window.setTimeout(() => {
                setCopied(false);
            }, 2000);
        } catch (error) {
            console.error(
                "Failed to copy code:",
                error
            );
        }
    };

    return (
        <div className="my-4 overflow-hidden rounded-lg border">
            <div className="flex items-center justify-between border-b bg-muted px-3 py-2">
                <span className="text-xs font-medium uppercase">
                    {language}
                </span>

                <button
                    type="button"
                    onClick={copyCode}
                    className="rounded px-2 py-1 text-xs cursor-pointer hover:bg-background"
                >
                    {copied ? "Copied!" : "Copy"}
                </button>
            </div>

            <SyntaxHighlighter
                language={language}
                style={oneDark}
                PreTag="div"
                customStyle={{
                    margin: 0,
                    borderRadius: 0,
                }}
            >
                {code}
            </SyntaxHighlighter>
        </div>
    );
}