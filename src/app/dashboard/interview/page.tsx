import { isUser } from "@/lib/auth-helper";
import { db } from "@/prisma/db";
import { InterviewPrep } from "@/components/interview/interview-prep";

export default async function InterviewPage() {
    const session = await isUser();

    const userId = session.user.id;

    const userNotes = await db.orm.public.Note
        .where({
            authorId: userId,
        })
        .orderBy((note) =>
            note.createdAt.desc()
        )
        .all();

    const noteOptions = userNotes.map((note) => ({
        id: note.id,
        title: note.title,
    }));

    return (
        <div className="container mx-auto p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">
                    Interview Prep
                </h1>

                <p className="mt-2 text-muted-foreground">
                    Practice technical interview questions
                    generated from your developer notes.
                </p>
            </div>

            <InterviewPrep notes={noteOptions} />
        </div>
    );
}