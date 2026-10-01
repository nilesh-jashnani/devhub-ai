type LearningProgressProps = {
    totalNotes: number;
    completedTopics: number;
    completionPercentage: number;
    averageScore: number;
};

function ProgressIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="size-5"
            aria-hidden="true"
        >
            <path d="M4 19V9" />
            <path d="M10 19V5" />
            <path d="M16 19v-7" />
            <path d="M22 19V3" />
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

export function LearningProgress({
    totalNotes,
    completedTopics,
    completionPercentage,
    averageScore,
}: LearningProgressProps) {
    const remainingTopics = Math.max(
        totalNotes - completedTopics,
        0,
    );

    return (
        <section className="flex h-full flex-col rounded-2xl border bg-card p-5 shadow-sm sm:p-6">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h3 className="text-lg font-semibold tracking-tight">
                        Learning progress
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        Your progress across all
                        developer topics.
                    </p>
                </div>

                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <ProgressIcon />
                </div>
            </div>

            <div className="mt-7">
                <div className="flex items-end justify-between gap-4">
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">
                            Overall completion
                        </p>

                        <div className="mt-1 flex items-baseline gap-1">
                            <span className="text-3xl font-bold tracking-tight">
                                {
                                    completionPercentage
                                }
                            </span>

                            <span className="font-semibold text-muted-foreground">
                                %
                            </span>
                        </div>
                    </div>

                    {completionPercentage ===
                        100 ? (
                        <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
                            <CheckIcon />
                            Complete
                        </div>
                    ) : (
                        <div className="rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground">
                            {remainingTopics}{" "}
                            {remainingTopics === 1
                                ? "topic"
                                : "topics"}{" "}
                            remaining
                        </div>
                    )}
                </div>

                <div
                    className="mt-4 h-2.5 overflow-hidden rounded-full bg-muted"
                    role="progressbar"
                    aria-label="Overall learning completion"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={
                        completionPercentage
                    }
                >
                    <div
                        className="h-full rounded-full bg-primary transition-[width] duration-500"
                        style={{
                            width: `${Math.min(
                                Math.max(
                                    completionPercentage,
                                    0,
                                ),
                                100,
                            )}%`,
                        }}
                    />
                </div>
            </div>

            <div className="mt-7 grid grid-cols-3 gap-2 sm:gap-3">
                <ProgressMetric
                    title="Topics"
                    value={totalNotes}
                />

                <ProgressMetric
                    title="Completed"
                    value={completedTopics}
                />

                <ProgressMetric
                    title="Avg confidence"
                    value={`${averageScore}%`}
                    emphasized
                />
            </div>
        </section>
    );
}

function ProgressMetric({
    title,
    value,
    emphasized = false,
}: {
    title: string;
    value: string | number;
    emphasized?: boolean;
}) {
    return (
        <div
            className={
                emphasized
                    ? "rounded-xl border border-primary/15 bg-primary/5 p-3 sm:p-4"
                    : "rounded-xl border bg-muted/30 p-3 sm:p-4"
            }
        >
            <p
                className={
                    emphasized
                        ? "text-xl font-bold tracking-tight text-primary sm:text-2xl"
                        : "text-xl font-bold tracking-tight sm:text-2xl"
                }
            >
                {value}
            </p>

            <p className="mt-1 text-[11px] font-medium text-muted-foreground sm:text-xs">
                {title}
            </p>
        </div>
    );
}