import { Suspense } from "react";
import {
    ShieldCheck,
    UserCog,
    Users,
} from "lucide-react";

import { updateUserRole } from "@/actions/admin";
import { isAdmin } from "@/lib/auth-helper";
import { db } from "@/prisma/db";

function UsersTableLoading() {
    return (
        <div
            className="mt-8 overflow-hidden rounded-2xl border bg-card"
            aria-busy="true"
        >
            <span className="sr-only">
                Loading users...
            </span>

            <div className="space-y-3 p-5">
                {Array.from({
                    length: 6,
                }).map((_, index) => (
                    <div
                        key={index}
                        className="h-14 animate-pulse rounded-xl bg-muted"
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
                user.createdAt.desc(),
            )
            .all();

    if (users.length === 0) {
        return (
            <div className="mt-8 rounded-2xl border bg-card p-10 text-center">
                <div className="mx-auto flex size-11 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                    <Users className="size-5" />
                </div>

                <h2 className="mt-4 font-semibold">
                    No users found
                </h2>

                <p className="mt-2 text-sm text-muted-foreground">
                    Registered users will
                    appear here.
                </p>
            </div>
        );
    }

    return (
        <div className="mt-8 overflow-hidden rounded-2xl border bg-card shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full min-w-[820px] text-left text-sm">
                    <thead className="border-b bg-muted/30">
                        <tr>
                            <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                User
                            </th>

                            <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                Email
                            </th>

                            <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                Role
                            </th>

                            <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                Joined
                            </th>

                            <th className="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                Action
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map(
                            (user) => {
                                const isCurrentAdmin =
                                    user.id ===
                                    session
                                        .user
                                        .id;

                                const nextRole =
                                    user.role ===
                                        "ADMIN"
                                        ? "USER"
                                        : "ADMIN";

                                return (
                                    <tr
                                        key={
                                            user.id
                                        }
                                        className="border-b transition-colors last:border-0 hover:bg-muted/20"
                                    >
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                                                    {(
                                                        user.name?.[0] ??
                                                        user.email?.[0] ??
                                                        "U"
                                                    ).toUpperCase()}
                                                </div>

                                                <div>
                                                    <p className="font-semibold">
                                                        {user.name ??
                                                            "Unnamed user"}
                                                    </p>

                                                    {isCurrentAdmin && (
                                                        <p className="mt-0.5 text-xs text-muted-foreground">
                                                            Current
                                                            account
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-5 py-4 text-muted-foreground">
                                            {user.email ??
                                                "No email"}
                                        </td>

                                        <td className="px-5 py-4">
                                            <span
                                                className={
                                                    user.role ===
                                                        "ADMIN"
                                                        ? "inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary"
                                                        : "inline-flex rounded-full bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground"
                                                }
                                            >
                                                {user.role ===
                                                    "ADMIN" && (
                                                        <ShieldCheck className="size-3" />
                                                    )}

                                                {
                                                    user.role
                                                }
                                            </span>
                                        </td>

                                        <td className="px-5 py-4 text-muted-foreground">
                                            {new Date(
                                                Number(
                                                    user
                                                        .createdAt
                                                        .epochMilliseconds,
                                                ),
                                            ).toLocaleDateString(
                                                undefined,
                                                {
                                                    year: "numeric",
                                                    month: "short",
                                                    day: "numeric",
                                                },
                                            )}
                                        </td>

                                        <td className="px-5 py-4 text-right">
                                            {isCurrentAdmin ? (
                                                <span className="text-xs font-medium text-muted-foreground">
                                                    Protected
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
                                                        className="inline-flex cursor-pointer items-center gap-2 rounded-lg border bg-background px-3 py-2 text-xs font-semibold transition-colors hover:bg-muted"
                                                    >
                                                        <UserCog className="size-3.5" />

                                                        {user.role ===
                                                            "ADMIN"
                                                            ? "Demote"
                                                            : "Promote"}
                                                    </button>
                                                </form>
                                            )}
                                        </td>
                                    </tr>
                                );
                            },
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default function AdminUsersPage() {
    return (
        <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
            <div>
                <div className="inline-flex items-center gap-2 rounded-full border bg-primary/[0.05] px-3 py-1.5 text-xs font-semibold text-primary">
                    <Users className="size-3.5" />
                    User management
                </div>

                <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                    Users
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                    Review registered
                    accounts and manage
                    administrator access.
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