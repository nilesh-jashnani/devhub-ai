import { logout } from "@/actions/auth";

function LogoutIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="size-4"
            aria-hidden="true"
        >
            <path d="M10 5H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h4" />
            <path d="M14 8l4 4-4 4" />
            <path d="M18 12H9" />
        </svg>
    );
}

export function LogoutButton() {
    return (
        <form action={logout}>
            <button
                type="submit"
                className="inline-flex h-9 cursor-pointer items-center justify-center gap-2 rounded-xl border bg-background px-3 text-sm font-medium text-muted-foreground transition-colors hover:border-destructive/30 hover:bg-destructive/[0.06] hover:text-destructive"
            >
                <LogoutIcon />
                Sign out
            </button>
        </form>
    );
}