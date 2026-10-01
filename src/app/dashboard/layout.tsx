import Link from "next/link";

import { isUser } from "@/lib/auth-helper";
import { LogoutButton } from "@/components/auth/logout-button";
import { APP_NAME } from "@/lib/constants";

type NavigationItem = {
  href: string;
  label: string;
  description: string;
  icon: React.ReactNode;
};

function DashboardIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="size-5"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="3"
        width="7"
        height="7"
        rx="2"
      />
      <rect
        x="14"
        y="3"
        width="7"
        height="7"
        rx="2"
      />
      <rect
        x="3"
        y="14"
        width="7"
        height="7"
        rx="2"
      />
      <rect
        x="14"
        y="14"
        width="7"
        height="7"
        rx="2"
      />
    </svg>
  );
}

function NotesIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="size-5"
      aria-hidden="true"
    >
      <path d="M6 3.75h9l3 3V20.25H6z" />
      <path d="M15 3.75v3h3" />
      <path d="M9 11h6" />
      <path d="M9 15h6" />
    </svg>
  );
}

function BookmarkIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="size-5"
      aria-hidden="true"
    >
      <path d="M6.75 4.5A1.5 1.5 0 0 1 8.25 3h7.5a1.5 1.5 0 0 1 1.5 1.5V21L12 17.75 6.75 21z" />
    </svg>
  );
}

function AIIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="size-5"
      aria-hidden="true"
    >
      <path d="M12 3v3" />
      <path d="M12 18v3" />
      <path d="m4.22 4.22 2.12 2.12" />
      <path d="m17.66 17.66 2.12 2.12" />
      <path d="M3 12h3" />
      <path d="M18 12h3" />
      <path d="m4.22 19.78 2.12-2.12" />
      <path d="m17.66 6.34 2.12-2.12" />
      <circle
        cx="12"
        cy="12"
        r="4"
      />
    </svg>
  );
}

function InterviewIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="size-5"
      aria-hidden="true"
    >
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H11l-5 4v-4.18A2.5 2.5 0 0 1 4 13.5z" />
      <path d="M9 8h6" />
      <path d="M9 12h4" />
    </svg>
  );
}

function AdminIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="size-5"
      aria-hidden="true"
    >
      <path d="M12 3 4.5 6v5.25c0 4.5 3.08 8.7 7.5 9.75 4.42-1.05 7.5-5.25 7.5-9.75V6z" />
      <path d="m9.5 12 1.75 1.75L15 10" />
    </svg>
  );
}

const navigation: NavigationItem[] = [
  {
    href: "/dashboard",
    label: "Dashboard",
    description: "Your learning overview",
    icon: <DashboardIcon />,
  },
  {
    href: "/dashboard/notes",
    label: "Notes",
    description: "Your knowledge base",
    icon: <NotesIcon />,
  },
  {
    href: "/dashboard/bookmarks",
    label: "Bookmarks",
    description: "Saved knowledge",
    icon: <BookmarkIcon />,
  },
  {
    href: "/dashboard/ai",
    label: "AI Mentor",
    description: "Learn with AI",
    icon: <AIIcon />,
  },
  {
    href: "/dashboard/interview",
    label: "Interview Prep",
    description: "Practice for interviews",
    icon: <InterviewIcon />,
  },
];

export default async function DashboardLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  const session = await isUser();

  const displayName =
    session.user.name?.trim() ||
    session.user.email?.split("@")[0] ||
    "Developer";

  const initial =
    displayName
      .charAt(0)
      .toUpperCase() || "D";

  return (
    <div className="min-h-screen bg-muted/20">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur lg:hidden">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6">
          <Link
            href="/dashboard"
            className="flex items-center gap-2.5"
          >
            <div className="flex size-9 items-center justify-center rounded-xl bg-foreground text-sm font-bold text-background">
              DH
            </div>

            <span className="font-semibold tracking-tight">
              {APP_NAME}
            </span>
          </Link>

          <div className="flex size-9 items-center justify-center rounded-full border bg-background text-sm font-semibold">
            {initial}
          </div>
        </div>

        <nav
          aria-label="Mobile navigation"
          className="flex gap-1 overflow-x-auto border-t px-3 py-2"
        >
          {navigation.map(
            (item) => (
              <Link
                key={
                  item.href
                }
                href={
                  item.href
                }
                className="flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {
                  item.icon
                }

                <span>
                  {
                    item.label
                  }
                </span>
              </Link>
            ),
          )}

          {session.user
            .role ===
            "ADMIN" && (
              <Link
                href="/admin"
                className="flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <AdminIcon />

                <span>
                  Admin
                </span>
              </Link>
            )}
        </nav>
      </header>

      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-sidebar-border bg-sidebar text-sidebar-foreground lg:flex lg:flex-col">
        <div className="flex h-20 items-center border-b px-6">
          <Link
            href="/dashboard"
            className="flex items-center gap-3"
          >
            <div className="flex size-10 items-center justify-center rounded-xl bg-foreground text-sm font-bold text-background shadow-sm">
              DH
            </div>

            <div>
              <div className="font-bold tracking-tight">
                {APP_NAME}
              </div>

              <div className="text-xs text-muted-foreground">
                Developer workspace
              </div>
            </div>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-6">
          <div className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Workspace
          </div>

          <nav
            aria-label="Dashboard navigation"
            className="space-y-1"
          >
            {navigation.map(
              (item) => (
                <Link
                  key={
                    item.href
                  }
                  href={
                    item.href
                  }
                  className="group flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border bg-background transition-colors group-hover:border-border/80 group-hover:bg-background">
                    {
                      item.icon
                    }
                  </div>

                  <div className="min-w-0">
                    <div className="font-medium text-foreground">
                      {
                        item.label
                      }
                    </div>

                    <div className="truncate text-xs text-muted-foreground">
                      {
                        item.description
                      }
                    </div>
                  </div>
                </Link>
              ),
            )}

            {session.user
              .role ===
              "ADMIN" && (
                <>
                  <div className="my-4 border-t" />

                  <Link
                    href="/admin"
                    className="group flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border bg-background">
                      <AdminIcon />
                    </div>

                    <div>
                      <div className="font-medium text-foreground">
                        Admin
                      </div>

                      <div className="text-xs text-muted-foreground">
                        Manage
                        DevHub AI
                      </div>
                    </div>
                  </Link>
                </>
              )}
          </nav>
        </div>

        <div className="border-t p-4">
          <div className="mb-3 flex items-center gap-3 rounded-xl bg-muted/50 p-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full border bg-background text-sm font-semibold">
              {initial}
            </div>

            <div className="min-w-0">
              <div className="truncate text-sm font-semibold">
                {displayName}
              </div>

              {session.user
                .email && (
                  <div className="truncate text-xs text-muted-foreground">
                    {
                      session
                        .user
                        .email
                    }
                  </div>
                )}
            </div>
          </div>

          <LogoutButton />
        </div>
      </aside>

      <div className="lg:pl-72">
        <main className="min-h-screen">
          {children}
        </main>
      </div>

      {modal}
    </div>
  );
}