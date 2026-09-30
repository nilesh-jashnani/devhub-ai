import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import { APP_NAME } from "@/lib/constants";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const appUrl =
  process.env.NEXT_PUBLIC_APP_URL ??
  "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),

  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },

  description:
    "An AI-powered developer knowledge base for organizing notes, tracking learning progress, preparing for interviews, and learning with AI.",

  applicationName: APP_NAME,

  authors: [
    {
      name: "Nilesh Jashnani",
    },
  ],

  creator: "Nilesh Jashnani",

  keywords: [
    "developer knowledge base",
    "developer notes",
    "AI learning",
    "AI mentor",
    "interview preparation",
    "software engineering",
    "Next.js",
    "DevVault AI",
  ],

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    url: "/",
    title: APP_NAME,
    description:
      "Organize developer knowledge, track learning progress, prepare for interviews, and learn with AI.",
    siteName: APP_NAME,
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: APP_NAME,
    description:
      "Organize developer knowledge, track learning progress, prepare for interviews, and learn with AI.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {children}
      </body>
    </html>
  );
}