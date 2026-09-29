import { isAdmin } from "@/lib/auth-helper";

export default async function AdminPage() {
    const session = await isAdmin();

    return (
        <main className="mx-auto max-w-5xl p-8">
            <h1 className="text-3xl font-bold">
                Admin Dashboard
            </h1>

            <p className="mt-2 text-muted-foreground">
                Only administrators can access this page.
            </p>

            <div className="mt-8 rounded-lg border p-6">
                <p>
                    Logged in as:{" "}
                    <strong>{session.user.email}</strong>
                </p>

                <p className="mt-2">
                    Role: <strong>{session.user.role}</strong>
                </p>
            </div>
        </main>
    );
}