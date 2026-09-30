import { Suspense } from "react";

import { updateUserRole } from "@/actions/admin";
import { isAdmin } from "@/lib/auth-helper";
import { db } from "@/prisma/db";

function UsersTableLoading() {
    return (
        <div className="mt-8 overflow-hidden rounded-xl border">
            <div className="space-y-3 p-6">
                {Array.from({
                    length: 5,
                }).map((_, index) => (
                    <div
                        key={index}
                        className="h-12 animate-pulse rounded-md bg-muted"
                    />
                ))}
            </div>
        </div>
    );
}

async function AdminUsersTable() {
    const session = await isAdmin();

    const users =
        await db.orm.public.User
            .orderBy((user) =>
                user.createdAt.desc()
            )
            .all();

    if (users.length === 0) {
        return (
            <div className="mt-8 rounded-xl border p-8 text-center">
                <h2 className="font-semibold">
                    No users found
                </h2>

                <p className="mt-2 text-sm text-muted-foreground">
                    Registered users will appear here.
                </p>
            </div>
        );
    }

    return (
        <div className="mt-8 overflow-x-auto rounded-xl border">
            <table className="w-full text-left text-sm">
                <thead className="border-b bg-muted/40">
                    <tr>
                        <th className="px-4 py-3 font-medium">
                            Name
                        </th>

                        <th className="px-4 py-3 font-medium">
                            Email
                        </th>

                        <th className="px-4 py-3 font-medium">
                            Role
                        </th>

                        <th className="px-4 py-3 font-medium">
                            Joined
                        </th>

                        <th className="px-4 py-3 font-medium">
                            Action
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((user) => {
                        const isCurrentAdmin =
                            user.id ===
                            session.user.id;

                        const nextRole =
                            user.role === "ADMIN"
                                ? "USER"
                                : "ADMIN";

                        return (
                            <tr
                                key={user.id}
                                className="border-b last:border-b-0"
                            >
                                <td className="px-4 py-4 font-medium">
                                    <div className="flex items-center gap-2">
                                        <span>
                                            {user.name ??
                                                "Unnamed user"}
                                        </span>

                                        {isCurrentAdmin && (
                                            <span className="text-xs text-muted-foreground">
                                                (you)
                                            </span>
                                        )}
                                    </div>
                                </td>

                                <td className="px-4 py-4 text-muted-foreground">
                                    {user.email ??
                                        "No email"}
                                </td>

                                <td className="px-4 py-4">
                                    <span className="rounded-full border px-2.5 py-1 text-xs">
                                        {user.role}
                                    </span>
                                </td>

                                <td className="px-4 py-4 text-muted-foreground">
                                    {new Date(
                                        Number(
                                            user
                                                .createdAt
                                                .epochMilliseconds,
                                        ),
                                    ).toLocaleDateString()}
                                </td>

                                <td className="px-4 py-4">
                                    {isCurrentAdmin ? (
                                        <span className="text-xs text-muted-foreground">
                                            Current account
                                        </span>
                                    ) : (
                                        <form
                                            action={
                                                updateUserRole
                                            }
                                        >
                                            <input
                                                type="hidden"
                                                name="userId"
                                                value={
                                                    user.id
                                                }
                                            />

                                            <input
                                                type="hidden"
                                                name="role"
                                                value={
                                                    nextRole
                                                }
                                            />

                                            <button
                                                type="submit"
                                                className="rounded-md border px-3 py-2 text-xs font-medium transition-colors hover:bg-muted"
                                            >
                                                {user.role ===
                                                    "ADMIN"
                                                    ? "Demote to User"
                                                    : "Promote to Admin"}
                                            </button>
                                        </form>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default function AdminUsersPage() {
    return (
        <main className="mx-auto max-w-7xl px-6 py-8">
            <div>
                <p className="text-sm font-medium text-muted-foreground">
                    User Management
                </p>

                <h1 className="mt-1 text-3xl font-bold tracking-tight">
                    Users
                </h1>

                <p className="mt-2 text-muted-foreground">
                    Review registered users and
                    manage administrator access.
                </p>
            </div>

            <Suspense
                fallback={
                    <UsersTableLoading />
                }
            >
                <AdminUsersTable />
            </Suspense>
        </main>
    );
}