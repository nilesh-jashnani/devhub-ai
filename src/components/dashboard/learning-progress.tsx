type LearningProgressProps = {
    totalNotes: number;
    completedTopics: number;
    completionPercentage: number;
    averageScore: number;
};

export function LearningProgress({
    totalNotes,
    completedTopics,
    completionPercentage,
    averageScore,
}: LearningProgressProps) {
    return (
        <section className="rounded-xl border p-6">
            <h2 className="text-xl font-semibold">
                Learning Progress
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
                Your progress across all developer topics.
            </p>

            <div className="mt-6">
                <div className="flex items-center justify-between text-sm">
                    <span>Overall completion</span>

                    <span className="font-semibold">
                        {completionPercentage}%
                    </span>
                </div>

                <div className="mt-2 h-3 overflow-hidden rounded-full bg-muted">
                    <div
                        className="h-full bg-primary transition-all"
                        style={{
                            width: `${completionPercentage}%`,
                        }}
                    />
                </div>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4">
                <ProgressMetric
                    title="Topics"
                    value={totalNotes}
                />

                <ProgressMetric
                    title="Completed"
                    value={completedTopics}
                />

                <ProgressMetric
                    title="Avg Score"
                    value={`${averageScore}%`}
                />
            </div>
        </section>
    );
}

function ProgressMetric({
    title,
    value,
}: {
    title: string;
    value: string | number;
}) {
    return (
        <div className="rounded-lg bg-muted p-4">
            <p className="text-2xl font-bold">
                {value}
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
                {title}
            </p>
        </div>
    );
}