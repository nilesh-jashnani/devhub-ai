import { Brain, BookOpen, Sparkles } from "lucide-react";
import { Features } from "./types";
export const APP_NAME: string = "DevHub AI";
export const features: Features = [
  {
    icon: Brain,
    title: "AI Mentor",
    description:
      "Turn your developer notes into explanations, interview questions, summaries, and flashcards.",
  },
  {
    icon: BookOpen,
    title: "Knowledge Base",
    description:
      "Organize everything you learn into searchable notes, topics, bookmarks, and learning paths.",
  },
  {
    icon: Sparkles,
    title: "Learn Smarter",
    description:
      "Use AI to understand difficult concepts instead of simply collecting documentation.",
  },
];
