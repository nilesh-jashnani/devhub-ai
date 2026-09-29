import Link from "next/link";
import { isUser } from "@/lib/auth-helper";
import { LogoutButton } from "@/components/auth/logout-button";
import { APP_NAME } from "@/lib/constants";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await isUser();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link
            href="/dashboard"
            className="text-xl font-bold"
          >
            {APP_NAME}
          </Link>

          <nav className="flex items-center gap-5 text-sm">
            <Link
              href="/dashboard"
              className="hover:underline"
            >
              Dashboard
            </Link>

            <Link
              href="/dashboard/notes"
              className="hover:underline"
            >
              Notes
            </Link>

            <Link
              href="/dashboard/bookmarks"
              className="hover:underline"
            >
              Bookmarks
            </Link>

            <Link
              href="/dashboard/ai"
              className="hover:underline"
            >
              AI Mentor
            </Link>

            <Link href="/dashboard/interview" className="hover:underline">
              Interview Prep
            </Link>

            {session.user.role === "ADMIN" && (
              <Link
                href="/admin"
                className="hover:underline"
              >
                Admin
              </Link>
            )}

            <LogoutButton />
          </nav>
        </div>
      </header>

      <main>{children}</main>
    </div>
  );
}