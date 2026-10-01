import Link from "next/link";

type NeedsReviewItem = {
    note: {
        id: string;
        title: string;
        slug: string;
    };

    progress:
    | {
        score: number | null;
    }
    | undefined;
};

type NeedsReviewProps = {
    items: NeedsReviewItem[];
};

function ReviewIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="size-5"
            aria-hidden="true"
        >
            <path d="M12 3 3.5 19h17z" />
            <path d="M12 9v4" />
            <path d="M12 16.5h.01" />
        </svg>
    );
}

function CheckIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="size-5"
            aria-hidden="true"
        >
            <circle
                cx="12"
                cy="12"
                r="9"
            />

            <path d="m8.5 12 2.25 2.25L15.75 9" />
        </svg>
    );
}

function ArrowIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="size-4 transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
        >
            <path d="M5 12h14" />
            <path d="m15 8 4 4-4 4" />
        </svg>
    );
}

export function NeedsReview({
    items,
}: NeedsReviewProps) {
    return (
        <section className="flex h-full flex-col rounded-2xl border bg-card p-5 shadow-sm sm:p-6">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold tracking-tight">
                            Needs review
                        </h3>

                        {items.length > 0 && (
                            <span className="inline-flex min-w-6 items-center justify-center rounded-full bg-amber-500/10 px-2 py-0.5 text-xs font-bold text-amber-700 dark:text-amber-400">
                                {items.length}
                            </span>
                        )}
                    </div>

                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        Topics with confidence
                        below 60%.
                    </p>
                </div>

                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-400">
                    <ReviewIcon />
                </div>
            </div>

            {items.length === 0 ? (
                <div className="flex flex-1 items-center justify-center py-8">
                    <div className="max-w-xs text-center">
                        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <CheckIcon />
                        </div>

                        <h4 className="mt-4 text-sm font-semibold">
                            You&apos;re caught up
                        </h4>

                        <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                            No topics currently
                            have a confidence score
                            below 60%.
                        </p>
                    </div>
                </div>
            ) : (
                <div className="mt-6 space-y-2">
                    {items
                        .slice(0, 5)
                        .map(
                            ({
                                note,
                                progress,
                            }) => {
                                const score =
                                    progress?.score ??
                                    0;

                                return (
                                    <Link
                                        key={
                                            note.id
                                        }
                                        href={`/dashboard/notes/${note.slug}`}
                                        className="group flex items-center gap-3 rounded-xl border bg-background p-3.5 transition-all hover:border-amber-500/25 hover:bg-amber-500/[0.03]"
                                    >
                                        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-xs font-bold text-amber-700 dark:text-amber-400">
                                            {
                                                score
                                            }
                                            %
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-semibold">
                                                {
                                                    note.title
                                                }
                                            </p>

                                            <p className="mt-0.5 text-xs text-muted-foreground">
                                                Review
                                                recommended
                                            </p>
                                        </div>

                                        <div className="text-muted-foreground transition-colors group-hover:text-amber-700 dark:group-hover:text-amber-400">
                                            <ArrowIcon />
                                        </div>
                                    </Link>
                                );
                            },
                        )}

                    {items.length > 5 && (
                        <p className="pt-2 text-center text-xs text-muted-foreground">
                            +
                            {items.length -
                                5}{" "}
                            more topics need
                            review
                        </p>
                    )}
                </div>
            )}
        </section>
    );
}