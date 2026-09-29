import Link from "next/link";
import { createNote } from "@/actions/notes";

export default function NewNotePage() {
    return (
        <main className="mx-auto max-w-3xl p-8">
            <div className="mb-8">
                <Link
                    href="/dashboard/notes"
                    className="text-sm text-muted-foreground hover:underline"
                >
                    ← Back to notes
                </Link>

                <h1 className="mt-4 text-3xl font-bold">
                    Create Note
                </h1>

                <p className="mt-2 text-muted-foreground">
                    Save something you want to learn, remember, or practice.
                </p>
            </div>

            <form action={createNote} className="space-y-6">
                <div>
                    <label
                        htmlFor="title"
                        className="mb-2 block text-sm font-medium"
                    >
                        Title
                    </label>

                    <input
                        id="title"
                        name="title"
                        type="text"
                        required
                        className="w-full rounded-md border px-3 py-2"
                        placeholder="e.g. React Server Components"
                    />
                </div>

                <div>
                    <label
                        htmlFor="content"
                        className="mb-2 block text-sm font-medium"
                    >
                        Content
                    </label>

                    <textarea
                        id="content"
                        name="content"
                        required
                        rows={12}
                        className="w-full rounded-md border px-3 py-2"
                        placeholder="Write your knowledge here..."
                    />
                </div>

                <button
                    type="submit"
                    className="rounded-md bg-black px-4 py-2 text-white cursor-pointer"
                >
                    Create Note
                </button>
            </form>
        </main>
    );
}