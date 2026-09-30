import Link from "next/link";

export default function DashboardNotFound() {
    return (
        <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-6 text-center">
            <p className="text-sm font-medium text-muted-foreground">
                404
            </p>

            <h1 className="mt-3 text-3xl font-bold">
                Resource not found
            </h1>

            <p className="mt-3 text-muted-foreground">
                The resource you're looking for
                doesn't exist or you don't have
                access to it.
            </p>

            <div className="mt-6 flex gap-3">
                <Link
                    href="/dashboard"
                    className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground"
                >
                    Dashboard
                </Link>

                <Link
                    href="/dashboard/notes"
                    className="rounded-md border px-4 py-2 text-sm"
                >
                    View notes
                </Link>
            </div>
        </div>
    );
}