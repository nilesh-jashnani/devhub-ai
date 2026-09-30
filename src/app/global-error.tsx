"use client";

import { APP_NAME } from "@/lib/constants";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & {
        digest?: string;
    };
    reset: () => void;
}) {
    return (
        <html lang="en">
            <body>
                <main
                    style={{
                        minHeight: "100vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "24px",
                    }}
                >
                    <div
                        style={{
                            maxWidth: "500px",
                            textAlign: "center",
                        }}
                    >
                        <h1>
                            {APP_NAME} encountered an error
                        </h1>

                        <p>
                            Something unexpected happened
                            while loading the application.
                        </p>

                        <button
                            type="button"
                            onClick={reset}
                        >
                            Try again
                        </button>
                    </div>
                </main>
            </body>
        </html>
    );
}