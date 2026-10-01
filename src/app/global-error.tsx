"use client";

import { useEffect } from "react";

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
    useEffect(() => {
        console.error(
            "Global application error:",
            error,
        );
    }, [error]);

    return (
        <html lang="en">
            <body
                style={{
                    margin: 0,
                    background: "#0a0a0a",
                    color: "#fafafa",
                    fontFamily:
                        "Arial, Helvetica, sans-serif",
                }}
            >
                <main
                    style={{
                        minHeight: "100vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "24px",
                        boxSizing:
                            "border-box",
                    }}
                >
                    <div
                        style={{
                            width: "100%",
                            maxWidth: "520px",
                            textAlign: "center",
                        }}
                    >
                        <div
                            aria-hidden="true"
                            style={{
                                width: "48px",
                                height: "48px",
                                margin:
                                    "0 auto 24px",
                                display:
                                    "flex",
                                alignItems:
                                    "center",
                                justifyContent:
                                    "center",
                                borderRadius:
                                    "14px",
                                background:
                                    "#4f46e5",
                                color: "#ffffff",
                                fontSize:
                                    "20px",
                                fontWeight:
                                    700,
                            }}
                        >
                            !
                        </div>

                        <p
                            style={{
                                margin:
                                    "0 0 8px",
                                color:
                                    "#a5b4fc",
                                fontSize:
                                    "14px",
                                fontWeight:
                                    600,
                            }}
                        >
                            Application error
                        </p>

                        <h1
                            style={{
                                margin: 0,
                                fontSize:
                                    "32px",
                                lineHeight:
                                    1.2,
                                letterSpacing:
                                    "-0.025em",
                            }}
                        >
                            Something went
                            wrong
                        </h1>

                        <p
                            style={{
                                margin:
                                    "16px auto 0",
                                maxWidth:
                                    "440px",
                                color:
                                    "#a3a3a3",
                                fontSize:
                                    "15px",
                                lineHeight:
                                    1.7,
                            }}
                        >
                            {APP_NAME} ran
                            into an unexpected
                            problem while
                            loading. Try again
                            to restart this
                            part of the
                            application.
                        </p>

                        {error.digest && (
                            <p
                                style={{
                                    margin:
                                        "12px 0 0",
                                    color:
                                        "#737373",
                                    fontSize:
                                        "12px",
                                }}
                            >
                                Error
                                reference:{" "}
                                {
                                    error.digest
                                }
                            </p>
                        )}

                        <button
                            type="button"
                            onClick={reset}
                            style={{
                                marginTop:
                                    "28px",
                                minHeight:
                                    "44px",
                                padding:
                                    "0 20px",
                                border: 0,
                                borderRadius:
                                    "10px",
                                background:
                                    "#4f46e5",
                                color:
                                    "#ffffff",
                                fontSize:
                                    "14px",
                                fontWeight:
                                    600,
                                cursor:
                                    "pointer",
                            }}
                        >
                            Try again
                        </button>
                    </div>
                </main>
            </body>
        </html>
    );
}