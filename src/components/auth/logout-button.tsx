import { logout } from "@/actions/auth";

export function LogoutButton() {
    return (
        <form action={logout}>
            <button
                type="submit"
                className="rounded-md border px-4 py-2 text-sm cursor-pointer"
            >
                Logout
            </button>
        </form>
    );
}