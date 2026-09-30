import { db } from "@/prisma/db";

import { LearningProgress } from "./learning-progress";
import { NeedsReview } from "./needs-review";

type ProgressSectionProps = {
    userId: string;
};

export async function ProgressSection({
    userId,
}: ProgressSectionProps) {
    const [notes, progress] =
        await Promise.all([
            db.orm.public.Note
                .where({
                    authorId: userId,
                })
                .all(),

            db.orm.public.Progress
                .where({
                    userId,
                })
                .all(),
        ]);

    const completedTopics =
        progress.filter(
            (item) => item.completed
        ).length;

    const completionPercentage =
        notes.length === 0
            ? 0
            : Math.round(
                (completedTopics /
                    notes.length) *
                100
            );

    const scores = progress
        .map((item) => item.score)
        .filter(
            (score): score is number =>
                score !== null
        );

    const averageScore =
        scores.length === 0
            ? 0
            : Math.round(
                scores.reduce(
                    (total, score) =>
                        total + score,
                    0
                ) / scores.length
            );


    const progressByNoteId =
        new Map(
            progress.map((item) => [
                item.noteId,
                item,
            ])
        );

    const needsReview = notes
        .map((note) => ({
            note: {
                id: note.id,
                title: note.title,
                slug: note.slug,
            },

            progress:
                progressByNoteId.get(
                    note.id
                ),
        }))
        .filter(
            ({ progress }) =>
                progress?.score !== null &&
                progress?.score !==
                undefined &&
                progress.score < 60
        )
        .sort(
            (a, b) =>
                (a.progress?.score ?? 0) -
                (b.progress?.score ?? 0)
        );

    return (
        <div className="grid gap-6 lg:grid-cols-2">
            <LearningProgress
                totalNotes={notes.length}
                completedTopics={
                    completedTopics
                }
                completionPercentage={
                    completionPercentage
                }
                averageScore={
                    averageScore
                }
            />

            <NeedsReview
                items={needsReview}
            />
        </div>
    );
}