import Link from "next/link";
import { ArrowRight, Brain, BookOpen, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    icon: Brain,
    title: "AI Mentor",
    description: "Turn your developer notes into explanations, interview questions, summaries, and flashcards."
  },
  {
    icon: BookOpen,
    title: "Knowledge Base",
    description:  "Organize everything you learn into searchable notes, topics, bookmarks, and learning paths."
  },
  {
    icon: Sparkles,
    title: "Learn Smarter",
    description: "Use AI to understand difficult concepts instead of simply collecting documentation."
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <section className="mx-auto flex min-h-[80vh] max-w-6xl flex-col justify-center px-6 py-20">
        <div className="max-w-3xl">
          <Badge variant="secondary" className="mb-6">
            Next.js 16 · TypeScript · AI
          </Badge>

          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
            Your developer knowledge base,
            <span className="text-primary"> powered by AI.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            DevVault AI helps developers save what they learn, understand
            difficult concepts, and prepare for technical interviews from one
            intelligent workspace.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg">
              <Link href="/dashboard">
                Open Dashboard
                <ArrowRight />
              </Link>
            </Button>

            <Button variant="outline" size="lg">
              <Link href="/notes">Explore Notes</Link>
            </Button>
          </div>
        </div>

        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <Card key={feature.title}>
                <CardHeader>
                  <Icon className="mb-2 h-8 w-8" />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>

                <CardContent>
                  <p className="text-sm leading-6 text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </main>
  );
}