import Link from "next/link";
import {
  ArrowRight,
  Bookmark,
  Brain,
  Check,
  Code2,
  FileText,
  GraduationCap,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";

const capabilities = [
  {
    icon: FileText,
    title: "Developer Notes",
    description:
      "Capture technical concepts, code knowledge, and everything you want to remember.",
  },
  {
    icon: Brain,
    title: "AI Mentor",
    description:
      "Turn your own notes into explanations, summaries, code examples, flashcards, and study plans.",
  },
  {
    icon: GraduationCap,
    title: "Interview Prep",
    description:
      "Generate technical interview questions from the concepts you are actively learning.",
  },
  {
    icon: TrendingUp,
    title: "Learning Progress",
    description:
      "Track completion and confidence so you know exactly what needs another review.",
  },
  {
    icon: Bookmark,
    title: "Bookmarks",
    description:
      "Save important concepts and build a focused collection for quick revision.",
  },
  {
    icon: Code2,
    title: "Developer Focused",
    description:
      "A learning workspace designed around technical knowledge rather than generic note taking.",
  },
];

const workflow = [
  {
    number: "01",
    title: "Capture",
    description:
      "Write down the technical concepts, patterns, and discoveries you want to retain.",
  },
  {
    number: "02",
    title: "Understand",
    description:
      "Use AI to break difficult material into explanations, examples, summaries, and learning plans.",
  },
  {
    number: "03",
    title: "Practice",
    description:
      "Turn your knowledge into interview questions and test yourself before revealing the answers.",
  },
  {
    number: "04",
    title: "Improve",
    description:
      "Track confidence, revisit weak areas, and keep important material bookmarked for review.",
  },
];

function LogoMark() {
  return (
    <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
      <Brain
        className="size-5"
        aria-hidden="true"
      />
    </span>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-background">
      <header className="relative z-20 border-b bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-2.5"
            aria-label={`${APP_NAME} home`}
          >
            <LogoMark />

            <span className="text-lg font-bold tracking-tight">
              {APP_NAME}
            </span>
          </Link>

          <nav
            aria-label="Primary navigation"
            className="flex items-center gap-2"
          >
            <Button
              variant="ghost"
              className="hidden sm:inline-flex"
            >
              <Link href="/learn">
                Explore
              </Link>
            </Button>

            <Button
              variant="ghost"
            >
              <Link href="/login">
                Sign in
              </Link>
            </Button>

            <Button>
              <Link href="/register">
                Get started
              </Link>
            </Button>
          </nav>
        </div>
      </header>

      <section className="relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[34rem] w-[70rem] -translate-x-1/2 rounded-full bg-primary/[0.08] blur-3xl"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-48 top-64 -z-10 size-[30rem] rounded-full bg-primary/[0.05] blur-3xl"
        />

        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-3 py-1.5 text-xs font-semibold text-primary shadow-sm">
              <Sparkles
                className="size-3.5"
                aria-hidden="true"
              />
              AI-powered developer learning
            </div>

            <h1 className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
              Build knowledge.
              <br />
              <span className="text-primary">
                Learn deeper.
              </span>
              <br />
              Interview better.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              {APP_NAME} turns your
              developer notes into an
              intelligent learning system.
              Capture what you learn,
              understand difficult concepts
              with AI, track your progress,
              and prepare for technical
              interviews.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                className="h-12 rounded-xl px-6 font-semibold"
              >
                <Link href="/register">
                  Start building
                  your vault

                  <ArrowRight
                    className="size-4"
                    aria-hidden="true"
                  />
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="h-12 rounded-xl px-6 font-semibold"
              >
                <Link href="/learn">
                  Explore public
                  notes
                </Link>
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
              {[
                "Personal knowledge base",
                "AI learning tools",
                "Interview practice",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-xs font-medium text-muted-foreground sm:text-sm"
                >
                  <span className="flex size-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check
                      className="size-3"
                      aria-hidden="true"
                    />
                  </span>

                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
            <div
              aria-hidden="true"
              className="absolute inset-8 rounded-3xl bg-primary/10 blur-3xl"
            />

            <div className="relative overflow-hidden rounded-3xl border bg-card shadow-2xl shadow-primary/5">
              <div className="flex h-12 items-center gap-2 border-b bg-muted/30 px-5">
                <span className="size-2.5 rounded-full bg-muted-foreground/30" />
                <span className="size-2.5 rounded-full bg-muted-foreground/30" />
                <span className="size-2.5 rounded-full bg-muted-foreground/30" />

                <span className="ml-3 text-xs font-medium text-muted-foreground">
                  Learning workspace
                </span>
              </div>

              <div className="grid min-h-[430px] grid-cols-[76px_1fr] sm:grid-cols-[150px_1fr]">
                <div className="border-r bg-muted/20 p-3 sm:p-4">
                  <div className="mb-6 flex items-center gap-2">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <Brain className="size-4" />
                    </div>

                    <span className="hidden text-xs font-bold sm:inline">
                      {APP_NAME}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {[
                      "Overview",
                      "Notes",
                      "AI Mentor",
                      "Interview",
                    ].map(
                      (
                        item,
                        index,
                      ) => (
                        <div
                          key={
                            item
                          }
                          className={`rounded-lg px-2 py-2 text-[11px] font-medium sm:px-3 ${index ===
                            0
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground"
                            }`}
                        >
                          <span className="hidden sm:inline">
                            {
                              item
                            }
                          </span>

                          <span className="mx-auto block size-2 rounded-full bg-current sm:hidden" />
                        </div>
                      ),
                    )}
                  </div>
                </div>

                <div className="p-4 sm:p-6">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                      Overview
                    </p>

                    <h2 className="mt-1 text-lg font-bold tracking-tight sm:text-xl">
                      Keep learning
                      momentum.
                    </h2>
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl border p-4">
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                        Notes
                      </p>

                      <p className="mt-2 text-2xl font-bold">
                        24
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        Knowledge
                        captured
                      </p>
                    </div>

                    <div className="rounded-xl border p-4">
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                        Confidence
                      </p>

                      <p className="mt-2 text-2xl font-bold">
                        78%
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        Average
                        score
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 rounded-xl border p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold">
                          React
                          Server
                          Components
                        </p>

                        <p className="mt-1 text-[11px] text-muted-foreground">
                          Learning
                          progress
                        </p>
                      </div>

                      <span className="rounded-full bg-primary/10 px-2 py-1 text-[10px] font-semibold text-primary">
                        82%
                      </span>
                    </div>

                    <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-muted">
                      <div className="h-full w-[82%] rounded-full bg-primary" />
                    </div>
                  </div>

                  <div className="mt-3 rounded-xl border bg-primary/[0.03] p-4">
                    <div className="flex items-center gap-2 text-primary">
                      <Sparkles className="size-4" />

                      <p className="text-xs font-semibold">
                        AI Mentor
                      </p>
                    </div>

                    <p className="mt-3 text-xs leading-5 text-muted-foreground">
                      Explain how
                      server
                      components
                      reduce client
                      JavaScript...
                    </p>

                    <div className="mt-3 h-2 w-full rounded bg-muted" />
                    <div className="mt-2 h-2 w-4/5 rounded bg-muted" />
                    <div className="mt-2 h-2 w-2/3 rounded bg-muted" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-primary">
              One learning workspace
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              More than another place to
              store notes.
            </h2>

            <p className="mt-4 text-base leading-7 text-muted-foreground">
              Your notes become the
              foundation for learning,
              revision, AI assistance,
              and interview preparation.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map(
              (feature) => {
                const Icon =
                  feature.icon;

                return (
                  <article
                    key={
                      feature.title
                    }
                    className="group rounded-2xl border bg-card p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md"
                  >
                    <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon
                        className="size-5"
                        aria-hidden="true"
                      />
                    </div>

                    <h3 className="mt-5 text-lg font-semibold tracking-tight">
                      {
                        feature.title
                      }
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {
                        feature.description
                      }
                    </p>
                  </article>
                );
              },
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <div>
            <p className="text-sm font-semibold text-primary">
              How it works
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              From learning something to
              actually remembering it.
            </h2>

            <p className="mt-4 max-w-lg text-base leading-7 text-muted-foreground">
              Instead of scattering
              knowledge across tutorials,
              documents, and bookmarks,
              build a repeatable learning
              loop around your own notes.
            </p>
          </div>

          <div className="grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2">
            {workflow.map(
              (step) => (
                <article
                  key={
                    step.number
                  }
                  className="bg-background p-6 sm:p-7"
                >
                  <span className="font-mono text-xs font-semibold text-primary">
                    {
                      step.number
                    }
                  </span>

                  <h3 className="mt-4 text-lg font-semibold">
                    {
                      step.title
                    }
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {
                      step.description
                    }
                  </p>
                </article>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 sm:pb-24 lg:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border bg-card px-6 py-12 text-center shadow-sm sm:px-10 sm:py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 size-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.08] blur-3xl"
          />

          <div className="relative mx-auto max-w-2xl">
            <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Sparkles
                className="size-5"
                aria-hidden="true"
              />
            </div>

            <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
              Build a knowledge system
              that grows with you.
            </h2>

            <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
              Capture what you learn
              today, strengthen it with
              AI, and turn it into
              knowledge you can use in
              your next project or
              interview.
            </p>

            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Button
                size="lg"
                className="h-12 rounded-xl px-6 font-semibold"
              >
                <Link href="/register">
                  Create your vault

                  <ArrowRight
                    className="size-4"
                    aria-hidden="true"
                  />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="h-12 rounded-xl px-6 font-semibold"
              >
                <Link href="/login">
                  Sign in
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-2.5"
          >
            <LogoMark />

            <span className="font-bold tracking-tight">
              {APP_NAME}
            </span>
          </Link>

          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <Link
              href="/learn"
              className="transition-colors hover:text-foreground"
            >
              Learn
            </Link>

            <Link
              href="/login"
              className="transition-colors hover:text-foreground"
            >
              Sign in
            </Link>

            <Link
              href="/register"
              className="transition-colors hover:text-foreground"
            >
              Create account
            </Link>
          </div>

          <p className="text-xs text-muted-foreground">
            Developer learning,
            powered by AI.
          </p>
        </div>
      </footer>
    </main>
  );
}