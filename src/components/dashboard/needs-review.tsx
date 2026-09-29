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

export function NeedsReview({
    items,
}: NeedsReviewProps) {
    return (
        <section className="rounded-xl border p-6">
            <h2 className="text-xl font-semibold">
                Needs Review
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
                Topics with an understanding score below 60%.
            </p>

            {items.length === 0 ? (
                <div className="mt-6 rounded-lg bg-muted p-6 text-center">
                    <p className="text-sm text-muted-foreground">
                        No topics currently need review.
                    </p>
                </div>
            ) : (
                <div className="mt-6 space-y-3">
                    {items.map(({ note, progress }) => (
                        <Link
                            key={note.id}
                            href={`/dashboard/notes/${note.slug}`}
                            className="flex items-center justify-between rounded-lg border p-4 transition hover:bg-muted"
                        >
                            <span className="font-medium">
                                {note.title}
                            </span>

                            <span className="text-sm font-semibold">
                                {progress?.score}%
                            </span>
                        </Link>
                    ))}
                </div>
            )}
        </section>
    );
}